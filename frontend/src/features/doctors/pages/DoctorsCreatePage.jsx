import { useState } from 'react';
import { createDoctor } from '../services/doctorsApi.js';
import { useNavigate } from 'react-router';
import DoctorForm from '../components/DoctorForm.jsx';
import toast from 'react-hot-toast';

const DoctorsCreatePage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e, doctorData) => {
    try {
      setError(null);
      setSaving(true);
      await createDoctor(doctorData);
      toast.success('Professional profile created successfully!');
      navigate('/doctors');
    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        err.message ||
        'Failed to create profile';
      console.error('Create Error:', err);
      toast.error(errMsg);
      setError(errMsg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Top Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 text-gray-500 hover:text-gray-900 font-medium flex items-center gap-2 transition-colors"
      >
        &larr; Back
      </button>

      {/* Page Header */}
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          List a New Professional
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Fill out the details below to add a new service provider to the Ras
          Sedr directory.
        </p>
      </div>

      {/* Form Component */}
      <DoctorForm
        onSubmit={handleSubmit}
        error={error}
        saving={saving}
        loading={false}
      />
    </div>
  );
};

export default DoctorsCreatePage;
