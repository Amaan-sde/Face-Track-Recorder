import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TroubleshootingGuide = () => {
  const [selectedIssue, setSelectedIssue] = useState(null);

  const troubleshootingIssues = [
    {
      id: 1,
      title: "Camera Not Working",
      description: "Camera preview shows black screen or error message",
      icon: "CameraOff",
      severity: "high",
      steps: [
        {
          step: 1,
          title: "Check Browser Permissions",
          description: "Ensure camera access is allowed in browser settings",
          action: "Click the camera icon in address bar and select \'Allow'"
        },
        {
          step: 2,
          title: "Close Other Applications",
          description: "Other apps might be using your camera",
          action: "Close video calling apps, other browser tabs using camera"
        },
        {
          step: 3,
          title: "Restart Browser",
          description: "Refresh the page or restart your browser",
          action: "Press Ctrl+F5 (Windows) or Cmd+R (Mac) to hard refresh"
        },
        {
          step: 4,
          title: "Check Hardware",
          description: "Verify camera is connected and working",
          action: "Test camera in other applications or system settings"
        }
      ]
    },
    {
      id: 2,
      title: "Face Detection Issues",
      description: "Face tracking not detecting or losing track of face",
      icon: "EyeOff",
      severity: "medium",
      steps: [
        {
          step: 1,
          title: "Improve Lighting",
          description: "Face tracking requires good lighting conditions",
          action: "Position yourself facing a light source, avoid backlighting"
        },
        {
          step: 2,
          title: "Center Your Face",
          description: "Keep your face centered in the camera frame",
          action: "Adjust camera position or move to center of frame"
        },
        {
          step: 3,
          title: "Reduce Movement",
          description: "Excessive movement can disrupt tracking",
          action: "Stay relatively still, especially during initial detection"
        },
        {
          step: 4,
          title: "Adjust Sensitivity",
          description: "Fine-tune face tracking sensitivity settings",
          action: "Go to Settings > Face Tracking > Adjust sensitivity slider"
        }
      ]
    },
    {
      id: 3,
      title: "Recording Performance Issues",
      description: "Slow performance, lag, or choppy recording",
      icon: "Zap",
      severity: "medium",
      steps: [
        {
          step: 1,
          title: "Close Background Apps",
          description: "Free up system resources for better performance",
          action: "Close unnecessary browser tabs and applications"
        },
        {
          step: 2,
          title: "Lower Recording Quality",
          description: "Reduce video quality to improve performance",
          action: "Settings > Recording > Change quality to 720p or lower"
        },
        {
          step: 3,
          title: "Disable Other Extensions",
          description: "Browser extensions can impact performance",
          action: "Temporarily disable non-essential browser extensions"
        },
        {
          step: 4,
          title: "Check System Requirements",
          description: "Ensure your device meets minimum requirements",
          action: "Verify 4GB+ RAM, modern CPU, updated browser version"
        }
      ]
    },
    {
      id: 4,
      title: "Video Playback Problems",
      description: "Recorded videos won\'t play or have issues",
      icon: "PlayCircle",
      severity: "low",
      steps: [
        {
          step: 1,
          title: "Check Browser Support",
          description: "Ensure your browser supports video playback",
          action: "Update to latest browser version or try different browser"
        },
        {
          step: 2,
          title: "Clear Browser Cache",
          description: "Cached data might be causing playback issues",
          action: "Clear browser cache and cookies, then reload page"
        },
        {
          step: 3,
          title: "Download and Play Locally",
          description: "Try downloading video and playing in media player",
          action: "Click download button and open in VLC or similar player"
        },
        {
          step: 4,
          title: "Check Storage Space",
          description: "Insufficient storage can cause playback issues",
          action: "Free up browser storage or download videos to device"
        }
      ]
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-error/10 text-error border-error/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted text-text-secondary border-border';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'AlertCircle';
      case 'low': return 'Info';
      default: return 'HelpCircle';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Troubleshooting Guide</h2>
        <p className="text-text-secondary">Step-by-step solutions for common technical issues</p>
      </div>

      {/* Issue Selection */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {troubleshootingIssues.map((issue) => (
          <button
            key={issue.id}
            onClick={() => setSelectedIssue(issue.id)}
            className={`p-4 rounded-lg border-2 transition-smooth text-left ${
              selectedIssue === issue.id
                ? 'border-primary bg-primary/5' :'border-border bg-surface hover:border-primary/50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${getSeverityColor(issue.severity)}`}>
                <Icon name={issue.icon} size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-text-primary">{issue.title}</h3>
                  <Icon name={getSeverityIcon(issue.severity)} size={14} className="text-text-secondary" />
                </div>
                <p className="text-sm text-text-secondary">{issue.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Issue Steps */}
      {selectedIssue && (
        <div className="bg-surface border border-border rounded-lg p-6">
          {(() => {
            const issue = troubleshootingIssues.find(i => i.id === selectedIssue);
            return (
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${getSeverityColor(issue.severity)}`}>
                    <Icon name={issue.icon} size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">{issue.title}</h3>
                    <p className="text-text-secondary">{issue.description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {issue.steps.map((step, index) => (
                    <div key={index} className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="font-semibold text-text-primary mb-1">{step.title}</h4>
                        <p className="text-text-secondary text-sm mb-2">{step.description}</p>
                        <div className="bg-muted rounded-lg p-3">
                          <div className="flex items-start space-x-2">
                            <Icon name="ArrowRight" size={14} className="text-primary mt-0.5" />
                            <span className="text-sm font-medium text-text-primary">{step.action}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="default"
                      iconName="CheckCircle"
                      iconPosition="left"
                    >
                      Issue Resolved
                    </Button>
                    <Button
                      variant="outline"
                      iconName="MessageCircle"
                      iconPosition="left"
                    >
                      Still Need Help
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedIssue(null)}
                      iconName="X"
                      iconPosition="left"
                    >
                      Close Guide
                    </Button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Additional Resources */}
      <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg p-6 border border-accent/20">
        <div className="text-center">
          <Icon name="Lightbulb" size={32} className="mx-auto text-accent mb-3" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">Need More Help?</h3>
          <p className="text-text-secondary mb-4">
            If these steps don't resolve your issue, try our advanced troubleshooting tools or contact support.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              iconName="Settings"
              iconPosition="left"
            >
              System Diagnostics
            </Button>
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
            >
              Download Logs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TroubleshootingGuide;