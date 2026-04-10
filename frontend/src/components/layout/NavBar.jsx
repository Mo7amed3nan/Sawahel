import React from 'react';
import { Link } from 'react-router';
import { Waves } from 'lucide-react';

const NavBar = () => {
  return (
    <nav className="bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2">
            <Waves className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-2xl tracking-tight text-gray-900">
              Sawahel
            </span>
          </Link>

          {/* Action Button */}
          <div>
            <Link
              to="/doctors/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              + Add Doctor Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
