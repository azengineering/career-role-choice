
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
        <div className="bg-gradient-to-br from-primary/10 to-accent/5 py-16">
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
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Job Details</h2>
                <JobPostForm />
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
