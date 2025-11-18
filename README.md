# VoiceSOS 🚨

VoiceSOS is a revolutionary emergency assistance platform designed to provide instant help through voice activation. The platform enables users to request emergency assistance by simply saying "Help me", automatically recording their message, and sending it along with their location to nearby volunteers.

## 🌟 Features

### For Users
- **Voice Activation**: Automatically starts recording when you say "Help me"
- **Smart Recording**: Records until 15 seconds of silence or 30 seconds maximum (whichever comes first)
- **Automatic Geolocation**: Captures and sends your precise location with every emergency request
- **Hands-Free Operation**: Perfect for situations where you can't use your hands
- **Real-Time Processing**: Instant notification to volunteers

### For Volunteers
- **Volunteer Dashboard**: Dedicated dashboard to view and respond to emergency requests
- **Real-Time Notifications**: Receive emergency alerts with audio recordings and location data
- **Location Integration**: View emergency locations with Google Maps integration
- **Audio Playback**: Listen to emergency recordings directly in the dashboard
- **Mock Call System**: Respond to emergencies with a mock call button

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.8
- **Styling**: Tailwind CSS 3.3.6
- **Icons**: Lucide React
- **3D Graphics**: Three.js (for GridScan background effect)
- **Voice Recognition**: Web Speech API (with Gemini Live API support)
- **Audio Processing**: Web Audio API
- **Geolocation**: Browser Geolocation API

## 📦 Installation

1. **Clone the repository** (or navigate to the project directory)
   ```bash
   cd VoiceSOS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API keys** (see Configuration section below)

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## ⚙️ Configuration

### API Keys Setup

Open `config.js` and add your API keys:

```javascript
export const API_CONFIG = {
  // Gemini Live API Key (Optional)
  // Get your API key from: https://aistudio.google.com/app/apikey
  GEMINI_API_KEY: 'your-gemini-api-key-here',
  
  // Other API keys can be added here
  // GOOGLE_MAPS_API_KEY: '',
  // BACKEND_API_URL: '',
};

### Volunteer Credentials

The volunteer login credentials are configured in `config.js`:

```javascript
export const VOLUNTEER_CREDENTIALS = {
  email: 'volunteer@gmail.com',
  password: '12345678'
};
```

## 🚀 Usage

### For Regular Users

1. **Login**: Click the "Login" button and sign in with your credentials
2. **Voice Activation**: The app automatically starts listening for "Help me" after login
3. **Say "Help me"**: When you need help, simply say "Help me" clearly
4. **Recording**: The app will automatically start recording
5. **Auto-Stop**: Recording stops after 15 seconds of silence or 30 seconds maximum
6. **Notification Sent**: Your recording and location are automatically sent to volunteers

### For Volunteers

1. **Login**: Use the volunteer credentials:
   - Email: `volunteer@gmail.com`
   - Password: `12345678`
2. **Dashboard**: You'll be redirected to the Volunteer Dashboard
3. **View Notifications**: See all emergency requests in the notifications section
4. **Listen to Audio**: Play the emergency recording
5. **View Location**: See the emergency location with Google Maps link
6. **Respond**: Click "Mock Call" to respond to the emergency

## 📁 Project Structure

```
VoiceSOS/
├── App.jsx                 # Main application component
├── VolunteerDashboard.jsx  # Volunteer dashboard component
├── GridScan.jsx           # 3D grid scan background effect
├── config.js              # API keys and configuration
├── main.jsx               # React entry point
├── index.html             # HTML template
├── index.css              # Global styles
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md              # This file
```

## 🎯 Key Features Explained

### Voice Activation System
- Uses Web Speech API for voice recognition (Chrome/Edge)
- Supports Gemini Live API for enhanced recognition (optional)
- Continuously listens for the "Help me" trigger phrase
- Automatically starts recording when phrase is detected

### Smart Recording System
- **Silence Detection**: Uses Web Audio API to detect audio levels
- **15-Second Silence Rule**: Stops recording after 15 seconds of continuous silence
- **30-Second Maximum**: Hard limit of 30 seconds maximum recording time
- **Whichever Comes First**: Recording stops when either condition is met

### Geolocation Integration
- Automatically requests location permission
- Captures precise coordinates (latitude/longitude)
- Generates Google Maps link for easy navigation
- Includes location data in emergency notifications

### Volunteer Dashboard
- Real-time notification updates via localStorage
- Profile section with volunteer statistics
- Audio playback for emergency recordings
- Location display with map integration
- Mock call functionality for response tracking

## 🌐 Browser Compatibility

- **Chrome/Edge**: Full support (Web Speech API available)
- **Firefox**: Limited support (Web Speech API not available)
- **Safari**: Limited support (Web Speech API not available)

**Recommendation**: Use Chrome or Edge for the best experience.

## 🔒 Permissions Required

The app requires the following browser permissions:

1. **Microphone**: For voice recognition and recording
2. **Location**: For geolocation services

These permissions are requested automatically when needed.

## 🚧 Future Improvements

- [ ] Backend API integration for real-time notifications
- [ ] WebSocket support for instant updates
- [ ] User authentication system
- [ ] Database integration for persistent storage
- [ ] Push notifications for volunteers
- [ ] Multi-language support
- [ ] Enhanced transcription with AI
- [ ] Real call functionality integration
- [ ] Mobile app version

## 📝 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🤝 Contributing

This is a project for emergency assistance. Contributions are welcome! Please ensure that any changes maintain the core functionality and security of the platform.

## 📄 License

This project is private and proprietary.

## 🆘 Support

For issues or questions, please refer to the project documentation or contact the development team.

---

**VoiceSOS** - Making help accessible, one voice at a time. 🎤✨
