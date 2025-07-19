import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RenameModal = ({ video, isOpen, onClose, onRename }) => {
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && video) {
      setNewName(video.name);
      setError('');
    }
  }, [isOpen, video]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newName.trim()) {
      setError('Video name cannot be empty');
      return;
    }

    if (newName.trim() === video.name) {
      onClose();
      return;
    }

    onRename(video.id, newName.trim());
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card rounded-lg shadow-modal w-full max-w-md mx-4">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Rename Video</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Input
                label="Video Name"
                type="text"
                value={newName}
                onChange={(e) => {
                  setNewName(e.target.value);
                  setError('');
                }}
                onKeyDown={handleKeyDown}
                error={error}
                placeholder="Enter video name"
                autoFocus
                required
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                disabled={!newName.trim() || newName.trim() === video?.name}
              >
                Rename
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RenameModal;