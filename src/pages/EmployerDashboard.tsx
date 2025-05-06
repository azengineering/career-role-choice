
import React, { useState, useEffect } from "react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Briefcase, Users, BarChart, Clock, AlertTriangle } from "lucide-react";
import ScrollToTop from "@/components/common/ScrollToTop";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter, 
  DialogClose 
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { getJobsByEmployer, deleteJob, updateJob, getJobApplications } from "@/services/jobService";
import { JobPostingData } from "@/components/employer/JobPostFormTypes";

const EmployerDashboard: React.FC = () => {
  const { isAuthenticated, userRole, user } = useAuth();
  const [activeJobs, setActiveJobs] = useState<JobPostingData[]>([]);
  const [draftJobs, setDraftJobs] = useState<JobPostingData[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [jobToDelete, setJobToDelete] = useState<JobPostingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Redirect if not authenticated or not an employer
  if (!isAuthenticated || userRole !== "employer") {
    return <Navigate to="/login" />;
  }

  // Load employer jobs
  useEffect(() => {
    if (user?.id) {
      setIsLoading(true);
      
      const employerJobs = getJobsByEmployer(user.id);
      
      // Sort jobs by active and draft status
      setActiveJobs(employerJobs.filter(job => job.status === "Active"));
      setDraftJobs(employerJobs.filter(job => job.status === "Draft"));
      
      // Get all job applications for this employer's jobs
      const jobIds = employerJobs.map(job => job.id!);
      const jobApplications = getJobApplications(jobIds);
      setApplications(jobApplications);
      
      setIsLoading(false);
    }
  }, [user?.id]);
  
  // Handle job deletion
  const handleDeleteJob = (job: JobPostingData) => {
    setJobToDelete(job);
  };
  
  const confirmDeleteJob = () => {
    if (jobToDelete && jobToDelete.id) {
      deleteJob(jobToDelete.id);
      
      // Update UI state
      if (jobToDelete.status === "Active") {
        setActiveJobs(activeJobs.filter(job => job.id !== jobToDelete.id));
      } else {
        setDraftJobs(draftJobs.filter(job => job.id !== jobToDelete.id));
      }
      
      toast({
        title: "Job deleted",
        description: `"${jobToDelete.title}" has been deleted.`,
      });
      
      setJobToDelete(null);
    }
  };
  
  // Handle closing a job
  const handleCloseJob = (jobId: number | string) => {
    updateJob(jobId, { status: "Closed" });
    
    // Update UI state
    setActiveJobs(activeJobs.filter(job => job.id !== jobId));
    
    toast({
      title: "Job closed",
      description: "The job has been closed and is no longer visible to candidates.",
    });
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
  
  // Get statistics
  const totalApplications = applications.length;
  const totalActiveJobs = activeJobs.length;
  const totalDrafts = draftJobs.length;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header userType="employer" />
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-3xl font-bold">Employer Dashboard</h1>
            <Link to="/employer/post-jobs">
              <Button className="mt-4 md:mt-0">
                <Briefcase className="mr-2 h-4 w-4" />
                Post a New Job
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-md font-medium">Active Jobs</CardTitle>
                <Briefcase className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalActiveJobs}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-md font-medium">Total Applications</CardTitle>
                <Users className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalApplications}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-md font-medium">Drafts</CardTitle>
                <Clock className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalDrafts}</div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="active">
            <TabsList className="mb-6">
              <TabsTrigger value="active">Active Jobs</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="company">Company Profile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              <Card>
                <CardHeader>
                  <CardTitle>Active Job Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : activeJobs.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                        <Briefcase className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No active jobs</h3>
                      <p className="text-gray-500 mb-4">You haven't posted any active jobs yet.</p>
                      <Link to="/employer/post-jobs">
                        <Button>Post Your First Job</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {activeJobs.map(job => {
                        const jobApplications = applications.filter(app => app.jobId == job.id);
                        return (
                          <div key={job.id} className="p-4 border rounded-md bg-white">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <div>
                                <h3 className="font-medium">{job.title}</h3>
                                <div className="text-sm text-gray-500">
                                  Posted on {formatDate(job.postedDate)} • {jobApplications.length || 0} applications
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
                                <Button size="sm" variant="outline" asChild>
                                  <Link to={`/employer/applications/${job.id}`}>View Applications</Link>
                                </Button>
                                <Button size="sm" variant="outline" asChild>
                                  <Link to={`/employer/edit-job/${job.id}`}>Edit</Link>
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-red-500 border-red-200 hover:bg-red-50"
                                  onClick={() => handleCloseJob(job.id!)}
                                >
                                  Close
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-red-500 border-red-200 hover:bg-red-50"
                                  onClick={() => handleDeleteJob(job)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="drafts">
              <Card>
                <CardHeader>
                  <CardTitle>Draft Job Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : draftJobs.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                        <Clock className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No draft jobs</h3>
                      <p className="text-gray-500 mb-4">You don't have any saved drafts.</p>
                      <Link to="/employer/post-jobs">
                        <Button>Create a New Job</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {draftJobs.map(job => (
                        <div key={job.id} className="p-4 border rounded-md bg-white">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <h3 className="font-medium">{job.title}</h3>
                              <div className="text-sm text-gray-500">Last edited on {formatDate(job.postedDate)}</div>
                            </div>
                            <div className="flex gap-2 mt-3 md:mt-0">
                              <Button size="sm" asChild>
                                <Link to={`/employer/edit-job/${job.id}`}>Continue Editing</Link>
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-red-500 border-red-200 hover:bg-red-50"
                                onClick={() => handleDeleteJob(job)}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Job Posting Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md mb-4 border">
                    <div className="text-center">
                      <BarChart className="h-12 w-12 mx-auto text-gray-400" />
                      <p className="mt-2 text-gray-500">Job posting analytics visualization</p>
                      <p className="text-sm text-gray-400">(Placeholder for actual charts)</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-md bg-white">
                      <h3 className="font-medium">Top Performing Job</h3>
                      {activeJobs.length > 0 ? (
                        <>
                          <p className="text-sm text-gray-500">{activeJobs[0].title}</p>
                          <div className="mt-2">
                            <div className="text-sm">{applications.filter(app => app.jobId == activeJobs[0].id).length || 0} applications</div>
                            <div className="text-sm">{activeJobs[0].views || 0} views</div>
                            <div className="text-sm text-green-600">
                              {activeJobs[0].views ? 
                                `${((applications.filter(app => app.jobId == activeJobs[0].id).length / activeJobs[0].views) * 100).toFixed(1)}% conversion rate` : 
                                "0% conversion rate"}
                            </div>
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-gray-500">No active jobs to analyze</p>
                      )}
                    </div>
                    <div className="p-4 border rounded-md bg-white">
                      <h3 className="font-medium">Candidate Demographics</h3>
                      <div className="mt-2 space-y-2">
                        <div className="text-sm flex justify-between">
                          <span>San Francisco</span>
                          <span>35%</span>
                        </div>
                        <div className="text-sm flex justify-between">
                          <span>Remote</span>
                          <span>25%</span>
                        </div>
                        <div className="text-sm flex justify-between">
                          <span>New York</span>
                          <span>20%</span>
                        </div>
                        <div className="text-sm flex justify-between">
                          <span>Other</span>
                          <span>20%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="company">
              <Card>
                <CardHeader>
                  <CardTitle>Company Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-20 w-20 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">Logo</div>
                      <div>
                        <h2 className="text-xl font-bold">{user?.name || "Your Company"}</h2>
                        <p className="text-sm text-gray-500">San Francisco, CA • Technology</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Company Description</h3>
                      <p className="text-gray-700">
                        {user?.name || "Your company"} is a leading technology company specializing in innovative solutions for enterprise clients. 
                        Founded in 2010, we have grown to over 500 employees worldwide with offices in San Francisco, New York, and London.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Company Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 border rounded bg-gray-50">
                          <div className="text-sm text-gray-500">Company Size</div>
                          <div>500+ employees</div>
                        </div>
                        <div className="p-3 border rounded bg-gray-50">
                          <div className="text-sm text-gray-500">Industry</div>
                          <div>Technology</div>
                        </div>
                        <div className="p-3 border rounded bg-gray-50">
                          <div className="text-sm text-gray-500">Website</div>
                          <div>www.{user?.name || "yourcompany"}.example.com</div>
                        </div>
                        <div className="p-3 border rounded bg-gray-50">
                          <div className="text-sm text-gray-500">Founded</div>
                          <div>2010</div>
                        </div>
                      </div>
                    </div>
                    
                    <Button>Edit Company Profile</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Delete Job Confirmation Dialog */}
      <Dialog open={!!jobToDelete} onOpenChange={() => setJobToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the job "{jobToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button variant="destructive" onClick={confirmDeleteJob}>
                Delete Job
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default EmployerDashboard;
