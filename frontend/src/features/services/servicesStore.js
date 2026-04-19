import { create } from 'zustand';
import { fetchServices } from '@/features/services/api/servicesApi';

const fallbackServices = [
  {
    id: 'doctors',
    name: 'Doctors & Clinics',
    description: 'Find specialized doctors and manage medical appointments.',
    icon: 'Stethoscope',
    path: '/doctors',
    isActive: true,
  },
  {
    id: 'transportation',
    name: 'Transportation',
    description: 'Bus routes, taxis, and car rentals around the city.',
    icon: 'Bus',
    isActive: false,
  },
  {
    id: 'maintenance',
    name: 'Maintenance',
    description: 'Plumbers, electricians, and trusted local handymen.',
    icon: 'Wrench',
    isActive: false,
  },
  {
    id: 'food',
    name: 'Food & Dining',
    description: 'Restaurants, cafes, and local delivery services.',
    icon: 'UtensilsCrossed',
    isActive: false,
  },
];

export const useServicesStore = create((set) => ({
  services: fallbackServices,
  isLoading: false,
  error: null,

  loadServices: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchServices();
      const data = response.data;
      if (Array.isArray(data) && data.length > 0) {
        set({ services: data, isLoading: false });
        return;
      }
      set({ isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to load services',
        isLoading: false,
      });
    }
  },
}));
