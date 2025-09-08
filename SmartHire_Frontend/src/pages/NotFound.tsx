// src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <h2 className="text-6xl font-extrabold text-indigo-600">404</h2>
          <h3 className="mt-4 text-xl font-medium text-gray-900">Page Not Found</h3>
          <p className="mt-2 text-sm text-gray-500">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="mt-6">
            <Link
              to="/dashboard"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;