import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

import ProtectedRoute from '@/routes/ProtectedRoute';
import RoleProtectedRoute from '@/routes/RoleProtectedRoute';

import HomePage from '@/app/pages/HomePage';
import AboutPage from '@/app/pages/AboutPage';
import ServicesPage from '@/features/services/pages/ServicesPage';

import LoginPage from '@/features/auth/pages/LoginPage';
import SignupPage from '@/features/auth/pages/SignupPage';
import VerifyEmailPage from '@/features/auth/pages/VerifyEmailPage';

import DoctorManageInfoPage from '@/features/doctors/pages/DoctorManageInfoPage';
import ApplyForDoctorPage from '@/features/doctors/pages/ApplyForDoctorPage';
import AdminDashboardPage from '@/features/admin/pages/AdminDashboardPage';
import UnauthorizedPage from '@/app/pages/UnauthorizedPage';
import NotFoundPage from '@/app/pages/NotFoundPage';
import DoctorsListPage from '@/features/doctors/pages/DoctorsListPage';
import DoctorsDetailsPage from '@/features/doctors/pages/DoctorsDetailsPage';
import DoctorsEditPage from '@/features/doctors/pages/DoctorsEditPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/doctors" element={<DoctorsListPage />} />
        <Route path="/doctors/:id" element={<DoctorsDetailsPage />} />
        <Route path="/services" element={<ServicesPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/apply-for-doctor" element={<ApplyForDoctorPage />} />

        <Route element={<RoleProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route element={<RoleProtectedRoute allowedRoles={['doctor']} />}>
            <Route
              path="/doctor/manage-info"
              element={<DoctorManageInfoPage />}
            />
          </Route>

          <Route
            element={<RoleProtectedRoute allowedRoles={['doctor', 'admin']} />}
          >
            <Route path="/doctors/:id/update" element={<DoctorsEditPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
