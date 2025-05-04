
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Briefcase } from "lucide-react";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Logo from "@/components/common/Logo";
import { useAuth } from "@/context/AuthContext";

const Welcome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setSelectedRole, isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If already authenticated, redirect to the proper landing page
    if (isAuthenticated && userRole) {
      navigate(userRole === "job-seeker" ? "/job-seeker" : "/employer");
      return;
    }
    
    // Simulate loading for a smoother entrance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, userRole, navigate]);
  
  const handleRoleSelect = (role: "job-seeker" | "employer") => {
    setSelectedRole(role);
    navigate(role === "job-seeker" ? "/job-seeker" : "/employer");
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-ai-primary/5 to-ai-accent/5">
        <Logo />
        <div className="mt-8">
          <LoadingSpinner />
        </div>
        <p className="mt-4 text-lg text-gray-600">Preparing your experience...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-ai-primary/10 to-ai-accent/5 p-4">
      <div className="text-center mb-12 animate-scale-in">
        <Logo />
        <h1 className="mt-8 text-4xl md:text-5xl font-bold">Welcome to Jobs-Here</h1>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl">
          Your AI-powered job matching platform connecting talent with opportunities
        </p>
      </div>
      
      <div className="w-full max-w-4xl animate-scale-in">
        <h2 className="text-2xl font-semibold mb-6 text-center">I am looking for:</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer hover:border-ai-primary/50 flex flex-col items-center text-center">
            <div 
              onClick={() => handleRoleSelect("job-seeker")}
              className="w-full h-full flex flex-col items-center"
            >
              <div className="bg-ai-primary/10 p-4 rounded-full mb-6">
                <Sparkles size={40} className="text-ai-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Job Opportunities</h3>
              <p className="text-gray-600 mb-6">
                Find your dream job with AI-powered matching that understands your skills and aspirations.
              </p>
              <Button size="lg" className="mt-auto">
                I'm a Job Seeker
              </Button>
            </div>
          </Card>
          
          <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer hover:border-ai-accent/50 flex flex-col items-center text-center">
            <div 
              onClick={() => handleRoleSelect("employer")}
              className="w-full h-full flex flex-col items-center"
            >
              <div className="bg-ai-accent/10 p-4 rounded-full mb-6">
                <Briefcase size={40} className="text-ai-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Great Talent</h3>
              <p className="text-gray-600 mb-6">
                Find the perfect candidates quickly and efficiently with our advanced AI matching technology.
              </p>
              <Button size="lg" variant="outline" className="mt-auto">
                I'm an Employer
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
