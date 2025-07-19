import React, { useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationMenu = ({ isOpen, onClose, navigationItems, currentPath, onNavigate }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (isOpen && e.target.closest('.mobile-menu') === null && e.target.closest('[data-menu-trigger]') === null) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isActiveRoute = (path) => {
    return currentPath === path;
  };

  return (
    <div className="fixed inset-0 z-menu md:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Menu Panel */}
      <div className="mobile-menu absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-surface shadow-modal">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="Camera" size={20} color="white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-text-primary">FaceTrack</h2>
                <p className="text-xs text-text-secondary -mt-1">Recorder</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-6">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth ${
                    isActiveRoute(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs opacity-75">{item.tooltip}</div>
                  </div>
                  {isActiveRoute(item.path) && (
                    <Icon name="Check" size={16} />
                  )}
                </button>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-border">
            <div className="text-xs text-text-secondary text-center">
              FaceTrack Recorder v1.0
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;