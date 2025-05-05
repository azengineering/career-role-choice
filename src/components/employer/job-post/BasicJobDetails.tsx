
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, Plus, X } from "lucide-react";
import { JobPostingData } from "../JobPostFormTypes";

interface BasicJobDetailsProps {
  formData: JobPostingData;
  skillInput: string;
  setSkillInput: (value: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  addSkill: () => void;
  removeSkill: (index: number) => void;
}

const BasicJobDetails: React.FC<BasicJobDetailsProps> = ({
  formData,
  skillInput,
  setSkillInput,
  handleChange,
  handleNumberChange,
  handleSelectChange,
  addSkill,
  removeSkill
}) => {
  return (
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
        
        <div className="space-y-2">
          <Label className="text-sm font-medium">Experience Range (years) <span className="text-red-500">*</span></Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minExperience" className="text-xs text-gray-500">Minimum</Label>
              <Input
                id="minExperience"
                name="minExperience"
                type="number"
                min={0}
                step={1}
                value={formData.minExperience}
                onChange={handleNumberChange}
                className="border-gray-300 focus:ring-primary mt-1"
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="maxExperience" className="text-xs text-gray-500">Maximum</Label>
              <Input
                id="maxExperience"
                name="maxExperience"
                type="number"
                min={formData.minExperience}
                step={1}
                value={formData.maxExperience}
                onChange={handleNumberChange}
                className="border-gray-300 focus:ring-primary mt-1"
                placeholder="5"
              />
            </div>
          </div>
          <div className="text-xs text-gray-500 italic">Enter experience in years</div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium">Salary Range (LPA) <span className="text-red-500">*</span></Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minSalary" className="text-xs text-gray-500">Minimum</Label>
              <Input
                id="minSalary"
                name="minSalary"
                type="number"
                min={1}
                step={1}
                value={formData.minSalary}
                onChange={handleNumberChange}
                className="border-gray-300 focus:ring-primary mt-1"
                placeholder="5"
              />
            </div>
            <div>
              <Label htmlFor="maxSalary" className="text-xs text-gray-500">Maximum</Label>
              <Input
                id="maxSalary"
                name="maxSalary"
                type="number"
                min={formData.minSalary}
                step={1}
                value={formData.maxSalary}
                onChange={handleNumberChange}
                className="border-gray-300 focus:ring-primary mt-1"
                placeholder="30"
              />
            </div>
          </div>
          <div className="text-xs text-gray-500 italic">Enter salary in Lakhs Per Annum (LPA)</div>
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
  );
};

export default BasicJobDetails;
