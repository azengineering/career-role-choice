// A simple localStorage-based database system for multi-user support
// This simulates a proper database for trial/demo purposes

// Define database collections
type Collections = 'users' | 'jobs' | 'applications' | 'companies' | 'saved_jobs';

// Generic database item interface
interface DatabaseItem {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// User database interface
export interface UserData extends DatabaseItem {
  email: string;
  name: string;
  role: "job-seeker" | "employer";
  password: string; // Note: In a real app, never store plain passwords
}

// Job posting database interface
export interface JobData extends DatabaseItem {
  title: string;
  company: string;
  companyId?: string;
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
  customQuestions: {
    question: string;
    answerType: "text" | "yes_no";
  }[];
  status: "Active" | "Draft" | "Closed";
  postedDate: string;
  postedBy: string; // userId
  applications: number;
  views: number;
}

// Application database interface
export interface ApplicationData extends DatabaseItem {
  jobId: string;
  userId: string;
  status: "Applied" | "Reviewed" | "Interview" | "Rejected" | "Accepted";
  answers: {
    questionId: string;
    answer: string;
  }[];
  resume?: string;
  coverLetter?: string;
}

// Company database interface
export interface CompanyData extends DatabaseItem {
  name: string;
  industry: string;
  location: string;
  description: string;
  website?: string;
  logo?: string;
  size?: string;
  founded?: string;
  ownerId: string; // userId of the employer who owns this company
}

// Saved job interface
export interface SavedJobData extends DatabaseItem {
  jobId: string;
  userId: string;
  jobTitle: string;
  company: string;
  savedDate: string;
  location: string;
  salary: string;
}

// Database class to handle CRUD operations
class LocalStorageDB {
  private dbPrefix = 'jobs_here_db_';
  
  // Initialize database collections
  constructor() {
    this.initCollection('users');
    this.initCollection('jobs');
    this.initCollection('applications');
    this.initCollection('companies');
    this.initCollection('saved_jobs');
  }
  
  // Initialize a collection if it doesn't exist
  private initCollection(collection: Collections): void {
    if (!localStorage.getItem(this.dbPrefix + collection)) {
      localStorage.setItem(this.dbPrefix + collection, JSON.stringify([]));
    }
  }
  
  // Get all items from a collection
  getAll<T extends DatabaseItem>(collection: Collections): T[] {
    const data = localStorage.getItem(this.dbPrefix + collection);
    return data ? JSON.parse(data) : [];
  }
  
  // Get a single item by ID
  getById<T extends DatabaseItem>(collection: Collections, id: string): T | null {
    const items = this.getAll<T>(collection);
    return items.find(item => item.id === id) || null;
  }
  
  // Add an item to a collection
  add<T extends DatabaseItem>(collection: Collections, item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): T {
    const items = this.getAll<T>(collection);
    
    // Create a new item with ID and timestamps
    const newItem = {
      ...item,
      id: Date.now().toString(), // Simple ID generation
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as T;
    
    // Add item to collection
    items.push(newItem);
    localStorage.setItem(this.dbPrefix + collection, JSON.stringify(items));
    
    return newItem;
  }
  
  // Update an item in a collection
  update<T extends DatabaseItem>(collection: Collections, id: string, updates: Partial<T>): T | null {
    const items = this.getAll<T>(collection);
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) return null;
    
    // Update the item
    items[index] = {
      ...items[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem(this.dbPrefix + collection, JSON.stringify(items));
    return items[index];
  }
  
  // Delete an item from a collection
  delete(collection: Collections, id: string): boolean {
    const items = this.getAll(collection);
    const initialLength = items.length;
    const filteredItems = items.filter(item => item.id !== id);
    
    localStorage.setItem(this.dbPrefix + collection, JSON.stringify(filteredItems));
    return filteredItems.length < initialLength;
  }
  
  // Query items in a collection
  query<T extends DatabaseItem>(
    collection: Collections, 
    filter: (item: T) => boolean
  ): T[] {
    const items = this.getAll<T>(collection);
    return items.filter(filter);
  }
  
  // Clear all data (for testing)
  clearAll(): void {
    localStorage.removeItem(this.dbPrefix + 'users');
    localStorage.removeItem(this.dbPrefix + 'jobs');
    localStorage.removeItem(this.dbPrefix + 'applications');
    localStorage.removeItem(this.dbPrefix + 'companies');
    
    // Reinitialize collections
    this.initCollection('users');
    this.initCollection('jobs');
    this.initCollection('applications');
    this.initCollection('companies');
  }
  
  // Seed initial data for testing
  seedData(): void {
    // Only seed if collections are empty
    if (this.getAll('users').length === 0) {
      // Add mock users
      const users = [
        {
          email: "jobseeker@example.com",
          name: "John Doe",
          role: "job-seeker",
          password: "password123"
        },
        {
          email: "employer@example.com",
          name: "Jane Smith",
          role: "employer",
          password: "password123"
        }
      ];
      
      users.forEach(user => this.add('users', user));
      
      // Get the employer ID for relationships
      const employer = this.query<UserData>('users', user => user.email === "employer@example.com")[0];
      
      // Add a company
      const company = this.add<CompanyData>('companies', {
        name: "TechCorp Inc.",
        industry: "Technology",
        location: "San Francisco, CA",
        description: "TechCorp is a leading technology company specializing in innovative solutions.",
        website: "www.techcorp.example.com",
        founded: "2010",
        size: "500+ employees",
        ownerId: employer.id
      });
      
      // Add sample jobs
      const jobs = [
        {
          title: "Front-end Developer",
          company: company.name,
          companyId: company.id,
          industry: "Technology",
          location: "San Francisco, CA",
          type: "Full-time",
          minExperience: 2,
          maxExperience: 5,
          minSalary: 80000,
          maxSalary: 120000,
          skills: ["React", "TypeScript", "CSS"],
          vacancies: 2,
          description: "We are looking for a talented Front-end Developer to join our team.",
          customQuestions: [
            {
              question: "What's your experience with React?",
              answerType: "text"
            }
          ],
          status: "Active",
          postedDate: new Date().toISOString(),
          postedBy: employer.id,
          applications: 5,
          views: 120
        },
        {
          title: "UI/UX Designer",
          company: company.name,
          companyId: company.id,
          industry: "Technology",
          location: "Remote",
          type: "Full-time",
          minExperience: 1,
          maxExperience: 3,
          minSalary: 70000,
          maxSalary: 100000,
          skills: ["Figma", "Adobe XD", "User Research"],
          vacancies: 1,
          description: "We are seeking a creative UI/UX Designer to create amazing user experiences.",
          customQuestions: [],
          status: "Active",
          postedDate: new Date().toISOString(),
          postedBy: employer.id,
          applications: 3,
          views: 85
        }
      ];
      
      jobs.forEach(job => this.add('jobs', job));
    }
  }
}

// Export a single instance
export const db = new LocalStorageDB();

// Seed data on initialization
db.seedData();
