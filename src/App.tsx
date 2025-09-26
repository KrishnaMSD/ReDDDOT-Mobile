import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { OnboardingFlow } from './components/OnboardingFlow';
import { MainInterface } from './components/MainInterface';
import { ErrorBoundary } from './components/ErrorBoundary';

export type AppState = 'welcome' | 'onboarding' | 'main';
export type ConversationState = 'initial' | 'personal-info' | 'service-selection' | 'job-search' | 'housing-search' | 'results';

export interface UserProfile {
  name?: string;
  country?: string;
  visaStatus?: string;
  arrivalDate?: string;
  spouse?: string;
  children?: Array<{name: string, age: number}>;
  resume?: File;
  jobType?: string;
  skills?: string;
  preferredLocation?: string;
  salaryExpectation?: string;
  householdInfo?: string;
  hasPets?: boolean;
  rentBudget?: string;
  housingPreferences?: string;
  education?: string;
  previousEmployment?: string;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const [conversationState, setConversationState] = useState<ConversationState>('initial');
  const [audioOption, setAudioOption] = useState<string>('browser');

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setAppState('onboarding');
  };

  const handleOnboardingComplete = () => {
    setAppState('main');
  };

  const handleProfileUpdate = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleAudioOptionChange = (option: string) => {
    setAudioOption(option);
  };

  const handleDeleteAccount = () => {
    // Reset all data
    setUserProfile({});
    setConversationState('initial');
    setAppState('welcome');
    // In a real app, you'd also clear local storage and make API calls
    localStorage.clear();
  };

  const handleSignOut = () => {
    // Reset to welcome screen
    setAppState('welcome');
    setConversationState('initial');
  };

  return (
    <ErrorBoundary>
      <div className="h-screen bg-background text-foreground overflow-hidden flex flex-col">
        {appState === 'welcome' && (
          <WelcomeScreen onLanguageSelect={handleLanguageSelect} />
        )}
        
        {appState === 'onboarding' && (
          <OnboardingFlow 
            language={selectedLanguage}
            onComplete={handleOnboardingComplete}
          />
        )}
        
        {appState === 'main' && (
          <MainInterface 
            language={selectedLanguage}
            userProfile={userProfile}
            onProfileUpdate={handleProfileUpdate}
            conversationState={conversationState}
            onConversationStateChange={setConversationState}
            onLanguageChange={handleLanguageChange}
            audioOption={audioOption}
            onAudioOptionChange={handleAudioOptionChange}
            onDeleteAccount={handleDeleteAccount}
            onSignOut={handleSignOut}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}