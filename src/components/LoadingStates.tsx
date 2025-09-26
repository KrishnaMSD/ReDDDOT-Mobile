import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { CheckCircle, Loader2 } from 'lucide-react';

interface LoadingStatesProps {
  service: 'job' | 'housing' | null;
}

export function LoadingStates({ service }: LoadingStatesProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const jobSteps = [
    'Extracting your information...',
    'Checking files...',
    'Extracted information.',
    'Searching for relevant jobs...',
    'Searching through Knowledge graphs...',
    'Finding recommendations...'
  ];

  const housingSteps = [
    'Extracting your information...',
    'Checking files...',
    'Extracted information.',
    'Searching for relevant housing...',
    'Searching through Knowledge graphs...',
    'Finding recommendations...'
  ];

  const steps = service === 'job' ? jobSteps : housingSteps;

  useEffect(() => {
    setCurrentStep(0); // Reset when service changes
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [service, steps.length]);

  return (
    <Card className="p-6 bg-muted">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <p>Processing your request...</p>
        </div>
        
        <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
        
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center space-x-2">
              {index <= currentStep ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <div className="w-4 h-4 border-2 border-muted-foreground/30 rounded-full" />
              )}
              <span className={`text-sm ${
                index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}