
import React from "react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PostJobsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header userType="employer" />
      <main className="flex-grow">
        <div className="bg-gradient-to-br from-ai-primary/10 to-ai-accent/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">Post a Job</h1>
              <p className="text-xl text-gray-700">
                Reach thousands of qualified candidates with your job listing
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Job Details</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="job-title">Job Title*</Label>
                    <Input id="job-title" placeholder="e.g. Front-end Developer" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name*</Label>
                    <Input id="company-name" placeholder="Your company name" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="job-type">Job Type*</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location*</Label>
                    <Input id="location" placeholder="City, State or Remote" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="experience-level">Experience Level*</Label>
                    <Select>
                      <SelectTrigger>
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
                  
                  <div className="space-y-2">
                    <Label>Salary Range (optional)</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="Min" type="number" />
                      <Input placeholder="Max" type="number" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="job-description">Job Description*</Label>
                  <Textarea
                    id="job-description"
                    placeholder="Describe the role, responsibilities, and ideal candidate..."
                    className="min-h-[200px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Required Skills*</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["HTML/CSS", "JavaScript", "React", "TypeScript", "Node.js", "UI/UX Design"].map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`skill-${skill}`}
                          className="rounded border-gray-300 text-ai-primary focus:ring-ai-primary"
                        />
                        <label htmlFor={`skill-${skill}`} className="text-sm text-gray-700">
                          {skill}
                        </label>
                      </div>
                    ))}
                    <div className="md:col-span-3">
                      <Input placeholder="Add other skills (comma separated)" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="application-url">Application URL (optional)</Label>
                  <Input id="application-url" placeholder="https://your-company.com/careers/job-title" />
                  <p className="text-sm text-gray-600">
                    If left blank, applications will be collected through Jobs-Here.
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 mt-8 pt-6">
                <h3 className="text-xl font-bold mb-4">AI Matching Preferences</h3>
                <p className="text-gray-600 mb-4">
                  Our AI will match your job with the most qualified candidates. Refine your preferences below.
                </p>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Education Level Priority</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low Priority</SelectItem>
                          <SelectItem value="medium">Medium Priority</SelectItem>
                          <SelectItem value="high">High Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Experience Priority</Label>
                      <Select defaultValue="high">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low Priority</SelectItem>
                          <SelectItem value="medium">Medium Priority</SelectItem>
                          <SelectItem value="high">High Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Skills Weighting</Label>
                    <Select defaultValue="balanced">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Favor Technical Skills</SelectItem>
                        <SelectItem value="soft">Favor Soft Skills</SelectItem>
                        <SelectItem value="balanced">Balanced Approach</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 mt-8 pt-6">
                <h3 className="text-xl font-bold mb-4">Select Posting Package</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-2 border-transparent hover:border-ai-primary/40 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle>Basic</CardTitle>
                      <CardDescription>30-day listing</CardDescription>
                      <div className="mt-2 text-2xl font-bold">$199</div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm">Standard visibility</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm">Basic AI matching</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm">Up to 50 applications</span>
                        </li>
                      </ul>
                      <Button variant="outline" className="w-full">Select</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-ai-primary bg-ai-primary/5 relative">
                    <div className="absolute top-0 right-0 bg-ai-primary text-white text-xs font-bold px-2 py-1 rounded-bl">
                      POPULAR
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle>Premium</CardTitle>
                      <CardDescription>30-day listing</CardDescription>
                      <div className="mt-2 text-2xl font-bold">$299</div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm">Featured placement</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm">Advanced AI matching</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm">Unlimited applications</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm">Candidate insights</span>
                        </li>
                      </ul>
                      <Button className="w-full">Select</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-transparent hover:border-ai-primary/40 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle>Enterprise</CardTitle>
                      <CardDescription>30-day listing</CardDescription>
                      <div className="mt-2 text-2xl font-bold">$499</div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm">Top placement guarantee</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm">Premium AI matching</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm">Dedicated account manager</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm">Candidate screening</span>
                        </li>
                      </ul>
                      <Button variant="outline" className="w-full">Select</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
                <Button variant="outline">Save as Draft</Button>
                <Button>Preview & Submit</Button>
              </div>
            </div>
            
            <div className="mt-8 bg-ai-primary/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Need More Job Postings?</h3>
              <p className="mb-6">
                Save with our multi-job packages or get a custom solution for your recruitment needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline">View Packages</Button>
                <Button variant="secondary">Contact Sales</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostJobsPage;
