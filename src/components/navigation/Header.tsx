
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/common/Logo";
import { useAuth } from "@/context/AuthContext";

interface HeaderProps {
  userType: "job-seeker" | "employer";
}

const Header: React.FC<HeaderProps> = ({ userType }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const baseUrl = userType === "job-seeker" ? "/job-seeker" : "/employer";
  
  const navLinks = userType === "job-seeker" 
    ? [
        { name: "Home", path: baseUrl },
        { name: "About", path: `${baseUrl}/about` },
        { name: "Find Jobs", path: "/job-seeker/find-jobs" },
        { name: "Job Tools", path: "/job-seeker/job-tools" },
      ]
    : [
        { name: "Home", path: baseUrl },
        { name: "About", path: `${baseUrl}/about` },
        { name: "Post Jobs", path: "/employer/post-jobs" },
        { name: "Recruiter Tools", path: "/employer/recruiter-tools" },
      ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={baseUrl}>
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-ai-primary transition duration-150 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <Button 
                variant="outline"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              onClick={toggleMobileMenu}
              className="p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white py-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-700 hover:text-ai-primary transition duration-150 px-4 py-2 font-medium"
                  onClick={toggleMobileMenu}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <Button
                    variant="outline" 
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                    className="w-full"
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Link to="/login" onClick={toggleMobileMenu}>
                      <Button variant="outline" className="w-full mb-2">Login</Button>
                    </Link>
                    <Link to="/signup" onClick={toggleMobileMenu}>
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
