import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { FileText, Mic, Shield, Upload } from 'lucide-react';
import { Progress } from './ui/progress';

interface OnboardingFlowProps {
  language: string;
  onComplete: () => void;
}

export function OnboardingFlow({ language, onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      icon: <Upload className="w-12 h-12 text-primary" />,
      title: 'Upload Your Documents',
      description: 'Upload files like PDFs, pictures, and documents to make the process easy and serve you better.',
      details: 'You can upload your resume, visa documents, certificates, and any other relevant files.'
    },
    {
      icon: <Mic className="w-12 h-12 text-primary" />,
      title: 'Voice Communication',
      description: 'Make it easy to communicate with voice recording features.',
      details: 'Speak directly to the assistant instead of typing. Your voice will be converted to text automatically.'
    },
    {
      icon: <FileText className="w-12 h-12 text-primary" />,
      title: 'Audio Settings',
      description: 'Turn off the audio option if you do not want the assistant speaking.',
      details: 'You can customize whether you want voice responses or prefer text-only communication.'
    },
    {
      icon: <Shield className="w-12 h-12 text-primary" />,
      title: 'Privacy & Security',
      description: 'Your information is safe with us. Read our policies.',
      details: 'We use encryption and follow strict privacy guidelines to protect your personal information.'
    }
  ];

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="h-full flex flex-col justify-between p-6 bg-gradient-to-b from-primary/5 to-background">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-sm mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        <Card className="w-full max-w-md p-8 text-center">
          <div className="mb-6 flex justify-center">
            {currentStepData.icon}
          </div>
          
          <h2 className="mb-4">{currentStepData.title}</h2>
          
          <p className="text-muted-foreground mb-4">
            {currentStepData.description}
          </p>
          
          <p className="text-sm text-muted-foreground">
            {currentStepData.details}
          </p>
        </Card>
      </div>

      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={handleSkip}
          className="flex-1"
        >
          Skip
        </Button>
        <Button 
          onClick={handleNext}
          className="flex-1"
        >
          {currentStep < steps.length - 1 ? 'Next' : 'Get Started'}
        </Button>
      </div>
    </div>
  );
}