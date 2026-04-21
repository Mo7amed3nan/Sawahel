import { Link, useLocation } from 'react-router-dom';
import { Waves, Moon, Sun, Menu, X, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/features/auth/authStore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Navbar() {
  const { isAuthenticated, user, logout, isCheckingAuth } = useAuthStore();
  const location = useLocation();
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const isDoctor = user?.role === 'doctor';
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    setMenuOpen(false);
  }, [isAuthenticated, user?.role]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleThemeToggle = () => {
    try {
      const isDark = document.documentElement.classList.contains('dark');
      const nextTheme = isDark ? 'light' : 'dark';
      setTheme(nextTheme);
      localStorage.setItem('theme', nextTheme);
      document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    } catch (error) {
      console.error('Theme toggle error:', error);
    }
  };

  const handleLogout = () => {
    try {
      logout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const renderAuthActions = ({ mobile = false } = {}) => {
    const fullWidth = mobile ? 'w-full justify-start' : '';

    if (isCheckingAuth) {
      return (
        <Button variant="ghost" disabled className={fullWidth}>
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          <span className="text-sm">Checking session...</span>
        </Button>
      );
    }

    if (isAuthenticated && isAdmin) {
      return (
        <>
          <Button variant="outline" asChild className={fullWidth}>
            <Link to="/admin/dashboard" className="text-sm">
              Admin Dashboard
            </Link>
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
          <Button variant="outline" asChild className={fullWidth}>
            <Link to="/profile" className="text-sm">
              Profile
            </Link>
          </Button>
          {isDoctor && (
            <Button variant="outline" asChild className={fullWidth}>
              <Link to="/doctor/manage-info" className="text-sm">
                Doctor Dashboard
              </Link>
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
          <Link to="/login" className="text-sm">
            Login
          </Link>
        </Button>
        <Button variant="outline" asChild className={fullWidth}>
          <Link to="/signup" className="text-sm">
            Sign Up
          </Link>
        </Button>
      </>
    );
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-3 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Waves className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            <span className="font-bold text-xl sm:text-2xl tracking-tight text-foreground  sm:inline">
              Sawahel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" asChild size="sm">
              <Link to="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild size="sm">
              <Link to="/about">About</Link>
            </Button>

            {renderAuthActions()}
            <Button
              onClick={handleThemeToggle}
              size="icon"
              variant="outline"
              aria-label="Toggle theme"
              className="h-9 w-9"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1 md:hidden">
            <Button
              onClick={handleThemeToggle}
              size="icon"
              variant="outline"
              aria-label="Toggle theme"
              className="h-9 w-9"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              className="h-9 w-9"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="pb-4 md:hidden">
            <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-3 space-y-2">
              <Button variant="ghost" asChild className="w-full justify-start">
                <Link to="/">Home</Link>
              </Button>
              <Button variant="ghost" asChild className="w-full justify-start">
                <Link to="/about">About</Link>
              </Button>

              <div className="border-t border-border pt-2 space-y-1">
                {renderAuthActions({ mobile: true })}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
