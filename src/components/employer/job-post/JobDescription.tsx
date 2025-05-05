
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

interface JobDescriptionProps {
  description: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  generateJobDescription: () => void;
  isGeneratingDescription: boolean;
}

const JobDescription: React.FC<JobDescriptionProps> = ({
  description,
  handleChange,
  generateJobDescription,
  isGeneratingDescription
}) => {
  return (
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
          value={description}
          onChange={handleChange}
          className="min-h-[300px] border-gray-300 focus:ring-primary focus:border-primary"
          required
        />
      </div>
    </Card>
  );
};

export default JobDescription;
