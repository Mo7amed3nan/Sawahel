import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/authStore';
import AppRoutes from './routes';
import Loader from '@/components/common/Loader';
const App = () => {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <Loader className="min-h-screen" />;
  }
  return (
    <div className="min-h-screen">
      <AppRoutes />
    </div>
  );
};

export default App;
