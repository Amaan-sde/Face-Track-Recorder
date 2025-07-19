import React, { useRef, useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const CameraViewport = ({ 
  isRecording, 
  onCameraReady, 
  faceDetections = [], 
  cameraError,
  hasPermission 
}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCamera, setCurrentCamera] = useState('user');

  useEffect(() => {
    initializeCamera();
    return () => {
      stopCamera();
    };
  }, [currentCamera]);

  useEffect(() => {
    if (faceDetections.length > 0 && canvasRef.current && videoRef.current) {
      drawFaceDetections();
    }
  }, [faceDetections]);

  const initializeCamera = async () => {
    try {
      setIsLoading(true);
      
      if (streamRef.current) {
        stopCamera();
      }

      const constraints = {
        video: {
          facingMode: currentCamera,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: true
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setIsLoading(false);
          onCameraReady(stream);
        };
      }
    } catch (error) {
      console.error('Camera initialization failed:', error);
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const drawFaceDetections = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    faceDetections.forEach((detection, index) => {
      const { x, y, width, height, confidence } = detection;
      
      // Draw bounding box
      ctx.strokeStyle = confidence > 0.8 ? '#10B981' : '#F59E0B';
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, width, height);
      
      // Draw confidence badge
      ctx.fillStyle = confidence > 0.8 ? '#10B981' : '#F59E0B';
      ctx.fillRect(x, y - 25, 80, 25);
      
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '12px Inter';
      ctx.fillText(`${Math.round(confidence * 100)}%`, x + 5, y - 8);
      
      // Draw face points if available
      if (detection.landmarks) {
        ctx.fillStyle = '#2563EB';
        detection.landmarks.forEach(point => {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
          ctx.fill();
        });
      }
    });
  };

  const toggleCamera = () => {
    setCurrentCamera(prev => prev === 'user' ? 'environment' : 'user');
  };

  if (cameraError) {
    return (
      <div className="relative w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center p-6">
          <Icon name="AlertCircle" size={48} color="var(--color-error)" className="mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">Camera Access Required</h3>
          <p className="text-text-secondary mb-4">
            Please allow camera access to start recording with face tracking.
          </p>
          <button
            onClick={initializeCamera}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-hover"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-secondary">Initializing camera...</p>
          </div>
        </div>
      )}

      {/* Video Element */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />

      {/* Face Detection Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ transform: currentCamera === 'user' ? 'scaleX(-1)' : 'none' }}
      />

      {/* Recording Indicator */}
      {isRecording && (
        <div className="absolute top-4 left-4 flex items-center space-x-2 bg-error/90 text-error-foreground px-3 py-1.5 rounded-md">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse-recording"></div>
          <span className="text-sm font-medium">REC</span>
        </div>
      )}

      {/* Face Detection Status */}
      {faceDetections.length > 0 && (
        <div className="absolute top-4 right-4 bg-success/90 text-success-foreground px-3 py-1.5 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="Eye" size={16} />
            <span className="text-sm font-medium">
              {faceDetections.length} Face{faceDetections.length !== 1 ? 's' : ''} Detected
            </span>
          </div>
        </div>
      )}

      {/* Camera Controls Overlay */}
      <div className="absolute bottom-4 right-4">
        <button
          onClick={toggleCamera}
          className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-hover"
          title="Flip Camera"
        >
          <Icon name="RotateCcw" size={20} />
        </button>
      </div>

      {/* Face Tracking Info */}
      {!isLoading && faceDetections.length === 0 && (
        <div className="absolute bottom-4 left-4 bg-warning/90 text-warning-foreground px-3 py-1.5 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="Search" size={16} />
            <span className="text-sm font-medium">Searching for faces...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraViewport;