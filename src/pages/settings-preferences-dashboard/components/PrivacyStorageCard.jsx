import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PrivacyStorageCard = ({ isExpanded, onToggle }) => {
  const [storageLimit, setStorageLimit] = useState('1gb');
  const [autoCleanup, setAutoCleanup] = useState(true);
  const [cleanupSchedule, setCleanupSchedule] = useState('weekly');
  const [dataEncryption, setDataEncryption] = useState(false);
  const [analyticsOptOut, setAnalyticsOptOut] = useState(false);
  const [storageUsed] = useState(245); // Mock storage usage in MB

  const storageLimitOptions = [
    { value: '500mb', label: '500 MB', description: 'Basic storage limit' },
    { value: '1gb', label: '1 GB', description: 'Standard storage limit' },
    { value: '2gb', label: '2 GB', description: 'Extended storage limit' },
    { value: 'unlimited', label: 'Unlimited', description: 'No storage limit' }
  ];

  const cleanupScheduleOptions = [
    { value: 'daily', label: 'Daily', description: 'Clean up old files daily' },
    { value: 'weekly', label: 'Weekly', description: 'Clean up old files weekly' },
    { value: 'monthly', label: 'Monthly', description: 'Clean up old files monthly' },
    { value: 'manual', label: 'Manual Only', description: 'Clean up manually only' }
  ];

  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to clear all stored data? This action cannot be undone.')) {
      localStorage.clear();
      console.log('All data cleared');
    }
  };

  const handleExportData = () => {
    const data = {
      settings: {
        storageLimit,
        autoCleanup,
        cleanupSchedule,
        dataEncryption,
        analyticsOptOut
      },
      exportDate: new Date().toISOString(),
      storageUsed: `${storageUsed}MB`
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'facetrack-data-export.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const getStoragePercentage = () => {
    const limitInMB = storageLimit === '500mb' ? 500 : 
                     storageLimit === '1gb' ? 1000 : 
                     storageLimit === '2gb' ? 2000 : 0;
    
    if (limitInMB === 0) return 0; // Unlimited
    return Math.min((storageUsed / limitInMB) * 100, 100);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left transition-hover hover:bg-muted/50"
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
            <Icon name="Shield" size={20} color="var(--color-warning)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Privacy & Storage</h3>
            <p className="text-sm text-text-secondary">Data management and privacy controls</p>
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
          {/* Storage Usage Display */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-text-primary">Storage Usage</h4>
              <span className="text-sm text-text-secondary">{storageUsed}MB used</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${getStoragePercentage()}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-text-secondary mt-1">
              <span>0MB</span>
              <span>{storageLimit === 'unlimited' ? 'Unlimited' : storageLimit.toUpperCase()}</span>
            </div>
          </div>

          {/* Storage Limit */}
          <div>
            <Select
              label="Storage Limit"
              description="Maximum amount of data to store locally"
              options={storageLimitOptions}
              value={storageLimit}
              onChange={setStorageLimit}
              className="mb-4"
            />
          </div>

          {/* Cleanup Schedule */}
          <div>
            <Select
              label="Auto Cleanup Schedule"
              description="How often to automatically clean up old files"
              options={cleanupScheduleOptions}
              value={cleanupSchedule}
              onChange={setCleanupSchedule}
              className="mb-4"
              disabled={!autoCleanup}
            />
          </div>

          {/* Privacy Options */}
          <div className="space-y-4">
            <Checkbox
              label="Enable Auto Cleanup"
              description="Automatically remove old recordings to free up space"
              checked={autoCleanup}
              onChange={(e) => setAutoCleanup(e.target.checked)}
            />
            
            <Checkbox
              label="Data Encryption"
              description="Encrypt stored videos and settings (may impact performance)"
              checked={dataEncryption}
              onChange={(e) => setDataEncryption(e.target.checked)}
            />

            <Checkbox
              label="Opt Out of Analytics"
              description="Disable usage analytics and error reporting"
              checked={analyticsOptOut}
              onChange={(e) => setAnalyticsOptOut(e.target.checked)}
            />
          </div>

          {/* Data Management Actions */}
          <div className="pt-4 border-t border-border space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={handleExportData}
                iconName="Download"
                iconPosition="left"
                className="flex-1"
              >
                Export Data
              </Button>
              
              <Button
                variant="destructive"
                onClick={handleClearAllData}
                iconName="Trash2"
                iconPosition="left"
                className="flex-1"
              >
                Clear All Data
              </Button>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} color="var(--color-primary)" />
              <div>
                <h4 className="text-sm font-medium text-primary mb-1">Privacy Notice</h4>
                <p className="text-xs text-text-secondary">
                  All recordings are stored locally in your browser. No data is sent to external servers unless explicitly exported by you.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyStorageCard;