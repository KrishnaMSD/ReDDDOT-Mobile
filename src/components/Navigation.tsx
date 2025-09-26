import React from 'react';
import { Button } from './ui/button';
import { Home, Languages } from 'lucide-react';
import { MainView } from './MainInterface';

interface NavigationProps {
  currentView: MainView;
  onViewChange: (view: MainView) => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  return (
    <div className="border-t bg-card p-2">
      <div className="flex justify-around">
        <Button
          variant={currentView === 'home' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewChange('home')}
          className="flex flex-col items-center gap-1 h-auto py-2 px-4"
        >
          <Home className="w-5 h-5" />
          <span className="text-xs">Home</span>
        </Button>
        
        <Button
          variant={currentView === 'translator' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewChange('translator')}
          className="flex flex-col items-center gap-1 h-auto py-2 px-4"
        >
          <Languages className="w-5 h-5" />
          <span className="text-xs">Translator</span>
        </Button>
      </div>
    </div>
  );
}