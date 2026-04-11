import React from 'react';
import { Link } from 'react-router';
import { Map, ShieldCheck, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          About Sawahel
        </h1>
        <p className="text-xl text-gray-600">
          Your trusted digital companion for finding the best professionals,
          services, and locations in{' '}
          <span className="font-semibold text-blue-600">Ras Sedr</span>.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Map className="text-blue-600 w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Local Focus</h3>
          <p className="text-gray-600">
            Built specifically for the Ras Sedr community, ensuring all listings
            are relevant, local, and accessible.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="text-blue-600 w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Trusted Directory
          </h3>
          <p className="text-gray-600">
            A reliable source for finding healthcare, maintenance, and
            transportation services with accurate contact details.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="text-blue-600 w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            For Professionals
          </h3>
          <p className="text-gray-600">
            Empowering local service providers by giving them a free,
            easy-to-use platform to reach new clients.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-600 rounded-2xl p-10 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Are you a professional in Ras Sedr?
        </h2>
        <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
          Join our growing directory today and make it easier for the community
          to find your services.
        </p>
        <Link
          to="/doctors/create"
          className="bg-white text-blue-600 hover:bg-gray-50 font-bold py-3 px-8 rounded-lg transition-colors inline-block"
        >
          List Your Service
        </Link>
      </div>
    </div>
  );
};

export default About;
