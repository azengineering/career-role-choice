
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

export interface JobPostingData {
  id?: number;
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  isDraft?: boolean;
  status?: string;
  postedDate?: string;
}

interface JobPostFormProps {
  initialData?: JobPostingData;
  mode?: "create" | "edit";
  onSubmit?: (data: JobPostingData) => void;
}

const JobPostForm: React.FC<JobPostFormProps> = ({ 
  initialData = {
    title: "",
    company: "",
    location: "",
    type: "",
    experience: "",
    salary: "",
    description: "",
    requirements: [],
    benefits: []
  }, 
  mode = "create",
  onSubmit 
}) => {
  const [formData, setFormData] = useState<JobPostingData>(initialData);
  const [requirementInput, setRequirementInput] = useState("");
  const [benefitInput, setBenefitInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const addRequirement = () => {
    if (requirementInput.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, requirementInput.trim()]
      }));
      setRequirementInput("");
    }
  };
  
  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };
  
  const addBenefit = () => {
    if (benefitInput.trim()) {
      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, benefitInput.trim()]
      }));
      setBenefitInput("");
    }
  };
  
  const removeBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent, asDraft = false) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.location || !formData.description) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Add additional metadata
    const finalData = {
      ...formData,
      isDraft: asDraft,
      status: asDraft ? "Draft" : "Active",
      postedDate: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
    };
    
    // In a real app, this would save to a database
    setTimeout(() => {
      if (onSubmit) {
        onSubmit(finalData);
      } else {
        toast({
          title: asDraft ? "Job saved as draft" : "Job posted successfully",
          description: asDraft 
            ? "You can continue editing your job posting later." 
            : "Your job is now live and visible to candidates.",
        });
        
        navigate("/employer/dashboard");
      }
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title <span className="text-red-500">*</span></Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Front-end Developer"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company">Company Name <span className="text-red-500">*</span></Label>
            <Input
              id="company"
              name="company"
              placeholder="Your company name"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="type">Job Type <span className="text-red-500">*</span></Label>
            <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
                <SelectItem value="Freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
            <Input
              id="location"
              name="location"
              placeholder="City, State or Remote"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="experience">Experience Level <span className="text-red-500">*</span></Label>
            <Select value={formData.experience} onValueChange={(value) => handleSelectChange("experience", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Entry Level">Entry Level</SelectItem>
                <SelectItem value="Mid-Level">Mid-Level</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
                <SelectItem value="Executive">Executive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="salary">Salary Range (optional)</Label>
            <Input
              id="salary"
              name="salary"
              placeholder="e.g., $70,000 - $90,000"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Job Description <span className="text-red-500">*</span></Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe the role, responsibilities, and ideal candidate..."
            value={formData.description}
            onChange={handleChange}
            className="min-h-[200px]"
            required
          />
        </div>
        
        <div className="space-y-4">
          <Label>Requirements</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add a requirement"
              value={requirementInput}
              onChange={(e) => setRequirementInput(e.target.value)}
            />
            <Button type="button" onClick={addRequirement}>Add</Button>
          </div>
          
          <div className="space-y-2">
            {formData.requirements.map((req, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                <span>{req}</span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeRequirement(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <Label>Benefits</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add a benefit"
              value={benefitInput}
              onChange={(e) => setBenefitInput(e.target.value)}
            />
            <Button type="button" onClick={addBenefit}>Add</Button>
          </div>
          
          <div className="space-y-2">
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                <span>{benefit}</span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeBenefit(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 justify-end">
        <Button 
          type="button" 
          variant="outline" 
          onClick={(e) => handleSubmit(e, true)}
          disabled={isLoading}
        >
          Save as Draft
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : mode === "create" ? "Post Job" : "Update Job"}
        </Button>
      </div>
    </form>
  );
};

export default JobPostForm;
