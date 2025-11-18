import { useState, useEffect } from 'react';
import { Shield, MapPin, Phone, Bell, User, LogOut, Volume2, Clock, Navigation } from 'lucide-react';
import { API_CONFIG } from './config.js';
import { subscribeToNotifications, updateNotification } from './firebase.js';

function VolunteerDashboard({ volunteer, onLogout }) {
  const [notifications, setNotifications] = useState([]);
  const [activeNotification, setActiveNotification] = useState(null);
  const [isCalling, setIsCalling] = useState(false);

  // Mock volunteer data
  const volunteerData = {
    name: 'John Doe',
    email: volunteer?.email || 'volunteer@gmail.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    status: 'Available',
    totalCalls: 12,
    rating: 4.8
  };

  // Subscribe to Firestore notifications
  useEffect(() => {
    const unsubscribe = subscribeToNotifications((notifications) => {
      setNotifications(notifications);
      // Show the most recent notification
      if (notifications.length > 0) {
        setActiveNotification(notifications[0]); // Firestore returns newest first
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const handleMockCall = async (notification) => {
    setIsCalling(true);
    // Simulate call duration
    setTimeout(async () => {
      setIsCalling(false);
      // Mark notification as responded in Firestore
      try {
        await updateNotification(notification.id, {
          responded: true,
          respondedAt: new Date().toISOString(),
          volunteerId: volunteer?.id || volunteer?.uid || 'volunteer_1'
        });
      } catch (error) {
        console.error('Error updating notification:', error);
        // Fallback: update local state
        setNotifications(prev => 
          prev.map(n => 
            n.id === notification.id 
              ? { ...n, responded: true, respondedAt: new Date().toISOString() }
              : n
          )
        );
      }
    }, 3000);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-cyan-500/20 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400" />
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                VoiceSOS Volunteer Dashboard
              </h1>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm sm:text-base">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6 shadow-lg">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mb-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-cyan-400 mb-2">{volunteerData.name}</h2>
                <p className="text-gray-400 text-sm">{volunteerData.email}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-gray-300 text-sm">Status</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                    {volunteerData.status}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-gray-300 text-sm">Total Calls</span>
                  <span className="text-cyan-400 font-bold">{volunteerData.totalCalls}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-gray-300 text-sm">Rating</span>
                  <span className="text-yellow-400 font-bold">{volunteerData.rating} ⭐</span>
                </div>

                <div className="flex items-center space-x-2 p-3 bg-slate-800/50 rounded-lg">
                  <Phone className="h-4 w-4 text-cyan-400" />
                  <span className="text-gray-300 text-sm">{volunteerData.phone}</span>
                </div>

                <div className="flex items-center space-x-2 p-3 bg-slate-800/50 rounded-lg">
                  <MapPin className="h-4 w-4 text-cyan-400" />
                  <span className="text-gray-300 text-sm">{volunteerData.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-cyan-400 flex items-center space-x-2">
                  <Bell className="h-6 w-6" />
                  <span>Emergency Notifications</span>
                </h2>
                <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-semibold">
                  {notifications.filter(n => !n.responded).length} Active
                </span>
              </div>

              {notifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No notifications yet</p>
                  <p className="text-gray-500 text-sm mt-2">You'll receive alerts here when someone needs help</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-5 rounded-xl border transition-all ${
                        notification.responded
                          ? 'bg-slate-800/50 border-gray-700'
                          : 'bg-red-500/10 border-red-500/30 hover:border-red-500/50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Shield className="h-5 w-5 text-red-400" />
                            <h3 className="text-lg font-bold text-white">
                              Emergency Alert #{notification.id}
                            </h3>
                            {!notification.responded && (
                              <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-semibold animate-pulse">
                                NEW
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{formatTime(notification.timestamp)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span>{formatDate(notification.timestamp)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="mb-4 p-3 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <MapPin className="h-4 w-4 text-cyan-400" />
                          <span className="text-sm font-semibold text-cyan-400">Location</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          {notification.location?.address || 'Location data unavailable'}
                        </p>
                        {notification.location?.coordinates && (
                          <p className="text-gray-400 text-xs mt-1">
                            Coordinates: {notification.location.coordinates.lat.toFixed(6)}, {notification.location.coordinates.lng.toFixed(6)}
                          </p>
                        )}
                        {notification.location?.mapUrl && (
                          <a
                            href={notification.location.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 text-xs mt-2 inline-flex items-center space-x-1"
                          >
                            <Navigation className="h-3 w-3" />
                            <span>Open in Maps</span>
                          </a>
                        )}
                      </div>

                      {/* Audio Player */}
                      {notification.audioUrl && (
                        <div className="mb-4 p-3 bg-slate-800/50 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Volume2 className="h-4 w-4 text-cyan-400" />
                            <span className="text-sm font-semibold text-cyan-400">Audio Recording</span>
                          </div>
                          <audio controls className="w-full mt-2">
                            <source src={notification.audioUrl} type="audio/webm" />
                            <source src={notification.audioUrl} type="audio/wav" />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      )}

                      {/* Transcription */}
                      {notification.transcription && (
                        <div className="mb-4 p-3 bg-slate-800/50 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm font-semibold text-cyan-400">Transcription</span>
                          </div>
                          <p className="text-gray-300 text-sm italic">"{notification.transcription}"</p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      {!notification.responded && (
                        <div className="flex items-center space-x-3 mt-4">
                          <button
                            onClick={() => handleMockCall(notification)}
                            disabled={isCalling}
                            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                          >
                            {isCalling ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Calling...</span>
                              </>
                            ) : (
                              <>
                                <Phone className="h-5 w-5" />
                                <span>Mock Call</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      {notification.responded && (
                        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <p className="text-green-400 text-sm">
                            ✓ Responded at {formatTime(notification.respondedAt)}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default VolunteerDashboard;

