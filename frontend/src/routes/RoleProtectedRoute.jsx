import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/authStore';

export default function RoleProtectedRoute({ allowedRoles = [] }) {
  const { user } = useAuthStore();
  const role = user?.role || 'user';

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
