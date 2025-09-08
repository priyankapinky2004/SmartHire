import React, { useState, useCallback } from "react";

// Define types
interface Skill {
  name: string;
  level: string;
  yearsExperience: number;
}

interface Experience {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
}

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
}

const ResumeUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [activeTab, setActiveTab] = useState<
    "skills" | "experience" | "education"
  >("skills");

  // Mock extracted data from resume
  const mockResumeData: ResumeData = {
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    skills: [
      { name: "JavaScript", level: "Expert", yearsExperience: 5 },
      { name: "React", level: "Expert", yearsExperience: 4 },
      { name: "Node.js", level: "Advanced", yearsExperience: 3 },
      { name: "TypeScript", level: "Advanced", yearsExperience: 3 },
      { name: "GraphQL", level: "Intermediate", yearsExperience: 2 },
      { name: "AWS", level: "Intermediate", yearsExperience: 2 },
      { name: "Docker", level: "Intermediate", yearsExperience: 2 },
      { name: "CI/CD", level: "Intermediate", yearsExperience: 2 },
    ],
    experience: [
      {
        company: "Tech Solutions Inc.",
        title: "Senior Frontend Developer",
        startDate: "January 2020",
        endDate: "Present",
        description:
          "Led development of a React-based SaaS platform used by over 50,000 users. Improved application performance by 40% through code optimization and lazy loading strategies.",
      },
      {
        company: "WebDev Agency",
        title: "Frontend Developer",
        startDate: "March 2018",
        endDate: "December 2019",
        description:
          "Developed responsive web applications for clients in finance and healthcare sectors. Implemented CI/CD pipelines that reduced deployment time by 60%.",
      },
      {
        company: "StartUp Labs",
        title: "Junior Developer",
        startDate: "June 2016",
        endDate: "February 2018",
        description:
          "Built and maintained user interfaces for mobile-first web applications. Collaborated with UX designers to implement pixel-perfect designs.",
      },
    ],
    education: [
      {
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: "2012",
        endDate: "2016",
        gpa: "3.8/4.0",
      },
    ],
    certifications: [
      {
        name: "AWS Certified Developer – Associate",
        issuer: "Amazon Web Services",
        date: "2021",
      },
      {
        name: "Professional Scrum Master I (PSM I)",
        issuer: "Scrum.org",
        date: "2020",
      },
    ],
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Handle drag events
  const handleDragEnter = useCallback(
    (e: React.DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    },
    []
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    },
    []
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      e.stopPropagation();
    },
    []
  );

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  }, []);

  // Handle upload
  const handleUpload = async (): Promise<void> => {
    if (!file) return;

    setIsUploading(true);

    // In a real app, you would upload the file to your server here
    // For this demo, we'll simulate a network request
    setTimeout(() => {
      setIsUploading(false);
      setUploadComplete(true);
      setResumeData(mockResumeData);
    }, 2000);
  };

  // Reset the form
  const handleReset = (): void => {
    setFile(null);
    setUploadComplete(false);
    setResumeData(null);
  };

  // Create assessment
  const handleCreateAssessment = (): void => {
    alert("Assessment created and sent to candidate!");
    // In a real app, this would create an assessment based on extracted skills
  };

  // Get skill level color
  const getSkillLevelColor = (level: string): string => {
    const colors: Record<string, string> = {
      Expert: "bg-green-100 text-green-800",
      Advanced: "bg-blue-100 text-blue-800",
      Intermediate: "bg-yellow-100 text-yellow-800",
      Beginner: "bg-gray-100 text-gray-800",
    };
    return colors[level] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Resume Analysis</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {!uploadComplete ? (
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Upload Candidate Resume
              </h2>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  Upload a resume in PDF, DOCX, or TXT format. Our AI will
                  extract relevant information and skills.
                </p>
              </div>
              <div
                className={`mt-4 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
                  isDragging
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-300"
                }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, DOCX, or TXT up to 10MB
                  </p>
                </div>
              </div>
              {file && (
                <div className="mt-4">
                  <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-md">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-gray-400 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-900 truncate">
                        {file.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="ml-4 text-sm text-red-600 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={handleUpload}
                      disabled={isUploading}
                      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                        isUploading
                          ? "bg-indigo-400"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                      {isUploading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        "Analyze Resume"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            {/* Resume Analysis Results */}
            <div className="bg-white shadow sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h2 className="text-lg leading-6 font-medium text-gray-900">
                    {resumeData?.name} - Resume Analysis
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {resumeData?.email} • {resumeData?.phone} •{" "}
                    {resumeData?.location}
                  </p>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Upload Different Resume
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200">
                <div className="px-4 py-3 sm:px-6">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                      <button
                        onClick={() => setActiveTab("skills")}
                        className={`${
                          activeTab === "skills"
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                      >
                        Skills
                      </button>
                      <button
                        onClick={() => setActiveTab("experience")}
                        className={`${
                          activeTab === "experience"
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                      >
                        Experience
                      </button>
                      <button
                        onClick={() => setActiveTab("education")}
                        className={`${
                          activeTab === "education"
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                      >
                        Education
                      </button>
                    </nav>
                  </div>

                  {/* Skills Tab */}
                  {activeTab === "skills" && resumeData && (
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {resumeData.skills.map((skill, index) => (
                        <div
                          key={index}
                          className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
                        >
                          <div className="px-4 py-5 sm:px-6">
                            <div className="flex justify-between items-center">
                              <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {skill.name}
                              </h3>
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSkillLevelColor(skill.level)}`}
                              >
                                {skill.level}
                              </span>
                            </div>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                              {skill.yearsExperience}{" "}
                              {skill.yearsExperience === 1 ? "year" : "years"}{" "}
                              experience
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Experience Tab */}
                  {activeTab === "experience" && resumeData && (
                    <div className="mt-4">
                      {resumeData.experience.map((exp, index) => (
                        <div
                          key={index}
                          className={`${index > 0 ? "mt-6" : ""}`}
                        >
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {exp.title}
                              </h3>
                              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                {exp.company}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">
                                {exp.startDate} - {exp.endDate}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              {exp.description}
                            </p>
                          </div>
                          {index < resumeData.experience.length - 1 && (
                            <div className="mt-4 border-t border-gray-200 pt-4"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Education Tab */}
                  {activeTab === "education" && resumeData && (
                    <div className="mt-4">
                      {resumeData.education.map((edu, index) => (
                        <div
                          key={index}
                          className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
                        >
                          <div className="px-4 py-5 sm:px-6">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                  {edu.institution}
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                  {edu.degree} in {edu.field}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500">
                                  {edu.startDate} - {edu.endDate}
                                </p>
                                {edu.gpa && (
                                  <p className="text-sm font-medium text-gray-900">
                                    GPA: {edu.gpa}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="px-4 py-4 sm:px-6">
                            <h4 className="text-sm font-medium text-gray-500">
                              Certifications
                            </h4>
                            <ul className="mt-2 divide-y divide-gray-200">
                              {resumeData.certifications.map((cert, idx) => (
                                <li
                                  key={idx}
                                  className={`py-2 ${idx === 0 ? "pt-0" : ""}`}
                                >
                                  <div className="flex justify-between">
                                    <p className="text-sm text-gray-900">
                                      {cert.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {cert.date}
                                    </p>
                                  </div>
                                  <p className="text-sm text-gray-500">
                                    {cert.issuer}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4">
              <button
                type="button"
                onClick={handleCreateAssessment}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Create Assessment
              </button>
              <button
                type="button"
                className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Schedule Interview
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ResumeUpload;
