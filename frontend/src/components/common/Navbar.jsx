import { Link } from 'react-router-dom';
import { Waves, Moon, Sun } from 'lucide-react';
import { useAuthStore } from '@/features/auth/authStore';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );

  const isDoctor = user?.role === 'doctor';

  const handleThemeToggle = () => {
    const isDark = document.documentElement.classList.contains('dark');
    const nextTheme = isDark ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <Waves className="h-8 w-8 text-primary" />
            <span className="font-bold text-2xl tracking-tight text-foreground">
              Sawahel
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link to="/about">About</Link>
            </Button>

            {isAuthenticated && user?.role === 'admin' ? (
              <>
                <Button variant="outline" asChild>
                  <Link to="/admin/dashboard">Admin Dashboard</Link>
                </Button>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : isAuthenticated ? (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/services">Services</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to={`/profile/${user?._id}`}>Profile</Link>
                </Button>

                {isDoctor ? (
                  <Button variant="outline" asChild>
                    <Link to={`/doctor/manage-info`}>Manage Info</Link>
                  </Button>
                ) : (
                  <Button variant="outline" asChild>
                    <Link to={`/apply-for-doctor`}>Apply for Doctor</Link>
                  </Button>
                )}

                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}

            <Button onClick={handleThemeToggle}>
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
