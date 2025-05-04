
import React from "react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Briefcase, Users, Bar, Clock } from "lucide-react";
import ScrollToTop from "@/components/common/ScrollToTop";

const EmployerDashboard: React.FC = () => {
  const { isAuthenticated, userRole } = useAuth();
  
  // Redirect if not authenticated or not an employer
  if (!isAuthenticated || userRole !== "employer") {
    return <Navigate to="/login" />;
  }

  // Mock data for demo purposes
  const activeJobs = [
    { id: 1, title: "Front-end Developer", applications: 12, posted: "2023-05-01", status: "Active" },
    { id: 2, title: "UI/UX Designer", applications: 8, posted: "2023-04-28", status: "Active" }
  ];

  const draftJobs = [
    { id: 3, title: "Marketing Specialist", lastEdited: "2023-04-30" }
  ];
  
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
                <div className="text-3xl font-bold">{activeJobs.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-md font-medium">Total Applications</CardTitle>
                <Users className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{activeJobs.reduce((acc, job) => acc + job.applications, 0)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-md font-medium">Drafts</CardTitle>
                <Clock className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{draftJobs.length}</div>
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
                  <div className="space-y-4">
                    {activeJobs.map(job => (
                      <div key={job.id} className="p-4 border rounded-md bg-white">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h3 className="font-medium">{job.title}</h3>
                            <div className="text-sm text-gray-500">Posted on {job.posted} • {job.applications} applications</div>
                          </div>
                          <div className="flex gap-2 mt-3 md:mt-0">
                            <Button size="sm" variant="outline">View Applications</Button>
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">Close</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="drafts">
              <Card>
                <CardHeader>
                  <CardTitle>Draft Job Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {draftJobs.map(job => (
                      <div key={job.id} className="p-4 border rounded-md bg-white">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h3 className="font-medium">{job.title}</h3>
                            <div className="text-sm text-gray-500">Last edited on {job.lastEdited}</div>
                          </div>
                          <div className="flex gap-2 mt-3 md:mt-0">
                            <Button size="sm">Continue Editing</Button>
                            <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">Delete</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
                      <Bar className="h-12 w-12 mx-auto text-gray-400" />
                      <p className="mt-2 text-gray-500">Job posting analytics visualization</p>
                      <p className="text-sm text-gray-400">(Placeholder for actual charts)</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-md bg-white">
                      <h3 className="font-medium">Top Performing Job</h3>
                      <p className="text-sm text-gray-500">Front-end Developer</p>
                      <div className="mt-2">
                        <div className="text-sm">12 applications</div>
                        <div className="text-sm">425 views</div>
                        <div className="text-sm text-green-600">2.8% conversion rate</div>
                      </div>
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
                        <h2 className="text-xl font-bold">TechCorp Inc.</h2>
                        <p className="text-sm text-gray-500">San Francisco, CA • Technology</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Company Description</h3>
                      <p className="text-gray-700">
                        TechCorp is a leading technology company specializing in innovative solutions for enterprise clients. 
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
                          <div>www.techcorp.example.com</div>
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
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default EmployerDashboard;
