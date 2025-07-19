import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const RecordingPreferencesCard = ({ isExpanded, onToggle }) => {
  const [videoFormat, setVideoFormat] = useState('mp4');
  const [qualityLevel, setQualityLevel] = useState('high');
  const [autoSave, setAutoSave] = useState(true);
  const [saveLocation, setSaveLocation] = useState('browser');
  const [maxDuration, setMaxDuration] = useState('30');
  const [includeAudio, setIncludeAudio] = useState(true);

  const formatOptions = [
    { value: 'mp4', label: 'MP4', description: 'Most compatible format' },
    { value: 'webm', label: 'WebM', description: 'Smaller file size, web optimized' },
    { value: 'mov', label: 'MOV', description: 'High quality, larger files' }
  ];

  const qualityOptions = [
    { value: 'low', label: 'Low Quality', description: 'Smaller files, faster processing' },
    { value: 'medium', label: 'Medium Quality', description: 'Balanced quality and size' },
    { value: 'high', label: 'High Quality', description: 'Best quality, larger files' },
    { value: 'ultra', label: 'Ultra Quality', description: 'Maximum quality, very large files' }
  ];

  const locationOptions = [
    { value: 'browser', label: 'Browser Storage', description: 'Store in browser localStorage' },
    { value: 'download', label: 'Auto Download', description: 'Automatically download files' }
  ];

  const durationOptions = [
    { value: '10', label: '10 minutes', description: 'Short recordings' },
    { value: '30', label: '30 minutes', description: 'Standard length' },
    { value: '60', label: '1 hour', description: 'Long recordings' },
    { value: 'unlimited', label: 'Unlimited', description: 'No time limit' }
  ];

  const handleExportSettings = () => {
    const settings = {
      videoFormat,
      qualityLevel,
      autoSave,
      saveLocation,
      maxDuration,
      includeAudio
    };
    
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'recording-preferences.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left transition-hover hover:bg-muted/50"
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
            <Icon name="Video" size={20} color="var(--color-success)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Recording Preferences</h3>
            <p className="text-sm text-text-secondary">Video format, quality, and save behavior</p>
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
          {/* Video Format */}
          <div>
            <Select
              label="Video Format"
              description="Choose the output format for recorded videos"
              options={formatOptions}
              value={videoFormat}
              onChange={setVideoFormat}
              className="mb-4"
            />
          </div>

          {/* Quality Level */}
          <div>
            <Select
              label="Quality Level"
              description="Balance between file size and video quality"
              options={qualityOptions}
              value={qualityLevel}
              onChange={setQualityLevel}
              className="mb-4"
            />
          </div>

          {/* Save Location */}
          <div>
            <Select
              label="Save Location"
              description="Where to store recorded videos"
              options={locationOptions}
              value={saveLocation}
              onChange={setSaveLocation}
              className="mb-4"
            />
          </div>

          {/* Max Duration */}
          <div>
            <Select
              label="Maximum Duration"
              description="Automatic stop recording after this time"
              options={durationOptions}
              value={maxDuration}
              onChange={setMaxDuration}
              className="mb-4"
            />
          </div>

          {/* Recording Options */}
          <div className="space-y-4">
            <Checkbox
              label="Auto Save"
              description="Automatically save recordings when stopped"
              checked={autoSave}
              onChange={(e) => setAutoSave(e.target.checked)}
            />
            
            <Checkbox
              label="Include Audio"
              description="Record audio along with video"
              checked={includeAudio}
              onChange={(e) => setIncludeAudio(e.target.checked)}
            />
          </div>

          {/* Export Settings */}
          <div className="pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleExportSettings}
              iconName="Download"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Export Settings
            </Button>
          </div>

          {/* Storage Usage Info */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-text-primary mb-2">Estimated Storage Usage</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-secondary">
              <div>Format: {videoFormat.toUpperCase()}</div>
              <div>Quality: {qualityLevel}</div>
              <div>Audio: {includeAudio ? 'Included' : 'Video Only'}</div>
              <div>Est. Size: ~{qualityLevel === 'low' ? '5' : qualityLevel === 'medium' ? '15' : qualityLevel === 'high' ? '30' : '60'}MB/min</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordingPreferencesCard;