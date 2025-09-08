import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define types
interface Section {
  name: string;
  score: number;
}

interface Question {
  id: string;
  question: string;
  answer: string;
  correct: boolean;
}

interface EmotionData {
  happy: number;
  neutral: number;
  sad: number;
  distress: number;
  anger: number;
}

interface Assessment {
  id: string;
  candidateName: string;
  position: string;
  completedDate: string;
  score: number;
  status: string;
  emotionData: EmotionData;
  sectionScores: Section[];
  questions: Question[];
}

const AssessmentResults: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<Assessment | null>(null);
  
  // Mock assessment data
  const assessments: Assessment[] = [
    {
      id: "1",
      candidateName: "John Smith",
      position: "Frontend Developer",
      completedDate: "June 5, 2023",
      score: 85,
      status: "COMPLETED",
      emotionData: {
        happy: 45,
        neutral: 40,
        sad: 10,
        distress: 3,
        anger: 2
      },
      sectionScores: [
        { name: "JavaScript", score: 90 },
        { name: "React", score: 85 },
        { name: "Coding Challenge", score: 78 }
      ],
      questions: [
        { id: "q1", question: "Which of the following is not a JavaScript data type?", answer: "Character", correct: true },
        { id: "q2", question: "What will `console.log(typeof [])` output?", answer: "object", correct: true },
        { id: "q3", question: "What is JSX?", answer: "A JavaScript extension that allows writing HTML in JavaScript", correct: true },
        { id: "q4", question: "Write a function that reverses a string without using the built-in reverse() method.", answer: "function reverseString(str) {\n  let result = '';\n  for (let i = str.length - 1; i >= 0; i--) {\n    result += str[i];\n  }\n  return result;\n}", correct: true }
      ]
    },
    {
      id: "2",
      candidateName: "Sarah Williams",
      position: "Backend Developer",
      completedDate: "June 6, 2023",
      score: 78,
      status: "COMPLETED",
      emotionData: {
        happy: 30,
        neutral: 50,
        sad: 15,
        distress: 5,
        anger: 0
      },
      sectionScores: [
        { name: "Node.js", score: 75 },
        { name: "Databases", score: 82 },
        { name: "Coding Challenge", score: 70 }
      ],
      questions: [
        { id: "q1", question: "What is the event loop in Node.js?", answer: "The event loop handles all async callbacks and allows Node.js to perform non-blocking I/O operations.", correct: true },
        { id: "q2", question: "What is a Promise in JavaScript?", answer: "An object representing the eventual completion or failure of an async operation.", correct: true },
        { id: "q3", question: "What is the difference between SQL and NoSQL databases?", answer: "SQL databases are relational, table-based databases, while NoSQL databases are document, key-value, graph, or wide-column stores.", correct: true },
        { id: "q4", question: "Write a function to check if a string is a palindrome.", answer: "function isPalindrome(str) {\n  str = str.toLowerCase().replace(/[^a-z0-9]/g, '');\n  return str === str.split('').reverse().join('');\n}", correct: true }
      ]
    }
  ];
  
  // Colors for the emotion chart
  const EMOTION_COLORS: Record<string, string> = {
    happy: '#4ade80',
    neutral: '#93c5fd',
    sad: '#fcd34d',
    distress: '#fb923c',
    anger: '#f87171'
  };
  
  const emotionChartData = (emotionData: EmotionData) => {
    return Object.entries(emotionData).map(([name, value]) => ({
      name,
      value
    }));
  };
  
  // Handle viewing a candidate's detailed results
  const viewCandidateDetails = (candidate: Assessment) => {
    setSelectedCandidate(candidate);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Assessment Results</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Assessment List */}
        {!selectedCandidate && (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {assessments.map((assessment) => (
                <li key={assessment.id} className="cursor-pointer" onClick={() => viewCandidateDetails(assessment)}>
                  <div className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <span className="text-indigo-800 font-medium">
                                {assessment.candidateName.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-indigo-600">{assessment.candidateName}</div>
                            <div className="text-sm text-gray-500">{assessment.position}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-4 text-right">
                            <div className="text-sm text-gray-900">{assessment.completedDate}</div>
                            <div className="text-sm font-medium text-gray-900">{assessment.score}%</div>
                          </div>
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Candidate Detail View */}
        {selectedCandidate && (
          <div>
            <div className="mb-6 flex items-center">
              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="mr-1.5 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Assessments
              </button>
            </div>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {selectedCandidate.candidateName}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {selectedCandidate.position}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Assessment Completed</p>
                  <p className="text-sm font-medium text-gray-900">{selectedCandidate.completedDate}</p>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Overall Score</dt>
                    <dd className="mt-1 text-2xl font-semibold text-indigo-600">{selectedCandidate.score}%</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Assessment Status</dt>
                    <dd className="mt-1">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {selectedCandidate.status}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Section Scores */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Section Scores
                  </h3>
                </div>
                <div className="px-4 py-3 sm:px-6">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={selectedCandidate.sectionScores}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip />
                        <Bar dataKey="score" fill="#8884d8" name="Score (%)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              {/* Emotion Analysis */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Emotion Analysis
                  </h3>
                </div>
                <div className="px-4 py-3 sm:px-6">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={emotionChartData(selectedCandidate.emotionData)}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {emotionChartData(selectedCandidate.emotionData).map((entry) => (
                            <Cell key={entry.name} fill={EMOTION_COLORS[entry.name] || '#8884d8'} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                  <p className="text-sm text-gray-500">
                    This analysis shows the candidate's emotional state during the assessment, which can provide insights into their confidence and stress levels.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Question Responses */}
            <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Question Responses
                </h3>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {selectedCandidate.questions.map((question) => (
                    <li key={question.id} className="px-4 py-4 sm:px-6">
                      <div className="mb-2">
                        <span className="text-sm font-medium text-gray-900">Q: </span>
                        <span className="text-sm text-gray-700">{question.question}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-sm font-medium text-gray-900">A: </span>
                        <span className="text-sm text-gray-700">
                          {question.question.includes("function") ? (
                            <pre className="bg-gray-50 p-2 rounded font-mono text-xs">{question.answer}</pre>
                          ) : (
                            question.answer
                          )}
                        </span>
                      </div>
                      <div>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          question.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {question.correct ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AssessmentResults;