import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ onStartRecording }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Video" size={48} className="text-text-secondary" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-text-primary mb-3">
          No Videos Yet
        </h2>

        {/* Description */}
        <p className="text-text-secondary mb-8 leading-relaxed">
          Start recording your first face-tracked video to see it appear here. 
          All your recordings will be saved locally and accessible anytime.
        </p>

        {/* Action Button */}
        <Button
          variant="default"
          size="lg"
          onClick={onStartRecording}
          iconName="Camera"
          iconPosition="left"
          className="mb-6"
        >
          Start Recording
        </Button>

        {/* Features List */}
        <div className="space-y-3 text-sm text-text-secondary">
          <div className="flex items-center space-x-2">
            <Icon name="Eye" size={16} className="text-success" />
            <span>Real-time face tracking</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Download" size={16} className="text-primary" />
            <span>Download and share videos</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="HardDrive" size={16} className="text-secondary" />
            <span>Local storage - no cloud needed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;