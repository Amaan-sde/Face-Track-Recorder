import React, { useState, useEffect, useRef } from 'react';
import AppHeader from '../../components/ui/AppHeader';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import CameraViewport from './components/CameraViewport';
import RecordingControls from './components/RecordingControls';
import FaceTrackingEngine from './components/FaceTrackingEngine';
import RecordingStatusPanel from './components/RecordingStatusPanel';
import PermissionHandler from './components/PermissionHandler';

const CameraSetupRecordingStudio = () => {
  // Core recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Camera and permissions state
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  
  // Face tracking state
  const [faceDetections, setFaceDetections] = useState([]);
  const [trackingError, setTrackingError] = useState(null);
  
  // Recording metadata
  const [recordingQuality, setRecordingQuality] = useState('HD');
  const [estimatedFileSize, setEstimatedFileSize] = useState(0);
  const [storageUsed, setStorageUsed] = useState(0);
  
  // Refs for recording functionality
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const recordingTimerRef = useRef(null);

  // Initialize storage usage on component mount
  useEffect(() => {
    calculateStorageUsage();
  }, []);

  // Recording timer effect
  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          const newTime = prev + 1;
          updateEstimatedFileSize(newTime);
          return newTime;
        });
      }, 1000);
    } else {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
    }

    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [isRecording]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space' && hasPermission) {
        event.preventDefault();
        handleRecordingToggle();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRecording, hasPermission]);

  const calculateStorageUsage = () => {
    try {
      const recordings = JSON.parse(localStorage.getItem('facetrack_recordings') || '[]');
      const totalSize = recordings.reduce((sum, recording) => sum + (recording.size || 0), 0);
      setStorageUsed(totalSize);
    } catch (error) {
      console.error('Failed to calculate storage usage:', error);
    }
  };

  const updateEstimatedFileSize = (timeInSeconds) => {
    // Estimate file size based on recording quality and duration
    const bitrates = {
      'HD': 8000000, // 8 Mbps for HD
      'SD': 4000000, // 4 Mbps for SD
      'LOW': 2000000 // 2 Mbps for low quality
    };
    
    const bitrate = bitrates[recordingQuality] || bitrates['HD'];
    const estimatedBytes = (bitrate / 8) * timeInSeconds; // Convert bits to bytes
    setEstimatedFileSize(estimatedBytes);
  };

  const handlePermissionGranted = () => {
    setHasPermission(true);
    setCameraError(null);
  };

  const handlePermissionDenied = (error) => {
    setHasPermission(false);
    setCameraError(error);
  };

  const handleCameraReady = (stream) => {
    setCameraStream(stream);
    setCameraError(null);
  };

  const handleFaceDetection = (detections) => {
    setFaceDetections(detections);
    setTrackingError(null);
  };

  const handleTrackingError = (error) => {
    setTrackingError(error);
    console.error('Face tracking error:', error);
  };

  const handleRecordingToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = async () => {
    if (!cameraStream || !hasPermission) {
      console.error('Cannot start recording: no camera stream or permission');
      return;
    }

    try {
      setIsProcessing(true);
      recordedChunksRef.current = [];

      const options = {
        mimeType: 'video/webm;codecs=vp9,opus',
        videoBitsPerSecond: recordingQuality === 'HD' ? 8000000 : 
                           recordingQuality === 'SD' ? 4000000 : 2000000
      };

      mediaRecorderRef.current = new MediaRecorder(cameraStream, options);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        saveRecording();
      };

      mediaRecorderRef.current.start(1000); // Collect data every second
      setIsRecording(true);
      setRecordingTime(0);
      setIsProcessing(false);

    } catch (error) {
      console.error('Failed to start recording:', error);
      setIsProcessing(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      setIsProcessing(true);
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const saveRecording = async () => {
    try {
      const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      
      const recording = {
        id: `recording_${Date.now()}`,
        title: `Face Tracked Recording ${new Date().toLocaleDateString()}`,
        url: url,
        blob: blob,
        size: blob.size,
        duration: recordingTime,
        quality: recordingQuality,
        faceDetectionCount: faceDetections.length,
        timestamp: new Date().toISOString(),
        thumbnailTime: Math.floor(recordingTime / 2) // Middle of video for thumbnail
      };

      // Save to localStorage
      const existingRecordings = JSON.parse(localStorage.getItem('facetrack_recordings') || '[]');
      existingRecordings.unshift(recording);
      
      // Keep only last 50 recordings to prevent storage overflow
      const limitedRecordings = existingRecordings.slice(0, 50);
      localStorage.setItem('facetrack_recordings', JSON.stringify(limitedRecordings));

      // Update storage usage
      calculateStorageUsage();
      
      // Reset recording state
      setRecordingTime(0);
      setEstimatedFileSize(0);
      setIsProcessing(false);

      // Show success message (could be replaced with a toast notification)
      console.log('Recording saved successfully:', recording.title);

    } catch (error) {
      console.error('Failed to save recording:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbTrail />
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pb-8">
            {/* Camera and Controls - Main Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Camera Viewport */}
              <div className="bg-surface border border-border rounded-lg p-4">
                <div className="mb-4">
                  <h1 className="text-2xl font-bold text-text-primary">Camera Setup & Recording Studio</h1>
                  <p className="text-text-secondary">Record videos with real-time face tracking overlays</p>
                </div>
                
                <CameraViewport
                  isRecording={isRecording}
                  onCameraReady={handleCameraReady}
                  faceDetections={faceDetections}
                  cameraError={cameraError}
                  hasPermission={hasPermission}
                />
              </div>

              {/* Recording Controls */}
              <div className="bg-surface border border-border rounded-lg">
                <RecordingControls
                  isRecording={isRecording}
                  onStartRecording={startRecording}
                  onStopRecording={stopRecording}
                  recordingTime={recordingTime}
                  canRecord={hasPermission && cameraStream && !cameraError}
                  isProcessing={isProcessing}
                />
              </div>
            </div>

            {/* Status Panel - Sidebar */}
            <div className="lg:col-span-1">
              <RecordingStatusPanel
                isRecording={isRecording}
                recordingTime={recordingTime}
                faceDetections={faceDetections}
                recordingQuality={recordingQuality}
                storageUsed={storageUsed}
                estimatedFileSize={estimatedFileSize}
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-surface border border-border rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Getting Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold text-lg">1</span>
                </div>
                <h3 className="font-medium text-text-primary mb-2">Allow Camera Access</h3>
                <p className="text-sm text-text-secondary">Grant permission to access your camera and microphone for recording.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold text-lg">2</span>
                </div>
                <h3 className="font-medium text-text-primary mb-2">Position Your Face</h3>
                <p className="text-sm text-text-secondary">Look at the camera and wait for face detection to activate.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold text-lg">3</span>
                </div>
                <h3 className="font-medium text-text-primary mb-2">Start Recording</h3>
                <p className="text-sm text-text-secondary">Click the record button or press spacebar to begin recording.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Face Tracking Engine */}
      <FaceTrackingEngine
        videoStream={cameraStream}
        isActive={hasPermission && !cameraError}
        onFaceDetection={handleFaceDetection}
        onTrackingError={handleTrackingError}
      />

      {/* Permission Handler Modal */}
      {!hasPermission && (
        <PermissionHandler
          onPermissionGranted={handlePermissionGranted}
          onPermissionDenied={handlePermissionDenied}
        />
      )}
    </div>
  );
};

export default CameraSetupRecordingStudio;