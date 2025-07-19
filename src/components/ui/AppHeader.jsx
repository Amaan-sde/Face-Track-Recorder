import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import NavigationMenu from './NavigationMenu';
import RecordingStatusIndicator from './RecordingStatusIndicator';

const AppHeader = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigationItems = [
    {
      label: 'Record',
      path: '/camera-setup-recording-studio',
      icon: 'Camera',
      tooltip: 'Camera Setup & Recording Studio'
    },
    {
      label: 'Library',
      path: '/video-library-playback-manager',
      icon: 'Video',
      tooltip: 'Video Library & Playback Manager'
    },
    {
      label: 'Settings',
      path: '/settings-preferences-dashboard',
      icon: 'Settings',
      tooltip: 'Settings & Preferences Dashboard'
    },
    {
      label: 'Help',
      path: '/help-tutorial-center',
      icon: 'HelpCircle',
      tooltip: 'Help & Tutorial Center'
    }
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-header bg-surface border-b border-border shadow-subtle">
        <div className="flex items-center justify-between h-header-desktop lg:h-header-desktop md:h-header-mobile">
          {/* Logo Section */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation('/camera-setup-recording-studio')}
              className="flex items-center space-x-3 px-6 py-3 transition-hover hover:opacity-80"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="Camera" size={20} color="white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-text-primary">FaceTrack</h1>
                <p className="text-xs text-text-secondary -mt-1">Recorder</p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-hover ${
                  isActiveRoute(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
                title={item.tooltip}
              >
                <Icon name={item.icon} size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4 pr-6">
            {/* Recording Status Indicator */}
            <RecordingStatusIndicator />
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="md:hidden"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <NavigationMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigationItems={navigationItems}
        currentPath={location.pathname}
        onNavigate={handleNavigation}
      />
    </>
  );
};

export default AppHeader;