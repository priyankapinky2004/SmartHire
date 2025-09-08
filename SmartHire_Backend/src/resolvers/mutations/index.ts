// src/resolvers/mutations/index.ts
import { resumeMutations } from './resumeMutations';
import { assessmentMutations } from './assessmentMutations';
import { interviewMutations } from './interviewMutations';

export const mutations = {
  ...resumeMutations,
  ...assessmentMutations,
  ...interviewMutations,
};