import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/context/AuthContext";
import { Briefcase, User } from "lucide-react";

const RoleSwitcher: React.FC = () => {
  const navigate = useNavigate();
  const { userRole, selectedRole, isAuthenticated, setSelectedRole } = useAuth();
  
  // Current active role, either authenticated or selected
  const currentRole = isAuthenticated ? userRole : selectedRole;
  
  const handleRoleSwitch = () => {
    // If authenticated, they can't switch roles (as per requirement 8)
    if (isAuthenticated) return;
    
    // Otherwise, switch selected role
    const newRole: UserRole = currentRole === "job-seeker" ? "employer" : "job-seeker";
    setSelectedRole(newRole);
    
    // Navigate to appropriate landing page
    navigate(newRole === "job-seeker" ? "/job-seeker" : "/employer");
  };

  return (
    <Button 
      onClick={handleRoleSwitch}
      disabled={isAuthenticated}
      variant="outline"
      className="flex items-center gap-2 rounded-full px-4 py-2 transition-all"
      title={isAuthenticated ? "You cannot change roles after logging in" : "Switch roles"}
    >
      {currentRole === "job-seeker" ? (
        <>
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">Switch to Employer View</span>
          <span className="sm:hidden">Employer</span>
        </>
      ) : (
        <>
          <Briefcase className="h-4 w-4" />
          <span className="hidden sm:inline">Switch to Job Seeker View</span>
          <span className="sm:hidden">Job Seeker</span>
        </>
      )}
    </Button>
  );
};

export default RoleSwitcher;
