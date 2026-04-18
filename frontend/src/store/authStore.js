import { create } from 'zustand';
import api from '@/lib/axios';

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isCheckingAuth: true,

  signup: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/auth/signup', {
        name,
        email,
        password,
      });
      set({ user: data.user, isAuthenticated: true });
    } catch (error) {
      console.log('Signup error:', error);
      set({ error: error.response?.data?.message || 'Signup failed' });
    } finally {
      set({ isLoading: false });
    }
  },

  verifyEmail: async (token) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/auth/verify-email', { token });

      set({ isAuthenticated: true, user: data.user });
    } catch (error) {
      console.log('Email verification error:', error);
      set({
        error: error.response?.data?.message || 'Email verification failed',
      });
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/auth/login', { email, password });
      set({ user: data.user, isAuthenticated: true });
    } catch (error) {
      console.log('Login error:', error);
      set({ error: error.response?.data?.message || 'Login failed' });
    } finally {
      set({ isLoading: false });
    }
  },

  

  checkAuth: async() => {
    set({ isCheckingAuth: true, error: null});
    try{
      const {data} = await api.get('auth/check-auth');
      set({user: data.user, isAuthenticated: true, user: data.user}); 
    }catch(error){
      set({error: error.response?.data?.message, isAuthenticated: false, user: null, isCheckingAuth: false});
    }
  }
}));
