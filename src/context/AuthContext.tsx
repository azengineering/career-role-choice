
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export type UserRole = "job-seeker" | "employer" | null;

interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  selectedRole: UserRole;
  user: User | null;
  setAuth: (status: boolean) => void;
  setUserRole: (role: UserRole) => void;
  setSelectedRole: (role: UserRole) => void;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  signup: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database for demo
const mockUsers = [
  {
    id: "1",
    email: "jobseeker@example.com",
    password: "password123",
    role: "job-seeker" as UserRole,
    name: "John Doe"
  },
  {
    id: "2",
    email: "employer@example.com",
    password: "password123",
    role: "employer" as UserRole,
    name: "Jane Smith"
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  const setAuth = (status: boolean) => {
    setIsAuthenticated(status);
  };

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      // In a real app, this would make an API call to authenticate
      console.log(`Login attempt with email: ${email}, password: ${password}, role: ${role}`);
      
      // Simulate server validation
      const foundUser = mockUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password && u.role === role
      );
      
      if (!foundUser) {
        toast({
          title: "Login Failed",
          description: "Invalid email, password, or role. Please try again.",
          variant: "destructive"
        });
        return false;
      }
      
      // Login successful
      const { password: _, ...userWithoutPassword } = foundUser;
      
      setIsAuthenticated(true);
      setUserRole(role);
      setUser(userWithoutPassword);
      
      // Store in local storage for persistence
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", role || "");
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${foundUser.name}!`
      });
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  const signup = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      // In a real app, this would make an API call to register
      console.log(`Signup attempt with email: ${email}, password: ${password}, role: ${role}`);
      
      // Check if user already exists in our mock database
      const userExists = mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (userExists) {
        toast({
          title: "Signup Failed",
          description: "A user with this email already exists.",
          variant: "destructive"
        });
        return false;
      }
      
      // Create a new user (in a real app, this would save to a database)
      const newUser = {
        id: `${mockUsers.length + 1}`,
        email,
        password,
        role,
        name: email.split('@')[0] // Simple name generation for demo
      };
      
      // In a real app, we would add the user to the database here
      // mockUsers.push(newUser);
      
      // Simulate successful signup
      const { password: _, ...userWithoutPassword } = newUser;
      
      setIsAuthenticated(true);
      setUserRole(role);
      setUser(userWithoutPassword);
      
      // Store in local storage for persistence
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", role || "");
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Account Created Successfully",
        description: "Welcome to Jobs-Here!"
      });
      
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUser(null);
    
    // Clear local storage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
  };

  // Check if user was previously logged in
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedRole = localStorage.getItem("userRole") as UserRole;
    const storedUser = localStorage.getItem("user");
    
    if (storedAuth === "true" && storedRole) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
      
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Error parsing stored user:", e);
        }
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userRole, 
      selectedRole,
      user,
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
