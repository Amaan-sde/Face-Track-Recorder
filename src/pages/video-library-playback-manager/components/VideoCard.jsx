import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VideoCard = ({ video, onPlay, onDelete, onRename, onDownload, onShare }) => {
  const [showActions, setShowActions] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleLongPress = () => {
    setShowActions(true);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowActions(true);
  };

  return (
    <div 
      className="relative bg-card rounded-lg overflow-hidden shadow-subtle hover:shadow-elevated transition-all duration-200 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onContextMenu={handleContextMenu}
    >
      {/* Video Thumbnail */}
      <div className="relative aspect-video bg-muted">
        <Image
          src={video.thumbnail}
          alt={`Video thumbnail for ${video.name}`}
          className="w-full h-full object-cover"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="default"
            size="icon"
            onClick={() => onPlay(video)}
            className="w-12 h-12 rounded-full bg-white/90 text-primary hover:bg-white"
          >
            <Icon name="Play" size={24} />
          </Button>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-mono">
          {formatDuration(video.duration)}
        </div>

        {/* Face Tracking Indicator */}
        {video.hasFaceTracking && (
          <div className="absolute top-2 left-2 bg-success/90 text-success-foreground px-2 py-1 rounded text-xs flex items-center space-x-1">
            <Icon name="Eye" size={12} />
            <span>Tracked</span>
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="p-4">
        <h3 className="font-medium text-text-primary truncate mb-1">{video.name}</h3>
        <div className="space-y-1 text-xs text-text-secondary">
          <div className="flex items-center justify-between">
            <span>{formatDate(video.createdAt)}</span>
            <span>{formatFileSize(video.size)}</span>
          </div>
          {isHovered && (
            <div className="flex items-center space-x-2 pt-1">
              <div className="flex items-center space-x-1">
                <Icon name="Camera" size={12} />
                <span>{video.resolution}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={12} />
                <span>{video.fps} fps</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Menu */}
      {showActions && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
          <div className="bg-card rounded-lg p-4 shadow-modal min-w-48">
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onPlay(video);
                  setShowActions(false);
                }}
                className="w-full justify-start"
                iconName="Play"
                iconPosition="left"
              >
                Play Video
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onRename(video);
                  setShowActions(false);
                }}
                className="w-full justify-start"
                iconName="Edit"
                iconPosition="left"
              >
                Rename
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onDownload(video);
                  setShowActions(false);
                }}
                className="w-full justify-start"
                iconName="Download"
                iconPosition="left"
              >
                Download
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onShare(video);
                  setShowActions(false);
                }}
                className="w-full justify-start"
                iconName="Share"
                iconPosition="left"
              >
                Share
              </Button>
              <hr className="my-2 border-border" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onDelete(video);
                  setShowActions(false);
                }}
                className="w-full justify-start text-error hover:text-error"
                iconName="Trash2"
                iconPosition="left"
              >
                Delete
              </Button>
            </div>
            <div className="mt-4 pt-2 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowActions(false)}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;