
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

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
    <div className="bg-gradient-to-br from-ai-primary/10 to-ai-accent/5 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {content.title}
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-lg">
              {content.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={content.primaryCtaLink}>
                <Button size="lg" className="w-full sm:w-auto">
                  <Sparkles className="mr-2 h-4 w-4" />
                  {content.primaryCta}
                </Button>
              </Link>
              <Link to={content.secondaryCtaLink}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  {content.secondaryCta}
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white p-2 rounded-lg shadow-lg">
              <img
                src="/placeholder.svg"
                alt={`${userType === "job-seeker" ? "Job seeker" : "Employer"} illustration`}
                className="w-full h-auto rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
