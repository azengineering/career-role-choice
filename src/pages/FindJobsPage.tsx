
import React from "react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import JobCard from "@/components/jobseeker/JobCard";
import ScrollToTop from "@/components/common/ScrollToTop";

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
                  <JobCard key={job.id} job={job} />
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
      <ScrollToTop />
    </div>
  );
};

export default FindJobsPage;
