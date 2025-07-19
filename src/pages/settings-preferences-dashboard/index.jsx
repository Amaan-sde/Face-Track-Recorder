import React, { useState, useEffect } from 'react';
import AppHeader from '../../components/ui/AppHeader';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import SettingsHeader from './components/SettingsHeader';
import CameraConfigurationCard from './components/CameraConfigurationCard';
import FaceTrackingSettingsCard from './components/FaceTrackingSettingsCard';
import RecordingPreferencesCard from './components/RecordingPreferencesCard';
import PrivacyStorageCard from './components/PrivacyStorageCard';
import DeveloperOptionsCard from './components/DeveloperOptionsCard';

const SettingsPreferencesDashboard = () => {
  const [expandedCards, setExpandedCards] = useState({
    camera: true,
    faceTracking: false,
    recording: false,
    privacy: false,
    developer: false
  });

  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('facetrack-settings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        console.log('Loaded settings:', settings);
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  const toggleCard = (cardName) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardName]: !prev[cardName]
    }));
  };

  const handleSaveSettings = () => {
    // Mock save functionality
    const currentSettings = {
      camera: {
        resolution: '720p',
        frameRate: '30',
        autoFocus: true,
        mirrorMode: false
      },
      faceTracking: {
        sensitivity: 75,
        confidence: 80,
        overlayStyle: 'modern',
        showLandmarks: true,
        trackMultipleFaces: false
      },
      recording: {
        videoFormat: 'mp4',
        qualityLevel: 'high',
        autoSave: true,
        includeAudio: true
      },
      privacy: {
        storageLimit: '1gb',
        autoCleanup: true,
        dataEncryption: false
      },
      developer: {
        debugMode: false,
        performanceMonitoring: false,
        logLevel: 'info'
      },
      lastSaved: new Date().toISOString()
    };

    try {
      localStorage.setItem('facetrack-settings', JSON.stringify(currentSettings));
      setSaveStatus('Settings saved successfully!');
      
      setTimeout(() => {
        setSaveStatus('');
      }, 3000);
    } catch (error) {
      setSaveStatus('Error saving settings. Please try again.');
      console.error('Error saving settings:', error);
    }
  };

  const handleResetToDefaults = () => {
    // Clear saved settings and reset to defaults
    localStorage.removeItem('facetrack-settings');
    setSaveStatus('Settings reset to defaults');
    
    // Reset expanded cards to default state
    setExpandedCards({
      camera: true,
      faceTracking: false,
      recording: false,
      privacy: false,
      developer: false
    });

    setTimeout(() => {
      setSaveStatus('');
    }, 3000);
  };

  const customBreadcrumbs = [
    {
      label: 'Home',
      path: '/camera-setup-recording-studio',
      icon: 'Home'
    },
    {
      label: 'Settings',
      path: '/settings-preferences-dashboard',
      icon: 'Settings'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="pt-20 lg:pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb Navigation */}
          <BreadcrumbTrail customBreadcrumbs={customBreadcrumbs} />

          {/* Settings Header */}
          <SettingsHeader 
            onResetToDefaults={handleResetToDefaults}
            onSaveSettings={handleSaveSettings}
          />

          {/* Save Status Message */}
          {saveStatus && (
            <div className={`mb-6 p-4 rounded-lg border ${
              saveStatus.includes('Error') 
                ? 'bg-destructive/10 border-destructive/20 text-destructive' :'bg-success/10 border-success/20 text-success'
            }`}>
              <div className="flex items-center space-x-2">
                <div className="text-sm font-medium">{saveStatus}</div>
              </div>
            </div>
          )}

          {/* Settings Cards */}
          <div className="space-y-6">
            {/* Camera Configuration */}
            <CameraConfigurationCard
              isExpanded={expandedCards.camera}
              onToggle={() => toggleCard('camera')}
            />

            {/* Face Tracking Settings */}
            <FaceTrackingSettingsCard
              isExpanded={expandedCards.faceTracking}
              onToggle={() => toggleCard('faceTracking')}
            />

            {/* Recording Preferences */}
            <RecordingPreferencesCard
              isExpanded={expandedCards.recording}
              onToggle={() => toggleCard('recording')}
            />

            {/* Privacy & Storage */}
            <PrivacyStorageCard
              isExpanded={expandedCards.privacy}
              onToggle={() => toggleCard('privacy')}
            />

            {/* Developer Options */}
            <DeveloperOptionsCard
              isExpanded={expandedCards.developer}
              onToggle={() => toggleCard('developer')}
            />
          </div>

          {/* Footer Actions */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="text-center">
              <p className="text-sm text-text-secondary mb-4">
                Settings are automatically saved to your browser's local storage
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => window.location.href = '/help-tutorial-center'}
                  className="text-sm text-primary hover:text-primary/80 transition-hover"
                >
                  Need help with settings? Visit our Help Center
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPreferencesDashboard;