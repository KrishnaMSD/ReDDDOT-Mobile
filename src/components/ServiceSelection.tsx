import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { 
  Briefcase, 
  Home, 
  Baby, 
  DollarSign, 
  GraduationCap, 
  Users, 
  FileText 
} from 'lucide-react';

interface ServiceSelectionProps {
  onServiceSelect: (service: string) => void;
}

export function ServiceSelection({ onServiceSelect }: ServiceSelectionProps) {
  const services = [
    { id: 'Job Search', icon: Briefcase, label: 'Job Search' },
    { id: 'Housing Search', icon: Home, label: 'Housing Search' },
    { id: 'Child Care', icon: Baby, label: 'Child Care' },
    { id: 'Financial', icon: DollarSign, label: 'Financial' },
    { id: 'Education', icon: GraduationCap, label: 'Education' },
    { id: 'Community Integration', icon: Users, label: 'Community Integration' },
    { id: 'Forms Submission', icon: FileText, label: 'Forms Submission' }
  ];

  return (
    <Card className="p-4 bg-muted">
      <p className="text-sm text-muted-foreground mb-3">Choose a service:</p>
      <div className="grid grid-cols-2 gap-2">
        {services.map((service, index) => (
          <Button
            key={service.id}
            variant="outline"
            onClick={() => onServiceSelect(service.id)}
            className="h-auto p-3 flex flex-col items-center gap-2 text-left"
          >
            <service.icon className="w-5 h-5" />
            <span className="text-xs">{service.label}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
}