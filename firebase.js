// Firebase Configuration and Initialization
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { API_CONFIG } from './config.js';

// Initialize Firebase
const firebaseConfig = API_CONFIG.FIREBASE_CONFIG;

// Check if Firebase is configured
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.warn('Firebase not configured. Please add Firebase config to config.js');
}

// Initialize Firebase app
const app = firebaseConfig.apiKey ? initializeApp(firebaseConfig) : null;

// Initialize Firebase services
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;

// Firestore Collections
export const COLLECTIONS = {
  NOTIFICATIONS: 'notifications',
  USERS: 'users',
  VOLUNTEERS: 'volunteers'
};

// Convert audio blob to base64 string
const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // Remove data URL prefix (e.g., "data:audio/webm;base64,")
      const base64String = reader.result.split(',')[1] || reader.result;
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// Convert base64 string back to blob URL
const base64ToBlobUrl = (base64String, mimeType = 'audio/webm') => {
  try {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error converting base64 to blob:', error);
    return null;
  }
};

// Notification Functions
export const saveNotificationToFirestore = async (audioBlob, transcription, location, userId) => {
  if (!db) {
    console.error('Firebase not initialized');
    // Fallback to localStorage
    return saveNotificationToLocalStorage(audioBlob, transcription, location);
  }

  try {
    // Check audio file size (Firestore has 1MB limit per document)
    // Base64 encoding increases size by ~33%, so we limit to ~750KB raw
    const maxSize = 750 * 1024; // 750KB
    if (audioBlob.size > maxSize) {
      console.warn('Audio file too large for Firestore. Using localStorage fallback.');
      return saveNotificationToLocalStorage(audioBlob, transcription, location);
    }

    // Convert audio blob to base64 string
    const audioBase64 = await blobToBase64(audioBlob);
    
    // Get the MIME type from the blob
    const mimeType = audioBlob.type || 'audio/webm';

    // Save notification to Firestore with audio as base64
    const notificationData = {
      userId: userId,
      timestamp: serverTimestamp(),
      audioBase64: audioBase64, // Store audio as base64 string
      audioMimeType: mimeType, // Store MIME type for reconstruction
      transcription: transcription || 'No transcription available',
      location: location || null,
      responded: false,
      respondedAt: null,
      volunteerId: null,
      audioSize: audioBlob.size // Store original size for reference
    };

    const docRef = await addDoc(collection(db, COLLECTIONS.NOTIFICATIONS), notificationData);
    console.log('Notification saved to Firestore:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving notification to Firestore:', error);
    // Fallback to localStorage
    return saveNotificationToLocalStorage(audioBlob, transcription, location);
  }
};

// Fallback to localStorage
const saveNotificationToLocalStorage = (audioBlob, transcription, location) => {
  const audioUrl = URL.createObjectURL(audioBlob);
  const notification = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    audioUrl: audioUrl,
    transcription: transcription || 'No transcription available',
    location: location || null,
    responded: false
  };

  const existingNotifications = JSON.parse(localStorage.getItem('voiceSOS_notifications') || '[]');
  existingNotifications.push(notification);
  localStorage.setItem('voiceSOS_notifications', JSON.stringify(existingNotifications));
  window.dispatchEvent(new Event('storage'));
  return notification.id;
};

// Real-time listener for notifications
export const subscribeToNotifications = (callback) => {
  if (!db) {
    console.warn('Firebase not initialized, using localStorage fallback');
    // Fallback to localStorage polling
    const interval = setInterval(() => {
      const stored = localStorage.getItem('voiceSOS_notifications');
      if (stored) {
        callback(JSON.parse(stored));
      }
    }, 1000);
    return () => clearInterval(interval);
  }

  try {
    const q = query(
      collection(db, COLLECTIONS.NOTIFICATIONS),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifications = snapshot.docs.map(doc => {
        const data = doc.data();
        // Convert base64 audio back to blob URL if it exists
        let audioUrl = data.audioUrl; // Legacy support for Storage URLs
        
        // If audio is stored as base64, convert it to blob URL
        if (data.audioBase64 && !audioUrl) {
          audioUrl = base64ToBlobUrl(data.audioBase64, data.audioMimeType || 'audio/webm');
        }
        
        return {
          id: doc.id,
          ...data,
          audioUrl: audioUrl, // Use converted blob URL or existing URL
          timestamp: data.timestamp?.toDate?.()?.toISOString() || data.timestamp
        };
      });
      callback(notifications);
    }, (error) => {
      console.error('Error listening to notifications:', error);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error setting up notification listener:', error);
    // Fallback to localStorage
    const interval = setInterval(() => {
      const stored = localStorage.getItem('voiceSOS_notifications');
      if (stored) {
        callback(JSON.parse(stored));
      }
    }, 1000);
    return () => clearInterval(interval);
  }
};

// Update notification (e.g., mark as responded)
export const updateNotification = async (notificationId, updates) => {
  if (!db) {
    console.warn('Firebase not initialized');
    return;
  }

  try {
    await updateDoc(doc(db, COLLECTIONS.NOTIFICATIONS, notificationId), {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating notification:', error);
    throw error;
  }
};

export default app;

