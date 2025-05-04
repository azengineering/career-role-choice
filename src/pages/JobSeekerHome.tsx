
import React from "react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/common/Footer";
import HeroSection from "@/components/homepage/HeroSection";
import { Button } from "@/components/ui/button";
import { BookOpen, Building, Clock, MapPin, Briefcase } from "lucide-react";

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
      postedDate: "2 days ago",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "InnovateTech",
      location: "Remote",
      type: "Full-time",
      salary: "$100,000 - $150,000",
      description: "Join our product team and help shape the future of our platform...",
      postedDate: "5 days ago",
    },
    {
      id: 3,
      title: "Marketing Specialist",
      company: "GrowthHackers",
      location: "New York, NY",
      type: "Full-time",
      salary: "$75,000 - $95,000",
      description: "Drive our marketing initiatives and help us reach new audiences...",
      postedDate: "1 week ago",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header userType="job-seeker" />
      <main className="flex-grow">
        <HeroSection userType="job-seeker" />
        
        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">How It Works</h2>
              <div className="h-1 w-24 bg-ai-primary mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our AI-powered platform makes finding your dream job simpler than ever
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-md text-center border-t-4 border-ai-primary transition-transform duration-300 hover:translate-y-[-5px]">
                <div className="bg-ai-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-ai-primary font-bold text-2xl">1</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Create Your Profile</h3>
                <p className="text-gray-600">
                  Build your professional profile highlighting your skills, experience, and career goals.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md text-center border-t-4 border-ai-primary transition-transform duration-300 hover:translate-y-[-5px]">
                <div className="bg-ai-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-ai-primary font-bold text-2xl">2</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">AI Matching</h3>
                <p className="text-gray-600">
                  Our AI analyzes your profile and matches you with jobs that align with your career aspirations.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md text-center border-t-4 border-ai-primary transition-transform duration-300 hover:translate-y-[-5px]">
                <div className="bg-ai-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-ai-primary font-bold text-2xl">3</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Apply With Confidence</h3>
                <p className="text-gray-600">
                  Apply to jobs knowing you're a great match and use our tools to stand out to employers.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Jobs Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Featured Jobs</h2>
                <div className="h-1 w-24 bg-ai-accent mt-4 mb-2"></div>
                <p className="text-gray-600">Discover opportunities that match your profile</p>
              </div>
              <a href="/job-seeker/find-jobs" className="text-ai-primary hover:text-ai-accent flex items-center mt-4 md:mt-0 font-medium transition-colors duration-300">
                View all jobs 
                <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1 text-gray-800">{job.title}</h3>
                        <div className="flex items-center text-gray-600">
                          <Building className="w-4 h-4 mr-1" />
                          <p>{job.company}</p>
                        </div>
                      </div>
                      <span className="bg-ai-primary/10 text-ai-primary text-sm px-3 py-1 rounded-full font-medium">
                        {job.type}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{job.location}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-500 text-sm">
                        <Briefcase className="w-4 h-4 mr-1" />
                        <span>{job.salary}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{job.postedDate}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-6 line-clamp-2">
                      {job.description}
                    </p>
                    
                    <Button className="w-full rounded-md flex items-center justify-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Career Tools Section */}
        <section className="py-20 bg-gradient-to-br from-ai-primary/5 to-ai-accent/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Career Tools for Job Seekers</h2>
              <div className="h-1 w-24 bg-ai-accent mx-auto mb-6"></div>
              <p className="text-lg text-gray-600">
                Accelerate your job search with our AI-powered tools designed to help you stand out
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-md flex flex-col md:flex-row gap-6 items-start transition-transform duration-300 hover:translate-y-[-5px]">
                <div className="bg-ai-accent/10 p-4 rounded-xl">
                  <svg className="w-10 h-10 text-ai-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">AI Resume Builder</h3>
                  <p className="text-gray-600 mb-4">
                    Create a professional, ATS-friendly resume tailored to your target roles. Our AI optimizes your content for maximum impact.
                  </p>
                  <a href="/job-seeker/job-tools" className="text-ai-primary hover:text-ai-accent flex items-center font-medium transition-colors duration-300">
                    Build Your Resume
                    <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md flex flex-col md:flex-row gap-6 items-start transition-transform duration-300 hover:translate-y-[-5px]">
                <div className="bg-ai-accent/10 p-4 rounded-xl">
                  <svg className="w-10 h-10 text-ai-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Interview Preparation</h3>
                  <p className="text-gray-600 mb-4">
                    Practice with our AI interviewer that simulates real interview scenarios and provides feedback to help you improve.
                  </p>
                  <a href="/job-seeker/job-tools" className="text-ai-primary hover:text-ai-accent flex items-center font-medium transition-colors duration-300">
                    Start Practicing
                    <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
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
