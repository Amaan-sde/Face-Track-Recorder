import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategoryCard = ({ category, onCategorySelect }) => {
  const { id, title, description, icon, articleCount, color } = category;

  return (
    <div className="bg-surface border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
      <div className="flex items-start space-x-4">
        <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${color}`}>
          <Icon name={icon} size={24} color="white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
          <p className="text-text-secondary text-sm mb-4 line-clamp-2">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary">
              {articleCount} {articleCount === 1 ? 'article' : 'articles'}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCategorySelect(id)}
              iconName="ArrowRight"
              iconPosition="right"
            >
              Explore
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;