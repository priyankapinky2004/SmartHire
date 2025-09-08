// src/components/dashboard/Dashboard.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Define types
interface MetricCard {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
}

interface Candidate {
  id: string;
  name: string;
  position: string;
  status:
    | "pending"
    | "assessment_sent"
    | "assessment_completed"
    | "interview_scheduled"
    | "interview_completed"
    | "hired"
    | "rejected";
  lastActivity: string;
}

interface UpcomingInterview {
  id: string;
  candidateName: string;
  position: string;
  date: string;
  time: string;
  interviewers: string[];
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "candidates" | "assessments"
  >("overview");

  // Mock data for metrics
  const metrics: MetricCard[] = [
    {
      title: "Total Candidates",
      value: 247,
      change: 12,
      icon: (
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      title: "Assessments Completed",
      value: 156,
      change: 8,
      icon: (
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
    {
      title: "Interviews Conducted",
      value: 89,
      change: 5,
      icon: (
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
    },
    {
      title: "Candidates Hired",
      value: 28,
      change: 2,
      icon: (
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
    },
  ];

  // Mock data for charts
  const assessmentData = [
    { month: "Jan", sent: 65, completed: 40 },
    { month: "Feb", sent: 75, completed: 55 },
    { month: "Mar", sent: 85, completed: 70 },
    { month: "Apr", sent: 90, completed: 75 },
    { month: "May", sent: 100, completed: 85 },
  ];

  const emotionData = [
    { name: "Happy", value: 35 },
    { name: "Neutral", value: 45 },
    { name: "Sad", value: 10 },
    { name: "Distress", value: 5 },
    { name: "Anger", value: 5 },
  ];

  const EMOTION_COLORS: Record<string, string> = {
    Happy: "#4ade80",
    Neutral: "#93c5fd",
    Sad: "#fcd34d",
    Distress: "#fb923c",
    Anger: "#f87171",
  };

  // Mock data for candidates
  const candidates: Candidate[] = [
    {
      id: "1",
      name: "Michael Brown",
      position: "Backend Developer",
      status: "interview_completed",
      lastActivity: "2 days ago",
    },
    {
      id: "2",
      name: "Sarah Williams",
      position: "Frontend Developer",
      status: "assessment_completed",
      lastActivity: "1 day ago",
    },
    {
      id: "3",
      name: "John Smith",
      position: "DevOps Engineer",
      status: "assessment_sent",
      lastActivity: "4 days ago",
    },
    {
      id: "4",
      name: "Emily Johnson",
      position: "UX Designer",
      status: "interview_scheduled",
      lastActivity: "3 hours ago",
    },
    {
      id: "5",
      name: "David Lee",
      position: "Product Manager",
      status: "pending",
      lastActivity: "Just now",
    },
  ];

  // Mock data for upcoming interviews
  const upcomingInterviews: UpcomingInterview[] = [
    {
      id: "1",
      candidateName: "Emily Johnson",
      position: "UX Designer",
      date: "June 10, 2023",
      time: "2:00 PM",
      interviewers: ["John Doe", "Jane Smith"],
    },
    {
      id: "2",
      candidateName: "Alex Turner",
      position: "Mobile Developer",
      date: "June 11, 2023",
      time: "10:30 AM",
      interviewers: ["Mike Johnson"],
    },
    {
      id: "3",
      candidateName: "Lisa Chen",
      position: "Data Scientist",
      date: "June 12, 2023",
      time: "3:15 PM",
      interviewers: ["Sarah Brown", "Mark Davis"],
    },
  ];

  // Helper function to get status badge
  const getStatusBadge = (status: Candidate["status"]) => {
    const statusClasses = {
      pending: "bg-gray-100 text-gray-800",
      assessment_sent: "bg-blue-100 text-blue-800",
      assessment_completed: "bg-indigo-100 text-indigo-800",
      interview_scheduled: "bg-yellow-100 text-yellow-800",
      interview_completed: "bg-purple-100 text-purple-800",
      hired: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };

    const statusText = {
      pending: "Pending",
      assessment_sent: "Assessment Sent",
      assessment_completed: "Assessment Completed",
      interview_scheduled: "Interview Scheduled",
      interview_completed: "Interview Completed",
      hired: "Hired",
      rejected: "Rejected",
    };

    return (
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}`}
      >
        {statusText[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

        {/* Tabs */}
        <div className="mt-4 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`${
                activeTab === "overview"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("candidates")}
              className={`${
                activeTab === "candidates"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Candidates
            </button>
            <button
              onClick={() => setActiveTab("assessments")}
              className={`${
                activeTab === "assessments"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Assessments
            </button>
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="mt-6">
            {/* Metrics */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                        {metric.icon}
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            {metric.title}
                          </dt>
                          <dd>
                            <div className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900">
                                {metric.value}
                              </div>
                              <div
                                className={`ml-2 flex items-baseline text-sm font-semibold ${metric.change >= 0 ? "text-green-600" : "text-red-600"}`}
                              >
                                {metric.change >= 0 ? (
                                  <svg
                                    className="self-center flex-shrink-0 h-5 w-5 text-green-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    className="self-center flex-shrink-0 h-5 w-5 text-red-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                                <span className="sr-only">
                                  {metric.change >= 0
                                    ? "Increased"
                                    : "Decreased"}{" "}
                                  by
                                </span>
                                {metric.change >= 0 ? "+" : ""}
                                {metric.change}
                              </div>
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
              {/* Assessment Chart */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Assessment Activity
                  </h3>
                  <div className="mt-2 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={assessmentData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="sent"
                          name="Assessments Sent"
                          fill="#93c5fd"
                        />
                        <Bar
                          dataKey="completed"
                          name="Assessments Completed"
                          fill="#4f46e5"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Emotion Analysis Chart */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Candidate Emotions
                  </h3>
                  <div className="mt-2 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={emotionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {emotionData.map((entry) => (
                            <Cell
                              key={entry.name}
                              fill={EMOTION_COLORS[entry.name] || "#8884d8"}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Interviews */}
            <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Upcoming Interviews
                </h3>
                <Link
                  to="/interviews"
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  View All
                </Link>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {upcomingInterviews.map((interview) => (
                    <li
                      key={interview.id}
                      className="px-4 py-4 sm:px-6 hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <span className="text-indigo-800 font-medium">
                                {interview.candidateName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-indigo-600">
                              {interview.candidateName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {interview.position}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-4 text-right">
                            <div className="text-sm text-gray-900">
                              {interview.date}
                            </div>
                            <div className="text-sm text-gray-500">
                              {interview.time}
                            </div>
                          </div>
                          <Link
                            to={`/interviews/${interview.id}`}
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Join
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Candidates Tab */}
        {activeTab === "candidates" && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                All Candidates
              </h2>
              <Link
                to="/resume-upload"
                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Candidate
              </Link>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {candidates.map((candidate) => (
                  <li key={candidate.id}>
                    <Link
                      to={`/candidates/${candidate.id}`}
                      className="block hover:bg-gray-50"
                    >
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                <span className="text-indigo-800 font-medium">
                                  {candidate.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-indigo-600">
                                {candidate.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {candidate.position}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="mr-4 text-right">
                              <div className="flex items-center space-x-2">
                                {getStatusBadge(candidate.status)}
                              </div>
                              <div className="text-sm text-gray-500">
                                <time dateTime="2020-09-20">
                                  Last activity: {candidate.lastActivity}
                                </time>
                              </div>
                            </div>
                            <svg
                              className="h-5 w-5 text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Assessments Tab */}
        {activeTab === "assessments" && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Assessments
              </h2>
              <Link
                to="/assessments/create"
                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create Assessment
              </Link>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {candidates
                  .filter((c) =>
                    ["assessment_sent", "assessment_completed"].includes(
                      c.status
                    )
                  )
                  .map((candidate) => (
                    <li key={candidate.id}>
                      <Link
                        to={`/assessments/${candidate.id}`}
                        className="block hover:bg-gray-50"
                      >
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                  <span className="text-indigo-800 font-medium">
                                    {candidate.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-indigo-600">
                                  {candidate.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {candidate.position}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="mr-4 text-right">
                                <div className="flex items-center space-x-2">
                                  {getStatusBadge(candidate.status)}
                                </div>
                                <div className="text-sm text-gray-500">
                                  <time dateTime="2020-09-20">
                                    Last activity: {candidate.lastActivity}
                                  </time>
                                </div>
                              </div>
                              <svg
                                className="h-5 w-5 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
