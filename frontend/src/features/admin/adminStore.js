import { create } from 'zustand';
import {
  getApplications,
  approveApplication,
  rejectApplication,
} from '@/features/admin/api/adminApi';

export const useAdminStore = create((set, get) => ({
  applications: [],
  isLoading: false,
  error: null,
  processingId: null,

  loadApplications: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getApplications();
      set({ applications: response.data || [], isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to load applications',
        isLoading: false,
      });
      throw error;
    }
  },

  approveDoctorApplication: async (applicationId) => {
    set({ processingId: applicationId, error: null });
    try {
      await approveApplication(applicationId);
      set({
        applications: get().applications.map((app) =>
          app._id === applicationId ? { ...app, status: 'approved' } : app
        ),
        processingId: null,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to approve application',
        processingId: null,
      });
      throw error;
    }
  },

  rejectDoctorApplication: async (applicationId, reason) => {
    set({ processingId: applicationId, error: null });
    try {
      await rejectApplication(applicationId, reason);
      set({
        applications: get().applications.map((app) =>
          app._id === applicationId
            ? {
                ...app,
                status: 'rejected',
                reason: reason || 'Application rejected by admin',
              }
            : app
        ),
        processingId: null,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to reject application',
        processingId: null,
      });
      throw error;
    }
  },
}));
