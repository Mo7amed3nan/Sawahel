import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-blue-600 tracking-tight">
          404
        </h1>
        <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved or deleted.
        </p>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
