
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { MessageSquare, Briefcase } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export interface JobPostingData {
  id?: number;
  title: string;
  company: string;
  industry: string;
  location: string;
  type: string;
  minExperience: number;
  maxExperience: number;
  minSalary: number;
  maxSalary: number;
  skills: string[];
  vacancies: number;
  description: string;
  requirements: string[];
  benefits: string[];
  customQuestions: string[];
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
    industry: "",
    location: "",
    type: "",
    minExperience: 0,
    maxExperience: 5,
    minSalary: 30000,
    maxSalary: 100000,
    skills: [],
    vacancies: 1,
    description: "",
    requirements: [],
    benefits: [],
    customQuestions: []
  }, 
  mode = "create",
  onSubmit 
}) => {
  const [formData, setFormData] = useState<JobPostingData>(initialData);
  const [requirementInput, setRequirementInput] = useState("");
  const [benefitInput, setBenefitInput] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [questionInput, setQuestionInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value, 10) || 0 }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSalaryChange = (name: string, value: number[]) => {
    if (name === "salaryRange") {
      setFormData(prev => ({
        ...prev,
        minSalary: value[0],
        maxSalary: value[1]
      }));
    } else if (name === "experienceRange") {
      setFormData(prev => ({
        ...prev,
        minExperience: value[0],
        maxExperience: value[1]
      }));
    }
  };
  
  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput("");
    }
  };
  
  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
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

  const addCustomQuestion = () => {
    if (questionInput.trim() && formData.customQuestions.length < 10) {
      setFormData(prev => ({
        ...prev,
        customQuestions: [...prev.customQuestions, questionInput.trim()]
      }));
      setQuestionInput("");
    } else if (formData.customQuestions.length >= 10) {
      toast({
        title: "Question limit reached",
        description: "You can add a maximum of 10 custom questions.",
        variant: "destructive",
      });
    }
  };
  
  const removeCustomQuestion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      customQuestions: prev.customQuestions.filter((_, i) => i !== index)
    }));
  };
  
  const generateJobDescription = () => {
    if (!formData.title || !formData.industry) {
      toast({
        title: "Missing information",
        description: "Please fill in at least the job title and industry before generating a description.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingDescription(true);

    // Mock AI-generated description (in a real app, this would call an API)
    setTimeout(() => {
      const skills = formData.skills.join(", ");
      const experience = `${formData.minExperience} to ${formData.maxExperience} years`;
      
      const generatedDesc = `We are looking for a talented ${formData.title} to join our team in the ${formData.industry} industry. The ideal candidate will have ${experience} of experience and proficiency in ${skills || "relevant skills"}. 

This role is based in ${formData.location || "our office location"} and offers a competitive salary range between $${(formData.minSalary/1000).toFixed(0)}k and $${(formData.maxSalary/1000).toFixed(0)}k per year.

Key Responsibilities:
• Collaborate with cross-functional teams to deliver high-quality solutions
• Stay updated with the latest industry trends and technologies
• Apply best practices and methodologies to all projects
• Contribute to team development and knowledge sharing

We offer a dynamic work environment with opportunities for professional growth and advancement.`;

      setFormData(prev => ({ ...prev, description: generatedDesc }));
      setIsGeneratingDescription(false);
      
      toast({
        title: "Description generated",
        description: "The AI has created a job description based on your inputs. Feel free to edit it further.",
      });
    }, 1500);
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
          title: asDraft ? "Job saved as draft" : "Job posted successfully!",
          description: asDraft 
            ? "You can continue editing your job posting later." 
            : "Your job is now live and visible to candidates. You can manage it from your dashboard.",
          variant: asDraft ? "default" : "default",
        });
        
        navigate("/employer/dashboard");
      }
      setIsLoading(false);
    }, 1000);
  };

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };
  
  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Basic Details */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Basic Job Details</h3>
            
            <div className="space-y-4">
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
              
              <div className="space-y-2">
                <Label htmlFor="industry">Industry <span className="text-red-500">*</span></Label>
                <Select value={formData.industry} onValueChange={(value) => handleSelectChange("industry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Media">Media & Entertainment</SelectItem>
                    <SelectItem value="Transportation">Transportation</SelectItem>
                    <SelectItem value="Hospitality">Hospitality</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
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
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Experience Range (years)</Label>
                  <span className="text-sm text-gray-500">{formData.minExperience} - {formData.maxExperience} years</span>
                </div>
                <Slider
                  defaultValue={[formData.minExperience, formData.maxExperience]}
                  max={20}
                  step={1}
                  onValueChange={(value) => handleSalaryChange("experienceRange", value)}
                  className="py-4"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Salary Range (per year)</Label>
                  <span className="text-sm text-gray-500">{formatCurrency(formData.minSalary)} - {formatCurrency(formData.maxSalary)}</span>
                </div>
                <Slider
                  defaultValue={[formData.minSalary, formData.maxSalary]}
                  min={0}
                  max={300000}
                  step={5000}
                  onValueChange={(value) => handleSalaryChange("salaryRange", value)}
                  className="py-4"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vacancies">Number of Vacancies</Label>
                <Input
                  id="vacancies"
                  name="vacancies"
                  type="number"
                  min={1}
                  placeholder="1"
                  value={formData.vacancies}
                  onChange={handleNumberChange}
                />
              </div>
              
              <div className="space-y-4">
                <Label>Required Skills</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  />
                  <Button type="button" onClick={addSkill}>Add</Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2">
                      <span>{skill}</span>
                      <button 
                        type="button" 
                        onClick={() => removeSkill(index)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Benefits & Requirements</h3>
            
            <div className="space-y-4">
              <div className="space-y-4">
                <Label>Requirements</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a requirement"
                    value={requirementInput}
                    onChange={(e) => setRequirementInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
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
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
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
          </Card>
        </div>
        
        {/* Right Column - Description & Custom Questions */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Job Description <span className="text-red-500">*</span></h3>
              <Button 
                type="button" 
                onClick={generateJobDescription}
                disabled={isGeneratingDescription}
                variant="outline"
                className="flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                {isGeneratingDescription ? "Generating..." : "Generate with AI"}
              </Button>
            </div>
            
            <div className="space-y-2">
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the role, responsibilities, and ideal candidate..."
                value={formData.description}
                onChange={handleChange}
                className="min-h-[400px]"
                required
              />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Custom Questions</h3>
              <span className="text-sm text-gray-500">{formData.customQuestions.length}/10 questions</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a custom question for candidates"
                  value={questionInput}
                  onChange={(e) => setQuestionInput(e.target.value)}
                  disabled={formData.customQuestions.length >= 10}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomQuestion())}
                />
                <Button 
                  type="button" 
                  onClick={addCustomQuestion}
                  disabled={formData.customQuestions.length >= 10}
                >
                  Add
                </Button>
              </div>
              
              <div className="space-y-2">
                {formData.customQuestions.map((question, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                    <div>
                      <div className="font-medium">Question {index + 1}</div>
                      <div>{question}</div>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeCustomQuestion(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                
                {formData.customQuestions.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    No custom questions added yet. Custom questions can help you screen candidates more effectively.
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8">
        <Button 
          type="button" 
          variant="outline" 
          onClick={(e) => handleSubmit(e, true)}
          disabled={isLoading}
        >
          Save as Draft
        </Button>
        <Button 
          type="submit" 
          disabled={isLoading}
          className="gap-2"
        >
          <Briefcase className="h-4 w-4" />
          {isLoading ? "Submitting..." : mode === "create" ? "Post Job" : "Update Job"}
        </Button>
      </div>
    </form>
  );
};

export default JobPostForm;
