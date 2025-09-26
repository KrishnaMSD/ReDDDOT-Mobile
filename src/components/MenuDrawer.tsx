import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { 
  User, 
  Briefcase, 
  Home, 
  Scale, 
  Baby, 
  Heart, 
  GraduationCap, 
  DollarSign, 
  Users, 
  Languages, 
  FileText 
} from 'lucide-react';
import { MenuItem } from './MainInterface';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onMenuSelect: (item: MenuItem) => void;
  language: string;
}

export function MenuDrawer({ isOpen, onClose, onMenuSelect, language }: MenuDrawerProps) {
  const menuItems = [
    { id: 'profile' as MenuItem, icon: User, label: 'Migrant Profile' },
    { id: 'jobs' as MenuItem, icon: Briefcase, label: 'Jobs' },
    { id: 'housing' as MenuItem, icon: Home, label: 'Housing' },
    { id: 'legal' as MenuItem, icon: Scale, label: 'Legal Aid' },
    { id: 'childcare' as MenuItem, icon: Baby, label: 'Child Care' },
    { id: 'health' as MenuItem, icon: Heart, label: 'Health' },
    { id: 'education' as MenuItem, icon: GraduationCap, label: 'Education' },
    { id: 'finances' as MenuItem, icon: DollarSign, label: 'Finances' },
    { id: 'community' as MenuItem, icon: Users, label: 'Community' },
    { id: 'translator' as MenuItem, icon: Languages, label: 'Translator' },
    { id: 'forms' as MenuItem, icon: FileText, label: 'Migrant Forms' }
  ];

  const handleItemSelect = (item: MenuItem) => {
    onMenuSelect(item);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle>ReDDDOT Assistant</SheetTitle>
        </SheetHeader>
        
        <Separator />
        
        <div className="flex flex-col p-4 space-y-2">
          {menuItems.map((item, index) => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => handleItemSelect(item.id)}
              className="justify-start h-12 px-4"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}