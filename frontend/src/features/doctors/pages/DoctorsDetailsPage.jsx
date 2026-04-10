import React from 'react';
import { useState, useEffect } from 'react';
import { fetchDoctorById } from '../services/doctorsApi.js';
import { useParams, useNavigate } from 'react-router';
const DoctorsDetailsPage = () => {
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const doctorId = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    const getDoctorDetails = async () => {
      try {
        const response = await fetchDoctorById(doctorId);
        setDoctorData(response.data);
      } catch (error) {
        console.log('Failed to fetch doctor details', error);
        setError('Failed to load doctor details');
      } finally {
        setLoading(false);
      }
    };
    getDoctorDetails();
  }, [doctorId]);

  return (
    <>
      <button onClick={() => navigate(-1)}>Back</button>
      {loading ? (
        <p> loading... </p>
      ) : error ? (
        <p> {error} </p>
      ) : (
        <div>
          <h2>{doctorData.name}</h2>
          <p>Specialty: {doctorData.specialty}</p>
          <p>Phone: {doctorData.phone}</p>
          <p>Clinic Address: {doctorData.clinicAddress}</p>
          <p>Available: {doctorData.available ? 'Yes' : 'No'}</p>
          <p>Working Days: {doctorData.workingDays.join(', ')}</p>
          <p>Working Hours: {doctorData.workingHours}</p>
          <p>Price: ${doctorData.price}</p>
        </div>
      )}
    </>
  );
};

export default DoctorsDetailsPage;
