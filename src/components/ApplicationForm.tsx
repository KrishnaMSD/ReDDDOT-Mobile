import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Download, Check } from 'lucide-react';
import { UserProfile } from '../App';

interface ApplicationFormProps {
  job: any;
  userProfile: UserProfile;
  onBack: () => void;
  onSaveAndContinue?: () => void;
}

export function ApplicationForm({ job, userProfile, onBack, onSaveAndContinue }: ApplicationFormProps) {
  const [isAutofilling, setIsAutofilling] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleAutofill = async () => {
    setIsAutofilling(true);
    
    // Simulate autofill process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsAutofilling(false);
    setIsCompleted(true);
  };

  const handleSaveAndContinue = () => {
    setIsSaved(true);
    // Save the current state and continue
    setTimeout(() => {
      setIsSaved(false);
      if (onSaveAndContinue) {
        onSaveAndContinue();
      } else {
        onBack(); // Fallback to previous behavior
      }
    }, 1000);
  };

  const handleDownload = () => {
    // Create a mock PDF download
    const element = document.createElement('a');
    const file = new Blob(['Job Application Form - Autofilled'], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${job.company}_Application_${userProfile.name}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Card className="p-4 bg-muted">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        </div>

        <div className="space-y-3">
          <div className="bg-background p-4 rounded-lg">
            <h3 className="font-medium mb-2">{job.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{job.company} • {job.location}</p>
            <p className="text-sm text-green-600">{job.salary}</p>
          </div>

          {!isCompleted ? (
            <div className="space-y-3">
              <p className="text-sm">Would you like to autofill the job application?</p>
              
              <div className="flex space-x-2">
                <Button 
                  onClick={handleAutofill}
                  disabled={isAutofilling || isSaved}
                  className="flex-1"
                >
                  {isAutofilling ? 'Autofilling...' : 'Yes'}
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleSaveAndContinue}
                  disabled={isAutofilling || isSaved}
                >
                  {isSaved ? 'Saved!' : 'Save and Continue'}
                </Button>
              </div>

              {isAutofilling && (
                <div className="bg-background p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm">Please wait while I fill the application...</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-background p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-green-600 mb-2">
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-medium">Application Completed!</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your job application has been autofilled with your profile information.
                </p>
              </div>

              <Button onClick={handleDownload} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Application Form
              </Button>

              <div className="mt-4 p-3 bg-background rounded-lg text-sm">
                <p className="font-medium mb-2">Application Preview:</p>
                <div className="space-y-1 text-muted-foreground">
                  <p>Name: {userProfile.name}</p>
                  <p>Country of Origin: {userProfile.country}</p>
                  <p>Visa Status: {userProfile.visaStatus}</p>
                  <p>Position: {job.title}</p>
                  <p>Company: {job.company}</p>
                  <p>Expected Salary: $150,000+</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}