import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import SearchAndSort from './components/SearchAndSort';
import VideoGrid from './components/VideoGrid';
import VideoPlayer from './components/VideoPlayer';
import StorageIndicator from './components/StorageIndicator';
import EmptyState from './components/EmptyState';
import RenameModal from './components/RenameModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const VideoLibraryPlaybackManager = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [renameModal, setRenameModal] = useState({ isOpen: false, video: null });
  const [storageInfo, setStorageInfo] = useState({
    used: 0,
    total: 5 * 1024 * 1024 * 1024 // 5GB mock limit
  });

  // Mock video data
  const mockVideos = [
    {
      id: 'vid_001',
      name: 'Morning Workout Session',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop',
      duration: 180,
      size: 45 * 1024 * 1024,
      resolution: '1920x1080',
      fps: 30,
      createdAt: new Date('2025-01-18T08:30:00'),
      hasFaceTracking: true
    },
    {
      id: 'vid_002',
      name: 'Product Demo Recording',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225&fit=crop',
      duration: 240,
      size: 62 * 1024 * 1024,
      resolution: '1920x1080',
      fps: 60,
      createdAt: new Date('2025-01-17T14:15:00'),
      hasFaceTracking: true
    },
    {
      id: 'vid_003',
      name: 'Team Meeting Highlights',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop',
      duration: 420,
      size: 89 * 1024 * 1024,
      resolution: '1280x720',
      fps: 30,
      createdAt: new Date('2025-01-16T10:45:00'),
      hasFaceTracking: false
    },
    {
      id: 'vid_004',
      name: 'Tutorial - Face Tracking Setup',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop',
      duration: 360,
      size: 78 * 1024 * 1024,
      resolution: '1920x1080',
      fps: 30,
      createdAt: new Date('2025-01-15T16:20:00'),
      hasFaceTracking: true
    },
    {
      id: 'vid_005',
      name: 'Quick Test Recording',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=225&fit=crop',
      duration: 45,
      size: 12 * 1024 * 1024,
      resolution: '1280x720',
      fps: 30,
      createdAt: new Date('2025-01-14T09:10:00'),
      hasFaceTracking: true
    },
    {
      id: 'vid_006',
      name: 'Presentation Recording',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop',
      duration: 600,
      size: 125 * 1024 * 1024,
      resolution: '1920x1080',
      fps: 30,
      createdAt: new Date('2025-01-13T13:30:00'),
      hasFaceTracking: false
    }
  ];

  useEffect(() => {
    // Load videos from localStorage or use mock data
    const savedVideos = localStorage.getItem('facetrack_videos');
    if (savedVideos) {
      try {
        const parsedVideos = JSON.parse(savedVideos);
        setVideos(parsedVideos.map(video => ({
          ...video,
          createdAt: new Date(video.createdAt)
        })));
      } catch (error) {
        console.error('Error loading videos:', error);
        setVideos(mockVideos);
      }
    } else {
      setVideos(mockVideos);
    }

    // Calculate storage usage
    const totalSize = mockVideos.reduce((sum, video) => sum + video.size, 0);
    setStorageInfo(prev => ({ ...prev, used: totalSize }));
  }, []);

  useEffect(() => {
    let filtered = [...videos];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(video =>
        video.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return a.createdAt - b.createdAt;
        case 'duration-long':
          return b.duration - a.duration;
        case 'duration-short':
          return a.duration - b.duration;
        case 'size-large':
          return b.size - a.size;
        case 'size-small':
          return a.size - b.size;
        case 'name-az':
          return a.name.localeCompare(b.name);
        case 'name-za':
          return b.name.localeCompare(a.name);
        case 'newest':
        default:
          return b.createdAt - a.createdAt;
      }
    });

    setFilteredVideos(filtered);
  }, [videos, searchQuery, sortBy]);

  const handlePlayVideo = (video) => {
    setSelectedVideo(video);
    setIsPlayerOpen(true);
  };

  const handleDeleteVideo = (video) => {
    if (window.confirm(`Are you sure you want to delete "${video.name}"?`)) {
      const updatedVideos = videos.filter(v => v.id !== video.id);
      setVideos(updatedVideos);
      localStorage.setItem('facetrack_videos', JSON.stringify(updatedVideos));
      
      // Update storage info
      const totalSize = updatedVideos.reduce((sum, v) => sum + v.size, 0);
      setStorageInfo(prev => ({ ...prev, used: totalSize }));
    }
  };

  const handleRenameVideo = (videoId, newName) => {
    const updatedVideos = videos.map(video =>
      video.id === videoId ? { ...video, name: newName } : video
    );
    setVideos(updatedVideos);
    localStorage.setItem('facetrack_videos', JSON.stringify(updatedVideos));
  };

  const handleDownloadVideo = (video) => {
    // Mock download functionality
    const link = document.createElement('a');
    link.href = video.url;
    link.download = `${video.name}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShareVideo = (video) => {
    if (navigator.share) {
      navigator.share({
        title: video.name,
        text: `Check out this face-tracked video: ${video.name}`,
        url: video.url
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(video.url);
      alert('Video URL copied to clipboard!');
    }
  };

  const handleStartRecording = () => {
    navigate('/camera-setup-recording-studio');
  };

  const handleStorageCleanup = () => {
    // Show cleanup suggestions
    const oldVideos = videos
      .filter(video => {
        const daysSinceCreated = (Date.now() - video.createdAt.getTime()) / (1000 * 60 * 60 * 24);
        return daysSinceCreated > 30;
      })
      .sort((a, b) => b.size - a.size);

    if (oldVideos.length > 0) {
      const message = `Found ${oldVideos.length} videos older than 30 days. Delete them to free up space?`;
      if (window.confirm(message)) {
        const updatedVideos = videos.filter(video => !oldVideos.includes(video));
        setVideos(updatedVideos);
        localStorage.setItem('facetrack_videos', JSON.stringify(updatedVideos));
        
        const totalSize = updatedVideos.reduce((sum, v) => sum + v.size, 0);
        setStorageInfo(prev => ({ ...prev, used: totalSize }));
      }
    } else {
      alert('No old videos found for cleanup.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <BreadcrumbTrail />

          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Video Library</h1>
              <p className="text-text-secondary mt-1">
                Manage and playback your face-tracked recordings
              </p>
            </div>
            <Button
              variant="default"
              onClick={handleStartRecording}
              iconName="Plus"
              iconPosition="left"
            >
              New Recording
            </Button>
          </div>

          {videos.length === 0 ? (
            <EmptyState onStartRecording={handleStartRecording} />
          ) : (
            <>
              {/* Search and Sort Controls */}
              <SearchAndSort
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                onClearSearch={() => setSearchQuery('')}
              />

              {/* Results Summary */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-text-secondary">
                  {filteredVideos.length === videos.length
                    ? `${videos.length} video${videos.length !== 1 ? 's' : ''}`
                    : `${filteredVideos.length} of ${videos.length} video${videos.length !== 1 ? 's' : ''}`
                  }
                </p>
                {searchQuery && filteredVideos.length === 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery('')}
                    iconName="X"
                    iconPosition="left"
                  >
                    Clear Search
                  </Button>
                )}
              </div>

              {/* Video Grid */}
              {filteredVideos.length > 0 ? (
                <VideoGrid
                  videos={filteredVideos}
                  viewMode={viewMode}
                  onPlay={handlePlayVideo}
                  onDelete={handleDeleteVideo}
                  onRename={(video) => setRenameModal({ isOpen: true, video })}
                  onDownload={handleDownloadVideo}
                  onShare={handleShareVideo}
                />
              ) : (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-text-primary mb-2">No videos found</h3>
                  <p className="text-text-secondary">
                    Try adjusting your search terms or filters
                  </p>
                </div>
              )}

              {/* Storage Indicator */}
              <div className="mt-8">
                <StorageIndicator
                  usedStorage={storageInfo.used}
                  totalStorage={storageInfo.total}
                  onCleanup={handleStorageCleanup}
                />
              </div>
            </>
          )}
        </div>
      </main>

      {/* Video Player Modal */}
      <VideoPlayer
        video={selectedVideo}
        isOpen={isPlayerOpen}
        onClose={() => {
          setIsPlayerOpen(false);
          setSelectedVideo(null);
        }}
      />

      {/* Rename Modal */}
      <RenameModal
        video={renameModal.video}
        isOpen={renameModal.isOpen}
        onClose={() => setRenameModal({ isOpen: false, video: null })}
        onRename={handleRenameVideo}
      />
    </div>
  );
};

export default VideoLibraryPlaybackManager;