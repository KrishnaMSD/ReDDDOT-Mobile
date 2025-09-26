import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Globe, Languages } from 'lucide-react';

interface WelcomeScreenProps {
  onLanguageSelect: (language: string) => void;
}

export function WelcomeScreen({ onLanguageSelect }: WelcomeScreenProps) {
  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'uk', label: 'Українська', flag: '🇺🇦' },
    { code: 'pl', label: 'Polski', flag: '🇵🇱' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  ];

  return (
    <div className="h-full flex flex-col justify-center items-center p-6 bg-gradient-to-b from-primary/5 to-background">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Globe className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">ReDDDOT</h1>
            <h2 className="text-xl">Migrant Assistant</h2>
            <p className="text-muted-foreground">
              Your AI-powered companion for navigating life as a migrant
            </p>
          </div>
        </div>

        {/* Welcome Messages */}
        <Card className="p-6 text-center">
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <Languages className="w-5 h-5 text-primary" />
              <p className="font-medium">Welcome!</p>
            </div>
            <p className="text-sm text-muted-foreground">English</p>
            <p className="text-sm text-muted-foreground">¡Bienvenido!</p>
            <p className="text-sm text-muted-foreground">Español</p>
          </div>
        </Card>

        {/* Language Selection */}
        <div className="space-y-4">
          <p className="text-center text-muted-foreground">
            Choose a language to continue:
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            {languages.map((language) => (
              <Button
                key={language.code}
                variant="outline"
                onClick={() => onLanguageSelect(language.code)}
                className="h-auto p-4 flex flex-col items-center space-y-2"
              >
                <span className="text-2xl">{language.flag}</span>
                <span className="text-sm">{language.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}