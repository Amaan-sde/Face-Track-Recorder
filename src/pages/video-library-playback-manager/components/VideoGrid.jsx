import React from 'react';
import VideoCard from './VideoCard';

const VideoGrid = ({ 
  videos, 
  viewMode, 
  onPlay, 
  onDelete, 
  onRename, 
  onDownload, 
  onShare 
}) => {
  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {videos.map((video) => (
          <div key={video.id} className="bg-card rounded-lg p-4 shadow-subtle">
            <div className="flex items-center space-x-4">
              {/* Thumbnail */}
              <div className="w-32 h-18 bg-muted rounded overflow-hidden flex-shrink-0">
                <img
                  src={video.thumbnail}
                  alt={`Thumbnail for ${video.name}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Video Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-text-primary truncate">{video.name}</h3>
                <div className="flex items-center space-x-4 text-sm text-text-secondary mt-1">
                  <span>{new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  }).format(video.createdAt)}</span>
                  <span>{Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}</span>
                  <span>{(video.size / (1024 * 1024)).toFixed(1)} MB</span>
                  {video.hasFaceTracking && (
                    <span className="text-success">Face Tracked</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onPlay(video)}
                  className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          onPlay={onPlay}
          onDelete={onDelete}
          onRename={onRename}
          onDownload={onDownload}
          onShare={onShare}
        />
      ))}
    </div>
  );
};

export default VideoGrid;