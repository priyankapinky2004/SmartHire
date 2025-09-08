import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Define types
interface Candidate {
  name: string;
  position: string;
  photo: string | null;
}

interface Interview {
  date: string;
  time: string;
  duration: number;
  interviewers: string[];
  recordingUrl: string;
  transcriptUrl: string;
}

interface QuestionScore {
  questionId: string;
  question: string;
  score: number;
  feedback: string;
}

interface EmotionAnalysis {
  happy: number;
  neutral: number;
  sad: number;
  distress: number;
  anger: number;
}

interface AIAnalysis {
  overallScore: number;
  overallFeedback: string;
  decision: string;
  questionScores: QuestionScore[];
  emotionAnalysis: EmotionAnalysis;
  keyStrengths: string[];
  areasForImprovement: string[];
}

interface InterviewData {
  id: string;
  candidate: Candidate;
  interview: Interview;
  aiAnalysis: AIAnalysis;
}

const InterviewAnalysis: React.FC = () => {
  // Mock interview analysis data
  const interviewData: InterviewData = {
    id: "int-001",
    candidate: {
      name: "Michael Brown",
      position: "Backend Developer",
      photo: null // Would be a URL in a real app
    },
    interview: {
      date: "June 5, 2023",
      time: "11:00 AM",
      duration: 45, // minutes
      interviewers: ["John Doe", "Jane Smith"],
      recordingUrl: "https://example.com/recording/int-001",
      transcriptUrl: "https://example.com/transcript/int-001"
    },
    aiAnalysis: {
      overallScore: 4, // 1-5 scale
      overallFeedback: "The candidate demonstrated strong technical knowledge and problem-solving skills. Communication was clear and effective. Recommend an additional technical interview to further assess system design capabilities.",
      decision: "Selected but requires additional interview",
      questionScores: [
        {
          questionId: "q1",
          question: "Tell me about your experience with Node.js",
          score: 85,
          feedback: "Strong understanding of Node.js architecture and event loop. Provided clear examples of past projects using Express and MongoDB."
        },
        {
          questionId: "q2",
          question: "How do you handle database optimization?",
          score: 78,
          feedback: "Good knowledge of indexing, but could improve on query optimization techniques. Demonstrated practical experience with PostgreSQL performance tuning."
        },
        {
          questionId: "q3",
          question: "Describe your approach to testing",
          score: 90,
          feedback: "Excellent understanding of unit testing and integration testing practices. Mentioned TDD workflow and demonstrated knowledge of Jest and Mocha frameworks."
        },
        {
          questionId: "q4",
          question: "How do you handle conflict in a team?",
          score: 82,
          feedback: "Demonstrated good communication skills and conflict resolution approach. Provided a specific example of mediating between design and engineering teams."
        }
      ],
      emotionAnalysis: {
        happy: 30,
        neutral: 55,
        sad: 5,
        distress: 7,
        anger: 3
      },
      keyStrengths: [
        "Strong technical knowledge of backend technologies",
        "Clear communication skills",
        "Good problem-solving approach",
        "Positive attitude toward team collaboration"
      ],
      areasForImprovement: [
        "Could improve system design knowledge",
        "Limited experience with microservices architecture",
        "Some hesitation when discussing scaling strategies"
      ]
    }
  };

  // Calculate average score
  const averageScore = interviewData.aiAnalysis.questionScores.reduce((sum, q) => sum + q.score, 0) / 
                      interviewData.aiAnalysis.questionScores.length;
  
  // Format emotion data for chart
  const emotionData = Object.entries(interviewData.aiAnalysis.emotionAnalysis).map(([name, value]) => ({
    name,
    value
  }));
  
  // Question score data for chart
  const questionScoreData = interviewData.aiAnalysis.questionScores.map(q => ({
    name: `Q${q.questionId.split('q')[1]}`,
    score: q.score,
    fullName: q.question
  }));
  
  // Colors for the emotion chart
  const EMOTION_COLORS: Record<string, string> = {
    happy: '#4ade80',
    neutral: '#93c5fd',
    sad: '#fcd34d',
    distress: '#fb923c',
    anger: '#f87171'
  };

  // Decision color mapping
  const getDecisionColor = (score: number): string => {
    const colors: Record<number, string> = {
      1: 'bg-red-100 text-red-800',    // Not selected
      2: 'bg-yellow-100 text-yellow-800', // On hold
      3: 'bg-yellow-100 text-yellow-800', // On hold
      4: 'bg-blue-100 text-blue-800',  // Additional interview
      5: 'bg-green-100 text-green-800' // Selected
    };
    return colors[score] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Interview Analysis</h1>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit Analysis
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Candidate Information */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                <span className="text-indigo-800 font-medium">{interviewData.candidate.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {interviewData.candidate.name}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {interviewData.candidate.position}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Interview Date</p>
              <p className="text-sm font-medium text-gray-900">{interviewData.interview.date} at {interviewData.interview.time}</p>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-3">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Overall Decision</dt>
                <dd className="mt-1">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getDecisionColor(interviewData.aiAnalysis.overallScore)}`}>
                    {interviewData.aiAnalysis.decision}
                  </span>
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Average Score</dt>
                <dd className="mt-1 text-lg font-semibold text-indigo-600">{Math.round(averageScore)}%</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Duration</dt>
                <dd className="mt-1 text-sm text-gray-900">{interviewData.interview.duration} minutes</dd>
              </div>
            </div>
          </div>
        </div>
        
        {/* Summary and Feedback */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Overall Feedback
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <p className="text-sm text-gray-700 italic">
              "{interviewData.aiAnalysis.overallFeedback}"
            </p>
          </div>
        </div>
        
        {/* Charts and Analysis */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Question Scores */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Question Scores
              </h3>
            </div>
            <div className="px-4 py-3 sm:px-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={questionScoreData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip 
                      formatter={(value: number) => [`${value}%`, 'Score']}
                      labelFormatter={(value) => `Question ${value}`}
                    />
                    <Bar dataKey="score" name="Score" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Emotion Analysis */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Emotional Analysis
              </h3>
            </div>
            <div className="px-4 py-3 sm:px-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={emotionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {emotionData.map((entry) => (
                        <Cell key={entry.name} fill={EMOTION_COLORS[entry.name] || '#8884d8'} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        
        {/* Detailed Question Analysis */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Strengths */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Key Strengths
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {interviewData.aiAnalysis.keyStrengths.map((strength, index) => (
                  <li key={index} className="px-4 py-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-700">{strength}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Areas for Improvement */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Areas for Improvement
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {interviewData.aiAnalysis.areasForImprovement.map((area, index) => (
                  <li key={index} className="px-4 py-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <svg className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-700">{area}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Detailed Question Responses */}
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Question Analysis
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {interviewData.aiAnalysis.questionScores.map((question) => (
                <li key={question.questionId} className="px-4 py-4 sm:px-6">
                  <div className="mb-2 flex justify-between items-start">
                    <div className="text-sm font-medium text-gray-900 flex-grow pr-4">
                      {question.question}
                    </div>
                    <div className="flex-shrink-0">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                        {question.score}%
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 italic">
                    "{question.feedback}"
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Interview Recording and Transcript */}
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Interview Resources
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Recording</h4>
                <a href={interviewData.interview.recordingUrl} target="_blank" rel="noopener noreferrer" className="mt-1 text-sm text-indigo-600 hover:text-indigo-500">
                  View Recording
                </a>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Transcript</h4>
                <a href={interviewData.interview.transcriptUrl} target="_blank" rel="noopener noreferrer" className="mt-1 text-sm text-indigo-600 hover:text-indigo-500">
                  View Full Transcript
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewAnalysis;