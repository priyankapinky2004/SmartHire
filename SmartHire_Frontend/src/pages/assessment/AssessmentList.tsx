// src/pages/assessment/AssessmentList.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Assessment {
  id: string;
  title: string;
  type: string;
  status: 'draft' | 'active' | 'archived';
  createdDate: string;
  targetSkills: string[];
  candidateCount: {
    sent: number;
    inProgress: number;
    completed: number;
  };
}

const AssessmentList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Mock data for assessments
  const assessments: Assessment[] = [
    {
      id: '1',
      title: 'Frontend Developer Assessment',
      type: 'Technical Skills',
      status: 'active',
      createdDate: 'May 15, 2023',
      targetSkills: ['JavaScript', 'React', 'CSS', 'HTML'],
      candidateCount: {
        sent: 24,
        inProgress: 8,
        completed: 12
      }
    },
    {
      id: '2',
      title: 'Backend Developer Assessment',
      type: 'Technical Skills',
      status: 'active',
      createdDate: 'May 20, 2023',
      targetSkills: ['Node.js', 'Express', 'MongoDB', 'SQL'],
      candidateCount: {
        sent: 18,
        inProgress: 6,
        completed: 10
      }
    },
    {
      id: '3',
      title: 'UI/UX Designer Assessment',
      type: 'Design Skills',
      status: 'active',
      createdDate: 'May 25, 2023',
      targetSkills: ['Figma', 'UI Design', 'Wireframing', 'User Research'],
      candidateCount: {
        sent: 12,
        inProgress: 4,
        completed: 6
      }
    },
    {
      id: '4',
      title: 'DevOps Engineer Assessment',
      type: 'Technical Skills',
      status: 'draft',
      createdDate: 'June 2, 2023',
      targetSkills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      candidateCount: {
        sent: 0,
        inProgress: 0,
        completed: 0
      }
    },
    {
      id: '5',
      title: 'Product Manager Assessment',
      type: 'Management Skills',
      status: 'archived',
      createdDate: 'April 10, 2023',
      targetSkills: ['Product Strategy', 'User Stories', 'Roadmapping', 'Agile'],
      candidateCount: {
        sent: 15,
        inProgress: 0,
        completed: 15
      }
    }
  ];
  
  // Filter assessments based on search term and status
  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         assessment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.targetSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || assessment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Helper function to get status badge
  const getStatusBadge = (status: Assessment['status']) => {
    const statusClasses = {
      draft: 'bg-gray-100 text-gray-800',
      active: 'bg-green-100 text-green-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    
    const statusText = {
      draft: 'Draft',
      active: 'Active',
      archived: 'Archived'
    };
    
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}`}>
        {statusText[status]}
      </span>
    );
  };
  
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Assessments</h1>
          <p className="mt-2 text-sm text-gray-700">
            Create and manage assessments for your candidates.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            to="/assessments/create"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Create Assessment
          </Link>
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
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search assessments..."
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
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>
      
      {/* Assessments List */}
      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
        {filteredAssessments.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredAssessments.map((assessment) => (
              <li key={assessment.id}>
                <div className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <Link 
                          to={`/assessments/${assessment.id}`}
                          className="text-sm font-medium text-indigo-600 truncate hover:underline"
                        >
                          {assessment.title}
                        </Link>
                        <div className="flex mt-1">
                          <span className="flex items-center text-sm text-gray-500">
                            <span>{assessment.type}</span>
                            <span className="mx-2">•</span>
                            <span>Created on {assessment.createdDate}</span>
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="mr-2">Skills:</span>
                            <div className="flex flex-wrap gap-1">
                              {assessment.targetSkills.map((skill, index) => (
                                <span key={index} className="px-2 py-0.5 rounded-full text-xs bg-gray-100">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div>
                          {getStatusBadge(assessment.status)}
                        </div>
                        {assessment.status === 'active' && (
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <div className="flex items-center">
                              <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{assessment.candidateCount.completed} completed</span>
                            </div>
                            <span className="mx-2">•</span>
                            <div className="flex items-center">
                              <svg className="h-4 w-4 text-yellow-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{assessment.candidateCount.inProgress} in progress</span>
                            </div>
                            <span className="mx-2">•</span>
                            <div className="flex items-center">
                              <svg className="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                              <span>{assessment.candidateCount.sent} sent</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-3">
                      <Link
                        to={`/assessments/${assessment.id}`}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        View Details
                      </Link>
                      {assessment.status === 'active' && (
                        <Link
                          to={`/assessments/${assessment.id}/results`}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          View Results
                        </Link>
                      )}
                      {assessment.status === 'draft' && (
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Edit Assessment
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-6 text-gray-500">No assessments found</div>
        )}
      </div>
    </div>
  );
};

export default AssessmentList;