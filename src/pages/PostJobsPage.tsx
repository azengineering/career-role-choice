
import React from "react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import ScrollToTop from "@/components/common/ScrollToTop";
import JobPostForm from "@/components/employer/JobPostForm";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Briefcase, PlusCircle, Info, Clock, FileText } from "lucide-react";

const PostJobsPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Header userType="employer" />
      <main className="flex-grow">
        <div className="bg-gradient-to-br from-purple-100 to-blue-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4 text-gray-800">Post a Job</h1>
              <p className="text-xl text-gray-700">
                Create an effective job posting to attract qualified candidates
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {isAuthenticated ? (
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                {/* Job Posting Stats */}
                <Card className="col-span-12 md:col-span-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-primary" />
                      Quick Stats
                    </CardTitle>
                    <CardDescription>Your job posting activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-500">Active Jobs</p>
                        <p className="text-2xl font-semibold">2</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-500">Applications</p>
                        <p className="text-2xl font-semibold">14</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-500">Views</p>
                        <p className="text-2xl font-semibold">156</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-500">Drafts</p>
                        <p className="text-2xl font-semibold">1</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tips Card */}
                <Card className="col-span-12 md:col-span-8 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Info className="h-5 w-5 mr-2 text-blue-500" />
                      Tips for Effective Job Postings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-400">
                        <h3 className="font-semibold mb-1">Be Specific</h3>
                        <p className="text-sm text-gray-600">Clear job titles and descriptions attract more qualified candidates.</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-400">
                        <h3 className="font-semibold mb-1">Highlight Benefits</h3>
                        <p className="text-sm text-gray-600">Mention perks, growth opportunities, and company culture.</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-amber-400">
                        <h3 className="font-semibold mb-1">Use Keywords</h3>
                        <p className="text-sm text-gray-600">Industry-specific terms help your job appear in relevant searches.</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-400">
                        <h3 className="font-semibold mb-1">Mobile Friendly</h3>
                        <p className="text-sm text-gray-600">Many candidates apply from their phones - keep it concise.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Post Job Form Section */}
              <Card className="bg-white rounded-lg shadow-lg">
                <CardHeader className="border-b bg-gray-50 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-800">Job Details</CardTitle>
                      <CardDescription>Fill in the information below to create your job posting</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Link to="/employer/dashboard">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>View Drafts</span>
                        </Button>
                      </Link>
                      <Link to="/employer/dashboard">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          <span>My Postings</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <JobPostForm />
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Login Required</h2>
              <p className="text-gray-600 mb-6">
                You need to be logged in as an employer to post jobs. Please log in or create an account to continue.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline">Sign Up</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default PostJobsPage;
