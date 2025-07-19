import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const BreadcrumbTrail = ({ customBreadcrumbs = null }) => {
  const location = useLocation();
  
  const routeMap = {
    '/camera-setup-recording-studio': {
      label: 'Record',
      icon: 'Camera'
    },
    '/video-library-playback-manager': {
      label: 'Library',
      icon: 'Video'
    },
    '/settings-preferences-dashboard': {
      label: 'Settings',
      icon: 'Settings'
    },
    '/help-tutorial-center': {
      label: 'Help',
      icon: 'HelpCircle'
    }
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      {
        label: 'Home',
        path: '/camera-setup-recording-studio',
        icon: 'Home'
      }
    ];

    if (pathSegments.length > 0) {
      const currentPath = `/${pathSegments.join('/')}`;
      const routeInfo = routeMap[currentPath];
      
      if (routeInfo && currentPath !== '/camera-setup-recording-studio') {
        breadcrumbs.push({
          label: routeInfo.label,
          path: currentPath,
          icon: routeInfo.icon
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on home page or if only one item
  if (breadcrumbs.length <= 1 && location.pathname === '/camera-setup-recording-studio') {
    return null;
  }

  const handleNavigation = (path) => {
    if (path) {
      window.location.href = path;
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="flex items-center space-x-4 py-4">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleBack}
        className="flex items-center space-x-1"
      >
        <Icon name="ArrowLeft" size={16} />
        <span className="hidden sm:inline">Back</span>
      </Button>

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.path || index}>
            {index > 0 && (
              <Icon name="ChevronRight" size={14} color="var(--color-text-secondary)" />
            )}
            
            {index === breadcrumbs.length - 1 ? (
              // Current page - not clickable
              <div className="flex items-center space-x-1 text-text-primary font-medium">
                <Icon name={crumb.icon} size={14} />
                <span>{crumb.label}</span>
              </div>
            ) : (
              // Clickable breadcrumb
              <button
                onClick={() => handleNavigation(crumb.path)}
                className="flex items-center space-x-1 text-text-secondary hover:text-text-primary transition-hover"
              >
                <Icon name={crumb.icon} size={14} />
                <span>{crumb.label}</span>
              </button>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};

export default BreadcrumbTrail;