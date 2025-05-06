
export interface CustomQuestion {
  question: string;
  answerType: "text" | "yes_no";
}

export interface JobPostingData {
  id?: number | string;
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
  postedBy?: string; // Added postedBy for employer ID
  applications?: number; // Added applications count
  views?: number; // Added views count
  tags?: string[];
  matchScore?: number;
  // DatabaseItem properties
  createdAt?: string;
  updatedAt?: string;
}
