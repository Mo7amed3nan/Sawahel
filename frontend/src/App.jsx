import React from 'react';
import { Routes, Route } from 'react-router';
import NotFound from './pages/NotFound';
import DoctorsCreatePage from './features/doctors/pages/DoctorsCreatePage';
import DoctorsListPage from './features/doctors/pages/DoctorsListPage';
import DoctorsDetailsPage from './features/doctors/pages/DoctorsDetailsPage';
import DoctorsEditPage from './features/doctors/pages/DoctorsEditPage';
import MainLayout from './components/layout/MainLayout';
import About from './pages/About';
import Home from './pages/Home';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';
const App = () => {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(user);
  console.log(isAuthenticated);
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/doctors/create" element={<DoctorsCreatePage />} />
          <Route path="/doctors" element={<DoctorsListPage />} />
          <Route path="/doctors/:id" element={<DoctorsDetailsPage />} />
          <Route path="/doctors/:id/update" element={<DoctorsEditPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Routes>
    </div>
  );
};

export default App;
