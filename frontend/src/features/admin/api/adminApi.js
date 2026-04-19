import api from '@/utils/axios';

export const getApplications = () => api.get('/admin/applications');

export const approveApplication = (applicationId) =>
  api.post(`/admin/applications/${applicationId}/approve`);

export const rejectApplication = (applicationId, reason) =>
  api.post(`/admin/applications/${applicationId}/reject`, { reason });
