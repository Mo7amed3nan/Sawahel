import { Link } from 'react-router';
import { Waves } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Waves className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl tracking-tight text-gray-900">
                Sawahel
              </span>
            </Link>
            <p className="text-gray-500 text-sm max-w-sm">
              Your all-in-one digital guide for Ras Sedr. Connecting the
              community with trusted local professionals and services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Explore</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="hover:text-blue-600 transition-colors"
                >
                  Service Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Professionals</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link
                  to="/doctors/new"
                  className="hover:text-blue-600 transition-colors"
                >
                  List Your Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sawahel. All rights reserved.</p>
          <p>Built for Ras Sedr, Egypt.</p>
        </div>
      </div>
    </footer>
  );
}
