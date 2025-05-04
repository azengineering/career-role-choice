
import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-ai-primary border-t-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full bg-white"></div>
        </div>
      </div>
      <span className="ml-4 text-lg font-medium text-gray-700">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
