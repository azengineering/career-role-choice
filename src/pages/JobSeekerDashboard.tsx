
import React, { useState, useEffect } from "react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Briefcase, FileText, Star, Eye } from "lucide-react";
import ScrollToTop from "@/components/common/ScrollToTop";
import { getAppliedJobs, getSavedJobs, removeSavedJob } from "@/services/jobService";
import { useToast } from "@/hooks/use-toast";

const JobSeekerDashboard: React.FC = () => {
  const { isAuthenticated, userRole, user } = useAuth();
  const [appliedJobs, setAppliedJobs] = useState<any[]>([]);
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Redirect if not authenticated or not a job seeker
  if (!isAuthenticated || userRole !== "job-seeker") {
    return <Navigate to="/login" />;
  }

  // Load user's applied and saved jobs
  useEffect(() => {
    if (user?.id) {
      setIsLoading(true);
      
      const userAppliedJobs = getAppliedJobs(user.id);
      const userSavedJobs = getSavedJobs(user.id);
      
      setAppliedJobs(userAppliedJobs);
      setSavedJobs(userSavedJobs);
      
      setIsLoading(false);
    }
  }, [user?.id]);
  
  // Handle removing a saved job
  const handleRemoveSavedJob = (jobId: number | string) => {
    if (user?.id) {
      const success = removeSavedJob(jobId, user.id);
      
      if (success) {
        setSavedJobs(savedJobs.filter(job => job.jobId !== jobId));
        
        toast({
          title: "Job Removed",
          description: "The job has been removed from your saved jobs.",
        });
      }
    }
  };
  
  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header userType="job-seeker" />
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-md font-medium">Applied Jobs</CardTitle>
                <Briefcase className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{appliedJobs.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-md font-medium">Saved Jobs</CardTitle>
                <Star className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{savedJobs.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-md font-medium">Profile Views</CardTitle>
                <Eye className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24</div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="applications">
            <TabsList className="mb-6">
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="applications">
              <Card>
                <CardHeader>
                  <CardTitle>Your Job Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : appliedJobs.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                        <Briefcase className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No applications yet</h3>
                      <p className="text-gray-500 mb-4">You haven't applied to any jobs yet.</p>
                      <Link to="/job-seeker/find-jobs">
                        <Button>Browse Jobs</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {appliedJobs.map(job => (
                        <div key={job.id} className="p-4 border rounded-md bg-white flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{job.jobTitle}</h3>
                            <div className="text-sm text-gray-500">{job.company} • Applied on {formatDate(job.appliedDate)}</div>
                          </div>
                          <div className={`px-3 py-1 text-xs rounded-full ${
                            job.status === "Applied" ? "bg-blue-100 text-blue-800" : 
                            job.status === "Interview" ? "bg-green-100 text-green-800" : 
                            "bg-red-100 text-red-800"
                          }`}>
                            {job.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="saved">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : savedJobs.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                        <Star className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No saved jobs</h3>
                      <p className="text-gray-500 mb-4">You haven't saved any jobs yet.</p>
                      <Link to="/job-seeker/find-jobs">
                        <Button>Browse Jobs</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {savedJobs.map(job => (
                        <div key={job.id} className="p-4 border rounded-md bg-white">
                          <h3 className="font-medium">{job.jobTitle}</h3>
                          <div className="text-sm text-gray-500">{job.company}</div>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {job.salary}
                            </span>
                            <span className="flex items-center gap-1 text-gray-500">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              Saved on {formatDate(job.savedDate)}
                            </span>
                          </div>
                          <div className="mt-3 flex gap-2">
                            <Link to={`/job-seeker/job/${job.jobId}`}>
                              <Button size="sm">Apply Now</Button>
                            </Link>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleRemoveSavedJob(job.jobId)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 border rounded bg-gray-50">
                          <div className="text-sm text-gray-500">Full Name</div>
                          <div>{user?.name || "User"}</div>
                        </div>
                        <div className="p-3 border rounded bg-gray-50">
                          <div className="text-sm text-gray-500">Email</div>
                          <div>{user?.email}</div>
                        </div>
                        <div className="p-3 border rounded bg-gray-50">
                          <div className="text-sm text-gray-500">Location</div>
                          <div>San Francisco, CA</div>
                        </div>
                        <div className="p-3 border rounded bg-gray-50">
                          <div className="text-sm text-gray-500">Phone</div>
                          <div>+1 (555) 123-4567</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Resume</h3>
                      <div className="p-4 border rounded-md bg-white flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-6 w-6 text-gray-400" />
                          <div>
                            <div className="font-medium">resume.pdf</div>
                            <div className="text-sm text-gray-500">Uploaded on 2023-04-10</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm" variant="outline">Update</Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button>Edit Profile</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default JobSeekerDashboard;
