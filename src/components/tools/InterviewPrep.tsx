
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const InterviewPrep: React.FC = () => {
  const { toast } = useToast();
  const [jobTitle, setJobTitle] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("behavioral");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [feedback, setFeedback] = useState("");
  
  const behavioralQuestions = [
    "Tell me about a time when you had to deal with a difficult team member.",
    "Describe a situation where you had to meet a tight deadline.",
    "Give an example of how you handled a major mistake.",
    "Tell me about a time you went above and beyond for a project.",
    "How do you prioritize tasks when you have multiple deadlines?"
  ];
  
  const technicalQuestions = [
    "How would you explain REST API architecture?",
    "What's the difference between var, let, and const in JavaScript?",
    "Explain the concept of database normalization.",
    "What is the difference between HTTP and HTTPS?",
    "Explain the concept of responsive design."
  ];

  const generateQuestion = () => {
    const questions = category === "behavioral" ? behavioralQuestions : technicalQuestions;
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setAnswer("");
    setFeedback("");
  };
  
  const handleSubmitAnswer = () => {
    if (!answer.trim()) {
      toast({
        title: "Empty Answer",
        description: "Please provide an answer before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Analyzing Answer",
      description: "Our AI is evaluating your response...",
    });
    
    // Simulate AI feedback
    setTimeout(() => {
      // Generate some sample feedback based on answer length
      const feedbackOptions = [
        {
          text: "Great answer! You provided specific examples and demonstrated your skills effectively. Consider quantifying your achievements for even more impact.",
          strength: "Good use of the STAR method (Situation, Task, Action, Result).",
          improvement: "Try to be more concise while maintaining the key details."
        },
        {
          text: "Your answer covers the basics but lacks specific details. Try to include concrete examples from your experience.",
          strength: "You addressed the main question clearly.",
          improvement: "Add more specifics about your personal contribution and the outcomes."
        },
        {
          text: "This answer needs more structure. Consider using the STAR method (Situation, Task, Action, Result) to organize your response.",
          strength: "You showed enthusiasm for the topic.",
          improvement: "Be more specific about the actions you took and the results achieved."
        }
      ];
      
      const feedbackIndex = answer.length > 200 ? 0 : answer.length > 100 ? 1 : 2;
      
      setFeedback(JSON.stringify(feedbackOptions[feedbackIndex], null, 2));
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <Label htmlFor="job-title">Job Title (Optional)</Label>
          <input
            id="job-title"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g. Frontend Developer"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="question-type">Question Type</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="behavioral">Behavioral</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={generateQuestion}>Generate Question</Button>
      </div>
      
      {currentQuestion && (
        <Card className="bg-gray-50">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">Interview Question:</h3>
            <p>{currentQuestion}</p>
          </CardContent>
        </Card>
      )}
      
      {currentQuestion && (
        <div className="space-y-2">
          <Label htmlFor="answer">Your Answer</Label>
          <Textarea
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="min-h-[150px]"
          />
          <Button onClick={handleSubmitAnswer} className="mt-2">
            Get Feedback
          </Button>
        </div>
      )}
      
      {feedback && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">AI Feedback:</h3>
            <pre className="whitespace-pre-wrap text-sm bg-white p-4 rounded border">{feedback}</pre>
          </CardContent>
        </Card>
      )}
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Interview Tips:</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Use the STAR method: Situation, Task, Action, Result</li>
          <li>Provide specific examples from your experience</li>
          <li>Keep answers concise but comprehensive (1-2 minutes)</li>
          <li>Practice your answers out loud before the interview</li>
          <li>Research the company thoroughly before your interview</li>
        </ul>
      </div>
    </div>
  );
};

export default InterviewPrep;
