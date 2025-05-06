
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

const CandidateScreening: React.FC = () => {
  const { toast } = useToast();
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  
  const sampleJobDescription = `Frontend Developer (Senior)
  
We are looking for an experienced Frontend Developer who is proficient with React.js. The ideal candidate should have 5+ years of experience building responsive web applications, strong knowledge of modern JavaScript practices, and experience with state management solutions like Redux or Context API.

Requirements:
- 5+ years of experience with HTML, CSS, JavaScript
- 3+ years of experience with React.js
- Experience with TypeScript
- Experience with REST APIs and GraphQL
- Knowledge of responsive design and cross-browser compatibility
- Experience with CSS pre-processors (SASS/LESS)
- Experience with testing frameworks
- Good understanding of version control systems (Git)`;

  const handleAnalyzeResume = () => {
    if (!jobDescription.trim() || !resumeText.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both a job description and resume text.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    toast({
      title: "Analysis Started",
      description: "Our AI is analyzing the candidate's resume against the job requirements...",
    });
    
    // Simulate AI analysis
    setTimeout(() => {
      // Create a mock analysis result
      const skills = ["React", "JavaScript", "TypeScript", "CSS", "HTML", "REST API", "Git"];
      const skillMatches = skills.map(skill => ({
        skill,
        match: Math.floor(Math.random() * 100) + 1,
        required: Math.random() > 0.3
      }));
      
      const overallScore = Math.floor(Math.random() * 40) + 60; // Generate score between 60-100
      
      const result = {
        overallScore,
        skillMatches,
        experienceMatch: Math.random() > 0.5 ? "Good" : "Partial",
        educationMatch: Math.random() > 0.5 ? "Good" : "Partial",
        keyStrengths: [
          "Strong frontend development skills",
          "Experience with modern JavaScript",
          "Good understanding of React ecosystem"
        ],
        areasToConsider: [
          "Limited experience with GraphQL",
          "No mention of testing frameworks",
          "Unclear experience level with TypeScript"
        ]
      };
      
      setAnalysisResults(result);
      setIsAnalyzing(false);
    }, 2500);
  };
  
  const handleReset = () => {
    setAnalysisResults(null);
    setJobDescription("");
    setResumeText("");
  };
  
  const handleUseSampleData = () => {
    setJobDescription(sampleJobDescription);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">AI Candidate Screening Tool</h3>
        <Button variant="outline" size="sm" onClick={handleUseSampleData}>
          Use Sample Job Description
        </Button>
      </div>
      
      {!analysisResults ? (
        <>
          <div className="space-y-2">
            <Label htmlFor="job-description">Job Description</Label>
            <Textarea
              id="job-description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste your job description here..."
              className="min-h-[150px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="resume">Resume Text</Label>
            <Textarea
              id="resume"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste the candidate's resume here..."
              className="min-h-[200px]"
            />
          </div>
          
          <Button 
            onClick={handleAnalyzeResume} 
            disabled={isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Resume Match"}
          </Button>
        </>
      ) : (
        <>
          <Card className="bg-white">
            <CardContent className="pt-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Analysis Results</h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-ai-primary">{analysisResults.overallScore}%</div>
                  <div className="text-sm text-gray-500">Match Score</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Skills Assessment</h4>
                <div className="space-y-3">
                  {analysisResults.skillMatches.map((skill: any, index: number) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{skill.skill}</span>
                        <span className="font-medium">{skill.match}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={skill.match} className="h-2 flex-1" />
                        {skill.required && (
                          <span className="text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded">Required</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Key Strengths</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {analysisResults.keyStrengths.map((strength: string, index: number) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Areas to Consider</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {analysisResults.areasToConsider.map((area: string, index: number) => (
                      <li key={index}>{area}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Experience Match</h4>
                  <span className={`text-sm ${analysisResults.experienceMatch === "Good" ? "text-green-600" : "text-amber-600"}`}>
                    {analysisResults.experienceMatch}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium">Education Match</h4>
                  <span className={`text-sm ${analysisResults.educationMatch === "Good" ? "text-green-600" : "text-amber-600"}`}>
                    {analysisResults.educationMatch}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleReset} variant="outline">
                  Analyze Another Resume
                </Button>
                <Button 
                  onClick={() => toast({
                    title: "PDF Generated", 
                    description: "Analysis report has been downloaded."
                  })}
                >
                  Generate Report PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default CandidateScreening;
