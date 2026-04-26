import api from '@/utils/axios';

export const signupRequest = (payload) => api.post('/auth/signup', payload);

export const verifyEmailRequest = (payload) =>
  api.post('/auth/verify-email', payload);

export const resendVerificationEmailRequest = (payload) =>
  api.post('/auth/resend-verification-email', payload);

export const loginRequest = (payload) => api.post('/auth/login', payload);

export const checkAuthRequest = () => api.get('/auth/check-auth');

export const logoutRequest = () => api.post('/auth/logout', {});

export const forgotPasswordRequest = (payload) =>
  api.post('/auth/forget-password', payload);

export const resetPasswordRequest = (token, payload) =>
  api.post(`/auth/reset-password/${token}`, payload);
