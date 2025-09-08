// src/pages/candidates/CandidateDetail.tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: 'pending' | 'assessment_sent' | 'assessment_completed' | 'interview_scheduled' | 'interview_completed' | 'hired' | 'rejected';
  appliedDate: string;
  resume: {
    skills: { name: string; level: string }[];
    experience: {
      company: string;
      title: string;
      startDate: string;
      endDate: string;
      description: string;
    }[];
    education: {
      institution: string;
      degree: string;
      field: string;
      startDate: string;
      endDate: string;
    }[];
  };
  assessments: {
    id: string;
    title: string;
    date: string;
    score: number | null;
    status: 'sent' | 'in_progress' | 'completed';
  }[];
  interviews: {
    id: string;
    date: string;
    time: string;
    interviewer: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    score?: number;
  }[];
}

const CandidateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'profile' | 'assessments' | 'interviews'>('profile');
  
  // Mock data for a single candidate
  const candidate: Candidate = {
    id: id || '1',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    phone: '+1 (555) 123-4567',
    position: 'Backend Developer',
    status: 'interview_completed',
    appliedDate: 'June 2, 2023',
    resume: {
      skills: [
        { name: 'JavaScript', level: 'Expert' },
        { name: 'TypeScript', level: 'Advanced' },
        { name: 'Node.js', level: 'Expert' },
        { name: 'Express', level: 'Expert' },
        { name: 'MongoDB', level: 'Advanced' },
        { name: 'PostgreSQL', level: 'Advanced' },
        { name: 'Docker', level: 'Intermediate' }
      ],
      experience: [
        {
          company: 'Tech Solutions Inc.',
          title: 'Senior Backend Developer',
          startDate: 'January 2020',
          endDate: 'Present',
          description: 'Designed and implemented RESTful APIs using Node.js and Express. Managed a team of 3 developers for a high-traffic e-commerce platform.'
        },
        {
          company: 'WebDev Agency',
          title: 'Backend Developer',
          startDate: 'March 2018',
          endDate: 'December 2019',
          description: 'Developed microservices architecture for fintech clients. Implemented CI/CD pipelines that reduced deployment time by 60%.'
        }
      ],
      education: [
        {
          institution: 'University of California, Berkeley',
          degree: 'Master of Science',
          field: 'Computer Science',
          startDate: '2016',
          endDate: '2018'
        },
        {
          institution: 'University of Washington',
          degree: 'Bachelor of Science',
          field: 'Computer Engineering',
          startDate: '2012',
          endDate: '2016'
        }
      ]
    },
    assessments: [
      {
        id: 'a1',
        title: 'Node.js Technical Assessment',
        date: 'June 3, 2023',
        score: 85,
        status: 'completed'
      },
      {
        id: 'a2',
        title: 'Problem Solving Skills',
        date: 'June 4, 2023',
        score: 92,
        status: 'completed'
      }
    ],
    interviews: [
      {
        id: 'i1',
        date: 'June 5, 2023',
        time: '10:00 AM',
        interviewer: 'John Doe',
        status: 'completed',
        score: 88
      }
    ]
  };
  
  // Helper function to get status badge
  const getStatusBadge = (status: Candidate['status']) => {
    const statusClasses = {
      pending: 'bg-gray-100 text-gray-800',
      assessment_sent: 'bg-blue-100 text-blue-800',
      assessment_completed: 'bg-indigo-100 text-indigo-800',
      interview_scheduled: 'bg-yellow-100 text-yellow-800',
      interview_completed: 'bg-purple-100 text-purple-800',
      hired: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    
    const statusText = {
      pending: 'Pending',
      assessment_sent: 'Assessment Sent',
      assessment_completed: 'Assessment Completed',
      interview_scheduled: 'Interview Scheduled',
      interview_completed: 'Interview Completed',
      hired: 'Hired',
      rejected: 'Rejected'
    };
    
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}`}>
        {statusText[status]}
      </span>
    );
  };
  
  // Helper function for skill level badge
  const getSkillLevelBadge = (level: string) => {
    const levelClasses = {
      'Expert': 'bg-green-100 text-green-800',
      'Advanced': 'bg-blue-100 text-blue-800',
      'Intermediate': 'bg-yellow-100 text-yellow-800',
      'Beginner': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${levelClasses[level as keyof typeof levelClasses] || 'bg-gray-100 text-gray-800'}`}>
        {level}
      </span>
    );
  };
  
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          to="/candidates"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-900"
        >
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Candidates
        </Link>
      </div>
      
      {/* Candidate Header */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6 flex justify-between">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
              <span className="text-2xl text-indigo-800 font-medium">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">{candidate.name}</h3>
              <p className="max-w-2xl text-sm text-gray-500 mt-1">{candidate.position}</p>
              <div className="mt-1">{getStatusBadge(candidate.status)}</div>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send Assessment
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Schedule Interview
            </button>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900">{candidate.email}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="mt-1 text-sm text-gray-900">{candidate.phone}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Applied on</dt>
              <dd className="mt-1 text-sm text-gray-900">{candidate.appliedDate}</dd>
            </div>
          </dl>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`${
              activeTab === 'profile'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('assessments')}
            className={`${
              activeTab === 'assessments'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Assessments
          </button>
          <button
            onClick={() => setActiveTab('interviews')}
            className={`${
              activeTab === 'interviews'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Interviews
          </button>
        </nav>
      </div>
      
      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Skills Section */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Skills</h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="flex flex-wrap gap-2">
                {candidate.resume.skills.map((skill, index) => (
                  <div key={index} className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg">
                    <span className="text-sm font-medium text-gray-900 mr-2">{skill.name}</span>
                    {getSkillLevelBadge(skill.level)}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Experience Section */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Experience</h3>
            </div>
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {candidate.resume.experience.map((exp, index) => (
                  <li key={index} className="px-4 py-4 sm:px-6">
                    <div className="flex justify-between">
                      <div className="font-medium text-gray-900">{exp.title}</div>
                      <div className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</div>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{exp.company}</div>
                    <div className="mt-2 text-sm text-gray-700">{exp.description}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Education Section */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Education</h3>
            </div>
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {candidate.resume.education.map((edu, index) => (
                  <li key={index} className="px-4 py-4 sm:px-6">
                    <div className="flex justify-between">
                      <div className="font-medium text-gray-900">{edu.degree} in {edu.field}</div>
                      <div className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</div>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{edu.institution}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {/* Assessments Tab */}
      {activeTab === 'assessments' && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Assessment History</h3>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send New Assessment
            </button>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {candidate.assessments.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {candidate.assessments.map((assessment) => (
                  <li key={assessment.id}>
                    <Link to={`/assessments/${assessment.id}/results`} className="block hover:bg-gray-50">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-indigo-600 truncate">{assessment.title}</p>
                            <p className="mt-1 text-sm text-gray-500">{assessment.date}</p>
                          </div>
                          <div className="flex items-center">
                            {assessment.status === 'completed' && assessment.score !== null && (
                              <div className="mr-4">
                                <div className="text-sm font-medium text-gray-900">Score: {assessment.score}%</div>
                              </div>
                            )}
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              assessment.status === 'completed' ? 'bg-green-100 text-green-800' :
                              assessment.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {assessment.status === 'completed' ? 'Completed' :
                               assessment.status === 'in_progress' ? 'In Progress' :
                               'Sent'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6 text-gray-500">No assessments yet</div>
            )}
          </div>
        </div>
      )}
      
      {/* Interviews Tab */}
      {activeTab === 'interviews' && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Interview History</h3>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Schedule Interview
            </button>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {candidate.interviews.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {candidate.interviews.map((interview) => (
                  <li key={interview.id}>
                    <Link to={`/interviews/${interview.id}/analysis`} className="block hover:bg-gray-50">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-indigo-600 truncate">Interview with {interview.interviewer}</p>
                            <p className="mt-1 text-sm text-gray-500">{interview.date} at {interview.time}</p>
                          </div>
                          <div className="flex items-center">
                            {interview.status === 'completed' && interview.score !== undefined && (
                              <div className="mr-4">
                                <div className="text-sm font-medium text-gray-900">Score: {interview.score}%</div>
                              </div>
                            )}
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              interview.status === 'completed' ? 'bg-green-100 text-green-800' :
                              interview.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {interview.status === 'completed' ? 'Completed' :
                               interview.status === 'cancelled' ? 'Cancelled' :
                               'Scheduled'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6 text-gray-500">No interviews yet</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateDetail;