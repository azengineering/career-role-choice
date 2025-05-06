
export interface CustomQuestion {
  question: string;
  answerType: "text" | "yes_no";
}

export interface JobPostingData {
  id: string; // Required
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
  benefits?: string[];
  isRemote?: boolean;
  isUrgent?: boolean;
  isFeatured?: boolean;
  applicationDeadline?: string;
  isDraft?: boolean;
  status?: string;
  postedDate?: string;
  postedBy?: string;
  applications?: number;
  views?: number;
  tags?: string[];
  matchScore?: number;
  // DatabaseItem properties - making these required to satisfy DatabaseItem constraint
  createdAt: string; // Changed from optional to required
  updatedAt: string; // Changed from optional to required
}
