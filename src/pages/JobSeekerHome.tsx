import React from "react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/common/Footer";
import HeroSection from "@/components/homepage/HeroSection";
import { Button } from "@/components/ui/button";

const JobSeekerHome: React.FC = () => {
  // Featured job listings
  const featuredJobs = [
    {
      id: 1,
      title: "Front-end Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$90,000 - $120,000",
      description: "We are seeking a skilled Front-end Developer to join our team...",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "InnovateTech",
      location: "Remote",
      type: "Full-time",
      salary: "$100,000 - $150,000",
      description: "Join our product team and help shape the future of our platform...",
    },
    {
      id: 3,
      title: "Marketing Specialist",
      company: "GrowthHackers",
      location: "New York, NY",
      type: "Full-time",
      salary: "$75,000 - $95,000",
      description: "Drive our marketing initiatives and help us reach new audiences...",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header userType="job-seeker" />
      <main className="flex-grow">
        <HeroSection userType="job-seeker" />
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our AI-powered platform makes finding your dream job simpler than ever
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="bg-ai-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-ai-primary font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Create Your Profile</h3>
                <p className="text-gray-600">
                  Build your professional profile highlighting your skills, experience, and career goals.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="bg-ai-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-ai-primary font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">AI Matching</h3>
                <p className="text-gray-600">
                  Our AI analyzes your profile and matches you with jobs that align with your career aspirations.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="bg-ai-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-ai-primary font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Apply With Confidence</h3>
                <p className="text-gray-600">
                  Apply to jobs knowing you're a great match and use our tools to stand out to employers.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
              <h2 className="text-3xl font-bold">Featured Jobs</h2>
              <a href="/job-seeker/find-jobs" className="text-ai-primary hover:underline mt-4 md:mt-0">
                View all jobs →
              </a>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                        <p className="text-gray-600">{job.company}</p>
                      </div>
                      <span className="bg-ai-primary/10 text-ai-primary text-sm px-2 py-1 rounded">
                        {job.type}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-2">📍 {job.location}</p>
                    <p className="text-sm font-medium mb-4">💰 {job.salary}</p>
                    
                    <p className="text-sm text-gray-700 mb-6 line-clamp-2">
                      {job.description}
                    </p>
                    
                    <Button className="w-full">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-ai-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Career Tools for Job Seekers</h2>
              <p className="text-lg text-gray-600">
                Accelerate your job search with our AI-powered tools designed to help you stand out
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-white p-6 rounded-lg shadow flex flex-col md:flex-row gap-4 items-start">
                <div className="bg-ai-accent/10 p-3 rounded-lg">
                  <svg className="w-8 h-8 text-ai-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">AI Resume Builder</h3>
                  <p className="text-gray-600 mb-4">
                    Create a professional, ATS-friendly resume tailored to your target roles. Our AI optimizes your content for maximum impact.
                  </p>
                  <a href="/job-seeker/job-tools" className="text-ai-primary hover:underline">
                    Build Your Resume →
                  </a>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow flex flex-col md:flex-row gap-4 items-start">
                <div className="bg-ai-accent/10 p-3 rounded-lg">
                  <svg className="w-8 h-8 text-ai-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Interview Preparation</h3>
                  <p className="text-gray-600 mb-4">
                    Practice with our AI interviewer that simulates real interview scenarios and provides feedback to help you improve.
                  </p>
                  <a href="/job-seeker/job-tools" className="text-ai-primary hover:underline">
                    Start Practicing →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default JobSeekerHome;
