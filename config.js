// API Configuration
// Add your API keys here manually

export const API_CONFIG = {
  // Gemini Live API Key
  // Get your API key from: https://aistudio.google.com/app/apikey
  // Note: The app will use Web Speech API as fallback if Gemini API key is not provided
  GEMINI_API_KEY: 'AIzaSyBwCkboCoebEVxfD2JX-kQjUxao-t847qM', // Add your Gemini API key here
  
  // Trigger phrases for voice activation (case-insensitive)
  // Add or modify phrases that will trigger recording
  TRIGGER_PHRASES: [
    'help me',
    'help',
    'emergency',
    'i need help',
    'assist me',
    'sos',
    'save me'
  ],
  
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCLoq9bl0BR7wjrxrBXe_evF9V7S4DWSzM",
//   authDomain: "voisesos.firebaseapp.com",
//   projectId: "voisesos",
//   storageBucket: "voisesos.firebasestorage.app",
//   messagingSenderId: "902311967240",
//   appId: "1:902311967240:web:3f700f76a93c21bcb1efbd",
//   measurementId: "G-7WMEH0FCYL"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

  // Firebase Configuration
  // Get your Firebase config from: https://console.firebase.google.com/
  // Go to Project Settings > General > Your apps > Firebase SDK snippet > Config
  FIREBASE_CONFIG: {
    // apiKey: '', // Add your Firebase API key here
    // authDomain: '', // e.g., 'your-project.firebaseapp.com'
    // projectId: '', // e.g., 'your-project-id'
    // storageBucket: '', // e.g., 'your-project.appspot.com'
    // messagingSenderId: '', // e.g., '123456789'
    // appId: '' // e.g., '1:123456789:web:abcdef'
    apiKey: "AIzaSyCLoq9bl0BR7wjrxrBXe_evF9V7S4DWSzM",
    authDomain: "voisesos.firebaseapp.com",
    projectId: "voisesos",
    storageBucket: "voisesos.firebasestorage.app",
    messagingSenderId: "902311967240",
    appId: "1:902311967240:web:3f700f76a93c21bcb1efbd",
    measurementId: "G-7WMEH0FCYL"
  },
  
  // Other API keys can be added here
  // GOOGLE_MAPS_API_KEY: '',
  // BACKEND_API_URL: '',
};

// Volunteer credentials (for demo purposes)
export const VOLUNTEER_CREDENTIALS = {
  email: 'volunteer@gmail.com',
  password: '12345678'
};

