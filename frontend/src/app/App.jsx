import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/authStore';
import AppRoutes from './routes';
import Loader from '@/components/common/Loader';
import ScrollToTop from '@/components/common/ScrollToTop';

const App = () => {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <Loader variant="page" message="Loading Sawahel..." />;
  }

  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <AppRoutes />
    </div>
  );
};

export default App;
