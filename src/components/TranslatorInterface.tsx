import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Menu, Mic, MicOff } from 'lucide-react';

interface TranslatorInterfaceProps {
  language: string;
  onMenuOpen: () => void;
}

export function TranslatorInterface({ language, onMenuOpen }: TranslatorInterfaceProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState('');

  const handleStartListening = () => {
    setIsListening(true);
    // Simulate listening and transcription
    setTimeout(() => {
      setTranscription('Hello, how can I help you today?');
      setIsListening(false);
    }, 2000);
  };

  const handleStopListening = () => {
    setIsListening(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuOpen}
          className="p-2"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <h1 className="text-lg">Translator</h1>
        
        <div className="w-9" /> {/* Spacer for center alignment */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            {isListening ? (
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center animate-pulse">
                <Mic className="w-8 h-8 text-primary-foreground" />
              </div>
            ) : (
              <Mic className="w-12 h-12 text-primary" />
            )}
          </div>
          
          <div className="space-y-2">
            <h2>Voice Translator</h2>
            <p className="text-muted-foreground">
              {isListening ? 'Listening...' : 'Tap the microphone to start speaking'}
            </p>
          </div>
        </div>

        {/* Transcription Display */}
        {transcription && (
          <Card className="w-full max-w-md p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Transcription:</p>
              <p>{transcription}</p>
            </div>
          </Card>
        )}

        {/* Control Button */}
        <Button
          size="lg"
          onClick={isListening ? handleStopListening : handleStartListening}
          className={`w-20 h-20 rounded-full ${isListening ? 'bg-destructive hover:bg-destructive/90' : ''}`}
        >
          {isListening ? (
            <MicOff className="w-8 h-8" />
          ) : (
            <Mic className="w-8 h-8" />
          )}
        </Button>
      </div>
    </div>
  );
}