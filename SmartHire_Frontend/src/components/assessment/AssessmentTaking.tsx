import React, { useState, useEffect } from "react";

// Define types
interface Question {
  id: string;
  type: "MULTIPLE_CHOICE" | "CODING";
  content: string;
  options?: string[];
  correctAnswer?: string;
}

interface Section {
  id: string;
  title: string;
  questions: Question[];
}

interface Assessment {
  id: string;
  title: string;
  sections: Section[];
}

interface AnswerMap {
  [key: string]: string;
}

const AssessmentTaking: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(1800); // 30 minutes
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showPermissionModal, setShowPermissionModal] = useState<boolean>(true);

  // Mock assessment data
  const assessment: Assessment = {
    id: "1",
    title: "Frontend Developer Assessment",
    sections: [
      {
        id: "s1",
        title: "JavaScript Fundamentals",
        questions: [
          {
            id: "q1",
            type: "MULTIPLE_CHOICE",
            content: "Which of the following is not a JavaScript data type?",
            options: ["String", "Number", "Character", "Boolean"],
            correctAnswer: "Character",
          },
          {
            id: "q2",
            type: "MULTIPLE_CHOICE",
            content: "What will `console.log(typeof [])` output?",
            options: ["array", "object", "Array", "undefined"],
            correctAnswer: "object",
          },
        ],
      },
      {
        id: "s2",
        title: "React Knowledge",
        questions: [
          {
            id: "q3",
            type: "MULTIPLE_CHOICE",
            content: "What is JSX?",
            options: [
              "A JavaScript extension that allows writing HTML in JavaScript",
              "A JavaScript library for building user interfaces",
              "A browser API for rendering components",
              "A replacement for JavaScript",
            ],
            correctAnswer:
              "A JavaScript extension that allows writing HTML in JavaScript",
          },
        ],
      },
      {
        id: "s3",
        title: "Coding Challenge",
        questions: [
          {
            id: "q4",
            type: "CODING",
            content:
              "Write a function that reverses a string without using the built-in reverse() method.",
          },
        ],
      },
    ],
  };

  // Format time
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle countdown timer
  useEffect(() => {
    if (timeLeft > 0 && !showPermissionModal) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showPermissionModal]);

  // Mock function to simulate taking a screenshot
  const takeScreenshot = (): void => {
    console.log("Taking screenshot...");
    // In a real implementation, this would:
    // 1. Capture a screenshot
    // 2. Send it to the backend for emotion analysis
  };

  // Set up screenshot interval
  useEffect(() => {
    if (isCameraOn && isScreenSharing && !showPermissionModal) {
      const interval = setInterval(takeScreenshot, 10000); // Every 10 seconds
      return () => clearInterval(interval);
    }
  }, [isCameraOn, isScreenSharing, showPermissionModal]);

  // Handle camera and screen share permissions
  const handlePermissions = async (): Promise<void> => {
    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setIsCameraOn(true);

      // For demo purposes, we'll just simulate screen sharing
      // In a real app, you would use getDisplayMedia()
      setIsScreenSharing(true);

      setShowPermissionModal(false);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Camera access is required to take the assessment");
    }
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId: string, answer: string): void => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  // Navigation functions
  const nextQuestion = (): void => {
    const currentSectionQuestions =
      assessment.sections[currentSection].questions;
    if (currentQuestion < currentSectionQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentSection < assessment.sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
    }
  };

  const prevQuestion = (): void => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      const prevSectionQuestions =
        assessment.sections[currentSection - 1].questions;
      setCurrentQuestion(prevSectionQuestions.length - 1);
    }
  };

  // Submit assessment
  const submitAssessment = (): void => {
    // In a real implementation, this would send the answers to the backend
    alert("Assessment submitted successfully!");
    // Redirect to confirmation page or dashboard
  };

  // Get current question
  const getCurrentQuestion = (): Question => {
    return assessment.sections[currentSection].questions[currentQuestion];
  };

  // Check if it's the last question
  const isLastQuestion = (): boolean => {
    return (
      currentSection === assessment.sections.length - 1 &&
      currentQuestion ===
        assessment.sections[currentSection].questions.length - 1
    );
  };

  // Calculate progress percentage
  const calculateProgress = (): number => {
    let totalQuestions = 0;
    let questionsSoFar = 0;

    for (let i = 0; i < assessment.sections.length; i++) {
      const sectionQuestions = assessment.sections[i].questions.length;
      totalQuestions += sectionQuestions;

      if (i < currentSection) {
        questionsSoFar += sectionQuestions;
      } else if (i === currentSection) {
        questionsSoFar += currentQuestion + 1;
      }
    }

    return Math.floor((questionsSoFar / totalQuestions) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Permission Modal */}
      {showPermissionModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Assessment Permissions Required
              </h3>
              <div className="mb-4">
                <div className="flex items-center justify-center mb-4">
                  <svg
                    className="h-12 w-12 text-indigo-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-500">
                  This assessment requires camera access and screen sharing to
                  proceed. These are used for proctoring purposes to maintain
                  assessment integrity.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-indigo-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-500">
                        We'll access your camera to monitor your assessment
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-indigo-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-500">
                        We'll capture your screen periodically to verify you're
                        not using unauthorized resources
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={handlePermissions}
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Allow and Begin Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assessment Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">
            {assessment.title}
          </h1>
          <div className="flex items-center space-x-4">
            {/* Camera Status Indicator */}
            <div className="flex items-center">
              <span
                className={`h-3 w-3 rounded-full ${isCameraOn ? "bg-green-500" : "bg-red-500"} mr-2`}
              ></span>
              <span className="text-sm text-gray-600">Camera</span>
            </div>

            {/* Screen Sharing Status Indicator */}
            <div className="flex items-center">
              <span
                className={`h-3 w-3 rounded-full ${isScreenSharing ? "bg-green-500" : "bg-red-500"} mr-2`}
              ></span>
              <span className="text-sm text-gray-600">Screen</span>
            </div>

            {/* Timer */}
            <div className="text-lg font-medium text-gray-900">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-1">
          <div
            className="bg-indigo-600 h-1"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
      </header>

      {/* Assessment Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* Section Title */}
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Section {currentSection + 1}:{" "}
              {assessment.sections[currentSection].title}
            </h3>
          </div>

          {/* Question Content */}
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium text-gray-900">
                  Question {currentQuestion + 1}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {getCurrentQuestion().content}
                </p>
              </div>

              {/* Multiple Choice Options */}
              {getCurrentQuestion().type === "MULTIPLE_CHOICE" && (
                <div className="space-y-3">
                  {getCurrentQuestion().options?.map((option, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        id={`option-${index}`}
                        name={`question-${getCurrentQuestion().id}`}
                        type="radio"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        checked={answers[getCurrentQuestion().id] === option}
                        onChange={() =>
                          handleAnswerSelect(getCurrentQuestion().id, option)
                        }
                      />
                      <label
                        htmlFor={`option-${index}`}
                        className="ml-3 block text-sm text-gray-700"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {/* Coding Question */}
              {getCurrentQuestion().type === "CODING" && (
                <div className="mt-1">
                  <textarea
                    id="code"
                    name="code"
                    rows={8}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md font-mono"
                    placeholder="Write your code here..."
                    value={answers[getCurrentQuestion().id] || ""}
                    onChange={(e) =>
                      handleAnswerSelect(
                        getCurrentQuestion().id,
                        e.target.value
                      )
                    }
                  ></textarea>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-between">
            <button
              type="button"
              onClick={prevQuestion}
              disabled={currentSection === 0 && currentQuestion === 0}
              className={`inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                currentSection === 0 && currentQuestion === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Previous
            </button>

            {isLastQuestion() ? (
              <button
                type="button"
                onClick={submitAssessment}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Assessment
              </button>
            ) : (
              <button
                type="button"
                onClick={nextQuestion}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Next
              </button>
            )}
          </div>
        </div>

        {/* Webcam Feed (minimized in corner) */}
        {isCameraOn && !showPermissionModal && (
          <div className="fixed bottom-4 right-4 w-48 h-36 bg-black rounded-lg overflow-hidden shadow-lg border-2 border-indigo-500">
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <span>Camera Feed</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AssessmentTaking;
