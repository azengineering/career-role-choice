
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, Eye, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface FormActionsProps {
  isLoading: boolean;
  mode: "create" | "edit";
  handleSubmit: (e: React.FormEvent, asDraft: boolean) => void;
  previewData?: {
    title: string;
    company: string;
    location: string;
    type: string;
    minSalary: number;
    maxSalary: number;
    description: string;
    skills: string[];
  };
}

const FormActions: React.FC<FormActionsProps> = ({ 
  isLoading, 
  mode, 
  handleSubmit,
  previewData
}) => {
  const [showPreview, setShowPreview] = useState(false);

  const handlePreview = () => {
    setShowPreview(true);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8">
        {previewData && (
          <Button
            type="button"
            variant="outline"
            onClick={handlePreview}
            disabled={isLoading}
            className="border-gray-300 text-gray-700 hover:bg-gray-100 gap-2"
          >
            <Eye className="h-4 w-4" />
            Preview Job
          </Button>
        )}
        <Button 
          type="button" 
          variant="outline" 
          onClick={(e) => handleSubmit(e, true)}
          disabled={isLoading}
          className="border-primary text-primary hover:bg-primary/10 gap-2"
        >
          <Save className="h-4 w-4" />
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

      {/* Job Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Job Posting Preview</DialogTitle>
            <DialogDescription>
              This is how your job will appear to candidates
            </DialogDescription>
          </DialogHeader>
          {previewData && (
            <div className="mt-4 space-y-6">
              <div>
                <h2 className="text-2xl font-bold">{previewData.title}</h2>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-gray-600">
                  <span>{previewData.company}</span>
                  <span>•</span>
                  <span>{previewData.location}</span>
                  <span>•</span>
                  <span>{previewData.type}</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Salary</h3>
                <p className="text-gray-700">
                  {previewData.minSalary} LPA - {previewData.maxSalary} LPA
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {previewData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                <div className="text-gray-700 whitespace-pre-line">
                  {previewData.description}
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button onClick={() => setShowPreview(false)}>Close Preview</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormActions;
