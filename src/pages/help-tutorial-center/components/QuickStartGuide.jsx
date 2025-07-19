import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickStartGuide = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const quickStartSteps = [
    {
      id: 1,
      title: "Camera Setup",
      description: "Allow camera access and position yourself in the frame",
      icon: "Camera",
      details: `1. Click "Allow" when prompted for camera access\n2. Position your face in the center of the frame\n3. Ensure good lighting for optimal face detection\n4. Test camera preview before recording`,
      videoDemo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop"
    },
    {
      id: 2,
      title: "Face Tracking",
      description: "Enable face tracking and adjust sensitivity settings",
      icon: "Eye",
      details: `1. Toggle face tracking ON in the recording panel\n2. Adjust tracking sensitivity if needed\n3. Green indicators show successful face detection\n4. Red indicators mean face tracking needs adjustment`,
      videoDemo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop"
    },
    {
      id: 3,
      title: "Start Recording",
      description: "Begin recording with real-time face tracking overlay",
      icon: "Video",
      details: `1. Click the red "Record" button to start\n2. Face tracking markers will appear in real-time\n3. Recording timer shows elapsed time\n4. Face detection status is displayed during recording`,
      videoDemo: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=225&fit=crop"
    },
    {
      id: 4,
      title: "Save & Review",
      description: "Stop recording and review your face-tracked video",
      icon: "Save",
      details: `1. Click "Stop" to end recording\n2. Video automatically saves to your library\n3. Review the recording with embedded face tracking\n4. Share or download your video as needed`,
      videoDemo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop"
    }
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % quickStartSteps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + quickStartSteps.length) % quickStartSteps.length);
  };

  const step = quickStartSteps[currentStep];

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/20">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
          <Icon name="Zap" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Quick Start Guide</h3>
          <p className="text-sm text-text-secondary">Get recording in 4 simple steps</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Step Content */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full text-white text-sm font-medium">
              {step.id}
            </div>
            <div className="flex items-center space-x-2">
              <Icon name={step.icon} size={20} className="text-primary" />
              <h4 className="font-semibold text-text-primary">{step.title}</h4>
            </div>
          </div>

          <p className="text-text-secondary">{step.description}</p>

          <div className="bg-surface rounded-lg p-4 border border-border">
            <h5 className="font-medium text-text-primary mb-2">Step Details:</h5>
            <div className="text-sm text-text-secondary whitespace-pre-line">
              {step.details}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={prevStep}
              iconName="ChevronLeft"
              iconPosition="left"
              disabled={currentStep === 0}
            >
              Previous
            </Button>

            <div className="flex space-x-2">
              {quickStartSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-2 h-2 rounded-full transition-smooth ${
                    index === currentStep ? 'bg-primary' : 'bg-border'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="default"
              size="sm"
              onClick={nextStep}
              iconName="ChevronRight"
              iconPosition="right"
              disabled={currentStep === quickStartSteps.length - 1}
            >
              Next
            </Button>
          </div>
        </div>

        {/* Demo Video */}
        <div className="space-y-4">
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <img
              src={step.videoDemo}
              alt={`${step.title} demonstration`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <Button
                variant="default"
                size="lg"
                iconName="Play"
                className="bg-white/90 text-black hover:bg-white"
              >
                Watch Demo
              </Button>
            </div>
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              fullWidth
              iconName="ExternalLink"
              iconPosition="right"
            >
              Try Interactive Tutorial
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStartGuide;