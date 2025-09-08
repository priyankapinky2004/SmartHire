// src/pages/reporting/ReportsDashboard.tsx
import React, { useState } from "react";
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
  LineChart,
  Line,
} from "recharts";

const ReportsDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<
    "week" | "month" | "quarter" | "year"
  >("month");

  // Mock data for charts
  const hiringFunnelData = [
    { name: "Applications", value: 435 },
    { name: "Assessments Sent", value: 325 },
    { name: "Assessments Completed", value: 234 },
    { name: "Interviews Scheduled", value: 156 },
    { name: "Interviews Completed", value: 143 },
    { name: "Offers Made", value: 56 },
    { name: "Offers Accepted", value: 42 },
  ];

  const emotionAnalysisData = [
    { name: "Happy", value: 35 },
    { name: "Neutral", value: 45 },
    { name: "Sad", value: 10 },
    { name: "Distress", value: 5 },
    { name: "Anger", value: 5 },
  ];

  const EMOTION_COLORS = {
    Happy: "#4ade80",
    Neutral: "#93c5fd",
    Sad: "#fcd34d",
    Distress: "#fb923c",
    Anger: "#f87171",
  };

  const assessmentScoresData = [
    { name: "Frontend", min: 45, avg: 76, max: 95 },
    { name: "Backend", min: 52, avg: 79, max: 98 },
    { name: "DevOps", min: 40, avg: 72, max: 90 },
    { name: "Design", min: 55, avg: 81, max: 97 },
    { name: "PM", min: 60, avg: 85, max: 98 },
  ];

  const hiringTimelineData = [
    { name: "Jan", avg: 28 },
    { name: "Feb", avg: 25 },
    { name: "Mar", avg: 27 },
    { name: "Apr", avg: 24 },
    { name: "May", avg: 20 },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Hiring Analytics
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Comprehensive analytics and insights for your hiring process.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setDateRange("week")}
              className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                dateRange === "week"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Week
            </button>
            <button
              type="button"
              onClick={() => setDateRange("month")}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                dateRange === "month"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Month
            </button>
            <button
              type="button"
              onClick={() => setDateRange("quarter")}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                dateRange === "quarter"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Quarter
            </button>
            <button
              type="button"
              onClick={() => setDateRange("year")}
              className={`relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                dateRange === "year"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Year
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Summary */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
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
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Candidates
                  </dt>
                  <dd className="text-xl font-semibold text-gray-900">435</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Candidates Hired
                  </dt>
                  <dd className="text-xl font-semibold text-gray-900">42</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Avg. Time to Hire
                  </dt>
                  <dd className="text-xl font-semibold text-gray-900">
                    24 days
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
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
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Assessments Sent
                  </dt>
                  <dd className="text-xl font-semibold text-gray-900">325</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Hiring Funnel */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Hiring Funnel
            </h3>
          </div>
          <div className="px-4 py-3 sm:px-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={hiringFunnelData}
                  margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Emotion Analysis */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Candidate Emotions During Assessment
            </h3>
          </div>
          <div className="px-4 py-3 sm:px-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={emotionAnalysisData}
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
                    {emotionAnalysisData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={
                          EMOTION_COLORS[
                            entry.name as keyof typeof EMOTION_COLORS
                          ] || "#8884d8"
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Assessment Scores */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Assessment Scores by Role
            </h3>
          </div>
          <div className="px-4 py-3 sm:px-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={assessmentScoresData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="min" fill="#f87171" name="Minimum" />
                  <Bar dataKey="avg" fill="#60a5fa" name="Average" />
                  <Bar dataKey="max" fill="#4ade80" name="Maximum" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Hiring Timeline */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Average Time to Hire (Days)
            </h3>
          </div>
          <div className="px-4 py-3 sm:px-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={hiringTimelineData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="avg"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    name="Avg. Days to Hire"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      {/* Final Reports Table */}
      <div className="mt-12 bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Candidate Reports
        </h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[
              { id: "abc123", name: "Alice Johnson", score: 88 },
              { id: "xyz789", name: "Bob Smith", score: 75 },
            ].map((candidate) => (
              <tr key={candidate.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {candidate.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {candidate.score}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <a
                    href={`/admin/candidates/${candidate.id}/report`}
                    className="text-indigo-600 hover:text-indigo-900 underline"
                  >
                    View Full Report
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export Options */}
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            className="mr-2 -ml-1 h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export Report
        </button>
      </div>
    </div>
  );
};

export default ReportsDashboard;
