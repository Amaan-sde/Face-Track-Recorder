# 🎥 FaceTrack Recorder

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/facetrack-recorder)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF.svg)](https://vitejs.dev/)

Advanced Face Tracking Recording Application built with React and Vite. Real-time face detection, recording capabilities, and comprehensive video management system.

## ✨ Features

- 🎯 **Real-time Face Tracking** - Advanced face detection and tracking algorithms
- 📹 **HD Video Recording** - High-quality video capture with face tracking overlay
- 📚 **Video Library Management** - Organize, search, and manage recorded videos
- ⚙️ **Camera Configuration** - Customize camera settings and recording preferences
- 🎛️ **Settings Dashboard** - Comprehensive preferences and configuration panel
- 📖 **Help & Tutorials** - Built-in documentation and troubleshooting guides
- 🔒 **Privacy-First** - All processing happens locally, no data leaves your device

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Modern browser with camera support
- HTTPS connection for camera access

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/facetrack-recorder.git
cd facetrack-recorder

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the application.

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_NAME=FaceTrack Recorder
VITE_CAMERA_DEFAULT_RESOLUTION=1920x1080
VITE_ENABLE_FACE_TRACKING=true
VITE_MAX_RECORDING_DURATION=600
VITE_STORAGE_QUOTA_MB=1000
```

## 📦 Deployment

### Deploy to Vercel

1. **Connect Repository**: Connect your GitHub repository to Vercel
2. **Environment Variables**: Set up environment variables in Vercel dashboard
3. **Deploy**: Vercel will automatically build and deploy your application

The `vercel.json` configuration includes:
- SPA routing support
- Camera permissions headers
- Build optimization settings

### Manual Deployment

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy the dist/ folder to your hosting provider
```

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Project Structure

```
src/
├── components/                    # Reusable UI components
│   ├── ui/                       # Base UI components
│   └── ErrorBoundary.jsx         # Error boundary wrapper
├── pages/                        # Page components
│   ├── camera-setup-recording-studio/
│   ├── video-library-playback-manager/
│   ├── help-tutorial-center/
│   └── settings-preferences-dashboard/
├── styles/                       # Global styles
├── utils/                        # Utility functions
└── Routes.jsx                    # Application routing
```

### Key Technologies

- **React 18** - Modern React with hooks and concurrent features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **MediaDevices API** - Camera and microphone access

## 🎯 Usage

1. **Camera Setup**: Configure your camera and grant permissions
2. **Face Tracking**: Enable real-time face detection
3. **Recording**: Start recording with face tracking overlay
4. **Library**: View, organize, and manage your recordings
5. **Settings**: Customize preferences and advanced options

## 🔧 Camera Requirements

- **Resolution**: 720p minimum, 1080p recommended
- **Frame Rate**: 30fps minimum for smooth tracking
- **Browser Support**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Permissions**: Camera and microphone access required

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Camera Not Working
- Ensure HTTPS connection
- Check browser permissions
- Verify camera is not in use by other applications

### Performance Issues
- Use Chrome for best performance
- Close other camera applications
- Reduce recording resolution in settings

### Storage Issues
- Clear browser cache and data
- Check available disk space
- Adjust storage quota in settings

## 📞 Support

- 📖 [Documentation](docs/)
- 🐛 [Report Issues](https://github.com/yourusername/facetrack-recorder/issues)
- 💬 [Discussions](https://github.com/yourusername/facetrack-recorder/discussions)

## 🙏 Acknowledgments

- MediaDevices API for camera access
- TensorFlow.js for face detection algorithms
- React community for excellent ecosystem
- Contributors and testers
