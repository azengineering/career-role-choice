
import React, { useState, useEffect } from "react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import JobCard from "@/components/jobseeker/JobCard";
import ScrollToTop from "@/components/common/ScrollToTop";
import { JobPostingData } from "@/components/employer/JobPostFormTypes";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter } from "lucide-react";

const FindJobsPage: React.FC = () => {
  const [jobListings, setJobListings] = useState<JobPostingData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [jobType, setJobType] = useState<string[]>([]);
  const [remoteOptions, setRemoteOptions] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 200]);
  const [sortOrder, setSortOrder] = useState("relevance");
  
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would fetch from an API
    // Here we're simulating fetching job listings
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        // Mock data - in a real app, this would be an API call
        // Transforming the mock data to match our JobPostingData interface
        const mockJobs: JobPostingData[] = [
          {
            id: 1,
            title: "Front-end Developer",
            company: "TechCorp",
            location: "San Francisco, CA",
            type: "Full-time",
            minSalary: 90,
            maxSalary: 120,
            minExperience: 2,
            maxExperience: 5,
            description: "We are seeking a skilled Front-end Developer to join our team and create responsive, user-friendly web applications. The ideal candidate should have experience with React, TypeScript, and modern CSS frameworks.",
            skills: ["React", "TypeScript", "Tailwind CSS"],
            vacancies: 2,
            industry: "Technology",
            customQuestions: [],
            postedDate: "2024-05-03", // 2 days ago
            tags: ["React", "TypeScript", "Tailwind CSS"],
            matchScore: 95
          },
          {
            id: 2,
            title: "Product Manager",
            company: "InnovateTech",
            location: "Remote",
            type: "Full-time",
            minSalary: 100,
            maxSalary: 150,
            minExperience: 3,
            maxExperience: 7,
            description: "Join our product team and help shape the future of our platform. You'll work closely with engineering, design, and marketing to deliver features that delight our users.",
            skills: ["Product Strategy", "Agile", "User Research"],
            vacancies: 1,
            industry: "Technology",
            customQuestions: [],
            postedDate: "2024-04-28", // 1 week ago
            tags: ["Product Strategy", "Agile", "User Research"],
            matchScore: 88
          },
          {
            id: 3,
            title: "Marketing Specialist",
            company: "GrowthHackers",
            location: "New York, NY",
            type: "Full-time",
            minSalary: 75,
            maxSalary: 95,
            minExperience: 1,
            maxExperience: 4,
            description: "Drive our marketing initiatives and help us reach new audiences. The ideal candidate will have experience with digital marketing, content creation, and analytics.",
            skills: ["Digital Marketing", "Content Strategy", "Analytics"],
            vacancies: 3,
            industry: "Marketing",
            customQuestions: [],
            postedDate: "2024-05-02", // 3 days ago
            tags: ["Digital Marketing", "Content Strategy", "Analytics"],
            matchScore: 82
          },
          {
            id: 4,
            title: "UX Designer",
            company: "DesignLab",
            location: "Austin, TX",
            type: "Full-time",
            minSalary: 85,
            maxSalary: 110,
            minExperience: 2,
            maxExperience: 6,
            description: "Create intuitive, engaging user experiences for our suite of products. You'll conduct user research, create wireframes and prototypes, and collaborate with developers to bring your designs to life.",
            skills: ["UI/UX", "Figma", "User Testing"],
            vacancies: 1,
            industry: "Design",
            customQuestions: [],
            postedDate: "2024-05-05", // Just now
            tags: ["UI/UX", "Figma", "User Testing"],
            matchScore: 91
          },
          {
            id: 5,
            title: "Data Analyst",
            company: "DataDriven",
            location: "Chicago, IL",
            type: "Full-time",
            minSalary: 80,
            maxSalary: 100,
            minExperience: 1,
            maxExperience: 3,
            description: "Transform complex data into actionable insights. You'll work with large datasets, build dashboards, and help teams make data-driven decisions.",
            skills: ["SQL", "Python", "Data Visualization"],
            vacancies: 2,
            industry: "Data",
            customQuestions: [],
            postedDate: "2024-04-30", // 5 days ago
            tags: ["SQL", "Python", "Data Visualization"],
            matchScore: 79
          },
          {
            id: 6,
            title: "Customer Success Manager",
            company: "SupportPro",
            location: "Remote",
            type: "Full-time",
            minSalary: 70,
            maxSalary: 90,
            minExperience: 2,
            maxExperience: 5,
            description: "Ensure our customers achieve their goals using our product. You'll onboard new users, provide training, and serve as their advocate within the company.",
            skills: ["Customer Service", "SaaS", "Relationship Management"],
            vacancies: 1,
            industry: "Customer Service",
            customQuestions: [],
            postedDate: "2024-04-21", // 2 weeks ago
            tags: ["Customer Service", "SaaS", "Relationship Management"],
            matchScore: 86
          },
        ];
        
        setJobListings(mockJobs);
        setIsLoading(false);
      } catch (error) {
        toast({
          title: "Error loading jobs",
          description: "Failed to load job listings. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };
    
    fetchJobs();
  }, [toast]);

  // Handle job type checkbox change
  const handleJobTypeChange = (type: string) => {
    if (jobType.includes(type)) {
      setJobType(jobType.filter(t => t !== type));
    } else {
      setJobType([...jobType, type]);
    }
  };

  // Handle remote options checkbox change
  const handleRemoteOptionChange = (option: string) => {
    if (remoteOptions.includes(option)) {
      setRemoteOptions(remoteOptions.filter(o => o !== option));
    } else {
      setRemoteOptions([...remoteOptions, option]);
    }
  };

  // Apply filters
  const applyFilters = () => {
    // In a real app, this would update an API call with filter parameters
    toast({
      title: "Filters applied",
      description: "Job listings have been filtered based on your criteria.",
    });
  };

  // Format date relative to today
  const formatPostedDate = (dateString: string | undefined) => {
    if (!dateString) return "Recently";
    
    const postedDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - postedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Just now";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return "1 week ago";
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 60) return "1 month ago";
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  // Format salary range
  const formatSalaryRange = (min: number, max: number) => {
    return `₹${min} - ${max} LPA`;
  };

  // Filter jobs based on search term and filters
  const filteredJobs = jobListings
    .filter(job => {
      // Search term filter
      if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !job.company.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return false;
      }
      
      // Location filter
      if (locationFilter && !job.location.toLowerCase().includes(locationFilter.toLowerCase())) {
        return false;
      }
      
      // Job type filter
      if (jobType.length > 0 && !jobType.includes(job.type)) {
        return false;
      }
      
      // Remote options filter
      if (remoteOptions.length > 0) {
        const isRemote = job.location.toLowerCase().includes("remote");
        const isHybrid = job.location.toLowerCase().includes("hybrid");
        const isOnSite = !isRemote && !isHybrid;
        
        if (remoteOptions.includes("Remote") && !isRemote) {
          if (!remoteOptions.includes("Hybrid") && !remoteOptions.includes("On-site")) {
            return false;
          }
        }
        
        if (remoteOptions.includes("Hybrid") && !isHybrid) {
          if (!remoteOptions.includes("Remote") && !remoteOptions.includes("On-site")) {
            return false;
          }
        }
        
        if (remoteOptions.includes("On-site") && !isOnSite) {
          if (!remoteOptions.includes("Remote") && !remoteOptions.includes("Hybrid")) {
            return false;
          }
        }
      }
      
      // Experience level filter
      if (experienceLevel) {
        if (experienceLevel === "entry" && job.minExperience > 1) {
          return false;
        }
        if (experienceLevel === "mid" && (job.minExperience < 2 || job.maxExperience > 5)) {
          return false;
        }
        if (experienceLevel === "senior" && (job.minExperience < 5 || job.maxExperience > 10)) {
          return false;
        }
        if (experienceLevel === "exec" && job.minExperience < 8) {
          return false;
        }
      }
      
      // Salary range filter
      if (job.minSalary > salaryRange[1] || job.maxSalary < salaryRange[0]) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortOrder) {
        case "recent":
          return new Date(b.postedDate || "").getTime() - new Date(a.postedDate || "").getTime();
        case "salary-high":
          return b.maxSalary - a.maxSalary;
        case "salary-low":
          return a.minSalary - b.minSalary;
        case "relevance":
        default:
          return (b.matchScore || 0) - (a.matchScore || 0);
      }
    });

  return (
    <div className="flex flex-col min-h-screen">
      <Header userType="job-seeker" />
      <main className="flex-grow bg-gray-50">
        <div className="bg-gradient-to-br from-ai-primary/10 to-ai-accent/5 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6">Find Your Perfect Job</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input 
                      className="pl-10" 
                      placeholder="Job title, keywords, or company" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input 
                      className="pl-10" 
                      placeholder="Location or 'Remote'" 
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <Button 
                    onClick={applyFilters}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    Search Jobs
                  </Button>
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
                            checked={jobType.includes(type)}
                            onChange={() => handleJobTypeChange(type)}
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
                    <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level (0-1 years)</SelectItem>
                        <SelectItem value="mid">Mid-Level (2-5 years)</SelectItem>
                        <SelectItem value="senior">Senior (5-10 years)</SelectItem>
                        <SelectItem value="exec">Executive (8+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Salary Range (LPA)</h3>
                    <div className="mt-6 px-2">
                      <Slider 
                        value={salaryRange} 
                        min={0} 
                        max={200} 
                        step={10} 
                        onValueChange={(value) => setSalaryRange(value as [number, number])}
                      />
                      <div className="flex justify-between mt-2">
                        <span className="text-sm text-gray-600">₹{salaryRange[0]} LPA</span>
                        <span className="text-sm text-gray-600">₹{salaryRange[1]} LPA</span>
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
                            checked={remoteOptions.includes(option)}
                            onChange={() => handleRemoteOptionChange(option)}
                            className="rounded border-gray-300 text-ai-primary focus:ring-ai-primary"
                          />
                          <label htmlFor={option} className="ml-2 text-sm text-gray-700">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full" onClick={applyFilters}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Job Listings */}
            <div className="lg:w-3/4">
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h2 className="text-xl font-bold">
                  {isLoading ? "Loading jobs..." : `Showing ${filteredJobs.length} results`}
                </h2>
                <div className="mt-2 sm:mt-0">
                  <Select value={sortOrder} onValueChange={setSortOrder}>
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
              
              {isLoading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                      <div className="h-20 bg-gray-200 rounded mb-4"></div>
                      <div className="flex gap-2 mb-6">
                        <div className="h-6 w-16 bg-gray-200 rounded"></div>
                        <div className="h-6 w-16 bg-gray-200 rounded"></div>
                        <div className="h-6 w-16 bg-gray-200 rounded"></div>
                      </div>
                      <div className="flex gap-4">
                        <div className="h-10 bg-gray-200 rounded w-28"></div>
                        <div className="h-10 bg-gray-200 rounded w-28"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredJobs.length > 0 ? (
                <div className="space-y-6">
                  {filteredJobs.map((job) => (
                    <JobCard 
                      key={job.id} 
                      job={{
                        id: job.id || 0,
                        title: job.title,
                        company: job.company,
                        location: job.location,
                        type: job.type,
                        salary: formatSalaryRange(job.minSalary, job.maxSalary),
                        description: job.description,
                        tags: job.tags || job.skills,
                        posted: formatPostedDate(job.postedDate),
                        matchScore: job.matchScore || Math.floor(Math.random() * 30) + 70
                      }} 
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <h3 className="text-xl font-bold mb-2">No jobs found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or filters to see more results.
                  </p>
                  <Button onClick={() => {
                    setSearchTerm("");
                    setLocationFilter("");
                    setExperienceLevel("");
                    setJobType([]);
                    setRemoteOptions([]);
                    setSalaryRange([0, 200]);
                  }}>
                    Clear All Filters
                  </Button>
                </div>
              )}
              
              {filteredJobs.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <Button variant="outline" className="mr-2">&lt; Previous</Button>
                  <Button variant="outline" className="mx-1">1</Button>
                  <Button variant="outline" className="mx-1">2</Button>
                  <Button variant="outline" className="mx-1">3</Button>
                  <Button variant="outline" className="ml-2">Next &gt;</Button>
                </div>
              )}
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
