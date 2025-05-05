
export interface CustomQuestion {
  question: string;
  answerType: "text" | "yes_no";
}

export interface JobPostingData {
  id?: number;
  title: string;
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
}
