import React from 'react';
import Icon from '../../../components/AppIcon';

const RecordingStatusPanel = ({
  isRecording,
  recordingTime,
  faceDetections,
  recordingQuality,
  storageUsed,
  estimatedFileSize
}) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getQualityColor = (quality) => {
    switch (quality) {
      case 'HD': return 'text-success';
      case 'SD': return 'text-warning';
      case 'LOW': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getFaceTrackingStatus = () => {
    if (faceDetections.length === 0) {
      return {
        status: 'Searching',
        color: 'text-warning',
        icon: 'Search'
      };
    } else if (faceDetections.length === 1) {
      return {
        status: 'Tracking',
        color: 'text-success',
        icon: 'Eye'
      };
    } else {
      return {
        status: `${faceDetections.length} Faces`,
        color: 'text-success',
        icon: 'Users'
      };
    }
  };

  const trackingStatus = getFaceTrackingStatus();

  return (
    <div className="bg-surface border border-border rounded-lg p-4 space-y-4">
      {/* Recording Status Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Recording Status</h3>
        <div className={`flex items-center space-x-1 ${isRecording ? 'text-error' : 'text-text-secondary'}`}>
          <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-error animate-pulse-recording' : 'bg-muted'}`}></div>
          <span className="text-xs font-medium">
            {isRecording ? 'RECORDING' : 'READY'}
          </span>
        </div>
      </div>

      {/* Status Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Recording Time */}
        <div className="space-y-1">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} color="var(--color-text-secondary)" />
            <span className="text-xs text-text-secondary">Duration</span>
          </div>
          <p className="font-mono text-lg font-semibold text-text-primary">
            {formatTime(recordingTime)}
          </p>
        </div>

        {/* Face Tracking */}
        <div className="space-y-1">
          <div className="flex items-center space-x-1">
            <Icon name={trackingStatus.icon} size={14} color="var(--color-text-secondary)" />
            <span className="text-xs text-text-secondary">Face Tracking</span>
          </div>
          <p className={`text-sm font-medium ${trackingStatus.color}`}>
            {trackingStatus.status}
          </p>
        </div>

        {/* Recording Quality */}
        <div className="space-y-1">
          <div className="flex items-center space-x-1">
            <Icon name="Monitor" size={14} color="var(--color-text-secondary)" />
            <span className="text-xs text-text-secondary">Quality</span>
          </div>
          <p className={`text-sm font-medium ${getQualityColor(recordingQuality)}`}>
            {recordingQuality || 'HD'}
          </p>
        </div>

        {/* File Size */}
        <div className="space-y-1">
          <div className="flex items-center space-x-1">
            <Icon name="HardDrive" size={14} color="var(--color-text-secondary)" />
            <span className="text-xs text-text-secondary">File Size</span>
          </div>
          <p className="text-sm font-medium text-text-primary">
            {formatFileSize(estimatedFileSize || 0)}
          </p>
        </div>
      </div>

      {/* Face Detection Details */}
      {faceDetections.length > 0 && (
        <div className="border-t border-border pt-3">
          <h4 className="text-xs font-medium text-text-secondary mb-2">Face Detection Details</h4>
          <div className="space-y-2">
            {faceDetections.slice(0, 3).map((face, index) => (
              <div key={face.id || index} className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">Face {index + 1}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-text-primary font-medium">
                    {Math.round(face.confidence * 100)}%
                  </span>
                  <div className={`w-2 h-2 rounded-full ${
                    face.confidence > 0.8 ? 'bg-success' : 'bg-warning'
                  }`}></div>
                </div>
              </div>
            ))}
            {faceDetections.length > 3 && (
              <p className="text-xs text-text-secondary">
                +{faceDetections.length - 3} more faces detected
              </p>
            )}
          </div>
        </div>
      )}

      {/* Storage Information */}
      <div className="border-t border-border pt-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-secondary">Local Storage Used</span>
          <span className="text-text-primary font-medium">
            {formatFileSize(storageUsed || 0)} / 2 GB
          </span>
        </div>
        <div className="mt-2 w-full bg-muted rounded-full h-1.5">
          <div 
            className="bg-primary h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((storageUsed || 0) / (2 * 1024 * 1024 * 1024) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t border-border pt-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-secondary">Quick Actions</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.location.href = '/video-library-playback-manager'}
              className="text-xs text-primary hover:text-primary/80 transition-hover"
            >
              View Library
            </button>
            <span className="text-text-secondary">•</span>
            <button
              onClick={() => window.location.href = '/settings-preferences-dashboard'}
              className="text-xs text-primary hover:text-primary/80 transition-hover"
            >
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordingStatusPanel;