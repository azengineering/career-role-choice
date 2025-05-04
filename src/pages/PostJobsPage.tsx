
import React from "react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import ScrollToTop from "@/components/common/ScrollToTop";
import JobPostForm from "@/components/employer/JobPostForm";
import { Link } from "react-router-dom";

const PostJobsPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Header userType="employer" />
      <main className="flex-grow">
        <div className="bg-gradient-to-br from-ai-primary/10 to-ai-accent/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">Post a Job</h1>
              <p className="text-xl text-gray-700">
                Reach thousands of qualified candidates with your job listing
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {isAuthenticated ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Job Details</h2>
                <JobPostForm />
              </div>
              
              <div className="mt-8 bg-ai-primary/10 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Need More Job Postings?</h3>
                <p className="mb-6">
                  Save with our multi-job packages or get a custom solution for your recruitment needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline">View Packages</Button>
                  <Button variant="secondary">Contact Sales</Button>
                </div>
              </div>
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
