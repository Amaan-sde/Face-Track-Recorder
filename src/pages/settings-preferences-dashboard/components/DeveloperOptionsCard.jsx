import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const DeveloperOptionsCard = ({ isExpanded, onToggle }) => {
  const [debugMode, setDebugMode] = useState(false);
  const [performanceMonitoring, setPerformanceMonitoring] = useState(false);
  const [apiEndpoint, setApiEndpoint] = useState('https://api.facetrack.dev');
  const [logLevel, setLogLevel] = useState('info');
  const [enableExperimentalFeatures, setEnableExperimentalFeatures] = useState(false);
  const [maxLogEntries, setMaxLogEntries] = useState('1000');

  const logLevelOptions = [
    { value: 'error', label: 'Error Only', description: 'Log only errors' },
    { value: 'warn', label: 'Warnings', description: 'Log warnings and errors' },
    { value: 'info', label: 'Info', description: 'Log general information' },
    { value: 'debug', label: 'Debug', description: 'Log detailed debug information' },
    { value: 'verbose', label: 'Verbose', description: 'Log everything (may impact performance)' }
  ];

  const handleExportLogs = () => {
    const mockLogs = [
      { timestamp: '2025-07-19T12:09:22.972Z', level: 'info', message: 'Face tracking initialized' },
      { timestamp: '2025-07-19T12:09:23.145Z', level: 'debug', message: 'Camera stream started' },
      { timestamp: '2025-07-19T12:09:24.332Z', level: 'info', message: 'Face detected with confidence 0.89' },
      { timestamp: '2025-07-19T12:09:25.567Z', level: 'warn', message: 'Frame rate dropped below 24fps' },
      { timestamp: '2025-07-19T12:09:26.789Z', level: 'info', message: 'Recording started' }
    ];

    const logData = {
      exportDate: new Date().toISOString(),
      logLevel,
      totalEntries: mockLogs.length,
      logs: mockLogs
    };
    
    const dataStr = JSON.stringify(logData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'facetrack-debug-logs.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleClearLogs = () => {
    if (window.confirm('Are you sure you want to clear all debug logs?')) {
      console.log('Debug logs cleared');
    }
  };

  const handleTestAPI = () => {
    console.log('Testing API connection to:', apiEndpoint);
    // Mock API test
    setTimeout(() => {
      alert('API connection test completed. Check console for details.');
    }, 1000);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left transition-hover hover:bg-muted/50"
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-destructive/10 rounded-lg">
            <Icon name="Code" size={20} color="var(--color-destructive)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Developer Options</h3>
            <p className="text-sm text-text-secondary">Advanced settings for debugging and development</p>
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
          {/* Warning Banner */}
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={16} color="var(--color-destructive)" />
              <div>
                <h4 className="text-sm font-medium text-destructive mb-1">Developer Mode</h4>
                <p className="text-xs text-text-secondary">
                  These settings are intended for developers and may affect application performance or stability.
                </p>
              </div>
            </div>
          </div>

          {/* API Configuration */}
          <div>
            <Input
              label="API Endpoint"
              type="url"
              description="Base URL for face tracking API calls"
              value={apiEndpoint}
              onChange={(e) => setApiEndpoint(e.target.value)}
              placeholder="https://api.facetrack.dev"
              className="mb-4"
            />
          </div>

          {/* Log Level */}
          <div>
            <Select
              label="Log Level"
              description="Set the verbosity of debug logging"
              options={logLevelOptions}
              value={logLevel}
              onChange={setLogLevel}
              className="mb-4"
            />
          </div>

          {/* Max Log Entries */}
          <div>
            <Input
              label="Max Log Entries"
              type="number"
              description="Maximum number of log entries to keep in memory"
              value={maxLogEntries}
              onChange={(e) => setMaxLogEntries(e.target.value)}
              min="100"
              max="10000"
              className="mb-4"
            />
          </div>

          {/* Developer Options */}
          <div className="space-y-4">
            <Checkbox
              label="Debug Mode"
              description="Enable detailed debugging information in console"
              checked={debugMode}
              onChange={(e) => setDebugMode(e.target.checked)}
            />
            
            <Checkbox
              label="Performance Monitoring"
              description="Track and log performance metrics"
              checked={performanceMonitoring}
              onChange={(e) => setPerformanceMonitoring(e.target.checked)}
            />

            <Checkbox
              label="Experimental Features"
              description="Enable experimental and unstable features"
              checked={enableExperimentalFeatures}
              onChange={(e) => setEnableExperimentalFeatures(e.target.checked)}
            />
          </div>

          {/* Developer Actions */}
          <div className="pt-4 border-t border-border space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleTestAPI}
                iconName="Zap"
                iconPosition="left"
              >
                Test API
              </Button>
              
              <Button
                variant="outline"
                onClick={handleExportLogs}
                iconName="Download"
                iconPosition="left"
              >
                Export Logs
              </Button>
            </div>
            
            <Button
              variant="destructive"
              onClick={handleClearLogs}
              iconName="Trash2"
              iconPosition="left"
              className="w-full"
            >
              Clear Debug Logs
            </Button>
          </div>

          {/* Current Status */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-text-primary mb-2">Current Status</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-secondary">
              <div>Debug Mode: {debugMode ? 'Enabled' : 'Disabled'}</div>
              <div>Log Level: {logLevel.toUpperCase()}</div>
              <div>Performance Monitoring: {performanceMonitoring ? 'Active' : 'Inactive'}</div>
              <div>Experimental Features: {enableExperimentalFeatures ? 'Enabled' : 'Disabled'}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperOptionsCard;