import React, { useEffect, useState } from 'react';
import { fetchDoctors } from '../services/doctorsApi.js';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
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

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>

      {loading && <p> loading </p>}
      {!loading && error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {doctors.map((doctor) => (
            <li key={doctor._id}>
              {doctor.name} - {doctor.specialty}
              <Link to={`/doctors/${doctor._id}/edit`} className="pl-2">
                Edit
              </Link>
              <Link to={`/doctors/${doctor._id}`} className="pl-2">
                Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorsListPage;
