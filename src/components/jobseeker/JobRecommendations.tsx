
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Clock, Bookmark, ExternalLink } from 'lucide-react';
import { JobPostingData } from '@/components/employer/JobPostFormTypes';
import { saveJob, hasApplied } from '@/services/jobService';
import { useToast } from '@/hooks/use-toast';

interface JobRecommendationsProps {
  userId: string;
  recommendedJobs: (JobPostingData & { matchScore?: number })[];
  onSaveJob: (jobId: string) => void;
}

const JobRecommendations: React.FC<JobRecommendationsProps> = ({
  userId,
  recommendedJobs,
  onSaveJob
}) => {
  const { toast } = useToast();

  const handleSaveJob = (jobId: string) => {
    const success = saveJob(jobId, userId);
    if (success) {
      onSaveJob(jobId);
      toast({
        title: "Job saved",
        description: "The job has been saved to your profile.",
      });
    } else {
      toast({
        title: "Already saved",
        description: "This job is already in your saved jobs.",
      });
    }
  };

  if (recommendedJobs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recommended For You</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-gray-500">
              We'll show personalized job recommendations here based on your profile and activity.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended For You</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendedJobs.map(job => {
            const isApplied = hasApplied(job.id, userId);
            
            return (
              <div key={job.id} className="border rounded-lg p-4 bg-white">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">
                        <Link to={`/job-seeker/job/${job.id}`} className="hover:text-primary transition-colors">
                          {job.title}
                        </Link>
                      </h3>
                      {job.isUrgent && (
                        <Badge variant="destructive" className="text-xs">Urgent</Badge>
                      )}
                      {job.isRemote && (
                        <Badge variant="secondary" className="text-xs">Remote</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{job.company}</p>
                  </div>
                  <div className="text-right">
                    {job.matchScore && (
                      <Badge className={`
                        ${job.matchScore >= 80 ? 'bg-green-100 text-green-800' : 
                          job.matchScore >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'}
                      `}>
                        {job.matchScore}% Match
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-gray-400" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-3.5 w-3.5 mr-1 text-gray-400" />
                    {job.type}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                    {new Date(job.postedDate || job.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Button asChild size="sm">
                    <Link to={`/job-seeker/job/${job.id}`}>
                      <ExternalLink className="h-3.5 w-3.5 mr-1" />
                      View Job
                    </Link>
                  </Button>
                  {isApplied ? (
                    <Button variant="secondary" size="sm" disabled>
                      Already Applied
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSaveJob(job.id)}
                    >
                      <Bookmark className="h-3.5 w-3.5 mr-1" />
                      Save
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobRecommendations;
