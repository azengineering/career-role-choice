
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { UserRole, useAuth } from "@/context/AuthContext";

interface AuthFormProps {
  type: "login" | "signup";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("job-seeker");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const { login, signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    // Simple email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Password validation
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    // Confirm password (only for signup)
    if (type === "signup" && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      let success;
      
      if (type === "login") {
        success = await login(email, password, role);
      } else {
        success = await signup(email, password, role);
      }
      
      if (success) {
        navigate(role === "job-seeker" ? "/job-seeker/dashboard" : "/employer/dashboard");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={errors.password ? "border-red-500" : ""}
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>
      
      {type === "signup" && (
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={errors.confirmPassword ? "border-red-500" : ""}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>
      )}
      
      <div className="space-y-2">
        <Label>I am a:</Label>
        <RadioGroup value={role as string} onValueChange={(value) => setRole(value as UserRole)} className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="job-seeker" id="job-seeker" />
            <Label htmlFor="job-seeker">Job Seeker</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="employer" id="employer" />
            <Label htmlFor="employer">Employer</Label>
          </div>
        </RadioGroup>
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Processing..." : type === "login" ? "Login" : "Sign Up"}
      </Button>
      
      {type === "login" && (
        <div className="text-sm text-center text-gray-500">
          <p>
            Sample logins for demo:
          </p>
          <p className="mt-1">
            <strong>Job Seeker:</strong> jobseeker@example.com / password123
          </p>
          <p>
            <strong>Employer:</strong> employer@example.com / password123
          </p>
        </div>
      )}
    </form>
  );
};

export default AuthForm;
