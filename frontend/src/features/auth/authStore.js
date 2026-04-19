import { create } from 'zustand';
import {
  signupRequest,
  verifyEmailRequest,
  loginRequest,
  checkAuthRequest,
  logoutRequest,
} from './authApi';

const normalizeUser = (user) => {
  if (!user) {
    return null;
  }

  return {
    ...user,
    role: user.role || 'user',
  };
};

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isCheckingAuth: true,

  signup: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await signupRequest({ name, email, password });
      set({ user: normalizeUser(data.user), isAuthenticated: true });
      return { success: true };
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
      set({ user: normalizeUser(data.user), isAuthenticated: true });
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || 'Email verification failed';
      set({ error: message, isAuthenticated: false });
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await loginRequest({ email, password });
      const normalizedUser = normalizeUser(data.user);
      set({ user: normalizedUser, isAuthenticated: true });
      return { success: true, user: normalizedUser };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      set({ error: message, isAuthenticated: false });
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
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
    set({ isCheckingAuth: true, error: null });
    try {
      const { data } = await checkAuthRequest();
      set({
        user: normalizeUser(data.user),
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message,
        isAuthenticated: false,
        user: null,
        isCheckingAuth: false,
      });
    }
  },
}));
