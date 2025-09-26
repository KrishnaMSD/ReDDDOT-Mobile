import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { ArrowLeft, Download, Eye, FileText } from 'lucide-react';
// Import migrant data - in a real app this would come from an API
const migrantData = {
  "personal_information": {
    "first_name": "Krishna",
    "last_name": "Kalakonda", 
    "middle_name": "",
    "date_of_birth": "15-April-2000",
    "age": 25,
    "gender": "Male",
    "nationality": "Indian",
    "ethnicity": "Asian",
    "race": "Asian",
    "marital_status": "Married",
    "religion": "Hindu",
    "preferred_language": "English",
    "languages_spoken": ["English", "Hindi", "Telugu"],
    "email": "krishnakalakonda123@gmail.com",
    "phone_number": "+15555555555",
    "current_address": {
      "street": "2449 N Clybourn Ave",
      "city": "Chicago",
      "state": "IL",
      "zip_code": "60614",
      "duration_at_current_address": "1 years"
    },
    "country_of_origin": "India",
    "date_of_entry": "01-January-2023",
    "point_of_entry": "Chicago O'Hare International Airport",
    "has_work_permit": true,
    "passport_number": "A12345678",
    "visa_type": "H1B",
    "visa_number": "V12345678",
    "visa_expiration_date": "31-December-2027",
    "social_security_number": "123-45-6789"
  },
  "dependents_information": {
    "total_family_members": 2,
    "details": [
      {
        "relationship": "Spouse",
        "age": 24,
        "first_name": "Nami",
        "last_name": "Kalakonda",
        "legal_status": "Dependent"
      },
      {
        "relationship": "Daughter",
        "age": 1,
        "first_name": "Hina",
        "last_name": "Kalakonda",
        "legal_status": "Dependent"
      }
    ]
  }
};

interface HousingApplication {
  id: string;
  managementName: string;
  address: string;
  unitType: string;
  rent: number;
  rentDueDate: string;
  unitName: string;
}

interface FormData {
  // Applicant Details
  firstName: string;
  middleName: string;
  lastName: string;
  age: string;
  gender: string;
  maritalStatus: string;
  passportNumber: string;
  
  // Contact Details
  email: string;
  mobileNumber: string;
  currentAddress: string;
  
  // Family Details
  familyMembers: Array<{
    firstName: string;
    middleName: string;
    lastName: string;
    age: string;
    gender: string;
    relationship: string;
  }>;
  
  // Declaration
  signature: string;
  date: string;
}

interface HousingApplicationFormProps {
  housing: any;
  userProfile: any;
  onBack: () => void;
}

