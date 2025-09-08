const role = localStorage.getItem("role");

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./components/dashboard/Dashboard";
import AssessmentTaking from "./components/assessment/AssessmentTaking";
import AssessmentResults from "./components/assessment/AssessmentResults";
import InterviewAnalysis from "./components/interview/InterviewAnalysis";
import ResumeUpload from "./components/resume/ResumeUpload";
import CandidateList from "./pages/candidates/CandidateList";
import AssessmentList from "./pages/assessment/AssessmentList";
import InterviewList from "./pages/interview/InterviewList";
import ReportsDashboard from "./pages/reporting/ReportsDashboard";
import Login from "./pages/auth/Login";
import CandidateDashboard from "./pages/candidates/CandidateDashboard";

const App: React.FC = () => {
  return (
    <Router>
      {role === null && <Navigate to="/login" replace />}
      {role === "candidate" && window.location.pathname === "/" && (
        <Navigate to="/candidate" replace />
      )}
      {role === "admin" && window.location.pathname === "/" && (
        <Navigate to="/dashboard" replace />
      )}

      <Routes>
        {/* Public routes */}
        <Route path="/assessment/:id" element={<AssessmentTaking />} />

        {/* Protected routes with layout */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/assessments/:id/results"
          element={
            <MainLayout>
              <AssessmentResults />
            </MainLayout>
          }
        />
        <Route
          path="/interviews/:id/analysis"
          element={
            <MainLayout>
              <InterviewAnalysis />
            </MainLayout>
          }
        />
        <Route
          path="/resume-upload"
          element={
            <MainLayout>
              <ResumeUpload />
            </MainLayout>
          }
        />
        <Route
          path="/candidates"
          element={
            <MainLayout>
              <CandidateList />
            </MainLayout>
          }
        />
        <Route
          path="/assessments"
          element={
            <MainLayout>
              <AssessmentList />
            </MainLayout>
          }
        />
        <Route
          path="/interviews"
          element={
            <MainLayout>
              <InterviewList />
            </MainLayout>
          }
        />
        <Route
          path="/reports"
          element={
            <MainLayout>
              <ReportsDashboard />
            </MainLayout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/candidate" element={<CandidateDashboard />} />
        <Route
          path="/candidate/assessment/:id"
          element={<AssessmentTaking />}
        />
        {/* Redirect to dashboard for any unknown routes */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
