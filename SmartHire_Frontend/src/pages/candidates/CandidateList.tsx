// src/pages/candidates/CandidateList.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Candidate {
  id: string;
  name: string;
  position: string;
  status: 'pending' | 'assessment_sent' | 'assessment_completed' | 'interview_scheduled' | 'interview_completed' | 'hired' | 'rejected';
  lastActivity: string;
  email: string;
}

const CandidateList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Mock data for candidates
  const candidates: Candidate[] = [
    { id: '1', name: 'Michael Brown', position: 'Backend Developer', status: 'interview_completed', lastActivity: '2 days ago', email: 'michael.brown@example.com' },
    { id: '2', name: 'Sarah Williams', position: 'Frontend Developer', status: 'assessment_completed', lastActivity: '1 day ago', email: 'sarah.williams@example.com' },
    { id: '3', name: 'John Smith', position: 'DevOps Engineer', status: 'assessment_sent', lastActivity: '4 days ago', email: 'john.smith@example.com' },
    { id: '4', name: 'Emily Johnson', position: 'UX Designer', status: 'interview_scheduled', lastActivity: '3 hours ago', email: 'emily.johnson@example.com' },
    { id: '5', name: 'David Lee', position: 'Product Manager', status: 'pending', lastActivity: 'Just now', email: 'david.lee@example.com' },
    { id: '6', name: 'Sophia Chen', position: 'Data Scientist', status: 'hired', lastActivity: '1 week ago', email: 'sophia.chen@example.com' },
    { id: '7', name: 'James Wilson', position: 'Mobile Developer', status: 'rejected', lastActivity: '2 weeks ago', email: 'james.wilson@example.com' }
  ];
  
  // Filter candidates based on search term and status
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
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
  
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Candidates</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all candidates in your hiring pipeline.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            to="/resume-upload"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Candidate
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
              placeholder="Search candidates..."
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
            <option value="pending">Pending</option>
            <option value="assessment_sent">Assessment Sent</option>
            <option value="assessment_completed">Assessment Completed</option>
            <option value="interview_scheduled">Interview Scheduled</option>
            <option value="interview_completed">Interview Completed</option>
            <option value="hired">Hired</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
      
      {/* Candidates List */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Candidate
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Position
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Last Activity
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredCandidates.map((candidate) => (
                    <tr key={candidate.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <span className="text-indigo-800 font-medium">
                                {candidate.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{candidate.name}</div>
                            <div className="text-gray-500">{candidate.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {candidate.position}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {getStatusBadge(candidate.status)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {candidate.lastActivity}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link to={`/candidates/${candidate.id}`} className="text-indigo-600 hover:text-indigo-900">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateList;