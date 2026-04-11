import { useState, useEffect } from 'react';
import { updateDoctor, fetchDoctorById } from '../services/doctorsApi.js';
import { useNavigate, useParams } from 'react-router';
import DoctorForm from '../components/DoctorForm.jsx';
import toast from 'react-hot-toast';

const DoctorsEditPage = () => {
  const navigate = useNavigate();
  const { id: doctorId } = useParams();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const response = await fetchDoctorById(doctorId);
        setInitialData(response.data || response);
      } catch (err) {
        const errMsg =
          err.response?.data?.message || 'Failed to load profile data';
        console.error('Fetch Error:', err);
        toast.error(errMsg);
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };
    loadDoctor();
  }, [doctorId, navigate]);

  const handleSubmit = async (e, doctorData) => {
    try {
      setError(null);
      setSaving(true);
      await updateDoctor(doctorId, doctorData);
      toast.success('Profile updated successfully!');
      navigate(-1);
    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        err.message ||
        'Failed to update profile';
      console.error('Update Error:', err);
      toast.error(errMsg);
      setError(errMsg);
    } finally {
      setSaving(false);
    }
  };

  // Styled Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
          Edit Professional Profile
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Update the public information for this service provider.
        </p>
      </div>

      {/* Form Component */}
      <DoctorForm
        initialData={initialData}
        onSubmit={handleSubmit}
        error={error}
        saving={saving}
        loading={false}
      />
    </div>
  );
};

export default DoctorsEditPage;
