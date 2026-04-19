import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/authStore';
import AppRoutes from './routes';

const App = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen">
      <AppRoutes />
    </div>
  );
};

export default App;
