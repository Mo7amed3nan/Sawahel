import { Link, useLocation } from 'react-router-dom';
import {
  Waves, Moon, Sun, Menu, X, Loader2, Stethoscope,
  User, LogOut, Settings, ShieldCheck, ChevronDown,
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useAuthStore } from '@/features/auth/authStore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const { isAuthenticated, user, logout, isCheckingAuth } = useAuthStore();
  const location = useLocation();
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const isDoctor = user?.role === 'doctor';
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [isAuthenticated, user?.role]);

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinkClass = (path) =>
    cn(
      'transition-colors',
      isActive(path)
        ? 'text-primary font-semibold'
        : 'text-foreground'
    );

  // Avatar initial
  const userInitial = user?.name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Waves className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            <span className="font-bold text-xl sm:text-2xl tracking-tight text-foreground">
              Sawahel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            <Button variant="ghost" asChild size="sm">
              <Link to="/" className={navLinkClass('/')}>Home</Link>
            </Button>
            <Button variant="ghost" asChild size="sm">
              <Link to="/doctors" className={navLinkClass('/doctors')}>
                <Stethoscope className="h-4 w-4 mr-1" />
                Doctors
              </Link>
            </Button>
            <Button variant="ghost" asChild size="sm">
              <Link to="/about" className={navLinkClass('/about')}>About</Link>
            </Button>

            <div className="w-px h-6 bg-border mx-1" />

            {/* Theme Toggle */}
            <Button
              onClick={handleThemeToggle}
              size="icon"
              variant="ghost"
              aria-label="Toggle theme"
              className="h-9 w-9"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* Auth Section */}
            {isCheckingAuth ? (
              <Button variant="ghost" disabled size="sm">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Loading...
              </Button>
            ) : isAuthenticated ? (
              /* Profile Avatar Dropdown */
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((p) => !p)}
                  className="flex items-center gap-2 rounded-full pl-1 pr-2 py-1 hover:bg-muted transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                    {userInitial}
                  </div>
                  <ChevronDown className={cn(
                    'h-3.5 w-3.5 text-muted-foreground transition-transform',
                    profileOpen && 'rotate-180'
                  )} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-popover shadow-lg py-1 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-150">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <User className="h-4 w-4 text-muted-foreground" />
                        My Profile
                      </Link>

                      {isDoctor && (
                        <Link
                          to="/doctor/manage-info"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                        >
                          <Stethoscope className="h-4 w-4 text-muted-foreground" />
                          Doctor Dashboard
                        </Link>
                      )}

                      {isAdmin && (
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                        >
                          <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                          Admin Dashboard
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-border py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-muted transition-colors w-full"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild size="sm">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              onClick={handleThemeToggle}
              size="icon"
              variant="ghost"
              aria-label="Toggle theme"
              className="h-10 w-10"
            >
              {theme === 'light' ? (
                <Moon className="h-6 w-6" />
              ) : (
                <Sun className="h-6 w-6" />
              )}
            </Button>

            {/* Single toggle: avatar when logged in, hamburger when not */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              className="shrink-0"
            >
              {isAuthenticated ? (
                <div className="flex items-center gap-1.5 rounded-full pl-0.5 pr-2 py-0.5 hover:bg-muted transition-colors">
                  <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                    {userInitial}
                  </div>
                  <ChevronDown className={cn(
                    'h-4 w-4 text-muted-foreground transition-transform',
                    menuOpen && 'rotate-180'
                  )} />
                </div>
              ) : menuOpen ? (
                <div className="h-10 w-10 flex items-center justify-center rounded-md hover:bg-muted transition-colors">
                  <X className="h-6 w-6" />
                </div>
              ) : (
                <div className="h-10 w-10 flex items-center justify-center rounded-md hover:bg-muted transition-colors">
                  <Menu className="h-6 w-6" />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu — Floating Overlay */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 top-16 bg-black/20 backdrop-blur-[2px] z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          />

          {/* Floating Menu */}
          <div className="fixed top-[4.5rem] right-3 left-3 z-50 md:hidden animate-in fade-in-0 slide-in-from-top-3 duration-200">
            <div className="rounded-2xl border border-border bg-popover shadow-xl p-2 max-w-sm ml-auto">
              {/* Nav Links */}
              <div className="space-y-0.5">
                <Link
                  to="/"
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                    isActive('/') ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'
                  )}
                >
                  Home
                </Link>
                <Link
                  to="/doctors"
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                    isActive('/doctors') ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'
                  )}
                >
                  <Stethoscope className="h-5 w-5" />
                  Doctors
                </Link>
                <Link
                  to="/about"
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                    isActive('/about') ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'
                  )}
                >
                  About
                </Link>
              </div>

              <div className="h-px bg-border my-2" />

              {/* Auth Section */}
              {isCheckingAuth ? (
                <div className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </div>
              ) : isAuthenticated ? (
                <div className="space-y-0.5">
                  {/* User info */}
                  <div className="px-4 py-2">
                    <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>

                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    <User className="h-5 w-5 text-muted-foreground" />
                    My Profile
                  </Link>

                  {isDoctor && (
                    <Link
                      to="/doctor/manage-info"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      <Stethoscope className="h-5 w-5 text-muted-foreground" />
                      Doctor Dashboard
                    </Link>
                  )}

                  {isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                      Admin Dashboard
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-muted transition-colors w-full"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="p-2 space-y-2">
                  <Button asChild className="w-full" size="lg">
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full" size="lg">
                    <Link to="/login">Login</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
