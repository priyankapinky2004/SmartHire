// src/resolvers/queries/index.ts
import { resumeQueries } from './resumeQueries';
import { assessmentQueries } from './assessmentQueries';
import { interviewQueries } from './interviewQueries';

export const queries = {
  ...resumeQueries,
  ...assessmentQueries,
  ...interviewQueries,
  
  // Health check query
  healthCheck: () => {
    return { status: 'OK', timestamp: new Date().toISOString() };
  }
};