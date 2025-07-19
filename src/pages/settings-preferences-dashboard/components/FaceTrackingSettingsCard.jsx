import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FaceTrackingSettingsCard = ({ isExpanded, onToggle }) => {
  const [sensitivity, setSensitivity] = useState(75);
  const [confidence, setConfidence] = useState(80);
  const [overlayStyle, setOverlayStyle] = useState('modern');
  const [showLandmarks, setShowLandmarks] = useState(true);
  const [trackMultipleFaces, setTrackMultipleFaces] = useState(false);
  const [smoothTracking, setSmoothTracking] = useState(true);

  const overlayStyleOptions = [
    { value: 'modern', label: 'Modern', description: 'Clean lines with rounded corners' },
    { value: 'classic', label: 'Classic', description: 'Traditional rectangular overlay' },
    { value: 'minimal', label: 'Minimal', description: 'Subtle dots and lines' },
    { value: 'cyberpunk', label: 'Cyberpunk', description: 'Futuristic neon style' }
  ];

  const handleSensitivityChange = (e) => {
    setSensitivity(parseInt(e.target.value));
  };

  const handleConfidenceChange = (e) => {
    setConfidence(parseInt(e.target.value));
  };

  const handlePreviewOverlay = () => {
    console.log('Previewing overlay with settings:', {
      sensitivity,
      confidence,
      overlayStyle,
      showLandmarks,
      trackMultipleFaces
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left transition-hover hover:bg-muted/50"
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="Eye" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Face Tracking Settings</h3>
            <p className="text-sm text-text-secondary">Detection sensitivity and overlay customization</p>
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
          {/* Sensitivity Slider */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Detection Sensitivity: {sensitivity}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={sensitivity}
              onChange={handleSensitivityChange}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-text-secondary mt-1">
              <span>Less Sensitive</span>
              <span>More Sensitive</span>
            </div>
            <p className="text-xs text-text-secondary mt-2">
              Higher sensitivity detects faces more easily but may cause false positives
            </p>
          </div>

          {/* Confidence Threshold */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Confidence Threshold: {confidence}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={confidence}
              onChange={handleConfidenceChange}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-text-secondary mt-1">
              <span>Lower Confidence</span>
              <span>Higher Confidence</span>
            </div>
            <p className="text-xs text-text-secondary mt-2">
              Minimum confidence level required to display face tracking overlay
            </p>
          </div>

          {/* Overlay Style Selection */}
          <div>
            <Select
              label="Overlay Style"
              description="Choose the visual style for face tracking overlays"
              options={overlayStyleOptions}
              value={overlayStyle}
              onChange={setOverlayStyle}
              className="mb-4"
            />
          </div>

          {/* Tracking Options */}
          <div className="space-y-4">
            <Checkbox
              label="Show Facial Landmarks"
              description="Display detailed points for eyes, nose, and mouth"
              checked={showLandmarks}
              onChange={(e) => setShowLandmarks(e.target.checked)}
            />
            
            <Checkbox
              label="Track Multiple Faces"
              description="Detect and track multiple faces simultaneously"
              checked={trackMultipleFaces}
              onChange={(e) => setTrackMultipleFaces(e.target.checked)}
            />

            <Checkbox
              label="Smooth Tracking"
              description="Apply smoothing to reduce jittery movements"
              checked={smoothTracking}
              onChange={(e) => setSmoothTracking(e.target.checked)}
            />
          </div>

          {/* Preview Button */}
          <div className="pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handlePreviewOverlay}
              iconName="Eye"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Preview Overlay Style
            </Button>
          </div>

          {/* Performance Impact Warning */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
              <div>
                <h4 className="text-sm font-medium text-warning mb-1">Performance Impact</h4>
                <p className="text-xs text-text-secondary">
                  Higher sensitivity and multiple face tracking may impact performance on slower devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaceTrackingSettingsCard;