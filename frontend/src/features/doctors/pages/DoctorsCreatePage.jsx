import { useState, useEffect } from 'react';
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
      e.preventDefault();
      setSaving(true);
      await createDoctor(doctorData);
      toast.success('Doctor created successfully');
      navigate('/doctors');
    } catch (error) {
      console.log('Failed to create doctor', error);
      toast.error('Failed to create doctor');
      setError('Failed to create doctor');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <DoctorForm
        onSubmit={handleSubmit}
        error={error}
        saving={saving}
        loading={false}
      />
      <button onClick={() => navigate(-1)}>Cancel</button>
    </>
  );
};

export default DoctorsCreatePage;
