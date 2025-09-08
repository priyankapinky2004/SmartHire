// src/pages/index.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

// Pages
import Dashboard from '../components/dashboard/Dashboard';
import AssessmentResults from '../components/assessment/AssessmentResults';
import AssessmentTaking from '../components/assessment/AssessmentTaking';
import InterviewAnalysis from '../components/interview/InterviewAnalysis';
import ResumeUpload from '../components/resume/ResumeUpload';
import CandidateList from './candidates/CandidateList';
import CandidateDetail from './candidates/CandidateDetail';
import AssessmentList from './assessment/AssessmentList';
import CreateAssessment from './assessment/CreateAssessment';
import InterviewList from './interview/InterviewList';
import ReportsDashboard from './reporting/ReportsDashboard';
import Login from './auth/Login';
import NotFound from './NotFound';

// Auth guard component for protected routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // In a real app, you would check authentication status here
  const isAuthenticated = true; // Replace with actual auth check
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/assessment/take/:id" element={<AssessmentTaking />} />
      
      {/* Protected routes with layout */}
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* Candidate routes */}
      <Route path="/candidates" element={
        <ProtectedRoute>
          <MainLayout>
            <CandidateList />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/candidates/:id" element={
        <ProtectedRoute>
          <MainLayout>
            <CandidateDetail />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* Assessment routes */}
      <Route path="/assessments" element={
        <ProtectedRoute>
          <MainLayout>
            <AssessmentList />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/assessments/create" element={
        <ProtectedRoute>
          <MainLayout>
            <CreateAssessment />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/assessments/:id/results" element={
        <ProtectedRoute>
          <MainLayout>
            <AssessmentResults />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* Interview routes */}
      <Route path="/interviews" element={
        <ProtectedRoute>
          <MainLayout>
            <InterviewList />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/interviews/:id/analysis" element={
        <ProtectedRoute>
          <MainLayout>
            <InterviewAnalysis />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* Resume route */}
      <Route path="/resume-upload" element={
        <ProtectedRoute>
          <MainLayout>
            <ResumeUpload />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* Reports route */}
      <Route path="/reports" element={
        <ProtectedRoute>
          <MainLayout>
            <ReportsDashboard />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;