import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Building, MapPin, DollarSign, ExternalLink } from 'lucide-react';
import { UserProfile } from '../App';
import { ApplicationForm } from './ApplicationForm';

interface JobResultsProps {
  userProfile: UserProfile;
}

export function JobResults({ userProfile }: JobResultsProps) {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  const jobs = [
    {
      id: 1,
      title: 'Senior Data Scientist',
      company: 'XYZ Company',
      location: 'Chicago, IL',
      salary: '$140,000 - $180,000',
      type: 'Full-time',
      description: 'Join our data science team to build innovative solutions...',
      benefits: ['Health Insurance', 'Transportation', '401k']
    },
    {
      id: 2,
      title: 'Lead Data Scientist',
      company: 'ABC Company',
      location: 'Chicago, IL',
      salary: '$160,000 - $200,000',
      type: 'Full-time',
      description: 'Lead a team of data scientists in cutting-edge projects...',
      benefits: ['Health Insurance', 'Remote Work', 'Stock Options']
    },
    {
      id: 3,
      title: 'Senior Data Scientist',
      company: 'Dr Stone LLC',
      location: 'Naperville, IL',
      salary: '$135,000 - $175,000',
      type: 'Full-time',
      description: 'Work on machine learning models for healthcare...',
      benefits: ['Health Insurance', 'Transportation', 'Flexible Hours']
    },
    {
      id: 4,
      title: 'Data Science Manager',
      company: 'Mappa Productions',
      location: 'Chicago, IL',
      salary: '$170,000 - $220,000',
      type: 'Full-time',
      description: 'Manage data science initiatives across multiple projects...',
      benefits: ['Health Insurance', 'Management Training', 'Bonus']
    },
    {
      id: 5,
      title: 'Data Scientist',
      company: 'Parrot Technologies',
      location: 'Chicago, IL',
      salary: '$120,000 - $160,000',
      type: 'Full-time',
      description: 'Analyze large datasets to drive business decisions...',
      benefits: ['Health Insurance', 'Transportation', 'Learning Budget']
    }
  ];

  const handleJobSelect = (job: any) => {
    setSelectedJob(job);
    setShowForm(true);
  };

  if (showForm && selectedJob) {
    return (
      <ApplicationForm
        job={selectedJob}
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
            <Building className="w-5 h-5 text-primary" />
            <h3>Job Recommendations</h3>
          </div>
          <p className="text-sm text-muted-foreground">Thank you for waiting, {userProfile.name}. Here are the top recommended jobs for you:</p>
        </div>
        
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {jobs.map((job, index) => (
            <Card key={job.id} className="p-3 bg-background hover:bg-accent/50 cursor-pointer transition-colors">
              <div className="space-y-2">
                <div className="space-y-1">
                  <h4 className="font-medium text-sm leading-tight">{index + 1}. {job.title}</h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Building className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{job.company}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">{job.salary}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">{job.type}</Badge>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {job.benefits.slice(0, 2).map((benefit, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                  {job.benefits.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{job.benefits.length - 2} more
                    </Badge>
                  )}
                </div>
                
                <Button
                  size="sm"
                  onClick={() => handleJobSelect(job)}
                  className="w-full text-xs"
                >
                  View Details & Apply
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <Button variant="outline" className="w-full text-sm">
          Show More Jobs
        </Button>
      </div>
    </div>
  );
}