
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: string;
  matchScore?: number;
}

interface JobApplicationTrackerProps {
  applications: Application[];
  onViewApplication: (applicationId: string) => void;
}

const JobApplicationTracker: React.FC<JobApplicationTrackerProps> = ({ 
  applications,
  onViewApplication
}) => {
  // Count applications by status
  const statusCounts = applications.reduce((counts, app) => {
    const status = app.status || "Applied";
    counts[status] = (counts[status] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
  
  // Calculate statistics
  const totalApplications = applications.length;
  const interviewInvites = statusCounts["Interview"] || 0;
  const interviewRate = totalApplications ? Math.round((interviewInvites / totalApplications) * 100) : 0;
  
  // Format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Applied':
        return <Badge className="bg-blue-100 text-blue-800">Applied</Badge>;
      case 'Reviewing':
        return <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>;
      case 'Interview':
        return <Badge className="bg-green-100 text-green-800">Interview</Badge>;
      case 'Rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case 'Hired':
        return <Badge className="bg-purple-100 text-purple-800">Hired</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Get application progress percentage based on status
  const getApplicationProgress = (status: string) => {
    switch (status) {
      case 'Applied': return 25;
      case 'Reviewing': return 50;
      case 'Interview': return 75;
      case 'Hired': return 100;
      case 'Rejected': return 100;
      default: return 25;
    }
  };

  if (applications.length === 0) {
    return (
      <Card className="mt-4">
        <CardContent className="pt-6 text-center">
          <div className="flex flex-col items-center justify-center py-10">
            <div className="rounded-full bg-gray-100 p-3 mb-4">
              <Briefcase className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No job applications yet</h3>
            <p className="text-gray-500 mb-4 max-w-md">
              You haven't applied to any jobs yet. Start browsing available positions and apply to jobs that match your skills and experience.
            </p>
            <Button asChild>
              <Link to="/job-seeker/find-jobs">Browse Jobs</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalApplications}</div>
            <p className="text-sm text-gray-500">In the last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Interview Invitations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{interviewInvites}</div>
            <p className="text-sm text-gray-500">
              {interviewRate}% interview rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Application Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between gap-2">
                <div className="flex-1 text-sm">{status}</div>
                <div className="text-sm font-medium">{count}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Job Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Position</TableHead>
                  <TableHead>Applied On</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map(application => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{application.jobTitle}</div>
                        <div className="text-sm text-gray-500">{application.company}</div>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(application.appliedDate)}</TableCell>
                    <TableCell>{getStatusBadge(application.status)}</TableCell>
                    <TableCell className="w-[180px]">
                      <div className="flex items-center gap-2">
                        <Progress value={getApplicationProgress(application.status)} className="h-2" />
                        <span className="text-xs text-gray-500">
                          {getApplicationProgress(application.status)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8"
                          onClick={() => onViewApplication(application.id)}
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8"
                          asChild
                        >
                          <Link to={`/job-seeker/job/${application.jobId}`}>
                            <ExternalLink className="h-3.5 w-3.5 mr-1" />
                            Job Details
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Import at the top
import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

export default JobApplicationTracker;
