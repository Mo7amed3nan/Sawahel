import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function DashboardLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <main className="mx-auto max-w-7xl px-4 py-8 page-enter">
        <Outlet />
      </main>
    </div>
  );
}
