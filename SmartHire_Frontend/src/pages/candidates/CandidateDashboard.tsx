import React, { useState } from "react";
import {
  Calendar,
  Clock,
  FileText,
  User,
  Clipboard,
  Award,
  BarChart2,
  Edit3,
  Upload,
} from "lucide-react";

const CandidateDashboard = () => {
  const [candidate, setCandidateData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    applications: [
      {
        id: 1,
        position: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        status: "Interview Scheduled",
        progress: 60,
        date: "2025-04-15T14:30:00.000Z",
        steps: [
          { name: "Application Submitted", completed: true },
          { name: "Resume Screened", completed: true },
          { name: "Assessment Completed", completed: true },
          { name: "Interview Scheduled", completed: false },
          { name: "Final Decision", completed: false },
        ],
      },
      {
        id: 2,
        position: "Full Stack Engineer",
        company: "Innovation Labs",
        status: "Assessment",
        progress: 40,
        date: "2025-04-20T15:00:00.000Z",
        steps: [
          { name: "Application Submitted", completed: true },
          { name: "Resume Screened", completed: true },
          { name: "Assessment", completed: false },
          { name: "Interview", completed: false },
          { name: "Final Decision", completed: false },
        ],
      },
    ],
    interviews: [
      {
        id: 1,
        position: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        date: "2025-04-15T14:30:00.000Z",
        duration: 60,
        type: "Technical Interview",
        interviewers: [
          "Sarah Chen (Engineering Manager)",
          "Mark Davis (Senior Engineer)",
        ],
        zoomLink: "https://zoom.us/j/123456789",
      },
    ],
    assessments: [
      {
        id: 1,
        position: "Full Stack Engineer",
        company: "Innovation Labs",
        deadline: "2025-04-14T23:59:59.000Z",
        duration: 90,
        status: "Not Started",
      },
    ],
  });

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getTimeRemaining = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();

    // Get the difference in milliseconds
    const total = deadlineDate.getTime() - currentDate.getTime();

    // Convert to days and hours
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    return `${days} days, ${hours} hours remaining`;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Candidate Dashboard
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Card */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Welcome back, {candidate.name}!
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    You have {candidate.interviews.length} upcoming interviews
                    and {candidate.assessments.length} pending assessments.
                  </p>
                </div>
                <div className="ml-auto">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-0">
          {/* Upcoming Interviews */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 text-blue-500" />
                <h3 className="ml-2 text-lg leading-6 font-medium text-gray-900">
                  Upcoming Interviews
                </h3>
              </div>
              <div className="space-y-4">
                {candidate.interviews.length > 0 ? (
                  candidate.interviews.map((interview) => (
                    <div
                      key={interview.id}
                      className="border-l-4 border-blue-400 bg-blue-50 p-4 rounded"
                    >
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-blue-800">
                          {interview.position}
                        </p>
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {interview.type}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {interview.company}
                      </p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {formatDate(interview.date)} ({interview.duration} min)
                      </div>
                      <div className="mt-3">
                        <a
                          href={interview.zoomLink}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Join Meeting
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No upcoming interviews scheduled.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Pending Assessments */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center mb-4">
                <Clipboard className="h-5 w-5 text-purple-500" />
                <h3 className="ml-2 text-lg leading-6 font-medium text-gray-900">
                  Pending Assessments
                </h3>
              </div>
              <div className="space-y-4">
                {candidate.assessments.length > 0 ? (
                  candidate.assessments.map((assessment) => (
                    <div
                      key={assessment.id}
                      className="border-l-4 border-purple-400 bg-purple-50 p-4 rounded"
                    >
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-purple-800">
                          {assessment.position}
                        </p>
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          {assessment.duration} min
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {assessment.company}
                      </p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        Deadline: {getTimeRemaining(assessment.deadline)}
                      </div>
                      <div className="mt-3">
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                          Start Assessment
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No pending assessments.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Resume Management */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center mb-4">
                <FileText className="h-5 w-5 text-green-500" />
                <h3 className="ml-2 text-lg leading-6 font-medium text-gray-900">
                  Resume Management
                </h3>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="space-y-1">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload a new resume</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PDF or DOCX up to 5MB</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">
                  Current Resume
                </h4>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <p>resume_alexjohnson_2025.pdf</p>
                  <button className="ml-2 text-blue-600 hover:text-blue-500">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Progress */}
        <div className="mt-6 px-4 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center mb-4">
                <BarChart2 className="h-5 w-5 text-indigo-500" />
                <h3 className="ml-2 text-lg leading-6 font-medium text-gray-900">
                  Application Progress
                </h3>
              </div>
              <div className="space-y-6">
                {candidate.applications.map((application) => (
                  <div
                    key={application.id}
                    className="bg-gray-50 p-4 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">
                          {application.position}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {application.company}
                        </p>
                      </div>
                      <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                        {application.status}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4">
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                              Progress
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-indigo-600">
                              {application.progress}%
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                          <div
                            style={{ width: `${application.progress}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Steps */}
                    <div className="mt-3">
                      <ol className="flex items-center w-full">
                        {application.steps.map((step, index) => (
                          <li
                            key={index}
                            className={`flex w-full items-center ${index !== application.steps.length - 1 ? 'after:content-[""] after:w-full after:h-1 after:border-b after:border-gray-300 after:border-4 after:inline-block' : ""}`}
                          >
                            <span
                              className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${step.completed ? "bg-indigo-500 text-white" : "bg-gray-300 text-gray-500"}`}
                            >
                              {index + 1}
                            </span>
                            <span className="text-xs mt-2 absolute -ml-3 mt-8">
                              {step.name}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CandidateDashboard;
