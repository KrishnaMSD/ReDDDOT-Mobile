import React, { useState } from 'react';
import { ChatInterface } from './ChatInterface';
import { TranslatorInterface } from './TranslatorInterface';
import { Navigation } from './Navigation';
import { MenuDrawer } from './MenuDrawer';
import { ConversationState, UserProfile } from '../App';

interface MainInterfaceProps {
  language: string;
  userProfile: UserProfile;
  onProfileUpdate: (updates: Partial<UserProfile>) => void;
  conversationState: ConversationState;
  onConversationStateChange: (state: ConversationState) => void;
  onLanguageChange: (language: string) => void;
  audioOption: string;
  onAudioOptionChange: (option: string) => void;
  onDeleteAccount: () => void;
  onSignOut: () => void;
}

export type MainView = 'home' | 'translator';
export type MenuItem = 'profile' | 'jobs' | 'housing' | 'legal' | 'childcare' | 'health' | 'education' | 'finances' | 'community' | 'translator' | 'forms';

export function MainInterface({ 
  language, 
  userProfile, 
  onProfileUpdate, 
  conversationState, 
  onConversationStateChange,
  onLanguageChange,
  audioOption,
  onAudioOptionChange,
  onDeleteAccount,
  onSignOut
}: MainInterfaceProps) {
  const [currentView, setCurrentView] = useState<MainView>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuSelect = (item: MenuItem) => {
    setIsMenuOpen(false);
    
    if (item === 'translator') {
      setCurrentView('translator');
    } else {
      setCurrentView('home');
      // Could handle other menu items here
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      {currentView === 'home' && (
        <ChatInterface
          language={language}
          userProfile={userProfile}
          onProfileUpdate={onProfileUpdate}
          conversationState={conversationState}
          onConversationStateChange={onConversationStateChange}
          onMenuOpen={() => setIsMenuOpen(true)}
          onLanguageChange={onLanguageChange}
          audioOption={audioOption}
          onAudioOptionChange={onAudioOptionChange}
          onDeleteAccount={onDeleteAccount}
          onSignOut={onSignOut}
        />
      )}
      
      {currentView === 'translator' && (
        <TranslatorInterface
          language={language}
          onMenuOpen={() => setIsMenuOpen(true)}
        />
      )}
      
      <Navigation 
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onMenuSelect={handleMenuSelect}
        language={language}
      />
    </div>
  );
}