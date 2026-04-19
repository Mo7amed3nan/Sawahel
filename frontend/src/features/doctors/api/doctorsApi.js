import api from '@/utils/axios';

export const fetchDoctors = async () => {
  const response = await api.get('/doctors');
  return response;
};

export const fetchDoctorById = async (id) => {
  const response = await api.get(`/doctors/${id}`);
  return response;
};

export const createDoctor = async (doctorData) => {
  const response = await api.post('/doctors', doctorData);
  return response;
};

export const updateDoctor = async (id, doctorData) => {
  const response = await api.put(`/doctors/${id}`, doctorData);
  return response;
};

export const deleteDoctor = async (id) => {
  const response = await api.delete(`/doctors/${id}`);
  return response;
};

export const applyForDoctor = async () => {
  const response = await api.post('/doctor-applications/apply');
  return response;
};

export const getApplicationStatus = async () => {
  const response = await api.get('/doctor-applications/status');
  return response;
};
