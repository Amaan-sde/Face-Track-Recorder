import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const RecordingStatusIndicator = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [faceDetected, setFaceDetected] = useState(false);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setFaceDetected(Math.random() > 0.3); // Simulate face detection
    }
  };

  if (!isRecording && recordingTime === 0) {
    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={handleToggleRecording}
          className="flex items-center space-x-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-md transition-hover hover:bg-primary/90"
        >
          <Icon name="Circle" size={16} />
          <span className="text-sm font-medium hidden sm:inline">Record</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      {/* Recording Status */}
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-error animate-pulse-recording' : 'bg-muted'}`} />
        <div className="flex flex-col">
          <span className="text-xs font-mono text-text-primary">
            {formatTime(recordingTime)}
          </span>
          {isRecording && (
            <span className="text-xs text-text-secondary">
              {faceDetected ? 'Face Tracked' : 'No Face'}
            </span>
          )}
        </div>
      </div>

      {/* Face Detection Indicator */}
      {isRecording && (
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-md ${
          faceDetected ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
        }`}>
          <Icon 
            name={faceDetected ? 'Eye' : 'EyeOff'} 
            size={14} 
            color={faceDetected ? 'var(--color-success)' : 'var(--color-warning)'}
          />
          <span className="text-xs font-medium hidden sm:inline">
            {faceDetected ? 'Tracking' : 'Searching'}
          </span>
        </div>
      )}

      {/* Stop Recording Button */}
      {isRecording && (
        <button
          onClick={handleToggleRecording}
          className="flex items-center space-x-1 px-3 py-1.5 bg-error text-error-foreground rounded-md transition-hover hover:bg-error/90"
        >
          <Icon name="Square" size={14} />
          <span className="text-sm font-medium hidden sm:inline">Stop</span>
        </button>
      )}
    </div>
  );
};

export default RecordingStatusIndicator;