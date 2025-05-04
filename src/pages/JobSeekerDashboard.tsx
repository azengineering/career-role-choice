
import React from "react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Briefcase, FileText, Bell, Clock, Star } from "lucide-react";
import ScrollToTop from "@/components/common/ScrollToTop";

const JobSeekerDashboard: React.FC = () => {
  const { isAuthenticated, userRole } = useAuth();
  
  // Redirect if not authenticated or not a job seeker
  if (!isAuthenticated || userRole !== "job-seeker") {
    return <Navigate to="/login" />;
  }

  // Mock data for demo purposes
  const appliedJobs = [
    { id: 1, title: "Front-end Developer", company: "TechCorp", status: "Applied", date: "2023-05-01" },
    { id: 2, title: "UX Designer", company: "DesignStudio", status: "Interview", date: "2023-04-28" },
    { id: 3, title: "Product Manager", company: "InnovateTech", status: "Rejected", date: "2023-04-15" }
  ];

  const savedJobs = [
    { id: 4, title: "Data Analyst", company: "DataDriven", location: "Remote", salary: "$80,000 - $100,000" },
    { id: 5, title: "Marketing Specialist", company: "GrowthHackers", location: "New York, NY", salary: "$75,000 - $95,000" }
  ];
  
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
                <FileText className="h-5 w-5 text-muted-foreground" />
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
                  <div className="space-y-4">
                    {appliedJobs.map(job => (
                      <div key={job.id} className="p-4 border rounded-md bg-white flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{job.title}</h3>
                          <div className="text-sm text-gray-500">{job.company} • Applied on {job.date}</div>
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
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="saved">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {savedJobs.map(job => (
                      <div key={job.id} className="p-4 border rounded-md bg-white">
                        <h3 className="font-medium">{job.title}</h3>
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
                        </div>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm">Apply Now</Button>
                          <Button size="sm" variant="outline">Remove</Button>
                        </div>
                      </div>
                    ))}
                  </div>
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
                          <div>John Doe</div>
                        </div>
                        <div className="p-3 border rounded bg-gray-50">
                          <div className="text-sm text-gray-500">Email</div>
                          <div>john.doe@example.com</div>
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
