import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecordingControls = ({
  isRecording,
  onStartRecording,
  onStopRecording,
  recordingTime,
  canRecord,
  isProcessing
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRecordingToggle = () => {
    if (isRecording) {
      onStopRecording();
    } else {
      onStartRecording();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      {/* Recording Timer */}
      {isRecording && (
        <div className="flex items-center space-x-3 bg-surface border border-border rounded-lg px-4 py-2">
          <div className="w-3 h-3 bg-error rounded-full animate-pulse-recording"></div>
          <span className="font-mono text-lg font-semibold text-text-primary">
            {formatTime(recordingTime)}
          </span>
          <span className="text-sm text-text-secondary">Recording</span>
        </div>
      )}

      {/* Main Recording Controls */}
      <div className="flex items-center justify-center space-x-8">
        {/* Settings Button */}
        <Button
          variant="ghost"
          size="lg"
          iconName="Settings"
          className="hidden md:flex"
          onClick={() => window.location.href = '/settings-preferences-dashboard'}
        >
          Settings
        </Button>

        {/* Main Record/Stop Button */}
        <div className="relative">
          <button
            onClick={handleRecordingToggle}
            disabled={!canRecord || isProcessing}
            className={`relative w-20 h-20 rounded-full border-4 transition-all duration-200 ${
              isRecording
                ? 'bg-error border-error-foreground hover:bg-error/90'
                : 'bg-primary border-primary-foreground hover:bg-primary/90'
            } ${
              !canRecord || isProcessing
                ? 'opacity-50 cursor-not-allowed' :'hover:scale-105 active:scale-95'
            }`}
            title={isRecording ? 'Stop Recording' : 'Start Recording'}
          >
            {isProcessing ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
            ) : (
              <Icon
                name={isRecording ? 'Square' : 'Circle'}
                size={32}
                color="white"
              />
            )}
          </button>

          {/* Recording pulse effect */}
          {isRecording && (
            <div className="absolute inset-0 rounded-full border-4 border-error animate-ping opacity-75"></div>
          )}
        </div>

        {/* Library Button */}
        <Button
          variant="ghost"
          size="lg"
          iconName="Video"
          className="hidden md:flex"
          onClick={() => window.location.href = '/video-library-playback-manager'}
        >
          Library
        </Button>
      </div>

      {/* Mobile Controls Row */}
      <div className="flex md:hidden items-center justify-center space-x-6">
        <Button
          variant="ghost"
          size="icon"
          iconName="Settings"
          onClick={() => window.location.href = '/settings-preferences-dashboard'}
        />
        <Button
          variant="ghost"
          size="icon"
          iconName="Video"
          onClick={() => window.location.href = '/video-library-playback-manager'}
        />
        <Button
          variant="ghost"
          size="icon"
          iconName="HelpCircle"
          onClick={() => window.location.href = '/help-tutorial-center'}
        />
      </div>

      {/* Status Messages */}
      <div className="text-center">
        {!canRecord && (
          <p className="text-sm text-warning">
            <Icon name="AlertTriangle" size={16} className="inline mr-1" />
            Camera access required to start recording
          </p>
        )}
        
        {isProcessing && (
          <p className="text-sm text-text-secondary">
            <Icon name="Loader2" size={16} className="inline mr-1 animate-spin" />
            Processing recording...
          </p>
        )}

        {canRecord && !isRecording && !isProcessing && (
          <div className="space-y-2">
            <p className="text-sm text-text-primary font-medium">
              Ready to record with face tracking
            </p>
            <div className="flex items-center justify-center space-x-4 text-xs text-text-secondary">
              <span className="flex items-center space-x-1">
                <Icon name="Camera" size={12} />
                <span>Camera Active</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Eye" size={12} />
                <span>Face Detection Ready</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Keyboard Shortcuts (Desktop) */}
      <div className="hidden lg:block text-center">
        <p className="text-xs text-text-secondary mb-2">Keyboard Shortcuts</p>
        <div className="flex items-center justify-center space-x-4 text-xs text-text-secondary">
          <span className="flex items-center space-x-1">
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Space</kbd>
            <span>Record/Stop</span>
          </span>
          <span className="flex items-center space-x-1">
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">F</kbd>
            <span>Flip Camera</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecordingControls;