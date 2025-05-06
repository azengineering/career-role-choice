
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const ResumeBuilder: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal-info");
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    skills: "",
    experience: "",
    education: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateAI = () => {
    toast({
      title: "AI Enhancement Started",
      description: "Our AI is generating suggestions for your resume...",
    });
    
    // Simulate AI processing
    setTimeout(() => {
      toast({
        title: "Resume Enhanced",
        description: "AI suggestions have been applied to your resume!",
      });
      
      // Add some AI-enhanced content
      setResumeData(prev => ({
        ...prev,
        summary: prev.summary || "Results-driven professional with a proven track record of success. Skilled in collaboration, problem-solving, and delivering high-quality outcomes.",
        skills: prev.skills || "Communication • Project Management • Problem Solving • Teamwork • Technical Writing • Data Analysis"
      }));
    }, 2000);
  };
  
  const handleSaveResume = () => {
    toast({
      title: "Resume Saved",
      description: "Your resume has been saved successfully!",
    });
  };
  
  const handleExport = () => {
    toast({
      title: "Resume Exported",
      description: "Your resume has been exported as a PDF.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Build Your Professional Resume</h3>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={handleGenerateAI}>
            AI Enhance
          </Button>
          <Button variant="outline" size="sm" onClick={handleSaveResume}>
            Save
          </Button>
          <Button size="sm" onClick={handleExport}>
            Export PDF
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="experience">Experience & Education</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal-info" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={resumeData.name} 
                onChange={handleChange} 
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={resumeData.email} 
                onChange={handleChange} 
                placeholder="john.doe@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone" 
                value={resumeData.phone} 
                onChange={handleChange} 
                placeholder="(123) 456-7890"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="summary" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea 
              id="summary" 
              name="summary" 
              value={resumeData.summary} 
              onChange={handleChange} 
              placeholder="Write a brief professional summary..." 
              className="min-h-[200px]"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="skills" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="skills">Key Skills (separated by commas)</Label>
            <Textarea 
              id="skills" 
              name="skills" 
              value={resumeData.skills} 
              onChange={handleChange} 
              placeholder="Project Management, Communication, Leadership..." 
              className="min-h-[150px]"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="experience" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="experience">Work Experience</Label>
            <Textarea 
              id="experience" 
              name="experience" 
              value={resumeData.experience} 
              onChange={handleChange} 
              placeholder="Company name, position, dates, responsibilities..." 
              className="min-h-[150px]"
            />
          </div>
          
          <div className="space-y-2 mt-4">
            <Label htmlFor="education">Education</Label>
            <Textarea 
              id="education" 
              name="education" 
              value={resumeData.education} 
              onChange={handleChange} 
              placeholder="University name, degree, dates..." 
              className="min-h-[150px]"
            />
          </div>
        </TabsContent>
      </Tabs>
      
      <Card className="p-4 bg-gray-50">
        <h4 className="font-semibold mb-2">Resume Preview</h4>
        {resumeData.name && <p className="font-bold text-lg">{resumeData.name}</p>}
        {(resumeData.email || resumeData.phone) && (
          <p className="text-sm text-gray-600">
            {resumeData.email}{resumeData.email && resumeData.phone && " • "}{resumeData.phone}
          </p>
        )}
        {resumeData.summary && (
          <div className="mt-2">
            <p className="text-sm font-medium">Summary</p>
            <p className="text-sm">{resumeData.summary}</p>
          </div>
        )}
        {resumeData.skills && (
          <div className="mt-2">
            <p className="text-sm font-medium">Skills</p>
            <p className="text-sm">{resumeData.skills}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ResumeBuilder;
