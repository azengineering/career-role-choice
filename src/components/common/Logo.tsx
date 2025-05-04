
import { Brain } from "lucide-react";

interface LogoProps {
  variant?: "light" | "dark";
}

const Logo: React.FC<LogoProps> = ({ variant = "dark" }) => {
  return (
    <div className="flex items-center gap-2">
      <Brain 
        size={32} 
        className={`${variant === "light" ? "text-white" : "text-ai-primary"}`} 
      />
      <span 
        className={`text-xl font-bold ${
          variant === "light" ? "text-white" : "text-ai-primary"
        }`}
      >
        Jobs-Here
      </span>
    </div>
  );
};

export default Logo;
