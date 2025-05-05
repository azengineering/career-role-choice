
import React from "react";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

interface FormActionsProps {
  isLoading: boolean;
  mode: "create" | "edit";
  handleSubmit: (e: React.FormEvent, asDraft: boolean) => void;
}

const FormActions: React.FC<FormActionsProps> = ({ isLoading, mode, handleSubmit }) => {
  return (
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
  );
};

export default FormActions;
