import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Settings as SettingsIcon, Languages, Volume2, Trash2, LogOut, X } from 'lucide-react';

interface SettingsProps {
  language: string;
  onLanguageChange: (language: string) => void;
  audioOption: string;
  onAudioOptionChange: (option: string) => void;
  onDeleteAccount: () => void;
  onSignOut: () => void;
}

export function Settings({ 
  language, 
  onLanguageChange, 
  audioOption, 
  onAudioOptionChange,
  onDeleteAccount,
  onSignOut 
}: SettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const handleSettingsClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowDeleteConfirm(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDeleteAccount();
    handleClose();
  };

  const handleSignOut = () => {
    onSignOut();
    handleClose();
  };

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'uk', label: 'Українська' },
    { code: 'pl', label: 'Polski' },
    { code: 'fr', label: 'Français' },
    { code: 'hi', label: 'हिन्दी' },
  ];

  if (!isOpen) {
    return (
      <button 
        onClick={handleSettingsClick}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
        aria-label="Open settings"
      >
        <SettingsIcon className="w-5 h-5" />
      </button>
    );
  }

  return (
    <>
      {/* Settings Button */}
      <button 
        onClick={handleSettingsClick}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
        aria-label="Open settings"
      >
        <SettingsIcon className="w-5 h-5" />
      </button>

      {/* Modal Overlay */}
      <div 
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <Card 
          className="w-full max-w-md bg-card text-card-foreground shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle id="settings-title">Settings</CardTitle>
            <button 
              onClick={handleClose}
              className="p-1 rounded-sm hover:bg-accent"
              aria-label="Close settings"
            >
              <X className="w-4 h-4" />
            </button>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {!showDeleteConfirm ? (
              <>
                {/* Language Settings */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Languages className="w-4 h-4" />
                    <Label>Change Language</Label>
                  </div>
                  <Select value={language} onValueChange={onLanguageChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Audio Settings */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Volume2 className="w-4 h-4" />
                    <Label>Audio Settings</Label>
                  </div>
                  <RadioGroup value={audioOption} onValueChange={onAudioOptionChange}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="browser" id="browser" />
                      <Label htmlFor="browser">Browser Default Audio (Option A)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="local" id="local" />
                      <Label htmlFor="local">Local Audio Files (Option B)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* Account Actions */}
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleDeleteClick}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              /* Delete Confirmation */
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Are you absolutely sure?</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    This action cannot be undone. This will permanently delete your account
                    and remove all your data from our servers.
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive"
                    className="flex-1"
                    onClick={handleConfirmDelete}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}