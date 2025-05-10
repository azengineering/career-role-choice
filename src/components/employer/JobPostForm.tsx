import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import BasicJobDetails from "./job-post/BasicJobDetails";
import JobDescription from "./job-post/JobDescription";
import CustomQuestions from "./job-post/CustomQuestions";
import FormActions from "./job-post/FormActions";
import { JobPostingData, CustomQuestion } from "./JobPostFormTypes";
import { db } from "@/services/localStorageDB";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface JobPostFormProps {
  initialData?: Partial<JobPostingData>;
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
    minSalary: 5,
    maxSalary: 30,
    skills: [],
    vacancies: 1,
    description: "",
    customQuestions: [],
    benefits: [],
    isRemote: false,
    isUrgent: false,
    isFeatured: false,
    applicationDeadline: ""
  }, 
  mode = "create",
  onSubmit 
}) => {
  const now = new Date().toISOString();
  
  // We need to ensure id, createdAt, and updatedAt are always present in formData
  const [formData, setFormData] = useState<JobPostingData>({
    id: initialData.id || Date.now().toString(), // Provide a default id if not present
    createdAt: initialData.createdAt || now, // Provide current timestamp as default
    updatedAt: initialData.updatedAt || now, // Provide current timestamp as default
    ...initialData as any // Cast to any to avoid TS errors with partial data
  } as JobPostingData);
  
  const [skillInput, setSkillInput] = useState("");
  const [benefitInput, setBenefitInput] = useState("");
  const [questionInput, setQuestionInput] = useState("");
  const [newQuestionType, setNewQuestionType] = useState<"text" | "yes_no">("text");
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
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

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
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

  const addBenefit = () => {
    if (benefitInput.trim() && !formData.benefits?.includes(benefitInput.trim())) {
      setFormData(prev => ({
        ...prev,
        benefits: [...(prev.benefits || []), benefitInput.trim()]
      }));
      setBenefitInput("");
    }
  };
  
  const removeBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits?.filter((_, i) => i !== index) || []
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

This role is based in ${formData.location || "our office location"}${formData.isRemote ? " with remote work options available" : ""} and offers a competitive salary range between ${formData.minSalary} LPA and ${formData.maxSalary} LPA per year.

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
    
    try {
      // Add additional metadata
      const finalData: JobPostingData = {
        ...formData,
        status: asDraft ? "Draft" : "Active",
        postedDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        postedBy: user?.id || 'unknown',
        applications: formData.applications || 0,
        views: formData.views || 0,
        updatedAt: new Date().toISOString() // Always update the updatedAt timestamp
      };
      
      // Save to our local database
      db.add('jobs', finalData);
      
      // Call onSubmit if provided (for testing/mock)
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
        
        // Redirect to dashboard
        navigate("/employer/dashboard");
      }
    } catch (error) {
      console.error("Error saving job:", error);
      toast({
        title: "Error",
        description: "There was a problem saving your job posting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Prepare preview data for the FormActions component
  const previewData = formData.title ? {
    title: formData.title,
    company: formData.company || "Company Name",
    location: formData.location,
    type: formData.type,
    minSalary: formData.minSalary,
    maxSalary: formData.maxSalary,
    description: formData.description,
    skills: formData.skills,
    isRemote: formData.isRemote,
    isUrgent: formData.isUrgent,
    isFeatured: formData.isFeatured,
    benefits: formData.benefits || []
  } : undefined;
  
  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-4 mb-6">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="extras">Additional Info</TabsTrigger>
          <TabsTrigger value="questions">Screening Questions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <BasicJobDetails 
                  formData={formData}
                  skillInput={skillInput}
                  setSkillInput={setSkillInput}
                  handleChange={handleChange}
                  handleNumberChange={handleNumberChange}
                  handleSelectChange={handleSelectChange}
                  addSkill={addSkill}
                  removeSkill={removeSkill}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="description" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <JobDescription 
                description={formData.description}
                handleChange={handleChange}
                generateJobDescription={generateJobDescription}
                isGeneratingDescription={isGeneratingDescription}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="extras" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Job Benefits & Options</h3>
                
                <div className="flex flex-col gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="isRemote" 
                      checked={formData.isRemote}
                      onCheckedChange={(checked) => handleCheckboxChange("isRemote", checked as boolean)}
                    />
                    <Label htmlFor="isRemote">Remote Work Available</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="isUrgent" 
                      checked={formData.isUrgent}
                      onCheckedChange={(checked) => handleCheckboxChange("isUrgent", checked as boolean)}
                    />
                    <Label htmlFor="isUrgent">Urgent Hiring</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="isFeatured" 
                      checked={formData.isFeatured}
                      onCheckedChange={(checked) => handleCheckboxChange("isFeatured", checked as boolean)}
                    />
                    <Label htmlFor="isFeatured">Feature this Job (Highlighted in search results)</Label>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Label htmlFor="applicationDeadline">Application Deadline</Label>
                  <Input
                    id="applicationDeadline"
                    name="applicationDeadline"
                    type="date"
                    value={formData.applicationDeadline || ""}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">Leave empty if there's no deadline</p>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Benefits & Perks</h4>
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Add a benefit or perk (e.g., Health Insurance)"
                      value={benefitInput}
                      onChange={(e) => setBenefitInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addBenefit())}
                      className="flex-1"
                    />
                    <Button variant="default" type="button" onClick={addBenefit} className="shrink-0">
                      Add
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {formData.benefits?.map((benefit, index) => (
                      <div key={index} className="bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm flex items-center">
                        <span>{benefit}</span>
                        <button 
                          type="button"
                          className="ml-2 text-primary-600 hover:text-primary-800"
                          onClick={() => removeBenefit(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="questions" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <CustomQuestions 
                customQuestions={formData.customQuestions}
                questionInput={questionInput}
                setQuestionInput={setQuestionInput}
                newQuestionType={newQuestionType}
                setNewQuestionType={setNewQuestionType}
                addCustomQuestion={addCustomQuestion}
                removeCustomQuestion={removeCustomQuestion}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <FormActions 
        isLoading={isLoading}
        mode={mode}
        handleSubmit={handleSubmit}
        previewData={previewData}
      />
    </form>
  );
};

export default JobPostForm;
