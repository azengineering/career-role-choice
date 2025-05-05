
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { MessageSquare, Briefcase, Plus, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export interface CustomQuestion {
  question: string;
  answerType: "text" | "yes_no";
}

export interface JobPostingData {
  id?: number;
  title: string;
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
  customQuestions: CustomQuestion[];
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
    industry: "",
    location: "",
    type: "",
    minExperience: 0,
    maxExperience: 5,
    minSalary: 5,
    maxSalary: 30,
    skills: [],
    vacancies: 1,
    description: "",
    customQuestions: []
  }, 
  mode = "create",
  onSubmit 
}) => {
  const [formData, setFormData] = useState<JobPostingData>(initialData);
  const [skillInput, setSkillInput] = useState("");
  const [questionInput, setQuestionInput] = useState("");
  const [newQuestionType, setNewQuestionType] = useState<"text" | "yes_no">("text");
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
  
  const addCustomQuestion = () => {
    if (questionInput.trim() && formData.customQuestions.length < 10) {
      const newQuestion: CustomQuestion = {
        question: questionInput.trim(),
        answerType: newQuestionType
      };
      
      setFormData(prev => ({
        ...prev,
        customQuestions: [...prev.customQuestions, newQuestion]
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

This role is based in ${formData.location || "our office location"} and offers a competitive salary range between ${formData.minSalary} LPA and ${formData.maxSalary} LPA per year.

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

  const formatSalary = (value: number) => {
    return `${value} LPA`;
  };
  
  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Basic Details */}
        <div className="space-y-6">
          <Card className="p-6 border-l-4 border-l-primary shadow-md bg-gradient-to-br from-white to-gray-50">
            <h3 className="text-lg font-medium mb-4 text-primary flex items-center">
              <Briefcase className="mr-2 h-5 w-5" />
              Basic Job Details
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">Job Title <span className="text-red-500">*</span></Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Front-end Developer"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="border-gray-300 focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-sm font-medium">Industry <span className="text-red-500">*</span></Label>
                <Select value={formData.industry} onValueChange={(value) => handleSelectChange("industry", value)}>
                  <SelectTrigger className="border-gray-300 focus:ring-primary">
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
                <Label htmlFor="location" className="text-sm font-medium">Location <span className="text-red-500">*</span></Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="City, State or Remote"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="border-gray-300 focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm font-medium">Job Type <span className="text-red-500">*</span></Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger className="border-gray-300 focus:ring-primary">
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
              
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium">Experience Range (years)</Label>
                  <span className="text-sm text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                    {formData.minExperience} - {formData.maxExperience} years
                  </span>
                </div>
                <Slider
                  defaultValue={[formData.minExperience, formData.maxExperience]}
                  max={20}
                  step={1}
                  onValueChange={(value) => handleSalaryChange("experienceRange", value)}
                  className="py-4"
                />
              </div>
              
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium">Salary Range (LPA)</Label>
                  <span className="text-sm text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                    {formatSalary(formData.minSalary)} - {formatSalary(formData.maxSalary)}
                  </span>
                </div>
                <Slider
                  defaultValue={[formData.minSalary, formData.maxSalary]}
                  min={1}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleSalaryChange("salaryRange", value)}
                  className="py-4"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vacancies" className="text-sm font-medium">Number of Vacancies</Label>
                <Input
                  id="vacancies"
                  name="vacancies"
                  type="number"
                  min={1}
                  placeholder="1"
                  value={formData.vacancies}
                  onChange={handleNumberChange}
                  className="border-gray-300 focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div className="space-y-4">
                <Label className="text-sm font-medium">Required Skills</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    className="border-gray-300 focus:ring-primary focus:border-primary"
                  />
                  <Button 
                    type="button" 
                    onClick={addSkill}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="bg-primary/10 px-3 py-1 rounded-full flex items-center gap-2 text-primary font-medium">
                      <span>{skill}</span>
                      <button 
                        type="button" 
                        onClick={() => removeSkill(index)}
                        className="text-primary hover:text-primary/70 focus:outline-none"
                        aria-label="Remove skill"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {formData.skills.length === 0 && (
                    <p className="text-sm text-gray-500 italic">No skills added yet</p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Right Column - Description & Custom Questions */}
        <div className="space-y-6">
          <Card className="p-6 border-l-4 border-l-primary/70 shadow-md bg-gradient-to-br from-white to-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-primary flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Job Description <span className="text-red-500">*</span>
              </h3>
              <Button 
                type="button" 
                onClick={generateJobDescription}
                disabled={isGeneratingDescription}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 flex items-center gap-2"
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
                className="min-h-[300px] border-gray-300 focus:ring-primary focus:border-primary"
                required
              />
            </div>
          </Card>
          
          <Card className="p-6 border-l-4 border-l-primary/50 shadow-md bg-gradient-to-br from-white to-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-primary flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Custom Questions
              </h3>
              <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                {formData.customQuestions.length}/10 questions
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-3">
                <div className="space-y-3">
                  <Input
                    placeholder="Add a custom question for candidates"
                    value={questionInput}
                    onChange={(e) => setQuestionInput(e.target.value)}
                    disabled={formData.customQuestions.length >= 10}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomQuestion())}
                    className="border-gray-300 focus:ring-primary focus:border-primary"
                  />
                  <RadioGroup 
                    value={newQuestionType} 
                    onValueChange={(value) => setNewQuestionType(value as "text" | "yes_no")}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="text" id="text" />
                      <Label htmlFor="text" className="cursor-pointer">Text answer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes_no" id="yes_no" />
                      <Label htmlFor="yes_no" className="cursor-pointer">Yes/No answer</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button 
                  type="button" 
                  onClick={addCustomQuestion}
                  disabled={formData.customQuestions.length >= 10 || !questionInput.trim()}
                  className="bg-primary hover:bg-primary/90 self-start"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              
              <div className="space-y-3 mt-4">
                {formData.customQuestions.map((question, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="font-medium">Question {index + 1}</div>
                        <div className="text-gray-700">{question.question}</div>
                        <div className="text-sm text-primary inline-flex items-center bg-primary/10 px-2 py-0.5 rounded-full">
                          Answer type: {question.answerType === "text" ? "Text" : "Yes/No"}
                        </div>
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeCustomQuestion(index)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {formData.customQuestions.length === 0 && (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <MessageSquare className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500 font-medium">No custom questions added yet</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Custom questions help you screen candidates more effectively
                    </p>
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
          className="border-primary text-primary hover:bg-primary/10"
        >
          Save as Draft
        </Button>
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 gap-2"
        >
          <Briefcase className="h-4 w-4" />
          {isLoading ? "Submitting..." : mode === "create" ? "Post Job" : "Update Job"}
        </Button>
      </div>
    </form>
  );
};

export default JobPostForm;
