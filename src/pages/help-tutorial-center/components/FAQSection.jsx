import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FAQSection = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [helpfulVotes, setHelpfulVotes] = useState({});

  const faqData = [
    {
      id: 1,
      question: "Why isn\'t face tracking working on my device?",
      answer: `Face tracking requires a modern browser with WebRTC support and sufficient processing power. Here are common solutions:\n\n• Ensure you're using Chrome 88+, Firefox 85+, or Safari 14+\n• Check that camera permissions are granted\n• Close other applications using your camera\n• Ensure adequate lighting on your face\n• Try refreshing the page and allowing camera access again\n\nIf issues persist, your device may not meet the minimum requirements for real-time face detection.`,
      category: "Technical",
      popularity: 95
    },
    {
      id: 2,
      question: "How much storage space do recorded videos use?",
      answer: `Video storage depends on recording quality and duration:\n\n• 720p HD: ~50MB per minute\n• 1080p Full HD: ~100MB per minute\n• Face tracking data adds ~5MB per minute\n\nVideos are stored in your browser's local storage with a 5GB limit. You can manage storage in Settings > Storage Management. Consider downloading important videos to free up space.`,
      category: "Storage",
      popularity: 87
    },
    {
      id: 3,
      question: "Can I use FaceTrack Recorder on mobile devices?",
      answer: `Yes! FaceTrack Recorder works on mobile browsers with some limitations:\n\n• iOS Safari 14+ and Android Chrome 88+ supported\n• Face tracking may be less accurate on older devices\n• Battery usage is higher during recording\n• Portrait orientation recommended for best results\n\nFor optimal performance, use a device with at least 4GB RAM and ensure good lighting conditions.`,
      category: "Compatibility",
      popularity: 82
    },
    {
      id: 4,
      question: "How accurate is the face tracking feature?",
      answer: `Face tracking accuracy depends on several factors:\n\n• Lighting conditions (well-lit faces track better)\n• Face angle (frontal view works best)\n• Device processing power\n• Camera quality\n\nTypical accuracy rates:\n• Optimal conditions: 95-98%\n• Good conditions: 85-95%\n• Poor lighting/angle: 60-85%\n\nThe system continuously improves tracking as you record.`,
      category: "Features",
      popularity: 78
    },
    {
      id: 5,
      question: "Can I export videos with face tracking data?",
      answer: `Yes, you can export videos in multiple formats:\n\n• MP4 with embedded face tracking overlays\n• MP4 without overlays (clean video)\n• JSON file with tracking data coordinates\n• WebM format for web optimization\n\nExport options are available in the Video Library under each recording's menu. Face tracking data can be used in other applications that support the standard format.`,
      category: "Export",
      popularity: 71
    },
    {
      id: 6,
      question: "Is my video data secure and private?",
      answer: `Your privacy is our priority:\n\n• All processing happens locally in your browser\n• No video data is sent to external servers\n• Face tracking runs entirely on your device\n• Videos are stored only in your browser's local storage\n• You control all data - delete anytime\n\nWe don't collect, store, or transmit any of your video content. Everything stays on your device unless you choose to share or download.`,
      category: "Privacy",
      popularity: 89
    }
  ];

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const markHelpful = (id, helpful) => {
    setHelpfulVotes(prev => ({
      ...prev,
      [id]: helpful
    }));
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Technical': 'bg-error/10 text-error',
      'Storage': 'bg-warning/10 text-warning',
      'Compatibility': 'bg-primary/10 text-primary',
      'Features': 'bg-accent/10 text-accent',
      'Export': 'bg-success/10 text-success',
      'Privacy': 'bg-secondary/10 text-secondary'
    };
    return colors[category] || 'bg-muted text-text-secondary';
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Frequently Asked Questions</h2>
        <p className="text-text-secondary">Quick answers to common questions about FaceTrack Recorder</p>
      </div>

      <div className="space-y-4">
        {faqData.map((faq) => (
          <div key={faq.id} className="bg-surface border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full px-6 py-4 text-left hover:bg-muted transition-smooth"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(faq.category)}`}>
                      {faq.category}
                    </span>
                    <div className="flex items-center space-x-1 text-xs text-text-secondary">
                      <Icon name="TrendingUp" size={12} />
                      <span>{faq.popularity}% find this helpful</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-text-primary">{faq.question}</h3>
                </div>
                <Icon 
                  name={expandedFAQ === faq.id ? "ChevronUp" : "ChevronDown"} 
                  size={20} 
                  className="text-text-secondary ml-4"
                />
              </div>
            </button>

            {expandedFAQ === faq.id && (
              <div className="px-6 pb-6">
                <div className="border-t border-border pt-4">
                  <div className="prose prose-sm max-w-none">
                    <div className="text-text-secondary whitespace-pre-line">
                      {faq.answer}
                    </div>
                  </div>

                  {/* Helpful Feedback */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                    <span className="text-sm text-text-secondary">Was this helpful?</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={helpfulVotes[faq.id] === true ? "default" : "outline"}
                        size="sm"
                        onClick={() => markHelpful(faq.id, true)}
                        iconName="ThumbsUp"
                        iconPosition="left"
                      >
                        Yes
                      </Button>
                      <Button
                        variant={helpfulVotes[faq.id] === false ? "destructive" : "outline"}
                        size="sm"
                        onClick={() => markHelpful(faq.id, false)}
                        iconName="ThumbsDown"
                        iconPosition="left"
                      >
                        No
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-6 text-center border border-primary/20">
        <Icon name="MessageCircle" size={32} className="mx-auto text-primary mb-3" />
        <h3 className="text-lg font-semibold text-text-primary mb-2">Still need help?</h3>
        <p className="text-text-secondary mb-4">Can't find what you're looking for? Our support team is here to help.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="default"
            iconName="Mail"
            iconPosition="left"
          >
            Contact Support
          </Button>
          <Button
            variant="outline"
            iconName="Users"
            iconPosition="left"
          >
            Community Forum
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;