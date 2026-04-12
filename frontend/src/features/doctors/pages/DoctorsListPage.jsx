import React, { useEffect, useState } from 'react';
import { fetchDoctors, deleteDoctor } from '../services/doctorsApi.js';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const DoctorsListPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const response = await fetchDoctors();
        setDoctors(response.data);
      } catch (error) {
        setError('Failed to fetch doctors');
      } finally {
        setLoading(false);
      }
    };
    loadDoctors();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) return;
    try {
      await deleteDoctor(id);
      setDoctors(doctors.filter((doctor) => doctor._id !== id));
      toast.success('Doctor deleted successfully');
    } catch (error) {
      toast.error('Failed to delete doctor');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Navigation & Header */}
      <div className="mb-10 border-b border-gray-100 pb-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-gray-500 hover:text-gray-900 font-medium flex items-center gap-2 transition-colors"
        >
          &larr; Back
        </button>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Service Directory
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Browse and manage registered professionals in Ras Sedr.
        </p>
      </div>

      {/* Loading State (Matches Details Page) */}
      {loading && (
        <div className="flex justify-center items-center min-h-[40vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Error State (Matches Details Page) */}
      {!loading && error && (
        <div className="max-w-3xl mx-auto mt-12 bg-red-50 text-red-600 p-6 rounded-xl text-center font-medium border border-red-100">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && doctors.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg font-medium">
            No professionals found.
          </p>
          <p className="text-gray-400 mt-1">Be the first to list a service!</p>
        </div>
      )}

      {/* Grid of Doctor Cards */}
      {!loading && !error && doctors.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden border border-gray-100 flex flex-col group"
            >
              {/* Cover Banner (Matches Details Page theme) */}
              <div className="h-20 bg-gradient-to-r from-blue-600 to-blue-400 relative">
                {/* Avatar Cutout */}
                <div className="absolute -bottom-6 left-6 h-16 w-16 bg-white rounded-full p-1 shadow-md transition-transform group-hover:scale-105">
                  <div className="h-full w-full bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-2xl font-bold">
                    {doctor.name.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="pt-10 px-6 pb-4 flex-grow">
                <h3 className="text-xl font-extrabold text-gray-900 truncate">
                  {doctor.name}
                </h3>
                <p className="text-sm font-semibold text-blue-600 mt-1">
                  {doctor.specialty}
                </p>

                {/* Availability Indicator */}
                <div className="mt-4 flex items-center gap-2 bg-gray-50 inline-flex px-3 py-1.5 rounded-lg border border-gray-100">
                  <span
                    className={`h-2 w-2 rounded-full ${doctor.available ? 'bg-green-500' : 'bg-red-500'}`}
                  ></span>
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                    {doctor.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="px-6 pb-6 mt-auto">
                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  <Link
                    to={`/doctors/${doctor._id}`}
                    className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold py-2.5 px-2 text-center rounded-xl transition-colors text-sm border border-gray-200"
                  >
                    View
                  </Link>
                  <Link
                    to={`/doctors/${doctor._id}/update`}
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold py-2.5 px-2 text-center rounded-xl transition-colors text-sm border border-blue-100"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(doctor._id)}
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2.5 px-2 text-center rounded-xl transition-colors text-sm border border-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsListPage;
