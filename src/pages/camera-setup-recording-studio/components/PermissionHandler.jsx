import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PermissionHandler = ({ onPermissionGranted, onPermissionDenied }) => {
  const [permissionState, setPermissionState] = useState('checking'); // checking, granted, denied, blocked
  const [errorMessage, setErrorMessage] = useState('');
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      setPermissionState('checking');
      setErrorMessage('');

      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setPermissionState('blocked');
        setErrorMessage('Camera access is not supported in this browser. Please use a modern browser like Chrome, Firefox, or Safari.');
        onPermissionDenied?.('Browser not supported');
        return;
      }

      // Check permission status
      const permissions = await Promise.all([
        navigator.permissions.query({ name: 'camera' }),
        navigator.permissions.query({ name: 'microphone' })
      ]);

      const cameraPermission = permissions[0];
      const micPermission = permissions[1];

      if (cameraPermission.state === 'denied' || micPermission.state === 'denied') {
        setPermissionState('blocked');
        setErrorMessage('Camera or microphone access has been blocked. Please enable permissions in your browser settings.');
        onPermissionDenied?.('Permissions blocked');
        return;
      }

      if (cameraPermission.state === 'granted' && micPermission.state === 'granted') {
        setPermissionState('granted');
        onPermissionGranted?.();
        return;
      }

      // If permissions are prompt state, we need to request them
      await requestPermissions();

    } catch (error) {
      console.error('Permission check failed:', error);
      setPermissionState('denied');
      setErrorMessage('Unable to check camera permissions. Please try again.');
      onPermissionDenied?.(error.message);
    }
  };

  const requestPermissions = async () => {
    try {
      setIsRetrying(true);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: true
      });

      // Stop the stream immediately as we just needed to get permission
      stream.getTracks().forEach(track => track.stop());

      setPermissionState('granted');
      onPermissionGranted?.();

    } catch (error) {
      console.error('Permission request failed:', error);
      
      if (error.name === 'NotAllowedError') {
        setPermissionState('denied');
        setErrorMessage('Camera access was denied. Please allow camera access and try again.');
      } else if (error.name === 'NotFoundError') {
        setPermissionState('blocked');
        setErrorMessage('No camera found. Please connect a camera and try again.');
      } else if (error.name === 'NotReadableError') {
        setPermissionState('blocked');
        setErrorMessage('Camera is already in use by another application. Please close other apps and try again.');
      } else {
        setPermissionState('denied');
        setErrorMessage('Failed to access camera. Please check your camera settings and try again.');
      }
      
      onPermissionDenied?.(error.message);
    } finally {
      setIsRetrying(false);
    }
  };

  const handleRetry = () => {
    checkPermissions();
  };

  const openBrowserSettings = () => {
    // Provide instructions for different browsers
    const userAgent = navigator.userAgent;
    let instructions = '';

    if (userAgent.includes('Chrome')) {
      instructions = 'Click the camera icon in the address bar, then select "Always allow" for camera and microphone.';
    } else if (userAgent.includes('Firefox')) {
      instructions = 'Click the shield icon in the address bar, then enable camera and microphone permissions.';
    } else if (userAgent.includes('Safari')) {
      instructions = 'Go to Safari > Preferences > Websites > Camera, then allow access for this site.';
    } else {
      instructions = 'Please check your browser settings to allow camera and microphone access for this site.';
    }

    alert(instructions);
  };

  if (permissionState === 'granted') {
    return null; // Don't render anything when permissions are granted
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-modal max-w-md w-full p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Icon 
              name={permissionState === 'checking' ? 'Loader2' : 'Camera'} 
              size={32} 
              color="var(--color-primary)"
              className={permissionState === 'checking' ? 'animate-spin' : ''}
            />
          </div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            {permissionState === 'checking' && 'Checking Camera Access'}
            {permissionState === 'denied' && 'Camera Access Required'}
            {permissionState === 'blocked' && 'Camera Access Blocked'}
          </h2>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {permissionState === 'checking' && (
            <p className="text-text-secondary text-center">
              Please wait while we check your camera and microphone permissions...
            </p>
          )}

          {permissionState === 'denied' && (
            <>
              <p className="text-text-secondary text-center">
                FaceTrack Recorder needs access to your camera and microphone to record videos with face tracking.
              </p>
              {errorMessage && (
                <div className="bg-warning/10 border border-warning/20 rounded-md p-3">
                  <p className="text-warning text-sm">{errorMessage}</p>
                </div>
              )}
            </>
          )}

          {permissionState === 'blocked' && (
            <>
              <p className="text-text-secondary text-center">
                Camera access has been blocked. Please enable permissions in your browser settings to continue.
              </p>
              {errorMessage && (
                <div className="bg-error/10 border border-error/20 rounded-md p-3">
                  <p className="text-error text-sm">{errorMessage}</p>
                </div>
              )}
            </>
          )}

          {/* Permission Benefits */}
          {(permissionState === 'denied' || permissionState === 'blocked') && (
            <div className="bg-muted rounded-md p-4">
              <h3 className="text-sm font-medium text-text-primary mb-2">Why we need these permissions:</h3>
              <ul className="space-y-1 text-xs text-text-secondary">
                <li className="flex items-center space-x-2">
                  <Icon name="Camera" size={12} />
                  <span>Camera access for video recording</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Mic" size={12} />
                  <span>Microphone access for audio recording</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Eye" size={12} />
                  <span>Real-time face tracking and detection</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-3 mt-6">
          {permissionState === 'denied' && (
            <Button
              onClick={handleRetry}
              loading={isRetrying}
              iconName="Camera"
              className="w-full"
            >
              Allow Camera Access
            </Button>
          )}

          {permissionState === 'blocked' && (
            <>
              <Button
                onClick={openBrowserSettings}
                iconName="Settings"
                className="w-full"
              >
                Open Browser Settings
              </Button>
              <Button
                variant="outline"
                onClick={handleRetry}
                loading={isRetrying}
                iconName="RefreshCw"
                className="w-full"
              >
                Try Again
              </Button>
            </>
          )}

          {/* Alternative Actions */}
          <div className="flex items-center justify-center space-x-4 text-sm">
            <button
              onClick={() => window.location.href = '/help-tutorial-center'}
              className="text-primary hover:text-primary/80 transition-hover"
            >
              Need Help?
            </button>
            <span className="text-text-secondary">•</span>
            <button
              onClick={() => window.location.href = '/video-library-playback-manager'}
              className="text-primary hover:text-primary/80 transition-hover"
            >
              View Library
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionHandler;