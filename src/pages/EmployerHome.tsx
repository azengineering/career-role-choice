
import React from "react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/common/Footer";
import HeroSection from "@/components/homepage/HeroSection";
import { Button } from "@/components/ui/button";

const EmployerHome: React.FC = () => {
  // Example talent pool statistics
  const stats = [
    { value: "25,000+", label: "Active Job Seekers" },
    { value: "150+", label: "Skills & Specializations" },
    { value: "85%", label: "Placement Success Rate" },
    { value: "15 Days", label: "Average Time to Hire" }
  ];

  // Example company testimonials
  const testimonials = [
    {
      quote: "Jobs-Here revolutionized our hiring process. We found qualified candidates faster than ever before.",
      author: "Sarah Johnson",
      position: "HR Director",
      company: "TechGrowth Inc."
    },
    {
      quote: "The AI matching technology saved us countless hours of manual resume screening. Highly recommended!",
      author: "Michael Chen",
      position: "Talent Acquisition Lead",
      company: "InnovateNow"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header userType="employer" />
      <main className="flex-grow">
        <HeroSection userType="employer" />
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Talent Pool</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Access a diverse pool of pre-screened candidates ready to join your team
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow text-center">
                  <p className="text-3xl md:text-4xl font-bold text-ai-primary mb-2">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button size="lg">
                Post a Job
              </Button>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our streamlined process connects you with qualified candidates quickly
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="bg-ai-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-ai-accent font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Post Your Job</h3>
                <p className="text-gray-600">
                  Create a detailed job listing with requirements, responsibilities, and company culture.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="bg-ai-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-ai-accent font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">AI Candidate Matching</h3>
                <p className="text-gray-600">
                  Our AI identifies and ranks candidates based on skills, experience, and cultural fit.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="bg-ai-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-ai-accent font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Interview & Hire</h3>
                <p className="text-gray-600">
                  Connect with top candidates, conduct interviews, and make your hiring decision.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-ai-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Recruiter Tools</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Powerful tools to streamline your recruiting process and find the best talent
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-white p-6 rounded-lg shadow flex flex-col md:flex-row gap-4 items-start">
                <div className="bg-ai-primary/10 p-3 rounded-lg">
                  <svg className="w-8 h-8 text-ai-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">AI Screening Assistant</h3>
                  <p className="text-gray-600 mb-4">
                    Save time by letting our AI pre-screen candidates, assess skills, and identify top matches for your open positions.
                  </p>
                  <a href="/employer/recruiter-tools" className="text-ai-primary hover:underline">
                    Learn More →
                  </a>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow flex flex-col md:flex-row gap-4 items-start">
                <div className="bg-ai-primary/10 p-3 rounded-lg">
                  <svg className="w-8 h-8 text-ai-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Team Fit Analysis</h3>
                  <p className="text-gray-600 mb-4">
                    Evaluate how candidates will complement your existing team's skills, working styles, and company culture.
                  </p>
                  <a href="/employer/recruiter-tools" className="text-ai-primary hover:underline">
                    Try It Now →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">What Employers Say</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg relative">
                  <svg className="absolute top-4 left-4 w-10 h-10 text-ai-primary/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.999v10h-9.999z" />
                  </svg>
                  <div className="ml-8">
                    <p className="italic text-gray-700 mb-6">{testimonial.quote}</p>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.position}, {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-ai-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Find Your Next Great Hire?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of companies who trust Jobs-Here to find qualified candidates faster
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-ai-dark hover:bg-gray-100">
                Post a Job
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EmployerHome;
