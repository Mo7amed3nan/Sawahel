import api from '@/utils/axios';

export const fetchServices = async () => {
  const response = await api.get('/services');
  return response;
};
