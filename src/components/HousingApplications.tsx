import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Eye, Download, DollarSign, Home, MapPin } from 'lucide-react';
import { HousingApplicationForm } from './HousingApplicationForm';

interface HousingApplication {
  id: string;
  managementName: string;
  address: string;
  unitType: string;
  rent: number;
  rentDueDate: string;
  unitName: string;
}

interface HousingApplicationsProps {
  onViewApplication: (application: HousingApplication) => void;
  onDownloadApplication: (application: HousingApplication) => void;
}

export function HousingApplications({ onViewApplication, onDownloadApplication }: HousingApplicationsProps) {
  const [selectedApplication, setSelectedApplication] = useState<HousingApplication | null>(null);
  const [showForm, setShowForm] = useState(false);

  const housingApplications: HousingApplication[] = [
    {
      id: '1',
      managementName: 'Lincoln Park Properties',
      address: '1234 N Lincoln Ave, Chicago, IL 60614',
      unitType: '2 Bed, 1 Bath',
      rent: 2200,
      rentDueDate: '1st of every month',
      unitName: 'Unit 3A'
    },
    {
      id: '2',
      managementName: 'River North Rentals',
      address: '567 W Grand Ave, Chicago, IL 60654',
      unitType: '1 Bed, 1 Bath',
      rent: 1800,
      rentDueDate: '1st of every month',
      unitName: 'Unit 12B'
    },
    {
      id: '3',
      managementName: 'Wicker Park Housing',
      address: '890 N Milwaukee Ave, Chicago, IL 60622',
      unitType: '2 Bed, 2 Bath',
      rent: 2500,
      rentDueDate: '1st of every month',
      unitName: 'Unit 5C'
    },
    {
      id: '4',
      managementName: 'Lakeview Living',
      address: '2345 N Clark St, Chicago, IL 60614',
      unitType: '3 Bed, 2 Bath',
      rent: 3200,
      rentDueDate: '1st of every month',
      unitName: 'Unit 8A'
    },
    {
      id: '5',
      managementName: 'Old Town Estates',
      address: '456 W Division St, Chicago, IL 60610',
      unitType: '1 Bed, 1 Bath',
      rent: 1950,
      rentDueDate: '1st of every month',
      unitName: 'Unit 4D'
    }
  ];

  const handleViewApplication = (application: HousingApplication) => {
    setSelectedApplication(application);
    setShowForm(true);
    onViewApplication(application);
  };

  const handleDownloadApplication = (application: HousingApplication) => {
    onDownloadApplication(application);
  };

  if (showForm && selectedApplication) {
    return (
      <HousingApplicationForm 
        application={selectedApplication}
        onBack={() => {
          setShowForm(false);
          setSelectedApplication(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center p-4">
        <h3 className="mb-2">Available Housing Applications</h3>
        <p className="text-muted-foreground text-sm">
          Choose from the following rental properties to apply
        </p>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {housingApplications.map((application) => (
          <Card key={application.id} className="w-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{application.managementName}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{application.address}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Home className="w-4 h-4 text-muted-foreground" />
                    <Badge variant="secondary" className="text-xs">
                      {application.unitType}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-600">
                      ${application.rent.toLocaleString()}/mo
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleViewApplication(application)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleDownloadApplication(application)}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}