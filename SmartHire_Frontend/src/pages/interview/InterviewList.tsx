// src/pages/interview/InterviewList.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Interview {
  id: string;
  candidateName: string;
  candidateId: string;
  position: string;
  date: string;
  time: string;
  interviewers: string[];
  status: "scheduled" | "completed" | "cancelled";
  score?: number;
  zoomLink?: string;
  analysisAvailable?: boolean;
}

const InterviewList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Mock data for interviews
  const interviews: Interview[] = [
    {
      id: "1",
      candidateName: "Michael Brown",
      candidateId: "1",
      position: "Backend Developer",
      date: "June 10, 2023",
      time: "10:00 AM",
      interviewers: ["John Doe", "Jane Smith"],
      status: "scheduled",
      zoomLink: "https://zoom.us/j/123456789",
    },
    {
      id: "2",
      candidateName: "Sarah Williams",
      candidateId: "2",
      position: "Frontend Developer",
      date: "June 11, 2023",
      time: "2:30 PM",
      interviewers: ["Jane Smith"],
      status: "scheduled",
      zoomLink: "https://zoom.us/j/987654321",
    },
    {
      id: "3",
      candidateName: "Emily Johnson",
      candidateId: "4",
      position: "UX Designer",
      date: "June 5, 2023",
      time: "11:00 AM",
      interviewers: ["Mike Wilson"],
      status: "completed",
      score: 92,
      analysisAvailable: true,
    },
    {
      id: "4",
      candidateName: "David Lee",
      candidateId: "5",
      position: "Product Manager",
      date: "June 3, 2023",
      time: "9:30 AM",
      interviewers: ["John Doe", "Lisa Zhang"],
      status: "completed",
      score: 78,
      analysisAvailable: true,
    },
    {
      id: "5",
      candidateName: "Alex Turner",
      candidateId: "7",
      position: "Mobile Developer",
      date: "June 2, 2023",
      time: "4:00 PM",
      interviewers: ["Mike Wilson"],
      status: "cancelled",
    },
  ];

  // Filter interviews based on search term and status
  const filteredInterviews = interviews.filter((interview) => {
    const matchesSearch =
      interview.candidateName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      interview.position.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || interview.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Sort interviews by date (upcoming first, then recent)
  const sortedInterviews = [...filteredInterviews].sort((a, b) => {
    if (a.status === "scheduled" && b.status !== "scheduled") return -1;
    if (a.status !== "scheduled" && b.status === "scheduled") return 1;

    // Convert dates to timestamps for comparison
    const dateA = new Date(`${a.date} ${a.time}`).getTime();
    const dateB = new Date(`${b.date} ${b.time}`).getTime();

    // For scheduled interviews, sort by upcoming (ascending)
    if (a.status === "scheduled" && b.status === "scheduled") {
      return dateA - dateB;
    }

    // For completed/cancelled interviews, sort by recent (descending)
    return dateB - dateA;
  });

  // Helper function to get status badge
  const getStatusBadge = (status: Interview["status"]) => {
    const statusClasses = {
      scheduled: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };

    const statusText = {
      scheduled: "Scheduled",
      completed: "Completed",
      cancelled: "Cancelled",
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
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Interviews</h1>
          <p className="mt-2 text-sm text-gray-700">
            Schedule and manage candidate interviews.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Schedule Interview
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search candidates or positions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="status" className="sr-only">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Interviews List */}
      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
        {sortedInterviews.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {sortedInterviews.map((interview) => (
              <li key={interview.id}>
                <div className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
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
                          <div className="flex items-center">
                            <Link
                              to={`/candidates/${interview.candidateId}`}
                              className="text-sm font-medium text-indigo-600 hover:underline"
                            >
                              {interview.candidateName}
                            </Link>
                            <span className="ml-2">
                              {getStatusBadge(interview.status)}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {interview.position}
                          </div>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex flex-col items-end">
                        <div className="text-sm text-gray-500">
                          {interview.date}
                        </div>
                        <div className="text-sm text-gray-500">
                          {interview.time}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span>
                          Interviewers: {interview.interviewers.join(", ")}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center text-sm sm:mt-0">
                        {interview.status === "completed" &&
                          interview.score !== undefined && (
                            <div className="text-sm text-gray-900 mr-4">
                              <span className="font-medium">Score: </span>
                              <span
                                className={
                                  interview.score >= 85
                                    ? "text-green-600"
                                    : interview.score >= 70
                                      ? "text-yellow-600"
                                      : "text-red-600"
                                }
                              >
                                {interview.score}%
                              </span>
                            </div>
                          )}
                        {interview.status === "scheduled" &&
                          interview.zoomLink && (
                            <a
                              href={interview.zoomLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Join Zoom
                            </a>
                          )}
                        {interview.status === "completed" &&
                          interview.analysisAvailable && (
                            <Link
                              to={`/interviews/${interview.id}/analysis`}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              View Analysis
                            </Link>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-6 text-gray-500">
            No interviews found
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewList;
