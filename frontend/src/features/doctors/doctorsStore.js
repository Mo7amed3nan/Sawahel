import { create } from 'zustand';
import {
  fetchDoctors,
  fetchDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  applyForDoctor,
  getApplicationStatus,
  rateDoctor as rateDoctorApi,
  getDoctorRatings,
} from '@/features/doctors/api/doctorsApi';

export const useDoctorsStore = create((set, get) => ({
  doctors: [],
  selectedDoctor: null,
  myDoctor: null,
  applicationStatus: null,
  doctorRatings: { averageRating: 0, totalRatings: 0, userRating: null },
  isLoading: false,
  isCheckingApplication: false,
  isSubmittingApplication: false,
  isLoadingRatings: false,
  isSubmittingRating: false,
  error: null,

  loadDoctors: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchDoctors();
      set({ doctors: response.data || [], isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch doctors',
        isLoading: false,
      });
    }
  },

  loadDoctorById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchDoctorById(id);
      set({ selectedDoctor: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch doctor',
        isLoading: false,
      });
      throw error;
    }
  },

  loadMyDoctor: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchDoctors();
      const doctors = response.data || [];
      const myDoctor = doctors.find(
        (doctor) => String(doctor.userId) === String(userId)
      );

      set({
        doctors,
        myDoctor: myDoctor || null,
        isLoading: false,
      });

      return myDoctor || null;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch doctors',
        isLoading: false,
      });
      throw error;
    }
  },

  addDoctor: async (doctorData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await createDoctor(doctorData);
      set({
        doctors: [response.data, ...get().doctors],
        myDoctor: response.data,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to create doctor',
        isLoading: false,
      });
      throw error;
    }
  },

  editDoctor: async (id, doctorData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await updateDoctor(id, doctorData);
      const updatedDoctor = response.data;
      set({
        doctors: get().doctors.map((doctor) =>
          doctor._id === id ? updatedDoctor : doctor
        ),
        selectedDoctor: updatedDoctor,
        myDoctor:
          get().myDoctor && get().myDoctor._id === id
            ? updatedDoctor
            : get().myDoctor,
        isLoading: false,
      });
      return updatedDoctor;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to update doctor',
        isLoading: false,
      });
      throw error;
    }
  },

  removeDoctor: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteDoctor(id);
      set({
        doctors: get().doctors.filter((doctor) => doctor._id !== id),
        selectedDoctor:
          get().selectedDoctor?._id === id ? null : get().selectedDoctor,
        myDoctor: get().myDoctor?._id === id ? null : get().myDoctor,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to delete doctor',
        isLoading: false,
      });
      throw error;
    }
  },

  loadApplicationStatus: async () => {
    set({ isCheckingApplication: true, error: null });
    try {
      const response = await getApplicationStatus();
      set({
        applicationStatus: response.data || null,
        isCheckingApplication: false,
      });
      return response.data || null;
    } catch (error) {
      if (error.response?.status === 404) {
        set({ applicationStatus: null, isCheckingApplication: false });
        return null;
      }

      set({
        error:
          error.response?.data?.message || 'Failed to fetch application status',
        isCheckingApplication: false,
      });
      throw error;
    }
  },

  submitDoctorApplication: async () => {
    set({ isSubmittingApplication: true, error: null });
    try {
      const response = await applyForDoctor();
      set({
        applicationStatus: response.data?.application || null,
        isSubmittingApplication: false,
      });
      return response.data?.application || null;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to submit application',
        isSubmittingApplication: false,
      });
      throw error;
    }
  },

  loadDoctorRatings: async (doctorId) => {
    set({ isLoadingRatings: true });
    try {
      const response = await getDoctorRatings(doctorId);
      set({
        doctorRatings: response.data || { averageRating: 0, totalRatings: 0, userRating: null },
        isLoadingRatings: false,
      });
      return response.data;
    } catch (error) {
      set({ isLoadingRatings: false });
      return null;
    }
  },

  submitRating: async (doctorId, rating) => {
    set({ isSubmittingRating: true });
    try {
      const response = await rateDoctorApi(doctorId, rating);
      set({
        doctorRatings: response.data || get().doctorRatings,
        isSubmittingRating: false,
      });
      return response.data;
    } catch (error) {
      set({ isSubmittingRating: false });
      throw error;
    }
  },
}));
