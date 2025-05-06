
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { db, UserData } from "@/services/localStorageDB";

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
      console.log(`Login attempt with email: ${email}, password: ${password}, role: ${role}`);
      
      // Use our local database to find the user
      const users = db.query<UserData>('users', u => 
        u.email.toLowerCase() === email.toLowerCase() && 
        u.password === password && 
        u.role === role
      );
      
      if (users.length === 0) {
        toast({
          title: "Login Failed",
          description: "Invalid email, password, or role. Please try again.",
          variant: "destructive"
        });
        return false;
      }
      
      const foundUser = users[0];
      
      // Login successful
      const userWithoutPassword = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
        name: foundUser.name
      };
      
      setIsAuthenticated(true);
      setUserRole(foundUser.role);
      setUser(userWithoutPassword);
      
      // Store in local storage for persistence
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", foundUser.role || "");
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
      console.log(`Signup attempt with email: ${email}, password: ${password}, role: ${role}`);
      
      // Check if user already exists in our database
      const existingUsers = db.query<UserData>('users', u => 
        u.email.toLowerCase() === email.toLowerCase()
      );
      
      if (existingUsers.length > 0) {
        toast({
          title: "Signup Failed",
          description: "A user with this email already exists.",
          variant: "destructive"
        });
        return false;
      }
      
      // Create a new user
      const name = email.split('@')[0]; // Simple name generation for demo
      
      const newUser = db.add<UserData>('users', {
        email,
        password,
        role: role as "job-seeker" | "employer", // Type assertion since we know it's one of these values
        name
      });
      
      // Create user object without password
      const userWithoutPassword = {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        name: newUser.name
      };
      
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
