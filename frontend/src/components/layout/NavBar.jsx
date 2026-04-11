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

          <div className="flex items-center gap-6">
            <Link
              to="/about"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
