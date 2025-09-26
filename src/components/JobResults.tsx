import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Building, MapPin, DollarSign, ExternalLink } from 'lucide-react';
import { UserProfile } from '../App';
import { ApplicationForm } from './ApplicationForm';

interface JobResultsProps {
  userProfile: UserProfile;
  onJobSaved?: () => void;
}

export function JobResults({ userProfile, onJobSaved }: JobResultsProps) {
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
      benefits: ['Health Insurance', 'Transportation', '401k'],
      linkedinUrl: 'https://linkedin.com/jobs/view/3801234567'
    },
    {
      id: 2,
      title: 'Lead Data Scientist',
      company: 'ABC Company',
      location: 'Chicago, IL',
      salary: '$160,000 - $200,000',
      type: 'Full-time',
      description: 'Lead a team of data scientists in cutting-edge projects...',
      benefits: ['Health Insurance', 'Remote Work', 'Stock Options'],
      linkedinUrl: 'https://linkedin.com/jobs/view/3801234568'
    },
    {
      id: 3,
      title: 'Senior Data Scientist',
      company: 'Dr Stone LLC',
      location: 'Naperville, IL',
      salary: '$135,000 - $175,000',
      type: 'Full-time',
      description: 'Work on machine learning models for healthcare...',
      benefits: ['Health Insurance', 'Transportation', 'Flexible Hours'],
      linkedinUrl: 'https://linkedin.com/jobs/view/3801234569'
    },
    {
      id: 4,
      title: 'Data Science Manager',
      company: 'Mappa Productions',
      location: 'Chicago, IL',
      salary: '$170,000 - $220,000',
      type: 'Full-time',
      description: 'Manage data science initiatives across multiple projects...',
      benefits: ['Health Insurance', 'Management Training', 'Bonus'],
      linkedinUrl: 'https://linkedin.com/jobs/view/3801234570'
    },
    {
      id: 5,
      title: 'Data Scientist',
      company: 'Parrot Technologies',
      location: 'Chicago, IL',
      salary: '$120,000 - $160,000',
      type: 'Full-time',
      description: 'Analyze large datasets to drive business decisions...',
      benefits: ['Health Insurance', 'Transportation', 'Learning Budget'],
      linkedinUrl: 'https://linkedin.com/jobs/view/3801234571'
    },
    {
      id: 6,
      title: 'Machine Learning Engineer',
      company: 'TechFlow Solutions',
      location: 'Chicago, IL',
      salary: '$145,000 - $185,000',
      type: 'Full-time',
      description: 'Build and deploy machine learning models at scale...',
      benefits: ['Health Insurance', 'Flexible Schedule', 'Learning Budget'],
      linkedinUrl: 'https://linkedin.com/jobs/view/3801234572'
    },
    {
      id: 7,
      title: 'Senior Analytics Specialist',
      company: 'DataVision Corp',
      location: 'Schaumburg, IL',
      salary: '$125,000 - $165,000',
      type: 'Full-time',
      description: 'Drive data-driven decision making across organization...',
      benefits: ['Health Insurance', 'Remote Work', '401k Match'],
      linkedinUrl: 'https://linkedin.com/jobs/view/3801234573'
    },
    {
      id: 8,
      title: 'AI Research Scientist',
      company: 'InnovateLabs',
      location: 'Chicago, IL',
      salary: '$155,000 - $195,000',
      type: 'Full-time',
      description: 'Research and develop next-generation AI algorithms...',
      benefits: ['Health Insurance', 'Research Budget', 'Publications Support'],
      linkedinUrl: 'https://linkedin.com/jobs/view/3801234574'
    },
    {
      id: 9,
      title: 'Business Intelligence Analyst',
      company: 'MetroCorp',
      location: 'Chicago, IL',
      salary: '$95,000 - $135,000',
      type: 'Full-time',
      description: 'Create dashboards and reports to support business decisions...',
      benefits: ['Health Insurance', 'Training Budget', 'Hybrid Work'],
      linkedinUrl: 'https://linkedin.com/jobs/view/3801234575'
    },
    {
      id: 10,
      title: 'Data Platform Engineer',
      company: 'CloudTech Systems',
      location: 'Chicago, IL',
      salary: '$130,000 - $170,000',
      type: 'Full-time',
      description: 'Build and maintain large-scale data infrastructure...',
      benefits: ['Health Insurance', 'Stock Options', 'Professional Development'],
      linkedinUrl: 'https://linkedin.com/jobs/view/3801234576'
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
        onSaveAndContinue={() => {
          setShowForm(false);
          if (onJobSaved) {
            onJobSaved();
          }
        }}
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
                
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(job.linkedinUrl, '_blank')}
                    className="flex-1 text-xs"
                  >
                    Apply here
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleJobSelect(job)}
                    className="flex-1 text-xs"
                  >
                    View Details & Apply
                  </Button>
                </div>
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