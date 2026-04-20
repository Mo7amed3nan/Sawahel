import { Link } from 'react-router-dom';
import { Waves, Moon, Sun, Menu, X, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/features/auth/authStore';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const { isAuthenticated, user, logout, isCheckingAuth } = useAuthStore();
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const isDoctor = user?.role === 'doctor';

  useEffect(() => {
    setMenuOpen(false);
  }, [isAuthenticated, user?.role]);

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

  const renderAuthActions = ({ mobile = false } = {}) => {
    const fullWidth = mobile ? 'w-full justify-start' : '';

    if (isCheckingAuth) {
      return (
        <Button variant="ghost" disabled className={fullWidth}>
          <Loader2 className="h-4 w-4 animate-spin" />
          Checking session...
        </Button>
      );
    }

    if (isAuthenticated && user?.role === 'admin') {
      return (
        <>
          <Button variant="outline" asChild className={fullWidth}>
            <Link to="/admin/dashboard">Admin Dashboard</Link>
          </Button>
          <Button variant="ghost" onClick={handleLogout} className={fullWidth}>
            Logout
          </Button>
        </>
      );
    }

    if (isAuthenticated) {
      return (
        <>
          <Button variant="ghost" asChild className={fullWidth}>
            <Link to="/services">Services</Link>
          </Button>
          <Button variant="outline" asChild className={fullWidth}>
            <Link to={`/profile/${user?._id}`}>Profile</Link>
          </Button>
          {isDoctor && (
            <Button variant="outline" asChild className={fullWidth}>
              <Link to="/doctor/manage-info">Manage Info</Link>
            </Button>
          )}
          <Button variant="ghost" onClick={handleLogout} className={fullWidth}>
            Logout
          </Button>
        </>
      );
    }

    return (
      <>
        <Button variant="ghost" asChild className={fullWidth}>
          <Link to="/login">Login</Link>
        </Button>
        <Button variant="outline" asChild className={fullWidth}>
          <Link to="/signup">Sign Up</Link>
        </Button>
      </>
    );
  };

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-3 py-3">
          <Link to="/" className="flex items-center gap-2">
            <Waves className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl tracking-tight text-foreground sm:text-2xl">
              Sawahel
            </span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" asChild>
              <Link to="/about">About</Link>
            </Button>
            {renderAuthActions()}
            <Button
              onClick={handleThemeToggle}
              size="icon"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Button
              onClick={handleThemeToggle}
              size="icon"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {menuOpen && (
          <div className="pb-4 md:hidden">
            <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-3">
              <Button variant="ghost" asChild className="w-full justify-start">
                <Link to="/about">About</Link>
              </Button>
              {renderAuthActions({ mobile: true })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
