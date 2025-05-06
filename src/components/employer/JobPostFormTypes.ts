
export interface CustomQuestion {
  question: string;
  answerType: "text" | "yes_no";
}

export interface JobPostingData {
  id?: string; // Changed to string only to match DatabaseItem
  title: string;
  company: string;
  industry: string;
  location: string;
  type: string;
  minExperience: number;
  maxExperience: number;
  minSalary: number;
  maxSalary: number;
  skills: string[];
  vacancies: number;
  description: string;
  customQuestions: CustomQuestion[];
  isDraft?: boolean;
  status?: string;
  postedDate?: string;
  postedBy?: string;
  applications?: number;
  views?: number;
  tags?: string[];
  matchScore?: number;
  // DatabaseItem properties
  createdAt?: string;
  updatedAt?: string;
}
