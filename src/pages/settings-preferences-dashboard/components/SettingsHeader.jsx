import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SettingsHeader = ({ onResetToDefaults, onSaveSettings }) => {
  const handleResetConfirmation = () => {
    if (window.confirm('Are you sure you want to reset all settings to their default values? This action cannot be undone.')) {
      onResetToDefaults();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        {/* Header Content */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
            <Icon name="Settings" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Settings & Preferences</h1>
            <p className="text-text-secondary">
              Configure face tracking, recording, and application preferences
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={handleResetConfirmation}
            iconName="RotateCcw"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Reset to Defaults
          </Button>
          
          <Button
            variant="default"
            onClick={onSaveSettings}
            iconName="Save"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Save Settings
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center sm:text-left">
            <div className="text-lg font-semibold text-text-primary">6</div>
            <div className="text-sm text-text-secondary">Setting Categories</div>
          </div>
          <div className="text-center sm:text-left">
            <div className="text-lg font-semibold text-text-primary">Last Saved</div>
            <div className="text-sm text-text-secondary">July 19, 2025 12:09 PM</div>
          </div>
          <div className="text-center sm:text-left">
            <div className="text-lg font-semibold text-text-primary">Auto-Save</div>
            <div className="text-sm text-success">Enabled</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsHeader;