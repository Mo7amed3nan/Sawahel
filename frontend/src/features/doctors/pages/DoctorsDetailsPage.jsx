import React, { useState, useEffect } from 'react';
import { fetchDoctorById } from '../services/doctorsApi.js';
import { useParams, useNavigate } from 'react-router';
const DoctorsDetailsPage = () => {
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const doctorId = useParams().id;
  const navigate = useNavigate(); // Added navigate for the back button

  useEffect(() => {
    const getDoctorDetails = async () => {
      try {
        const response = await fetchDoctorById(doctorId);
        setDoctorData(response.data || response); // Safe fallback
      } catch (error) {
        console.log('Failed to fetch doctor details', error);
        setError('Failed to load professional details');
      } finally {
        setLoading(false);
      }
    };
    getDoctorDetails();
  }, [doctorId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto mt-12 bg-red-50 text-red-600 p-6 rounded-xl text-center font-medium border border-red-100">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-500 hover:text-gray-900 font-medium flex items-center gap-2 transition-colors"
      >
        &larr; Back to Directory
      </button>

      {/* Profile Card Container */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        {/* Cover Photo Area (Blue gradient) */}
        <div className="h-32 sm:h-40 bg-gradient-to-r from-blue-600 to-blue-400"></div>

        <div className="px-6 sm:px-10 pb-10">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end -mt-12 sm:-mt-16 mb-8 gap-4">
            {/* Avatar Placeholder */}
            <div className="h-24 w-24 sm:h-32 sm:w-32 bg-white rounded-full p-2 shadow-lg">
              <div className="h-full w-full bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-4xl font-bold">
                {doctorData.name.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Availability Badge */}
            <div className="sm:pb-4">
              <span
                className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm ${
                  doctorData.available
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${doctorData.available ? 'bg-green-500' : 'bg-red-500'}`}
                ></span>
                {doctorData.available
                  ? 'Accepting Clients'
                  : 'Currently Unavailable'}
              </span>
            </div>
          </div>

          {/* Name & Specialty */}
          <div className="mb-10 border-b border-gray-100 pb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              {doctorData.name}
            </h1>
            <p className="text-xl text-blue-600 font-semibold mt-2">
              {doctorData.specialty}
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Contact */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-l-4 border-blue-500 pl-3">
                Contact Information
              </h3>

              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Phone Number
                </p>
                <p className="text-gray-900 font-medium text-lg">
                  {doctorData.phone || 'Not provided'}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Location / Address
                </p>
                <p className="text-gray-900 font-medium text-lg">
                  {doctorData.clinicAddress || 'Not provided'}
                </p>
              </div>
            </div>

            {/* Right Column: Schedule & Fees */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-l-4 border-blue-500 pl-3">
                Schedule & Fees
              </h3>

              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Working Days
                </p>
                {/* LOGIC COMMENT: Checks if it's an array to render nicely, or falls back to string */}
                <p className="text-gray-900 font-medium text-lg">
                  {Array.isArray(doctorData.workingDays)
                    ? doctorData.workingDays.join(', ')
                    : doctorData.workingDays || 'Not specified'}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Working Hours
                </p>
                <p className="text-gray-900 font-medium text-lg">
                  {doctorData.workingHours || 'Not specified'}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Service Fee
                </p>
                <p className="text-gray-900 font-bold text-2xl text-blue-600">
                  {doctorData.price
                    ? `${doctorData.price} EGP`
                    : 'Contact for price'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsDetailsPage;
