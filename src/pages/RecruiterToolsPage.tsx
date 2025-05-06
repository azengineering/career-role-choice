import React, { useState } from "react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ToolModal from "@/components/tools/ToolModal";
import CandidateScreening from "@/components/tools/CandidateScreening";
import { useToast } from "@/components/ui/use-toast";

const RecruiterToolsPage: React.FC = () => {
  const { toast } = useToast();
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  // Recruiter tools data
  const tools = [
    {
      id: "ai-screening",
      name: "AI Candidate Screening",
      description: "Automatically evaluate resumes and rank candidates based on job requirements, saving you hours of manual work.",
      icon: (
        <svg className="w-10 h-10 text-ai-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      features: [
        "Parse hundreds of resumes in minutes",
        "Match candidates to job requirements",
        "Score and rank candidates automatically",
        "Identify skills gaps and potential"
      ],
      component: CandidateScreening
    },
    {
      id: "interview-question-generator",
      name: "Interview Question Generator",
      description: "Create tailored interview questions based on the job requirements and candidate profiles.",
      icon: (
        <svg className="w-10 h-10 text-ai-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      features: [
        "Role-specific question banks",
        "Technical and behavioral questions",
        "Skill-based assessment questions",
        "Customizable scoring criteria"
      ]
    },
    {
      id: "team-fit-analysis",
      name: "Team Fit Analysis",
      description: "Assess how candidates will complement your existing team in terms of skills, working styles, and culture.",
      icon: (
        <svg className="w-10 h-10 text-ai-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      features: [
        "Team dynamics evaluation",
        "Personality compatibility insights",
        "Skills complementarity analysis",
        "Culture fit assessment"
      ]
    },
    {
      id: "automated-outreach",
      name: "Automated Candidate Outreach",
      description: "Create personalized outreach messages for passive candidates and streamline communication.",
      icon: (
        <svg className="w-10 h-10 text-ai-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      features: [
        "AI-generated personalized messages",
        "Multi-channel outreach campaigns",
        "Response tracking and analytics",
        "Follow-up automation"
      ]
    },
    {
      id: "skill-assessment",
      name: "Skills Assessment Platform",
      description: "Send candidates role-specific assessments to evaluate their technical and soft skills before the interview.",
      icon: (
        <svg className="w-10 h-10 text-ai-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      features: [
        "Role-specific challenge libraries",
        "Anti-cheating measures",
        "Automated scoring and evaluation",
        "Skill benchmarking against industry standards"
      ]
    },
    {
      id: "analytics-dashboard",
      name: "Recruitment Analytics Dashboard",
      description: "Track your recruitment performance, identify bottlenecks, and optimize your hiring process.",
      icon: (
        <svg className="w-10 h-10 text-ai-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: [
        "Time-to-hire tracking",
        "Source effectiveness analysis",
        "Cost-per-hire calculation",
        "Pipeline conversion metrics"
      ]
    },
  ];

  const handleLaunchTool = (toolId: string) => {
    // Check if the tool is implemented
    const tool = tools.find(t => t.id === toolId);
    if (tool && tool.component) {
      setActiveToolId(toolId);
    } else {
      toast({
        title: "Coming Soon",
        description: "This tool is currently under development and will be available soon!",
        variant: "default",
      });
    }
  };

  // Function to render tool content based on toolId
  const renderToolContent = (toolId: string | null) => {
    const tool = tools.find(t => t.id === toolId);
    if (!tool || !tool.component) return null;
    
    const ToolComponent = tool.component;
    return <ToolComponent />;
  };

  // Merge the rest of the tools from the original code
  const allTools = [
    ...tools.slice(0, 1), // Our implemented tool
    // Add the rest of the tools without components
    {
      id: "interview-question-generator",
      name: "Interview Question Generator",
      description: "Create tailored interview questions based on the job requirements and candidate profiles.",
      icon: (
        <svg className="w-10 h-10 text-ai-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      features: [
        "Role-specific question banks",
        "Technical and behavioral questions",
        "Skill-based assessment questions",
        "Customizable scoring criteria"
      ]
    },
    {
      id: "team-fit-analysis",
      name: "Team Fit Analysis",
      description: "Assess how candidates will complement your existing team in terms of skills, working styles, and culture.",
      icon: (
        <svg className="w-10 h-10 text-ai-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      features: [
        "Team dynamics evaluation",
        "Personality compatibility insights",
        "Skills complementarity analysis",
        "Culture fit assessment"
      ]
    },
    {
      id: "automated-outreach",
      name: "Automated Candidate Outreach",
      description: "Create personalized outreach messages for passive candidates and streamline communication.",
      icon: (
        <svg className="w-10 h-10 text-ai-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      features: [
        "AI-generated personalized messages",
        "Multi-channel outreach campaigns",
        "Response tracking and analytics",
        "Follow-up automation"
      ]
    },
    {
      id: "skill-assessment",
      name: "Skills Assessment Platform",
      description: "Send candidates role-specific assessments to evaluate their technical and soft skills before the interview.",
      icon: (
        <svg className="w-10 h-10 text-ai-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      features: [
        "Role-specific challenge libraries",
        "Anti-cheating measures",
        "Automated scoring and evaluation",
        "Skill benchmarking against industry standards"
      ]
    },
    {
      id: "analytics-dashboard",
      name: "Recruitment Analytics Dashboard",
      description: "Track your recruitment performance, identify bottlenecks, and optimize your hiring process.",
      icon: (
        <svg className="w-10 h-10 text-ai-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: [
        "Time-to-hire tracking",
        "Source effectiveness analysis",
        "Cost-per-hire calculation",
        "Pipeline conversion metrics"
      ]
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header userType="employer" />
      <main className="flex-grow">
        <div className="bg-gradient-to-br from-ai-primary/10 to-ai-accent/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Recruiter Tools</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Powerful AI-powered tools to streamline your recruitment process
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="all-tools">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all-tools">All Tools</TabsTrigger>
                <TabsTrigger value="screening">Screening</TabsTrigger>
                <TabsTrigger value="interviewing">Interviewing</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all-tools">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allTools.map((tool) => (
                  <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="bg-ai-accent/10 p-3 rounded-lg">
                          {tool.icon}
                        </div>
                      </div>
                      <CardTitle className="mt-4">{tool.name}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {tool.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full" onClick={() => handleLaunchTool(tool.id)}>
                        Launch Tool
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="screening">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allTools
                  .filter(tool => ['ai-screening', 'skill-assessment'].includes(tool.id))
                  .map((tool) => (
                    <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="bg-ai-accent/10 p-3 rounded-lg">
                            {tool.icon}
                          </div>
                        </div>
                        <CardTitle className="mt-4">{tool.name}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 mb-6">
                          {tool.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full" onClick={() => handleLaunchTool(tool.id)}>
                          Launch Tool
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="interviewing">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allTools
                  .filter(tool => ['interview-question-generator', 'team-fit-analysis'].includes(tool.id))
                  .map((tool) => (
                    <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="bg-ai-accent/10 p-3 rounded-lg">
                            {tool.icon}
                          </div>
                        </div>
                        <CardTitle className="mt-4">{tool.name}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 mb-6">
                          {tool.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full" onClick={() => handleLaunchTool(tool.id)}>
                          Launch Tool
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allTools
                  .filter(tool => ['analytics-dashboard', 'automated-outreach'].includes(tool.id))
                  .map((tool) => (
                    <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="bg-ai-accent/10 p-3 rounded-lg">
                            {tool.icon}
                          </div>
                        </div>
                        <CardTitle className="mt-4">{tool.name}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 mb-6">
                          {tool.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full" onClick={() => handleLaunchTool(tool.id)}>
                          Launch Tool
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Tool Modal */}
        {activeToolId && (
          <ToolModal
            isOpen={!!activeToolId}
            onClose={() => setActiveToolId(null)}
            title={allTools.find(t => t.id === activeToolId)?.name || "Tool"}
            description={allTools.find(t => t.id === activeToolId)?.description}
          >
            {renderToolContent(activeToolId)}
          </ToolModal>
        )}
        
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Premium Recruiter Solutions</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Take your recruitment to the next level with our premium packages
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="bg-white shadow-lg border-ai-accent/20">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl">Basic</CardTitle>
                  <CardDescription>For small teams</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">$199</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>5 active job postings</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>AI Candidate Screening</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Basic Analytics</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>2 team members</span>
                    </li>
                  </ul>
                  <Button className="w-full" onClick={() => toast({ title: "Coming Soon", description: "Plan subscriptions will be available soon!" })}>
                    Start Basic
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-ai-primary to-ai-accent text-white shadow-lg relative transform scale-105">
                <div className="absolute top-0 right-0 bg-white text-ai-primary text-xs font-bold px-2 py-1 rounded-bl">
                  MOST POPULAR
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-white">Pro</CardTitle>
                  <CardDescription className="text-white/80">For growing teams</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">$499</span>
                    <span className="text-white/80">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>20 active job postings</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>All recruiter tools</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Advanced Analytics</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>5 team members</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Email & phone support</span>
                    </li>
                  </ul>
                  <Button variant="secondary" className="w-full text-ai-primary" onClick={() => toast({ title: "Coming Soon", description: "Plan subscriptions will be available soon!" })}>
                    Start Pro
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-lg border-ai-accent/20">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl">Enterprise</CardTitle>
                  <CardDescription>For large organizations</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">Contact</span>
                    <span className="text-gray-600"> for pricing</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000
