import React, { useState, useEffect } from 'react';
import AppHeader from '../../components/ui/AppHeader';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import SearchBar from './components/SearchBar';
import CategoryCard from './components/CategoryCard';
import ArticleCard from './components/ArticleCard';
import QuickStartGuide from './components/QuickStartGuide';
import FAQSection from './components/FAQSection';
import TroubleshootingGuide from './components/TroubleshootingGuide';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const HelpTutorialCenter = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const popularQueries = [
    "How to enable face tracking",
    "Camera not working",
    "Export video with tracking data",
    "Browser compatibility",
    "Storage space management",
    "Recording quality settings",
    "Face detection accuracy",
    "Mobile device support"
  ];

  const helpCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Learn the basics of face tracking video recording',
      icon: 'PlayCircle',
      articleCount: 8,
      color: 'bg-primary'
    },
    {
      id: 'technical-support',
      title: 'Technical Support',
      description: 'Troubleshoot common issues and technical problems',
      icon: 'Settings',
      articleCount: 12,
      color: 'bg-error'
    },
    {
      id: 'feature-guides',
      title: 'Feature Guides',
      description: 'Detailed explanations of all FaceTrack features',
      icon: 'BookOpen',
      articleCount: 15,
      color: 'bg-accent'
    },
    {
      id: 'best-practices',
      title: 'Best Practices',
      description: 'Tips for optimal face tracking and recording quality',
      icon: 'Star',
      articleCount: 6,
      color: 'bg-warning'
    },
    {
      id: 'privacy-security',
      title: 'Privacy & Security',
      description: 'Learn about data protection and privacy features',
      icon: 'Shield',
      articleCount: 4,
      color: 'bg-success'
    },
    {
      id: 'api-integration',
      title: 'API Integration',
      description: 'Developer resources for integrating face tracking',
      icon: 'Code',
      articleCount: 9,
      color: 'bg-secondary'
    }
  ];

  const featuredArticles = [
    {
      id: 1,
      title: "Complete Face Tracking Setup Guide",
      description: "Step-by-step tutorial for setting up face tracking with optimal camera positioning and lighting conditions for best results.",
      readTime: 5,
      difficulty: 'beginner',
      type: 'tutorial',
      isPopular: true,
      lastUpdated: 'Dec 15'
    },
    {
      id: 2,
      title: "Troubleshooting Camera Permission Issues",
      description: "Resolve common camera access problems across different browsers and operating systems with detailed solutions.",
      readTime: 3,
      difficulty: 'intermediate',
      type: 'troubleshooting',
      isPopular: true,
      lastUpdated: 'Dec 12'
    },
    {
      id: 3,
      title: "Optimizing Face Detection Accuracy",
      description: "Learn advanced techniques to improve face tracking precision including lighting setup and positioning tips.",
      readTime: 7,
      difficulty: 'advanced',
      type: 'guide',
      isPopular: false,
      lastUpdated: 'Dec 10'
    },
    {
      id: 4,
      title: "Exporting Videos with Tracking Data",
      description: "Comprehensive guide on exporting your recordings in various formats with embedded face tracking information.",
      readTime: 4,
      difficulty: 'intermediate',
      type: 'guide',
      isPopular: true,
      lastUpdated: 'Dec 8'
    },
    {
      id: 5,
      title: "Mobile Recording Best Practices",
      description: "Tips and techniques for achieving optimal face tracking performance on mobile devices and tablets.",
      readTime: 6,
      difficulty: 'beginner',
      type: 'tutorial',
      isPopular: false,
      lastUpdated: 'Dec 5'
    },
    {
      id: 6,
      title: "Privacy and Data Security FAQ",
      description: "Everything you need to know about how FaceTrack Recorder protects your privacy and handles your data.",
      readTime: 3,
      difficulty: 'beginner',
      type: 'faq',
      isPopular: true,
      lastUpdated: 'Dec 3'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Home' },
    { id: 'tutorials', label: 'Tutorials', icon: 'PlayCircle' },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: 'AlertCircle' },
    { id: 'faq', label: 'FAQ', icon: 'HelpCircle' }
  ];

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setActiveTab('tutorials');
  };

  const handleArticleSelect = (articleId) => {
    console.log('Opening article:', articleId);
    // In a real app, this would navigate to the article detail page
  };

  const filteredArticles = featuredArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    document.title = 'Help & Tutorial Center - FaceTrack Recorder';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbTrail />
          
          {/* Header Section */}
          <div className="text-center py-12 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl mb-8 border border-primary/10">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mx-auto mb-6">
                <Icon name="HelpCircle" size={32} color="white" />
              </div>
              <h1 className="text-4xl font-bold text-text-primary mb-4">
                Help & Tutorial Center
              </h1>
              <p className="text-xl text-text-secondary mb-8">
                Everything you need to master face tracking video recording
              </p>
              
              <SearchBar 
                onSearch={handleSearch}
                popularQueries={popularQueries}
              />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg transition-smooth ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={tab.icon} size={18} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content Sections */}
          <div className="pb-12">
            {activeTab === 'overview' && (
              <div className="space-y-12">
                {/* Quick Start Guide */}
                <QuickStartGuide />

                {/* Help Categories */}
                <div>
                  <h2 className="text-2xl font-bold text-text-primary mb-6">Browse by Category</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {helpCategories.map((category) => (
                      <CategoryCard
                        key={category.id}
                        category={category}
                        onCategorySelect={handleCategorySelect}
                      />
                    ))}
                  </div>
                </div>

                {/* Featured Articles */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-text-primary">Featured Articles</h2>
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab('tutorials')}
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      View All
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredArticles.slice(0, 6).map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        onArticleSelect={handleArticleSelect}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tutorials' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-text-primary">
                    {selectedCategory ? 'Category Articles' : 'All Tutorials & Guides'}
                  </h2>
                  {selectedCategory && (
                    <Button
                      variant="outline"
                      onClick={() => setSelectedCategory(null)}
                      iconName="X"
                      iconPosition="left"
                    >
                      Clear Filter
                    </Button>
                  )}
                </div>

                {searchTerm && (
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-text-secondary">
                      Showing results for: <span className="font-medium text-text-primary">"{searchTerm}"</span>
                    </p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  {filteredArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onArticleSelect={handleArticleSelect}
                    />
                  ))}
                </div>

                {filteredArticles.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="mx-auto text-text-secondary mb-4" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">No articles found</h3>
                    <p className="text-text-secondary">Try adjusting your search terms or browse by category.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'troubleshooting' && (
              <TroubleshootingGuide />
            )}

            {activeTab === 'faq' && (
              <FAQSection />
            )}
          </div>

          {/* Contact Support Section */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 text-center border border-primary/20">
            <Icon name="MessageCircle" size={48} className="mx-auto text-primary mb-4" />
            <h2 className="text-2xl font-bold text-text-primary mb-4">Still Need Help?</h2>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Our support team is here to help you get the most out of FaceTrack Recorder. 
              Reach out through any of these channels for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                iconName="Mail"
                iconPosition="left"
              >
                Email Support
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="MessageSquare"
                iconPosition="left"
              >
                Live Chat
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Users"
                iconPosition="left"
              >
                Community Forum
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpTutorialCenter;