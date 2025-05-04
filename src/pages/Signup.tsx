
import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import Logo from "@/components/common/Logo";

const Signup: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ai-primary/10 to-ai-accent/5 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-lg p-8 animate-scale-in">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-6">Create your Jobs-Here account</h1>
          
          <AuthForm type="signup" />
          
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-ai-primary font-medium hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/" className="text-gray-600 hover:text-ai-primary">
            ← Back to Welcome Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
