import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/authStore';
import AppRoutes from './routes';
import Loader from '@/components/common/Loader';
import ScrollToTop from '@/components/common/ScrollToTop';
import PostHogPageView from '@/components/PostHogPageView';
import { usePostHog } from 'posthog-js/react';

const App = () => {
  const { checkAuth, isCheckingAuth, user, isAuthenticated } = useAuthStore();
  const posthog = usePostHog();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (posthog) {
      if (isAuthenticated && user) {
        posthog.identify(user._id || user.id, {
          email: user.email,
          name: user.name,
          role: user.role,
        });
      } else {
        posthog.reset();
      }
    }
  }, [posthog, isAuthenticated, user]);

  if (isCheckingAuth) {
    return <Loader variant="page" message="Loading Sawahel..." />;
  }

  return (
    <div className="min-h-screen">
      <PostHogPageView />
      <ScrollToTop />
      <AppRoutes />
    </div>
  );
};

export default App;