export function HousingApplicationForm({ housing, userProfile, onBack }: HousingApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    age: '',
    gender: '',
    maritalStatus: '',
    passportNumber: '',
    email: '',
    mobileNumber: '',
    currentAddress: '',
    familyMembers: [
      { firstName: '', middleName: '', lastName: '', age: '', gender: '', relationship: '' },
      { firstName: '', middleName: '', lastName: '', age: '', gender: '', relationship: '' },
      { firstName: '', middleName: '', lastName: '', age: '', gender: '', relationship: '' }
    ],
    signature: '',
    date: new Date().toLocaleDateString()
  });

  const [showAutofillButton, setShowAutofillButton] = useState(true);
  const [isAutofilled, setIsAutofilled] = useState(false);

  // Auto-fill on component mount (since user clicked "Yes")
  useEffect(() => {
    handleAutofill();
  }, []);

  const handleAutofill = () => {
    const data = migrantData.personal_information;
    const dependents = migrantData.dependents_information.details;
    
    const updatedFormData = {
      firstName: data.first_name,
      middleName: data.middle_name,
      lastName: data.last_name,
      age: data.age.toString(),
      gender: data.gender,
      maritalStatus: data.marital_status,
      passportNumber: data.passport_number,
      email: data.email,
      mobileNumber: data.phone_number,
      currentAddress: `${data.current_address.street}, ${data.current_address.city}, ${data.current_address.state} ${data.current_address.zip_code}`,
      familyMembers: [
        {
          firstName: dependents[0]?.first_name || '',
          middleName: '',
          lastName: dependents[0]?.last_name || '',
          age: dependents[0]?.age?.toString() || '',
          gender: 'Female',
          relationship: dependents[0]?.relationship || ''
        },
        {
          firstName: dependents[1]?.first_name || '',
          middleName: '',
          lastName: dependents[1]?.last_name || '',
          age: dependents[1]?.age?.toString() || '',
          gender: 'Female',
          relationship: dependents[1]?.relationship || ''
        },
        { firstName: '', middleName: '', lastName: '', age: '', gender: '', relationship: '' }
      ],
      signature: `${data.first_name} ${data.last_name}`,
      date: new Date().toLocaleDateString()
    };

    setFormData(updatedFormData);
    setIsAutofilled(true);
    setShowAutofillButton(false);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFamilyMemberChange = (index: number, field: string, value: string) => {
    const updatedFamilyMembers = [...formData.familyMembers];
    updatedFamilyMembers[index] = { ...updatedFamilyMembers[index], [field]: value };
    setFormData(prev => ({ ...prev, familyMembers: updatedFamilyMembers }));
  };

  const handleDownload = () => {
    // Create HTML content for PDF generation with better formatting
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Housing Rental Application</title>
          <meta charset="utf-8">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 30px; 
              line-height: 1.6;
              color: #333;
            }
            .header { 
              text-align: center; 
              margin-bottom: 40px;
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
            }
            .section { 
              margin-bottom: 30px; 
              page-break-inside: avoid;
            }
            .section-title { 
              background-color: #f5f5f5; 
              padding: 12px; 
              margin-bottom: 15px; 
              font-weight: bold; 
              font-size: 16px;
              border-left: 4px solid #007bff;
            }
            .field { 
              margin-bottom: 12px; 
              display: flex;
              justify-content: space-between;
              border-bottom: 1px solid #eee;
              padding-bottom: 8px;
            }
            .field-label { 
              font-weight: bold; 
              min-width: 150px;
              color: #555;
            }
            .field-value {
              flex: 1;
              text-align: right;
            }
            .family-member { 
              border: 1px solid #ddd; 
              padding: 15px; 
              margin-bottom: 15px; 
              border-radius: 5px;
              background-color: #fafafa;
            }
            .two-column {
              display: flex;
              justify-content: space-between;
              gap: 20px;
            }
            .column {
              flex: 1;
            }
            .signature-section {
              border: 1px solid #333;
              padding: 20px;
              margin-top: 30px;
            }
            .declaration {
              font-style: italic;
              margin-bottom: 20px;
              padding: 15px;
              background-color: #f9f9f9;
              border-radius: 5px;
            }
            @media print {
              .section { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${housing.managementName}</h1>
            <h2>Rental Application Form</h2>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="section">
            <div class="section-title">Apartment/Unit Details</div>
            <div class="field">
              <span class="field-label">Address:</span> 
              <span class="field-value">${housing.address}</span>
            </div>
            <div class="field">
              <span class="field-label">Unit Name:</span> 
              <span class="field-value">${housing.unitName}</span>
            </div>
            <div class="field">
              <span class="field-label">Rental Amount:</span> 
              <span class="field-value">$${housing.rent}/month</span>
            </div>
            <div class="field">
              <span class="field-label">Rent Due Date:</span> 
              <span class="field-value">${housing.rentDueDate}</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Applicant Details</div>
            <div class="two-column">
              <div class="column">
                <div class="field">
                  <span class="field-label">First Name:</span> 
                  <span class="field-value">${formData.firstName}</span>
                </div>
                <div class="field">
                  <span class="field-label">Middle Name:</span> 
                  <span class="field-value">${formData.middleName}</span>
                </div>
                <div class="field">
                  <span class="field-label">Last Name:</span> 
                  <span class="field-value">${formData.lastName}</span>
                </div>
                <div class="field">
                  <span class="field-label">Age:</span> 
                  <span class="field-value">${formData.age}</span>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <span class="field-label">Gender:</span> 
                  <span class="field-value">${formData.gender}</span>
                </div>
                <div class="field">
                  <span class="field-label">Marital Status:</span> 
                  <span class="field-value">${formData.maritalStatus}</span>
                </div>
                <div class="field">
                  <span class="field-label">Passport Number:</span> 
                  <span class="field-value">${formData.passportNumber}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Contact Details</div>
            <div class="field">
              <span class="field-label">Email Address:</span> 
              <span class="field-value">${formData.email}</span>
            </div>
            <div class="field">
              <span class="field-label">Mobile Number:</span> 
              <span class="field-value">${formData.mobileNumber}</span>
            </div>
            <div class="field">
              <span class="field-label">Current Address:</span> 
              <span class="field-value">${formData.currentAddress}</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Family Details</div>
            ${formData.familyMembers.map((member, index) => 
              member.firstName || member.lastName ? `
                <div class="family-member">
                  <h4>Family Member ${index + 1}</h4>
                  <div class="two-column">
                    <div class="column">
                      <div class="field">
                        <span class="field-label">First Name:</span> 
                        <span class="field-value">${member.firstName}</span>
                      </div>
                      <div class="field">
                        <span class="field-label">Middle Name:</span> 
                        <span class="field-value">${member.middleName}</span>
                      </div>
                      <div class="field">
                        <span class="field-label">Last Name:</span> 
                        <span class="field-value">${member.lastName}</span>
                      </div>
                    </div>
                    <div class="column">
                      <div class="field">
                        <span class="field-label">Age:</span> 
                        <span class="field-value">${member.age}</span>
                      </div>
                      <div class="field">
                        <span class="field-label">Gender:</span> 
                        <span class="field-value">${member.gender}</span>
                      </div>
                      <div class="field">
                        <span class="field-label">Relationship:</span> 
                        <span class="field-value">${member.relationship}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ` : ''
            ).join('')}
          </div>

          <div class="section">
            <div class="section-title">Declaration</div>
            <div class="declaration">
              <p>I, <strong>${formData.firstName} ${formData.lastName}</strong>, hereby declare that all the above information is true to my knowledge. I hereby give authority to the management to pull my credit history and verify the information provided.</p>
            </div>
            <div class="signature-section">
              <div class="two-column">
                <div class="column">
                  <div class="field">
                    <span class="field-label">Signature:</span> 
                    <span class="field-value"><strong>${formData.signature}</strong></span>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <span class="field-label">Date:</span> 
                    <span class="field-value">${formData.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Create a new window/tab with the content and trigger print
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      // Wait for content to load, then print
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 1000);
    } else {
      // Fallback: create downloadable HTML file
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${housing.managementName.replace(/\s+/g, '_')}_Application.html`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with back button and autofill */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        
        <h2 className="text-lg">Rental Application</h2>
        
        {showAutofillButton && (
          <Button size="sm" onClick={handleAutofill}>
            Auto Fill
          </Button>
        )}
        
        {!showAutofillButton && (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-1" />
              View Application
            </Button>
            <Button size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-1" />
              Download Application
            </Button>
          </div>
        )}
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Management Header */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">{housing.managementName}</CardTitle>
            <p className="text-muted-foreground">Rental Application Form</p>
          </CardHeader>
        </Card>

        {/* Apartment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Apartment/Unit Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 gap-3 p-3 bg-muted rounded-lg">
              <p><strong>Address:</strong> {housing.address}</p>
              <p><strong>Unit Name:</strong> {housing.unitName}</p>
              <p><strong>Rental Amount:</strong> ${housing.rent}/month</p>
              <p><strong>Rent Due Date:</strong> {housing.rentDueDate}</p>
            </div>
          </CardContent>
        </Card>

        {/* Applicant Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Applicant Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>First Name</Label>
                <Input 
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                />
              </div>
              <div>
                <Label>Middle Name</Label>
                <Input 
                  value={formData.middleName}
                  onChange={(e) => handleInputChange('middleName', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>Last Name</Label>
              <Input 
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Age</Label>
                <Input 
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                />
              </div>
              <div>
                <Label>Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <Label>Marital Status</Label>
                <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Married">Married</SelectItem>
                    <SelectItem value="Divorced">Divorced</SelectItem>
                    <SelectItem value="Widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Passport Number</Label>
                <Input 
                  value={formData.passportNumber}
                  onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contact Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Email Address</Label>
              <Input 
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
            <div>
              <Label>Mobile Number</Label>
              <Input 
                value={formData.mobileNumber}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
              />
            </div>
            <div>
              <Label>Current Address</Label>
              <Textarea 
                value={formData.currentAddress}
                onChange={(e) => handleInputChange('currentAddress', e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Family Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Family Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.familyMembers.map((member, index) => (
              <Card key={index} className="border border-border">
                <CardHeader>
                  <CardTitle className="text-base">Family Member {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>First Name</Label>
                      <Input 
                        value={member.firstName}
                        onChange={(e) => handleFamilyMemberChange(index, 'firstName', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Middle Name</Label>
                      <Input 
                        value={member.middleName}
                        onChange={(e) => handleFamilyMemberChange(index, 'middleName', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input 
                      value={member.lastName}
                      onChange={(e) => handleFamilyMemberChange(index, 'lastName', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label>Age</Label>
                      <Input 
                        type="number"
                        value={member.age}
                        onChange={(e) => handleFamilyMemberChange(index, 'age', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Gender</Label>
                      <Select value={member.gender} onValueChange={(value) => handleFamilyMemberChange(index, 'gender', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Relationship</Label>
                      <Select value={member.relationship} onValueChange={(value) => handleFamilyMemberChange(index, 'relationship', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Spouse">Spouse</SelectItem>
                          <SelectItem value="Child">Child</SelectItem>
                          <SelectItem value="Daughter">Daughter</SelectItem>
                          <SelectItem value="Son">Son</SelectItem>
                          <SelectItem value="Parent">Parent</SelectItem>
                          <SelectItem value="Sibling">Sibling</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Declaration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Declaration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              I, {formData.firstName} {formData.lastName}, hereby declare that all the above information is true to my knowledge. 
              I hereby give authority to the management to pull my credit history and verify the information provided.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Signature</Label>
                <Input 
                  value={formData.signature}
                  onChange={(e) => handleInputChange('signature', e.target.value)}
                  placeholder="Type your full name"
                />
              </div>
              <div>
                <Label>Date</Label>
                <Input 
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-center pb-4">
          <Button onClick={handleDownload} className="w-full max-w-md">
            <FileText className="w-4 h-4 mr-2" />
            Save Application
          </Button>
        </div>
      </div>
    </div>
  );
}