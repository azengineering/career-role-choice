
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, MoveRight } from "lucide-react";

interface HeroSectionProps {
  userType: "job-seeker" | "employer";
}

const HeroSection: React.FC<HeroSectionProps> = ({ userType }) => {
  const heroContent = {
    "job-seeker": {
      title: "Find Your Dream Job with AI-Powered Matching",
      description: "Discover opportunities perfectly aligned with your skills and aspirations. Our AI technology connects you with employers who value what you bring to the table.",
      primaryCta: "Explore Jobs",
      primaryCtaLink: "/job-seeker/find-jobs",
      secondaryCta: "Create Profile",
      secondaryCtaLink: "/signup",
      image: "/jobseeker-hero.svg"
    },
    "employer": {
      title: "Find Perfect Candidates with Advanced AI Matching",
      description: "Connect with qualified candidates faster than ever. Our AI-powered recruitment tools help you find the right talent for your organization.",
      primaryCta: "Post a Job",
      primaryCtaLink: "/employer/post-jobs",
      secondaryCta: "Learn More",
      secondaryCtaLink: "/employer/about",
      image: "/employer-hero.svg"
    }
  };
  
  const content = heroContent[userType];
  
  return (
    <div className="bg-gradient-to-br from-ai-primary/10 to-ai-accent/5 py-16 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Decorative circles */}
        <div className="hidden md:block absolute top-0 right-0 w-64 h-64 rounded-full bg-ai-primary/5 -mr-32 -mt-32"></div>
        <div className="hidden md:block absolute bottom-0 left-0 w-48 h-48 rounded-full bg-ai-accent/5 -ml-24 -mb-24"></div>
        
        <div className="flex flex-col md:flex-row items-center z-10 relative">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
            <div className="bg-white/30 backdrop-blur-sm inline-block px-4 py-1 rounded-full text-ai-primary font-medium text-sm mb-4 border border-ai-primary/20 shadow-sm">
              {userType === "job-seeker" ? "For Job Seekers" : "For Employers"}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
              {content.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl leading-relaxed">
              {content.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={content.primaryCtaLink}>
                <Button size="lg" className="w-full sm:w-auto rounded-lg transition-all duration-300 shadow-lg hover:shadow-ai-primary/20">
                  <Sparkles className="mr-2 h-4 w-4" />
                  {content.primaryCta}
                </Button>
              </Link>
              <Link to={content.secondaryCtaLink}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-lg border-2 hover:bg-gray-50 transition-colors duration-300">
                  {content.secondaryCta}
                  <MoveRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white rounded-xl shadow-xl p-3 transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <img
                src="/placeholder.svg"
                alt={`${userType === "job-seeker" ? "Job seeker" : "Employer"} illustration`}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
