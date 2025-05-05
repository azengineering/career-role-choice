
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MessageSquare, Plus, X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CustomQuestion } from "../JobPostFormTypes";

interface CustomQuestionsProps {
  customQuestions: CustomQuestion[];
  questionInput: string;
  setQuestionInput: (value: string) => void;
  newQuestionType: "text" | "yes_no";
  setNewQuestionType: (type: "text" | "yes_no") => void;
  addCustomQuestion: () => void;
  removeCustomQuestion: (index: number) => void;
}

const CustomQuestions: React.FC<CustomQuestionsProps> = ({
  customQuestions,
  questionInput,
  setQuestionInput,
  newQuestionType,
  setNewQuestionType,
  addCustomQuestion,
  removeCustomQuestion
}) => {
  return (
    <Card className="p-6 border-l-4 border-l-primary/50 shadow-md bg-gradient-to-br from-white to-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-primary flex items-center">
          <MessageSquare className="mr-2 h-5 w-5" />
          Custom Questions
        </h3>
        <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
          {customQuestions.length}/10 questions
        </span>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-3">
          <div className="space-y-3">
            <Input
              placeholder="Add a custom question for candidates"
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              disabled={customQuestions.length >= 10}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomQuestion())}
              className="border-gray-300 focus:ring-primary focus:border-primary"
            />
            <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded-lg">
              <span className="text-sm font-medium">Answer type:</span>
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
          </div>
          <Button 
            type="button" 
            onClick={addCustomQuestion}
            disabled={customQuestions.length >= 10 || !questionInput.trim()}
            className="bg-primary hover:bg-primary/90 self-start"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
        
        <div className="space-y-3 mt-4 max-h-[400px] overflow-y-auto pr-2">
          {customQuestions.map((question, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="font-medium text-primary">Question {index + 1}</div>
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
          
          {customQuestions.length === 0 && (
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
  );
};

export default CustomQuestions;
