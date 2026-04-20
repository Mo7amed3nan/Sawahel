import { create } from 'zustand';
import {
  signupRequest,
  verifyEmailRequest,
  loginRequest,
  checkAuthRequest,
  logoutRequest,
} from './authApi';

const AUTH_TOKEN_KEY = 'sawahel_auth_token';

const saveAuthToken = (token) => {
  if (!token) return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

const clearAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

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
      set({ user: null, isAuthenticated: false });
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
      saveAuthToken(data?.token);
      set({ user: normalizeUser(data.user), isAuthenticated: true });
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || 'Email verification failed';
      clearAuthToken();
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
      saveAuthToken(data?.token);
      const normalizedUser = normalizeUser(data.user);
      set({ user: normalizedUser, isAuthenticated: true });
      return { success: true, user: normalizedUser };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      clearAuthToken();
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
      clearAuthToken();
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
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        clearAuthToken();
      }
      set({
        error:
          status === 401 || status === 403
            ? null
            : error.response?.data?.message,
        isAuthenticated: false,
        user: null,
        isCheckingAuth: false,
      });
    }
  },
}));
