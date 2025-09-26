import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Home, MapPin, DollarSign, Bed, Bath, Car } from 'lucide-react';
import { UserProfile } from '../App';
import { HousingApplicationForm } from './HousingApplicationForm';

interface HousingResultsProps {
  userProfile: UserProfile;
}

export function HousingResults({ userProfile }: HousingResultsProps) {
  const [selectedHousing, setSelectedHousing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  const housings = [
    {
      id: 1,
      name: 'Arcade Apartments',
      location: 'Lake, Chicago',
      rent: '$2,200/month',
      bedrooms: 2,
      bathrooms: 2,
      features: ['Furnished', 'Near Transit', 'Gym', 'Pool'],
      description: 'Modern apartments with lake views and excellent amenities.'
    },
    {
      id: 2,
      name: 'Lake View Apartments',
      location: 'Lake View, Chicago',
      rent: '$2,400/month',
      bedrooms: 2,
      bathrooms: 2,
      features: ['Furnished', 'Near Transit', 'Pet Friendly', 'Rooftop'],
      description: 'Beautiful lakefront living with easy access to downtown.'
    },
    {
      id: 3,
      name: 'ABC Apartments',
      location: 'Loop, Chicago',
      rent: '$2,300/month',
      bedrooms: 2,
      bathrooms: 1,
      features: ['Furnished', 'Near Transit', 'Gym', 'Concierge'],
      description: 'Prime downtown location with modern amenities.'
    },
    {
      id: 4,
      name: '1234 N Clark St',
      location: 'Chicago',
      rent: '$2,100/month',
      bedrooms: 2,
      bathrooms: 2,
      features: ['Furnished', 'Near Transit', 'Parking', 'Balcony'],
      description: 'Spacious apartment with great transportation access.'
    },
    {
      id: 5,
      name: '1234 W Loop',
      location: 'Chicago',
      rent: '$2,500/month',
      bedrooms: 3,
      bathrooms: 2,
      features: ['Furnished', 'Near Transit', 'Gym', 'Storage'],
      description: 'Large family-friendly apartment in the heart of the city.'
    }
  ];

  const handleHousingSelect = (housing: any) => {
    setSelectedHousing(housing);
    setShowForm(true);
  };

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
                    <span className="text-xs font-medium">{housing.rent}</span>
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
                  View Details & Apply
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}