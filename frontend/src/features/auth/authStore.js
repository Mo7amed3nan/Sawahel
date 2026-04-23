import { create } from 'zustand';
import {
  signupRequest,
  verifyEmailRequest,
  resendVerificationEmailRequest,
  loginRequest,
  checkAuthRequest,
  logoutRequest,
} from './authApi';

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  pendingVerificationEmail: localStorage.getItem('pendingVerificationEmail'),

  signup: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await signupRequest({ name, email, password });
      const pendingEmail = data?.email || email;
      localStorage.setItem('pendingVerificationEmail', pendingEmail);
      set({
        user: null,
        isAuthenticated: false,
        pendingVerificationEmail: pendingEmail,
      });
      return {
        success: true,
        requiresVerification: Boolean(data?.requiresVerification),
        email: pendingEmail,
        message: data?.message,
      };
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed';
      set({ error: message, isAuthenticated: false });
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  verifyEmail: async (token) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await verifyEmailRequest({ token });
      localStorage.setItem('jwt', data.token);
      localStorage.removeItem('pendingVerificationEmail');
      set({
        user: data.user,
        isAuthenticated: true,
        pendingVerificationEmail: null,
      });
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || 'Email verification failed';
      localStorage.removeItem('jwt');
      set({ error: message, isAuthenticated: false });
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  resendVerificationEmail: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const fallbackEmail = localStorage.getItem('pendingVerificationEmail');
      const targetEmail = (email || fallbackEmail || '').trim().toLowerCase();

      if (!targetEmail) {
        const message = 'Please provide your email first';
        set({ error: message });
        return { success: false, error: message };
      }

      const { data } = await resendVerificationEmailRequest({
        email: targetEmail,
      });
      localStorage.setItem('pendingVerificationEmail', targetEmail);
      set({ pendingVerificationEmail: targetEmail });
      return {
        success: true,
        message: data?.message,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to resend verification email';
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await loginRequest({ email, password });
      localStorage.setItem('jwt', data.token);
      set({ user: data.user, isAuthenticated: true });
      return { success: true, user: data.user };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      localStorage.removeItem('jwt');
      set({ error: message, isAuthenticated: false });
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      localStorage.removeItem('jwt');
      await logoutRequest();
      set({ user: null, isAuthenticated: false });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Logout failed';
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      set({ isAuthenticated: false, user: null, isCheckingAuth: false });
      return;
    }
    set({ isCheckingAuth: true, error: null });
    try {
      const { data } = await checkAuthRequest();
      set({
        user: data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        localStorage.removeItem('jwt');
        set({
          isAuthenticated: false,
          user: null,
          isCheckingAuth: false,
          error: 'Session expired. Please log in again.',
        });
      } else {
        set({
          error: error.response?.data?.message,
          isAuthenticated: false,
          user: null,
          isCheckingAuth: false,
        });
      }
    }
  },

  clearError: () => set({ error: null }),
}));
