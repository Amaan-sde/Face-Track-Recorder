import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchAndSort = ({ 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  onClearSearch 
}) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'duration-long', label: 'Longest Duration' },
    { value: 'duration-short', label: 'Shortest Duration' },
    { value: 'size-large', label: 'Largest File' },
    { value: 'size-small', label: 'Smallest File' },
    { value: 'name-az', label: 'Name A-Z' },
    { value: 'name-za', label: 'Name Z-A' }
  ];

  const viewModeOptions = [
    { value: 'grid', label: 'Grid View', icon: 'Grid3X3' },
    { value: 'list', label: 'List View', icon: 'List' }
  ];

  return (
    <div className="bg-card rounded-lg p-4 shadow-subtle mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search Section */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search videos by name..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
              >
                <Icon name="X" size={14} />
              </Button>
            )}
          </div>
        </div>

        {/* Controls Section */}
        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <div className="min-w-48">
            <Select
              placeholder="Sort by..."
              options={sortOptions}
              value={sortBy}
              onChange={onSortChange}
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            {viewModeOptions.map((option) => (
              <Button
                key={option.value}
                variant={viewMode === option.value ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange(option.value)}
                className="px-3"
                iconName={option.icon}
                iconPosition="left"
              >
                <span className="hidden sm:inline">{option.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchQuery || sortBy !== 'newest') && (
        <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-text-secondary">Active filters:</span>
          
          {searchQuery && (
            <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded text-sm">
              <Icon name="Search" size={12} />
              <span>"{searchQuery}"</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClearSearch}
                className="h-4 w-4 ml-1"
              >
                <Icon name="X" size={10} />
              </Button>
            </div>
          )}
          
          {sortBy !== 'newest' && (
            <div className="flex items-center space-x-1 bg-secondary/10 text-secondary px-2 py-1 rounded text-sm">
              <Icon name="ArrowUpDown" size={12} />
              <span>{sortOptions.find(opt => opt.value === sortBy)?.label}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndSort;