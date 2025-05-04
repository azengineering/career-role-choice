
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Welcome from "./pages/Welcome";
import JobSeekerHome from "./pages/JobSeekerHome";
import EmployerHome from "./pages/EmployerHome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import FindJobsPage from "./pages/FindJobsPage";
import JobToolsPage from "./pages/JobToolsPage";
import PostJobsPage from "./pages/PostJobsPage";
import RecruiterToolsPage from "./pages/RecruiterToolsPage";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute: React.FC<{ 
  children: React.ReactNode;
  requiredRole?: "job-seeker" | "employer";
}> = ({ children, requiredRole }) => {
  const { isAuthenticated, userRole } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

// Role Route Component
const RoleRoute: React.FC<{ 
  children: React.ReactNode;
  role: "job-seeker" | "employer";
}> = ({ children, role }) => {
  const { selectedRole, isAuthenticated, userRole } = useAuth();
  
  // If authenticated, use the authenticated role
  if (isAuthenticated) {
    if (userRole !== role) {
      return <Navigate to="/" />;
    }
  } else if (!selectedRole || selectedRole !== role) {
    // If not authenticated, use the selected role
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    
    {/* Job Seeker Routes */}
    <Route path="/job-seeker" element={<RoleRoute role="job-seeker"><JobSeekerHome /></RoleRoute>} />
    <Route path="/job-seeker/about" element={<RoleRoute role="job-seeker"><AboutPage userType="job-seeker" /></RoleRoute>} />
    <Route path="/job-seeker/find-jobs" element={<RoleRoute role="job-seeker"><FindJobsPage /></RoleRoute>} />
    <Route path="/job-seeker/job-tools" element={<RoleRoute role="job-seeker"><JobToolsPage /></RoleRoute>} />
    
    {/* Employer Routes */}
    <Route path="/employer" element={<RoleRoute role="employer"><EmployerHome /></RoleRoute>} />
    <Route path="/employer/about" element={<RoleRoute role="employer"><AboutPage userType="employer" /></RoleRoute>} />
    <Route path="/employer/post-jobs" element={<RoleRoute role="employer"><PostJobsPage /></RoleRoute>} />
    <Route path="/employer/recruiter-tools" element={<RoleRoute role="employer"><RecruiterToolsPage /></RoleRoute>} />
    
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
