
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
export const applyForJob = (jobId: string | number, userId: string) => {
  // Get the job
  const job = db.getById<JobPostingData>('jobs', String(jobId));
  
  if (!job) return false;
  
  // Update applications count
  db.update<JobPostingData>('jobs', String(jobId), {
    applications: (job.applications || 0) + 1
  });
  
  // Store the application in 'applications' table
  db.add('applications', {
    jobId: String(jobId),
    userId,
    jobTitle: job.title,
    company: job.company,
    appliedDate: new Date().toISOString().split('T')[0],
    status: 'Applied'
  });
  
  return true;
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
    jobId: String(jobId),
    userId,
    jobTitle: job.title,
    company: job.company,
    savedDate: new Date().toISOString().split('T')[0],
    location: job.location,
    salary: `${job.minSalary} - ${job.maxSalary} LPA`
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
