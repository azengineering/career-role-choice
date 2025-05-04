
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the welcome page
    navigate("/");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoadingSpinner />
    </div>
  );
};

export default Index;
