import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ArticleCard = ({ article, onArticleSelect }) => {
  const { id, title, description, readTime, difficulty, type, isPopular, lastUpdated } = article;

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'beginner': return 'bg-success/10 text-success';
      case 'intermediate': return 'bg-warning/10 text-warning';
      case 'advanced': return 'bg-error/10 text-error';
      default: return 'bg-muted text-text-secondary';
    }
  };

  const getTypeIcon = (articleType) => {
    switch (articleType) {
      case 'tutorial': return 'PlayCircle';
      case 'guide': return 'BookOpen';
      case 'troubleshooting': return 'AlertCircle';
      case 'faq': return 'HelpCircle';
      default: return 'FileText';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name={getTypeIcon(type)} size={16} className="text-primary" />
          <span className="text-xs font-medium text-primary capitalize">{type}</span>
          {isPopular && (
            <span className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full">
              Popular
            </span>
          )}
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(difficulty)}`}>
          {difficulty}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">{title}</h3>
      <p className="text-text-secondary text-sm mb-4 line-clamp-3">{description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>{readTime} min read</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={12} />
            <span>Updated {lastUpdated}</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onArticleSelect(id)}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Read
        </Button>
      </div>
    </div>
  );
};

export default ArticleCard;