
import { db } from './localStorageDB';
import { JobPostingData } from '@/components/employer/JobPostFormTypes';

// Get all jobs
export const getAllJobs = () => {
  return db.getAll<JobPostingData>('jobs');
};

// Get jobs by employer ID
export const getJobsByEmployer = (employerId: string) => {
  return db.query<JobPostingData>('jobs', job => job.postedBy === employerId);
};

// Get job by ID
export const getJobById = (jobId: string | number) => {
  return db.getById<JobPostingData>('jobs', String(jobId));
};

// Update job
export const updateJob = (jobId: string | number, updates: Partial<JobPostingData>) => {
  return db.update<JobPostingData>('jobs', String(jobId), updates);
};

// Delete job
export const deleteJob = (jobId: string | number) => {
  return db.delete('jobs', String(jobId));
};

// Apply for job
export const applyForJob = (jobId: string | number, userId: string, applicationData: any = {}) => {
  // Get the job
  const job = db.getById<JobPostingData>('jobs', String(jobId));
  
  if (!job) return false;
  
  // Update applications count
  db.update<JobPostingData>('jobs', String(jobId), {
    applications: (job.applications || 0) + 1
  });
  
  // Generate a match score based on skills match (simplified example)
  const matchScore = applicationData.skills ? 
    Math.floor(Math.random() * 40) + 60 : // With skills, score between 60-100
    Math.floor(Math.random() * 60) + 40;  // Without skills, score between 40-100
  
  // Store the application in 'applications' table
  const applicationId = Date.now().toString();
  db.add('applications', {
    id: applicationId,
    jobId: String(jobId),
    userId,
    jobTitle: job.title,
    company: job.company,
    appliedDate: new Date().toISOString().split('T')[0],
    status: 'Applied',
    matchScore,
    ...applicationData
  });
  
  return applicationId;
};

// Save job
export const saveJob = (jobId: string | number, userId: string) => {
  // Get the job
  const job = db.getById<JobPostingData>('jobs', String(jobId));
  
  if (!job) return false;
  
  // Check if already saved
  const existing = db.query('saved_jobs', item => 
    (item as any).jobId === String(jobId) && (item as any).userId === userId
  );
  
  if (existing.length > 0) return false;
  
  // Store in 'saved_jobs' table
  db.add('saved_jobs', {
    id: Date.now().toString(),
    jobId: String(jobId),
    userId,
    jobTitle: job.title,
    company: job.company,
    savedDate: new Date().toISOString().split('T')[0],
    location: job.location,
    salary: `${job.minSalary} - ${job.maxSalary} LPA`,
    type: job.type,
    isRemote: job.isRemote
  });
  
  return true;
};

// Get saved jobs for a user
export const getSavedJobs = (userId: string) => {
  return db.query('saved_jobs', item => (item as any).userId === userId);
};

// Get applied jobs for a user
export const getAppliedJobs = (userId: string) => {
  return db.query('applications', item => (item as any).userId === userId);
};

// Remove saved job
export const removeSavedJob = (jobId: string | number, userId: string) => {
  const savedJobs = db.query('saved_jobs', item => 
    (item as any).jobId === String(jobId) && (item as any).userId === userId
  );
  
  if (savedJobs.length === 0) return false;
  
  db.delete('saved_jobs', savedJobs[0].id);
  return true;
};

// Get job applications for an employer
export const getJobApplications = (jobIds: (string | number)[]) => {
  return db.query('applications', application => 
    jobIds.some(id => (application as any).jobId === String(id))
  );
};

// Get job applications for a specific job
export const getJobApplicationsByJobId = (jobId: string | number) => {
  return db.query('applications', application => (application as any).jobId === String(jobId));
};

// Update application status
export const updateApplicationStatus = (applicationId: string, status: string) => {
  return db.update('applications', applicationId, { status });
};

// Get a single application by ID
export const getApplicationById = (applicationId: string) => {
  return db.getById('applications', applicationId);
};

// Check if a user has already applied to a job
export const hasApplied = (jobId: string | number, userId: string) => {
  const applications = db.query('applications', application => 
    (application as any).jobId === String(jobId) && (application as any).userId === userId
  );
  return applications.length > 0;
};

// Get suggested jobs based on user profile and applied jobs
export const getSuggestedJobs = (userId: string, limit = 5) => {
  // Get user's applied jobs to extract skills/industries
  const appliedJobs = getAppliedJobs(userId);
  
  // In a real app, we would analyze user profile and applied jobs
  // For this mock, just return random active jobs that the user hasn't applied to
  const allJobs = getAllJobs().filter(job => job.status === "Active");
  
  // Filter out jobs user has already applied to
  const appliedJobIds = appliedJobs.map(job => (job as any).jobId);
  const unappliedJobs = allJobs.filter(job => !appliedJobIds.includes(job.id));
  
  // Return a random subset with match scores
  return unappliedJobs
    .map(job => ({
      ...job,
      matchScore: Math.floor(Math.random() * 40) + 60 // Random score between 60-100
    }))
    .sort(() => Math.random() - 0.5) // Shuffle
    .slice(0, limit); // Limit results
};
