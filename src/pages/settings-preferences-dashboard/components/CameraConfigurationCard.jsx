import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const CameraConfigurationCard = ({ isExpanded, onToggle }) => {
  const [selectedResolution, setSelectedResolution] = useState('720p');
  const [selectedFrameRate, setSelectedFrameRate] = useState('30');
  const [selectedCamera, setSelectedCamera] = useState('default');
  const [autoFocus, setAutoFocus] = useState(true);
  const [mirrorMode, setMirrorMode] = useState(false);

  const resolutionOptions = [
    { value: '480p', label: '480p (640x480)', description: 'Standard quality, lower bandwidth' },
    { value: '720p', label: '720p (1280x720)', description: 'HD quality, balanced performance' },
    { value: '1080p', label: '1080p (1920x1080)', description: 'Full HD, higher bandwidth' }
  ];

  const frameRateOptions = [
    { value: '15', label: '15 FPS', description: 'Lower quality, better performance' },
    { value: '24', label: '24 FPS', description: 'Cinematic quality' },
    { value: '30', label: '30 FPS', description: 'Standard quality' },
    { value: '60', label: '60 FPS', description: 'Smooth motion, high performance needed' }
  ];

  const cameraOptions = [
    { value: 'default', label: 'Default Camera', description: 'System default camera' },
    { value: 'front', label: 'Front Camera', description: 'Built-in front-facing camera' },
    { value: 'back', label: 'Back Camera', description: 'Built-in rear-facing camera' },
    { value: 'external', label: 'External Camera', description: 'USB or wireless camera' }
  ];

  const handleTestCamera = () => {
    // Mock camera test functionality
    console.log('Testing camera with settings:', {
      resolution: selectedResolution,
      frameRate: selectedFrameRate,
      camera: selectedCamera
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left transition-hover hover:bg-muted/50"
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Camera" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Camera Configuration</h3>
            <p className="text-sm text-text-secondary">Resolution, frame rate, and camera selection</p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          color="var(--color-text-secondary)" 
        />
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 space-y-6">
          {/* Resolution Selection */}
          <div>
            <Select
              label="Video Resolution"
              description="Higher resolution provides better quality but requires more bandwidth"
              options={resolutionOptions}
              value={selectedResolution}
              onChange={setSelectedResolution}
              className="mb-4"
            />
          </div>

          {/* Frame Rate Selection */}
          <div>
            <Select
              label="Frame Rate"
              description="Higher frame rates provide smoother motion"
              options={frameRateOptions}
              value={selectedFrameRate}
              onChange={setSelectedFrameRate}
              className="mb-4"
            />
          </div>

          {/* Camera Selection */}
          <div>
            <Select
              label="Camera Device"
              description="Select which camera to use for recording"
              options={cameraOptions}
              value={selectedCamera}
              onChange={setSelectedCamera}
              className="mb-4"
            />
          </div>

          {/* Camera Options */}
          <div className="space-y-4">
            <Checkbox
              label="Auto Focus"
              description="Automatically adjust focus during recording"
              checked={autoFocus}
              onChange={(e) => setAutoFocus(e.target.checked)}
            />
            
            <Checkbox
              label="Mirror Mode"
              description="Flip video horizontally (useful for front camera)"
              checked={mirrorMode}
              onChange={(e) => setMirrorMode(e.target.checked)}
            />
          </div>

          {/* Test Camera Button */}
          <div className="pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleTestCamera}
              iconName="Play"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Test Camera Settings
            </Button>
          </div>

          {/* Current Settings Summary */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-text-primary mb-2">Current Configuration</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-secondary">
              <div>Resolution: {selectedResolution}</div>
              <div>Frame Rate: {selectedFrameRate} FPS</div>
              <div>Camera: {cameraOptions.find(c => c.value === selectedCamera)?.label}</div>
              <div>Auto Focus: {autoFocus ? 'Enabled' : 'Disabled'}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraConfigurationCard;