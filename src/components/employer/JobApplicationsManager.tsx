
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, ChevronDown, Mail, Check, X, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ToolModal from "@/components/tools/ToolModal";
import { useToast } from "@/hooks/use-toast";

interface Applicant {
  id: string;
  name: string;
  email: string;
  appliedDate: string;
  status: "Applied" | "Reviewing" | "Interview" | "Rejected" | "Hired";
  experience: number;
  matchScore?: number;
  resumeUrl?: string;
  avatar?: string;
  coverLetter?: string;
}

interface JobApplicationsManagerProps {
  jobId: string;
  applications: Applicant[];
  onUpdateStatus: (applicantId: string, newStatus: Applicant['status']) => void;
}

const JobApplicationsManager: React.FC<JobApplicationsManagerProps> = ({
  jobId,
  applications,
  onUpdateStatus
}) => {
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [viewMode, setViewMode] = useState<"resume" | "coverLetter" | null>(null);
  const { toast } = useToast();

  const handleViewApplicant = (applicant: Applicant, mode: "resume" | "coverLetter" = "resume") => {
    setSelectedApplicant(applicant);
    setViewMode(mode);
  };

  const handleSendEmail = (applicantEmail: string) => {
    // In a real app, this would open an email compose interface or show modal
    toast({
      title: "Email function",
      description: `Email functionality would open to send message to ${applicantEmail}`,
    });
  };

  const handleStartChat = (applicantName: string) => {
    toast({
      title: "Chat function",
      description: `Chat with ${applicantName} would open`,
    });
  };

  const getStatusBadgeColor = (status: Applicant['status']) => {
    switch(status) {
      case "Applied": return "bg-blue-100 text-blue-800";
      case "Reviewing": return "bg-yellow-100 text-yellow-800";
      case "Interview": return "bg-green-100 text-green-800";
      case "Rejected": return "bg-red-100 text-red-800";
      case "Hired": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (applications.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">No applications yet</h3>
        <p className="text-gray-500 mb-4">
          You haven't received any applications for this job yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Applicant</TableHead>
              <TableHead>Applied On</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Match Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((applicant) => (
              <TableRow key={applicant.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={applicant.avatar} alt={applicant.name} />
                      <AvatarFallback>{applicant.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div>{applicant.name}</div>
                      <div className="text-xs text-gray-500">{applicant.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{new Date(applicant.appliedDate).toLocaleDateString()}</TableCell>
                <TableCell>{applicant.experience} years</TableCell>
                <TableCell>
                  {applicant.matchScore ? (
                    <div className="flex items-center">
                      <span className={`h-2 w-8 rounded-full ${
                        applicant.matchScore >= 80 ? "bg-green-500" : 
                        applicant.matchScore >= 60 ? "bg-yellow-500" : 
                        "bg-red-500"
                      } mr-2`}></span>
                      <span>{applicant.matchScore}%</span>
                    </div>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeColor(applicant.status)}>
                    {applicant.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewApplicant(applicant)}
                      className="h-8"
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      View
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8"
                        >
                          <span>Status</span>
                          <ChevronDown className="h-3.5 w-3.5 ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onUpdateStatus(applicant.id, "Applied")}>
                          Applied
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onUpdateStatus(applicant.id, "Reviewing")}>
                          Reviewing
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onUpdateStatus(applicant.id, "Interview")}>
                          Interview
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onUpdateStatus(applicant.id, "Hired")}>
                          <Check className="h-3.5 w-3.5 mr-1 text-green-500" />
                          Hire
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onUpdateStatus(applicant.id, "Rejected")}>
                          <X className="h-3.5 w-3.5 mr-1 text-red-500" />
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8"
                        >
                          <span>Contact</span>
                          <ChevronDown className="h-3.5 w-3.5 ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleSendEmail(applicant.email)}>
                          <Mail className="h-3.5 w-3.5 mr-1" />
                          Email
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStartChat(applicant.name)}>
                          <MessageCircle className="h-3.5 w-3.5 mr-1" />
                          Chat
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedApplicant && (
        <ToolModal 
          isOpen={!!selectedApplicant}
          onClose={() => {
            setSelectedApplicant(null);
            setViewMode(null);
          }}
          title={`Application: ${selectedApplicant.name}`}
          description={`${selectedApplicant.email} • Applied on ${new Date(selectedApplicant.appliedDate).toLocaleDateString()}`}
          size="lg"
        >
          <div className="space-y-6">
            <div className="flex gap-4 flex-wrap">
              <Button 
                variant={viewMode === "resume" ? "default" : "outline"}
                onClick={() => setViewMode("resume")}
              >
                Resume
              </Button>
              {selectedApplicant.coverLetter && (
                <Button
                  variant={viewMode === "coverLetter" ? "default" : "outline"}
                  onClick={() => setViewMode("coverLetter")}
                >
                  Cover Letter
                </Button>
              )}
            </div>

            {viewMode === "resume" ? (
              <div className="bg-gray-50 p-4 rounded-md min-h-[300px]">
                <p className="text-gray-500 text-center my-10">
                  {selectedApplicant.resumeUrl ? (
                    "Resume preview would be shown here"
                  ) : (
                    "No resume uploaded"
                  )}
                </p>
              </div>
            ) : viewMode === "coverLetter" ? (
              <div className="bg-gray-50 p-4 rounded-md min-h-[300px]">
                <p className="text-gray-700">
                  {selectedApplicant.coverLetter || "No cover letter provided"}
                </p>
              </div>
            ) : null}

            <div className="flex justify-between pt-4">
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => onUpdateStatus(selectedApplicant.id, "Rejected")}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <X className="h-4 w-4 mr-1" />
                  Reject
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSendEmail(selectedApplicant.email)}
                >
                  <Mail className="h-4 w-4 mr-1" />
                  Contact
                </Button>
              </div>
              <Button
                onClick={() => onUpdateStatus(selectedApplicant.id, "Interview")}
              >
                Schedule Interview
              </Button>
            </div>
          </div>
        </ToolModal>
      )}
    </>
  );
};

export default JobApplicationsManager;
