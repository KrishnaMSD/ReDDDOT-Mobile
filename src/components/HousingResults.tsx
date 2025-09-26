import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Home, MapPin, DollarSign, Bed, Bath, Car, ArrowLeft } from 'lucide-react';
import { UserProfile } from '../App';
import { HousingApplicationForm } from './HousingApplicationForm';

interface HousingResultsProps {
  userProfile: UserProfile;
  onHousingSaved?: () => void;
}

export function HousingResults({ userProfile, onHousingSaved }: HousingResultsProps) {
  const [selectedHousing, setSelectedHousing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

  const housings = [
    {
      id: 1,
      name: 'Lakeview Towers',
      managementName: 'Premier Property Management',
      location: 'Lakeview, Chicago',
      rent: '$2,200',
      bedrooms: 2,
      bathrooms: 2,
      features: ['Furnished', 'Near Transit', 'Gym', 'Pool'],
      description: 'Modern apartments with lake views and excellent amenities.',
      address: '1401 N Lake Shore Dr, Chicago, IL 60610',
      unitName: 'Unit 12B',
      rentDueDate: '1st of every month'
    },
    {
      id: 2,
      name: 'Lincoln Park Commons',
      managementName: 'Chicago Living Properties',
      location: 'Lincoln Park, Chicago',
      rent: '$2,400',
      bedrooms: 3,
      bathrooms: 2,
      features: ['Pet Friendly', 'Near Transit', 'Rooftop', 'Parking'],
      description: 'Beautiful park-adjacent living with easy access to downtown.',
      address: '2150 N Lincoln Park W, Chicago, IL 60614',
      unitName: 'Unit 8A',
      rentDueDate: '1st of every month'
    },
    {
      id: 3,
      name: 'The Loop Residences',
      managementName: 'Downtown Housing Group',
      location: 'Loop, Chicago',
      rent: '$2,800',
      bedrooms: 2,
      bathrooms: 1,
      features: ['Furnished', 'Near Transit', 'Gym', 'Concierge'],
      description: 'Prime downtown location with modern amenities.',
      address: '55 E Grand Ave, Chicago, IL 60611',
      unitName: 'Unit 15C',
      rentDueDate: '1st of every month'
    },
    {
      id: 4,
      name: 'River North Apartments',
      managementName: 'North Side Management',
      location: 'River North, Chicago',
      rent: '$2,500',
      bedrooms: 2,
      bathrooms: 2,
      features: ['High-rise', 'Near Transit', 'Parking', 'Balcony'],
      description: 'Spacious apartment with great transportation access.',
      address: '333 N Canal St, Chicago, IL 60606',
      unitName: 'Unit 20D',
      rentDueDate: '1st of every month'
    },
    {
      id: 5,
      name: 'West Loop Lofts',
      managementName: 'Urban Loft Properties',
      location: 'West Loop, Chicago',
      rent: '$2,600',
      bedrooms: 2,
      bathrooms: 2,
      features: ['Loft Style', 'Near Transit', 'Fitness Center', 'Rooftop'],
      description: 'Industrial chic living in trendy West Loop.',
      address: '500 W Superior St, Chicago, IL 60654',
      unitName: 'Unit 7F',
      rentDueDate: '1st of every month'
    },
    {
      id: 6,
      name: 'Wicker Park Homes',
      managementName: 'Neighborhood Property Group',
      location: 'Wicker Park, Chicago',
      rent: '$1,900',
      bedrooms: 2,
      bathrooms: 1,
      features: ['Vintage Charm', 'Near Transit', 'Pet Friendly', 'Garden'],
      description: 'Charming vintage apartments in artistic Wicker Park.',
      address: '1532 N Damen Ave, Chicago, IL 60622',
      unitName: 'Unit 2A',
      rentDueDate: '1st of every month'
    },
    {
      id: 7,
      name: 'Bucktown Square',
      managementName: 'Northside Residential',
      location: 'Bucktown, Chicago',
      rent: '$2,100',
      bedrooms: 3,
      bathrooms: 2,
      features: ['Modern', 'Near Transit', 'In-unit Laundry', 'Parking'],
      description: 'Contemporary living in hip Bucktown neighborhood.',
      address: '1700 N Damen Ave, Chicago, IL 60647',
      unitName: 'Unit 3B',
      rentDueDate: '1st of every month'
    },
    {
      id: 8,
      name: 'Gold Coast Luxury',
      managementName: 'Elite Housing Management',
      location: 'Gold Coast, Chicago',
      rent: '$3,200',
      bedrooms: 2,
      bathrooms: 2,
      features: ['Luxury', 'Doorman', 'Gym', 'Valet Parking'],
      description: 'Upscale living in prestigious Gold Coast.',
      address: '1200 N Lake Shore Dr, Chicago, IL 60610',
      unitName: 'Unit 25A',
      rentDueDate: '1st of every month'
    },
    {
      id: 9,
      name: 'Logan Square Gardens',
      managementName: 'Square Property Management',
      location: 'Logan Square, Chicago',
      rent: '$1,800',
      bedrooms: 2,
      bathrooms: 1,
      features: ['Affordable', 'Near Transit', 'Pet Friendly', 'Community Garden'],
      description: 'Affordable living in vibrant Logan Square.',
      address: '2800 N Milwaukee Ave, Chicago, IL 60618',
      unitName: 'Unit 1C',
      rentDueDate: '1st of every month'
    },
    {
      id: 10,
      name: 'Pilsen Community',
      managementName: 'Community Housing Partners',
      location: 'Pilsen, Chicago',
      rent: '$1,700',
      bedrooms: 2,
      bathrooms: 1,
      features: ['Cultural Area', 'Near Transit', 'Art District', 'Affordable'],
      description: 'Living in Chicago\'s vibrant Mexican-American cultural hub.',
      address: '1800 S Halsted St, Chicago, IL 60608',
      unitName: 'Unit 4A',
      rentDueDate: '1st of every month'
    }
  ];

  const handleHousingSelect = (housing: any) => {
    setSelectedHousing(housing);
    setShowQuestion(true);
  };

  if (showQuestion && selectedHousing) {
    return (
      <div className="p-4">
        <div className="space-y-4">
          <Button variant="ghost" size="sm" onClick={() => setShowQuestion(false)}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          
          <div className="space-y-3">
            <div className="bg-background p-4 rounded-lg">
              <h3 className="font-medium mb-2">{selectedHousing.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{selectedHousing.managementName}</p>
              <p className="text-sm text-muted-foreground mb-2">{selectedHousing.location}</p>
              <p className="text-sm text-green-600">${selectedHousing.rent}/month</p>
            </div>

            <div className="space-y-3">
              <p className="text-sm">Would you like me to autofill an application for this home?</p>
              
              <div className="flex space-x-2">
                <Button 
                  onClick={() => {
                    setShowQuestion(false);
                    setShowForm(true);
                  }}
                  className="flex-1"
                >
                  Yes
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    setShowQuestion(false);
                    if (onHousingSaved) {
                      onHousingSaved();
                    }
                  }}
                >
                  Save and Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showForm && selectedHousing) {
    return (
      <HousingApplicationForm
        housing={selectedHousing}
        userProfile={userProfile}
        onBack={() => setShowForm(false)}
      />
    );
  }

  return (
    <div className="p-4">
      <div className="space-y-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Home className="w-5 h-5 text-primary" />
            <h3>Housing Recommendations</h3>
          </div>
          <p className="text-sm text-muted-foreground">Thank you for waiting, {userProfile.name}. Here are apartments/houses that match your preferences:</p>
        </div>
        
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {housings.map((housing, index) => (
            <Card key={housing.id} className="p-3 bg-background hover:bg-accent/50 cursor-pointer transition-colors">
              <div className="space-y-2">
                <div className="space-y-1">
                  <h4 className="font-medium text-sm leading-tight">{index + 1}. {housing.name}</h4>
                  <p className="text-xs text-muted-foreground">{housing.managementName}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{housing.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Bed className="w-3 h-3" />
                      <span>{housing.bedrooms}bed</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Bath className="w-3 h-3" />
                      <span>{housing.bathrooms}bath</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-green-600">
                    <DollarSign className="w-3 h-3" />
                    <span className="text-xs font-medium">${housing.rent}/month</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {housing.features.slice(0, 2).map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {housing.features.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{housing.features.length - 2} more
                    </Badge>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground line-clamp-2">{housing.description}</p>
                
                <Button
                  size="sm"
                  onClick={() => handleHousingSelect(housing)}
                  className="w-full text-xs"
                >
                  Apply
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}