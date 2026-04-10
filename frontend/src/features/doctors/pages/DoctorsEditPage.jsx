import { useState, useEffect, use } from 'react';
import { updateDoctor, fetchDoctorById } from '../services/doctorsApi.js';
import { useNavigate, useParams } from 'react-router';
import DoctorForm from '../components/DoctorForm.jsx';
import toast from 'react-hot-toast';
const DoctorsEditPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const handleSubmit = async (e, doctorData) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateDoctor(doctorId, doctorData);
      toast.success('Doctor updated successfully');
      navigate(-1);
    } catch (error) {
      console.log('Failed to update doctor', error);
      toast.error('Failed to update doctor');
      setError('Failed to update doctor');
    } finally {
      setSaving(false);
    }
  };

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const doctorId = useParams().id;
  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const response = await fetchDoctorById(doctorId);

        setInitialData(response.data);
      } catch (error) {
        console.log('Failed to fetch doctor', error);
        setError('Failed to fetch doctor profile');
        toast.error('Failed to load profile');
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    loadDoctor();
  }, [doctorId]);

  if (loading) return <p className="p-8 text-center">Loading profile...</p>;
  if (error)
    return (
      <>
        <button onClick={() => navigate(-1)}>Back</button>
        <p className="p-8 text-center text-red-500">{error}</p>
      </>
    );
  return (
    <>
      <DoctorForm
        initialData={initialData}
        onSubmit={handleSubmit}
        error={error}
        saving={saving}
        loading={false}
      />
      <button onClick={() => navigate(-1)}>cancel</button>
    </>
  );
};

export default DoctorsEditPage;
