import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StorageIndicator = ({ usedStorage, totalStorage, onCleanup }) => {
  const usagePercentage = (usedStorage / totalStorage) * 100;
  const isNearLimit = usagePercentage > 80;
  const isCritical = usagePercentage > 95;

  const formatStorage = (bytes) => {
    const gb = bytes / (1024 * 1024 * 1024);
    if (gb >= 1) {
      return `${gb.toFixed(1)} GB`;
    }
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(0)} MB`;
  };

  const getStorageColor = () => {
    if (isCritical) return 'bg-error';
    if (isNearLimit) return 'bg-warning';
    return 'bg-success';
  };

  const getTextColor = () => {
    if (isCritical) return 'text-error';
    if (isNearLimit) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="bg-card rounded-lg p-4 shadow-subtle">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="HardDrive" size={20} className="text-text-secondary" />
          <h3 className="font-medium text-text-primary">Storage Usage</h3>
        </div>
        {isNearLimit && (
          <Button
            variant="outline"
            size="sm"
            onClick={onCleanup}
            iconName="Trash2"
            iconPosition="left"
          >
            Cleanup
          </Button>
        )}
      </div>

      {/* Storage Bar */}
      <div className="w-full bg-muted rounded-full h-3 mb-2">
        <div 
          className={`h-full rounded-full transition-all duration-300 ${getStorageColor()}`}
          style={{ width: `${Math.min(usagePercentage, 100)}%` }}
        />
      </div>

      {/* Storage Details */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-text-secondary">
          {formatStorage(usedStorage)} of {formatStorage(totalStorage)} used
        </span>
        <span className={`font-medium ${getTextColor()}`}>
          {usagePercentage.toFixed(1)}%
        </span>
      </div>

      {/* Warning Messages */}
      {isNearLimit && (
        <div className={`mt-3 p-3 rounded-lg ${isCritical ? 'bg-error/10' : 'bg-warning/10'}`}>
          <div className="flex items-start space-x-2">
            <Icon 
              name={isCritical ? "AlertTriangle" : "AlertCircle"} 
              size={16} 
              className={isCritical ? 'text-error mt-0.5' : 'text-warning mt-0.5'}
            />
            <div className="flex-1">
              <p className={`text-sm font-medium ${isCritical ? 'text-error' : 'text-warning'}`}>
                {isCritical ? 'Storage Almost Full' : 'Storage Running Low'}
              </p>
              <p className="text-xs text-text-secondary mt-1">
                {isCritical 
                  ? 'Delete some videos to free up space for new recordings.'
                  : 'Consider removing old videos to maintain optimal performance.'
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Storage Tips */}
      {!isNearLimit && (
        <div className="mt-3 text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Info" size={12} />
            <span>Videos are stored locally in your browser</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StorageIndicator;