
import React from "react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const FindJobsPage: React.FC = () => {
  // Mock job listings
  const jobListings = [
    {
      id: 1,
      title: "Front-end Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$90,000 - $120,000",
      description: "We are seeking a skilled Front-end Developer to join our team and create responsive, user-friendly web applications. The ideal candidate should have experience with React, TypeScript, and modern CSS frameworks.",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      posted: "2 days ago",
      matchScore: 95
    },
    {
      id: 2,
      title: "Product Manager",
      company: "InnovateTech",
      location: "Remote",
      type: "Full-time",
      salary: "$100,000 - $150,000",
      description: "Join our product team and help shape the future of our platform. You'll work closely with engineering, design, and marketing to deliver features that delight our users.",
      tags: ["Product Strategy", "Agile", "User Research"],
      posted: "1 week ago",
      matchScore: 88
    },
    {
      id: 3,
      title: "Marketing Specialist",
      company: "GrowthHackers",
      location: "New York, NY",
      type: "Full-time",
      salary: "$75,000 - $95,000",
      description: "Drive our marketing initiatives and help us reach new audiences. The ideal candidate will have experience with digital marketing, content creation, and analytics.",
      tags: ["Digital Marketing", "Content Strategy", "Analytics"],
      posted: "3 days ago",
      matchScore: 82
    },
    {
      id: 4,
      title: "UX Designer",
      company: "DesignLab",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$85,000 - $110,000",
      description: "Create intuitive, engaging user experiences for our suite of products. You'll conduct user research, create wireframes and prototypes, and collaborate with developers to bring your designs to life.",
      tags: ["UI/UX", "Figma", "User Testing"],
      posted: "Just now",
      matchScore: 91
    },
    {
      id: 5,
      title: "Data Analyst",
      company: "DataDriven",
      location: "Chicago, IL",
      type: "Full-time",
      salary: "$80,000 - $100,000",
      description: "Transform complex data into actionable insights. You'll work with large datasets, build dashboards, and help teams make data-driven decisions.",
      tags: ["SQL", "Python", "Data Visualization"],
      posted: "5 days ago",
      matchScore: 79
    },
    {
      id: 6,
      title: "Customer Success Manager",
      company: "SupportPro",
      location: "Remote",
      type: "Full-time",
      salary: "$70,000 - $90,000",
      description: "Ensure our customers achieve their goals using our product. You'll onboard new users, provide training, and serve as their advocate within the company.",
      tags: ["Customer Service", "SaaS", "Relationship Management"],
      posted: "2 weeks ago",
      matchScore: 86
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header userType="job-seeker" />
      <main className="flex-grow bg-gray-50">
        <div className="bg-gradient-to-br from-ai-primary/10 to-ai-accent/5 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6">Find Your Perfect Job</h1>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1">
                  <Input placeholder="Job title, keywords, or company" />
                </div>
                <div className="col-span-1">
                  <Input placeholder="Location or 'Remote'" />
                </div>
                <div className="col-span-1">
                  <Button className="w-full">Search Jobs</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-6">Filters</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Job Type</h3>
                    <div className="space-y-2">
                      {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
                        <div key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            id={type}
                            className="rounded border-gray-300 text-ai-primary focus:ring-ai-primary"
                          />
                          <label htmlFor={type} className="ml-2 text-sm text-gray-700">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Experience Level</h3>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="mid">Mid-Level</SelectItem>
                        <SelectItem value="senior">Senior</SelectItem>
                        <SelectItem value="exec">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Salary Range</h3>
                    <div className="mt-6 px-2">
                      <Slider defaultValue={[50000, 150000]} min={0} max={200000} step={10000} />
                      <div className="flex justify-between mt-2">
                        <span className="text-sm text-gray-600">$0</span>
                        <span className="text-sm text-gray-600">$200K+</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Remote Options</h3>
                    <div className="space-y-2">
                      {["Remote", "Hybrid", "On-site"].map((option) => (
                        <div key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            id={option}
                            className="rounded border-gray-300 text-ai-primary focus:ring-ai-primary"
                          />
                          <label htmlFor={option} className="ml-2 text-sm text-gray-700">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Job Listings */}
            <div className="lg:w-3/4">
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h2 className="text-xl font-bold">
                  Showing {jobListings.length} results
                </h2>
                <div className="mt-2 sm:mt-0">
                  <Select defaultValue="relevance">
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Most Relevant</SelectItem>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="salary-high">Highest Salary</SelectItem>
                      <SelectItem value="salary-low">Lowest Salary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-6">
                {jobListings.map((job) => (
                  <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                          <p className="text-gray-600">{job.company}</p>
                        </div>
                        <div className="flex items-center bg-ai-primary/10 text-ai-primary rounded-full px-3 py-1">
                          <span className="text-sm font-medium">{job.matchScore}% Match</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mb-4 text-sm">
                        <span className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.location}
                        </span>
                        
                        <span className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {job.type}
                        </span>
                        
                        <span className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {job.salary}
                        </span>
                        
                        <span className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Posted {job.posted}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-4 line-clamp-2">
                        {job.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button className="sm:w-auto">Apply Now</Button>
                        <Button variant="outline" className="sm:w-auto">Save Job</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="mr-2">&lt; Previous</Button>
                <Button variant="outline" className="mx-1">1</Button>
                <Button variant="outline" className="mx-1">2</Button>
                <Button variant="outline" className="mx-1">3</Button>
                <Button variant="outline" className="ml-2">Next &gt;</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FindJobsPage;
