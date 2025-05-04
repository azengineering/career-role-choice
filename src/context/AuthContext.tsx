
import React, { createContext, useState, useContext, ReactNode } from "react";

export type UserRole = "job-seeker" | "employer" | null;

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  selectedRole: UserRole;
  setAuth: (status: boolean) => void;
  setUserRole: (role: UserRole) => void;
  setSelectedRole: (role: UserRole) => void;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  signup: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  const setAuth = (status: boolean) => {
    setIsAuthenticated(status);
  };

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // In a real app, this would make an API call to authenticate
    console.log(`Login attempt with email: ${email}, password: ${password}, role: ${role}`);
    
    // For demo purposes, we'll just simulate success
    setIsAuthenticated(true);
    setUserRole(role);
    // Store in local storage for persistence
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role || "");
    
    return true;
  };

  const signup = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // In a real app, this would make an API call to register
    console.log(`Signup attempt with email: ${email}, password: ${password}, role: ${role}`);
    
    // For demo purposes, we'll just simulate success
    setIsAuthenticated(true);
    setUserRole(role);
    // Store in local storage for persistence
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role || "");
    
    return true;
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    // Clear local storage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
  };

  // Check if user was previously logged in
  React.useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedRole = localStorage.getItem("userRole") as UserRole;
    
    if (storedAuth === "true" && storedRole) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userRole, 
      selectedRole,
      setAuth, 
      setUserRole,
      setSelectedRole,
      login, 
      signup, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
