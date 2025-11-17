import { useState } from 'react';
import { Mic, MicOff, Shield, MapPin, Zap, Brain, Phone, LogIn, Mail, Lock, Eye, EyeOff, X, User } from 'lucide-react';
import { GridScan } from './Gridscan.jsx';

// Google Icon SVG Component
const GoogleIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);

  // Open login modal
  const handleLoginClick = () => {
    setShowLoginModal(true);
    setLoginError('');
  };

  // Close login modal
  const handleCloseLogin = () => {
    setShowLoginModal(false);
    setLoginForm({ email: '', password: '' });
    setSignUpForm({ email: '', password: '', confirmPassword: '', phoneNumber: '' });
    setLoginError('');
    setSignUpError('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setShowSignUp(false);
  };

  // Handle login form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (loginError) setLoginError('');
  };

  // Handle sign up form input changes
  const handleSignUpInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (signUpError) setSignUpError('');
  };

  // Placeholder function for API integration - handles login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    // Basic validation
    if (!loginForm.email.trim()) {
      setLoginError('Email is required');
      return;
    }
    
    if (!loginForm.password.trim()) {
      setLoginError('Password is required');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginForm.email)) {
      setLoginError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // TODO: Replace with actual API call
    // Example: const response = await fetch('/api/login', { 
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email: loginForm.email, password: loginForm.password })
    // });
    console.log('Login attempt - API integration needed', loginForm);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate successful login (in real app, check response)
    setUser({
      id: '1',
      name: 'User',
      email: loginForm.email
    });
    
    setIsLoading(false);
    setShowLoginModal(false);
    setLoginForm({ email: '', password: '' });
    
    // Success message could be shown here
    console.log('Login successful!');
  };

  // Placeholder function for Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    setSignUpError('');
    
    // Basic validation
    if (!signUpForm.email.trim()) {
      setSignUpError('Email is required');
      return;
    }
    
    if (!signUpForm.password.trim()) {
      setSignUpError('Password is required');
      return;
    }

    if (signUpForm.password.length < 6) {
      setSignUpError('Password must be at least 6 characters');
      return;
    }

    if (signUpForm.password !== signUpForm.confirmPassword) {
      setSignUpError('Passwords do not match');
      return;
    }

    if (!signUpForm.phoneNumber.trim()) {
      setSignUpError('Phone number is required');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signUpForm.email)) {
      setSignUpError('Please enter a valid email address');
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(signUpForm.phoneNumber) || signUpForm.phoneNumber.replace(/\D/g, '').length < 10) {
      setSignUpError('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    
    // TODO: Replace with actual API call
    // Example: const response = await fetch('/api/signup', { 
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ 
    //     email: signUpForm.email, 
    //     password: signUpForm.password,
    //     phoneNumber: signUpForm.phoneNumber
    //   })
    // });
    console.log('Sign up attempt - API integration needed', signUpForm);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate successful sign up (in real app, check response)
    setUser({
      id: '1',
      name: 'User',
      email: signUpForm.email,
      phoneNumber: signUpForm.phoneNumber
    });
    
    setIsLoading(false);
    setShowLoginModal(false);
    setSignUpForm({ email: '', password: '', confirmPassword: '', phoneNumber: '' });
    
    // Success message could be shown here
    console.log('Sign up successful!');
  };

  // Placeholder function for Google Sign In
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setLoginError('');
    setSignUpError('');
    
    try {
      // TODO: Replace with actual Google OAuth implementation
      // Example using Google Identity Services:
      // const client = google.accounts.oauth2.initTokenClient({
      //   client_id: 'YOUR_GOOGLE_CLIENT_ID',
      //   scope: 'email profile',
      //   callback: async (response) => {
      //     // Handle the response
      //     const userInfo = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      //       headers: { Authorization: `Bearer ${response.access_token}` }
      //     }).then(r => r.json());
      //     
      //     // Send to your backend API
      //     const apiResponse = await fetch('/api/auth/google', {
      //       method: 'POST',
      //       headers: { 'Content-Type': 'application/json' },
      //       body: JSON.stringify({ token: response.access_token, userInfo })
      //     });
      //   }
      // });
      // client.requestAccessToken();
      
      console.log('Google Sign In - API integration needed');
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful Google login
      setUser({
        id: 'google_1',
        name: 'Google User',
        email: 'user@gmail.com',
        provider: 'google'
      });
      
      setIsLoading(false);
      setShowLoginModal(false);
      setLoginForm({ email: '', password: '' });
      
      console.log('Google Sign In successful!');
    } catch (error) {
      setIsLoading(false);
      setLoginError('Google Sign In failed. Please try again.');
      console.error('Google Sign In error:', error);
    }
  };

  // Placeholder function for Google Sign Up
  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setLoginError('');
    
    try {
      // TODO: Replace with actual Google OAuth implementation for sign up
      // Similar to handleGoogleSignIn but with sign up flow
      console.log('Google Sign Up - API integration needed');
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful Google sign up
      setUser({
        id: 'google_1',
        name: 'Google User',
        email: 'user@gmail.com',
        provider: 'google'
      });
      
      setIsLoading(false);
      setShowLoginModal(false);
      setLoginForm({ email: '', password: '' });
      
      console.log('Google Sign Up successful!');
    } catch (error) {
      setIsLoading(false);
      setLoginError('Google Sign Up failed. Please try again.');
      console.error('Google Sign Up error:', error);
    }
  };

  // Placeholder function for starting recording
  const startRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      console.log('Recording stopped - API integration needed');
      // TODO: Implement actual recording stop logic
      // Example: await stopRecordingAPI();
    } else {
      // Start recording
      setIsRecording(true);
      console.log('Recording started - API integration needed');
      // TODO: Implement actual recording start logic
      // Example: await startRecordingAPI();
      
      // Simulate 8-second recording session
      setTimeout(() => {
        setIsRecording(false);
        console.log('Recording completed (8 seconds) - API integration needed');
        // TODO: Process and send recording to API
        // Example: await processRecordingAPI();
        alert('Recording completed! (This is a placeholder)');
      }, 8000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Embedded CSS for animations */}
      <style>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
        
        @keyframes pulse-dot {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        
        @keyframes wave {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(1.5);
          }
        }
        
        .pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .pulse-ring.active {
          animation: pulse-ring 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .pulse-dot {
          animation: pulse-dot 2s ease-in-out infinite;
        }
        
        .pulse-dot.active {
          animation: pulse-dot 0.8s ease-in-out infinite;
        }
        
        .wave-bar {
          animation: wave 1.5s ease-in-out infinite;
        }
        
        .wave-bar:nth-child(1) {
          animation-delay: 0s;
        }
        
        .wave-bar:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .wave-bar:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        .wave-bar:nth-child(4) {
          animation-delay: 0.6s;
        }
        
        .wave-bar:nth-child(5) {
          animation-delay: 0.8s;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(5px);
          }
        }
        
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.5);
          }
        }
        
        @keyframes textShimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes scaleInOut {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .animate-textShimmer {
          background: linear-gradient(90deg, #06b6d4, #3b82f6, #06b6d4, #3b82f6);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textShimmer 3s linear infinite;
        }
        
        .animate-rotate {
          animation: rotate 20s linear infinite;
        }
        
        .animate-scaleInOut {
          animation: scaleInOut 2s ease-in-out infinite;
        }
      `}</style>

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-cyan-500/20 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400" />
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                VoiceSOS
              </h1>
            </div>
            {user ? (
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-cyan-400" />
                <span className="text-sm sm:text-base text-cyan-400 font-medium">{user.email}</span>
                <button
                  onClick={() => setUser(null)}
                  className="px-3 py-1.5 text-sm bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className="flex items-center space-x-2 px-4 py-2 sm:px-6 sm:py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <LogIn className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base">Login</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-16 sm:pt-20 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
        {/* GridScan Background Effect */}
        <div className="fixed inset-0 w-full h-full z-0 opacity-30">
          <GridScan
            sensitivity={0.55}
            lineThickness={1}
            linesColor="#392e4e"
            gridScale={0.1}
            scanColor="#FF9FFC"
            scanOpacity={0.4}
            enablePost
            bloomIntensity={0.6}
            chromaticAberration={0.002}
            noiseIntensity={0.01}
            className="w-full h-full"
          />
        </div>
        <div className="relative w-full max-w-7xl mx-auto z-10">
          {/* Animated Background Effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Pulsing Rings */}
            <div className={`absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full border-4 ${isRecording ? 'border-cyan-400 pulse-ring active' : 'border-cyan-500/30 pulse-ring'}`}></div>
            <div className={`absolute w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full border-4 ${isRecording ? 'border-blue-400 pulse-ring active' : 'border-blue-500/20 pulse-ring'}`} style={{ animationDelay: '0.5s' }}></div>
            <div className={`absolute w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full border-4 ${isRecording ? 'border-cyan-300 pulse-ring active' : 'border-cyan-500/10 pulse-ring'}`} style={{ animationDelay: '1s' }}></div>
            
            {/* Audio Wave Visualization (shown when recording) */}
            {isRecording && (
              <div className="absolute flex items-center justify-center space-x-1 sm:space-x-2">
                <div className="w-1 sm:w-2 h-8 sm:h-12 bg-cyan-400 rounded-full wave-bar"></div>
                <div className="w-1 sm:w-2 h-12 sm:h-16 bg-blue-400 rounded-full wave-bar"></div>
                <div className="w-1 sm:w-2 h-16 sm:h-20 bg-cyan-300 rounded-full wave-bar"></div>
                <div className="w-1 sm:w-2 h-12 sm:h-16 bg-blue-400 rounded-full wave-bar"></div>
                <div className="w-1 sm:w-2 h-8 sm:h-12 bg-cyan-400 rounded-full wave-bar"></div>
              </div>
            )}
            
            {/* Central Dot */}
            <div className={`absolute w-4 h-4 sm:w-6 sm:h-6 bg-cyan-400 rounded-full ${isRecording ? 'pulse-dot active' : 'pulse-dot'}`}></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 text-center space-y-6 sm:space-y-8">
            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-cyan-400/30 rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 6}s`,
                    animationDuration: `${4 + Math.random() * 4}s`,
                  }}
                />
              ))}
            </div>

            <div className="space-y-4 sm:space-y-6 relative">
              {/* Rotating Gradient Ring */}
              <div className="absolute -top-20 -left-20 sm:-top-32 sm:-left-32 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-rotate" />
              
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold relative">
                <span className="animate-textShimmer">
                  VoiceSOS
                </span>
                {/* Glow effect behind text */}
                <span className="absolute inset-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent blur-xl opacity-50 -z-10 animate-scaleInOut">
                  VoiceSOS
                </span>
              </h2>
              
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 font-light max-w-2xl mx-auto relative animate-slideUp" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                <span className="inline-block animate-float" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>
                  Instant help, just your voice.
                </span>
              </p>
              
              {/* Decorative gradient lines */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-glow opacity-50" />
            </div>

            {/* CTA Button */}
            <div className="pt-8 sm:pt-12">
              <button
                onClick={startRecording}
                className={`group relative px-8 py-4 sm:px-12 sm:py-6 md:px-16 md:py-8 rounded-2xl font-bold text-lg sm:text-xl md:text-2xl transition-all duration-300 transform hover:scale-105 ${
                  isRecording
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white shadow-2xl shadow-red-500/50'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-400/70'
                }`}
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  {isRecording ? (
                    <>
                      <MicOff className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 animate-pulse" />
                      <span>Stop Recording</span>
                    </>
                  ) : (
                    <>
                      <Mic className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 group-hover:scale-110 transition-transform" />
                      <span>Start Recording</span>
                    </>
                  )}
                </div>
              </button>
              
              {isRecording && (
                <p className="mt-4 text-sm sm:text-base text-cyan-400 animate-pulse">
                  Recording in progress... (8 seconds)
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Information Sections */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="container mx-auto max-w-7xl space-y-16 sm:space-y-20">
          
          {/* Why VoiceSOS? Section */}
          <div className="space-y-8 sm:space-y-10">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Why VoiceSOS?
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-slate-900/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20">
                <Phone className="h-10 w-10 sm:h-12 sm:w-12 text-cyan-400 mb-4" />
                <h4 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-3">Emergency Dispatch</h4>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Instantly alert nearby volunteers and emergency services with just your voice. No need to unlock your phone or dial numbers.
                </p>
              </div>
              
              <div className="bg-slate-900/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20">
                <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-cyan-400 mb-4" />
                <h4 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-3">Hands-Free Reporting</h4>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Perfect for situations where you can't use your hands. Ideal for elderly users or those with mobility challenges.
                </p>
              </div>
              
              <div className="bg-slate-900/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 md:col-span-2 lg:col-span-1">
                <Zap className="h-10 w-10 sm:h-12 sm:w-12 text-cyan-400 mb-4" />
                <h4 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-3">Instant Response</h4>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Get help faster than ever. Voice-activated assistance connects you with the nearest available volunteers immediately.
                </p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-6 sm:space-y-8">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                About the Project
              </span>
            </h3>
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-900/80 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-xl border border-cyan-500/20 shadow-lg">
                <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed text-center">
                  VoiceSOS is a revolutionary emergency assistance platform designed to provide instant help through voice activation. 
                  Our mission is to make emergency assistance accessible to everyone, especially the elderly and those who may find 
                  traditional methods challenging. By leveraging advanced AI voice recognition and real-time location services, 
                  VoiceSOS connects users in distress with nearby volunteers within seconds. Our vision is a world where help is 
                  always just a voice command away, ensuring safety and peace of mind for individuals and their loved ones.
                </p>
              </div>
            </div>
          </div>

          {/* Key Features Section */}
          <div className="space-y-8 sm:space-y-10">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Key Features
              </span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-2">
                <MapPin className="h-10 w-10 sm:h-12 sm:w-12 text-cyan-400 mb-4" />
                <h4 className="text-lg sm:text-xl font-bold text-cyan-400 mb-3">Geo-location Tagging</h4>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Automatically includes your precise location with every alert, ensuring volunteers can find you quickly.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-2">
                <Brain className="h-10 w-10 sm:h-12 sm:w-12 text-cyan-400 mb-4" />
                <h4 className="text-lg sm:text-xl font-bold text-cyan-400 mb-3">AI Transcription</h4>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Advanced AI-powered voice recognition converts your speech to text for quick understanding and processing.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-2">
                <Zap className="h-10 w-10 sm:h-12 sm:w-12 text-cyan-400 mb-4" />
                <h4 className="text-lg sm:text-xl font-bold text-cyan-400 mb-3">Instant Routing</h4>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Smart algorithm routes your request to the nearest available volunteers for the fastest response time.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-2">
                <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-cyan-400 mb-4" />
                <h4 className="text-lg sm:text-xl font-bold text-cyan-400 mb-3">Secure & Private</h4>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  End-to-end encryption ensures your personal information and audio recordings remain completely secure and private.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-slate-900 border-t border-cyan-500/20">
        <div className="container mx-auto max-w-7xl text-center">
          <p className="text-gray-400 text-sm sm:text-base">
            © 2024 VoiceSOS. Making help accessible, one voice at a time.
          </p>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={handleCloseLogin}
        >
          <div 
            className="relative w-full max-w-sm bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl shadow-2xl border border-cyan-500/30 p-5 sm:p-6 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseLogin}
              className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="text-center mb-5">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-2xl font-bold mb-1">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {showSignUp ? 'Create Account' : 'Welcome Back'}
                </span>
              </h2>
              <p className="text-gray-400 text-xs">
                {showSignUp ? 'Sign up for your VoiceSOS account' : 'Sign in to your VoiceSOS account'}
              </p>
            </div>

            {/* Login Form */}
            {!showSignUp ? (
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-cyan-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-xs font-medium text-gray-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-cyan-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="w-full pl-9 pr-10 py-2 text-sm bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 rounded border-cyan-500/30 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="ml-1.5 text-gray-300">Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors text-xs"
                  onClick={(e) => {
                    e.preventDefault();
                    // TODO: Implement forgot password functionality
                    alert('Forgot password functionality - API integration needed');
                  }}
                >
                  Forgot password?
                </a>
              </div>

              {/* Error Message */}
              {loginError && (
                <div className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs flex items-center">
                  <Shield className="h-3 w-3 mr-1.5" />
                  {loginError}
                </div>
              )}

              {/* Sign In with Email Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    <span>Sign In with Email</span>
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-slate-900 text-gray-400">Or continue with</span>
                </div>
              </div>

              {/* Google Sign In Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full py-2 px-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 border border-gray-300"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-400/30 border-t-gray-700 rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <GoogleIcon className="h-4 w-4" />
                    <span>Continue with Google</span>
                  </>
                )}
              </button>
            </form>
            ) : (
            /* Sign Up Form */
            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Email Field */}
              <div>
                <label htmlFor="signup-email" className="block text-xs font-medium text-gray-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-cyan-400" />
                  </div>
                  <input
                    type="email"
                    id="signup-email"
                    name="email"
                    value={signUpForm.email}
                    onChange={handleSignUpInputChange}
                    placeholder="your.email@example.com"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Phone Number Field */}
              <div>
                <label htmlFor="phoneNumber" className="block text-xs font-medium text-gray-300 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-cyan-400" />
                  </div>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={signUpForm.phoneNumber}
                    onChange={handleSignUpInputChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="signup-password" className="block text-xs font-medium text-gray-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-cyan-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="signup-password"
                    name="password"
                    value={signUpForm.password}
                    onChange={handleSignUpInputChange}
                    placeholder="Enter your password"
                    className="w-full pl-9 pr-10 py-2 text-sm bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-300 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-cyan-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={signUpForm.confirmPassword}
                    onChange={handleSignUpInputChange}
                    placeholder="Confirm your password"
                    className="w-full pl-9 pr-10 py-2 text-sm bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {signUpError && (
                <div className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs flex items-center">
                  <Shield className="h-3 w-3 mr-1.5" />
                  {signUpError}
                </div>
              )}

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <User className="h-4 w-4" />
                    <span>Create Account</span>
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-slate-900 text-gray-400">Or continue with</span>
                </div>
              </div>

              {/* Google Sign Up Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full py-2 px-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 border border-gray-300"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-400/30 border-t-gray-700 rounded-full animate-spin"></div>
                    <span>Signing up...</span>
                  </>
                ) : (
                  <>
                    <GoogleIcon className="h-4 w-4" />
                    <span>Continue with Google</span>
                  </>
                )}
              </button>
            </form>
            )}

            {/* Sign Up/Sign In Toggle Link */}
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-xs">
                {showSignUp ? "Already have an account? " : "Don't have an account? "}
                <a
                  href="#"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors text-xs"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowSignUp(!showSignUp);
                    setLoginError('');
                    setSignUpError('');
                  }}
                >
                  {showSignUp ? 'Sign in' : 'Sign up'}
                </a>
              </p>
            </div>

            {/* Security Note */}
            <div className="mt-4 p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <p className="text-xs text-gray-400 text-center flex items-center justify-center space-x-1">
                <Shield className="h-3 w-3 text-cyan-400" />
                <span>Your data is encrypted and secure</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
