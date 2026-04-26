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
  const [isLogingout, setIsLogingout] = useState(false)
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
      const handleLogout = async()=>{
        setIsLogingout(true)
        await logout();
        toast.success('Logged out successfully');
      }
      handleLogout();
    } catch (error) {
      toast.error('Failed to logout');
    }
    finally{
      setIsLogingout(false)
    }
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinkClass = (path) =>
    cn(
      'transition-colors h-10 px-4 flex items-center rounded-full font-medium',
      isActive(path)
        ? 'bg-primary/10 text-primary'
        : 'text-foreground/80 hover:text-foreground hover:bg-muted'
    );

  // Avatar initial
  const userInitial = user?.name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <nav className="bg-background border-b border-border shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[4.5rem] items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Waves className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-foreground">
              Sawahel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-2 md:flex">
            <Link to="/" className={navLinkClass('/')}>Home</Link>
            <Link to="/doctors" className={navLinkClass('/doctors')}>
              <Stethoscope className="h-4 w-4 mr-2" />
              Doctors
            </Link>
            <Link to="/about" className={navLinkClass('/about')}>About</Link>

            <div className="w-px h-8 bg-border mx-2" />

            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              aria-label="Toggle theme"
              className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>

            {/* Auth Section */}
            {isCheckingAuth ? (
              <Button variant="ghost" disabled className="ml-2 h-10 rounded-full">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Loading
              </Button>
            ) : isAuthenticated ? (
              /* Profile Avatar Dropdown */
              <div className="relative ml-2" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((p) => !p)}
                  className="flex items-center gap-2 rounded-full pl-1.5 pr-3 py-1.5 border border-transparent hover:border-border hover:bg-muted/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="h-9 w-9 rounded-[14px] bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shadow-sm">
                    {userInitial}
                  </div>
                  <span className="text-sm font-medium hidden lg:block max-w-[100px] truncate">{user?.name}</span>
                  <ChevronDown className={cn(
                    'h-4 w-4 text-muted-foreground transition-transform duration-300',
                    profileOpen && 'rotate-180'
                  )} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-border bg-popover/95 backdrop-blur-xl shadow-2xl py-2 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200">
                    {/* User Info */}
                    <div className="px-5 py-3 border-b border-border/50 mb-1">
                      <p className="text-sm font-bold text-foreground truncate">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{user?.email}</p>
                    </div>

                    <div className="px-2 py-1 space-y-1">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                      >
                        <div className="p-1.5 bg-background rounded-md shadow-sm border border-border/50">
                          <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                        My Profile
                      </Link>

                      {isDoctor && (
                        <Link
                          to="/doctor/manage-info"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                        >
                          <div className="p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-md border border-blue-100 dark:border-blue-900/50">
                            <Stethoscope className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          Doctor Dashboard
                        </Link>
                      )}

                      {isAdmin && (
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                        >
                          <div className="p-1.5 bg-rose-50 dark:bg-rose-900/30 rounded-md border border-rose-100 dark:border-rose-900/50">
                            <ShieldCheck className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                          </div>
                          Admin Dashboard
                        </Link>
                      )}
                    </div>

                    <div className="px-4 py-2 mt-1 border-t border-border/50">
                      <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-bold text-destructive bg-destructive/10 hover:bg-destructive hover:text-destructive-foreground transition-colors w-full"
                      >
                        {isLogingout ? (  
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <LogOut className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>  
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-2">
                <Button variant="ghost" asChild className="h-10 rounded-full font-medium">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild className="h-10 rounded-full font-semibold shadow-md shadow-primary/20 hover:-translate-y-0.5 transition-all">
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button
              onClick={handleThemeToggle}
              aria-label="Toggle theme"
              className="h-12 w-12 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground"
            >
              {theme === 'light' ? (
                <Moon className="h-6 w-6" />
              ) : (
                <Sun className="h-6 w-6" />
              )}
            </button>

            {/* Single toggle: avatar when logged in, hamburger when not */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              className="shrink-0 flex items-center justify-center h-12 rounded-full px-2"
            >
              {isAuthenticated ? (
                <div className="flex items-center gap-1.5 pl-0.5 pr-1 py-0.5 rounded-full border border-border/50 bg-muted/30">
                  <div className="h-9 w-9 rounded-[14px] bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shadow-sm">
                    {userInitial}
                  </div>
                  <ChevronDown className={cn(
                    'h-4 w-4 text-muted-foreground transition-transform duration-300 mr-1',
                    menuOpen && 'rotate-180'
                  )} />
                </div>
              ) : menuOpen ? (
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-muted/80 text-foreground transition-colors">
                  <X className="h-6 w-6" />
                </div>
              ) : (
                <div className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-muted/50 transition-colors">
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
            className="fixed inset-0 top-[4.5rem] bg-background/80 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
            onClick={() => setMenuOpen(false)}
          />

          {/* Floating Menu */}
          <div className="fixed top-20 right-4 left-4 z-50 md:hidden animate-in fade-in-0 zoom-in-95 slide-in-from-top-6 duration-300">
            <div className="rounded-3xl border border-border/50 bg-popover/95 backdrop-blur-xl shadow-2xl p-3 flex flex-col gap-1">
              
              {/* Nav Links */}
              <div className="space-y-1">
                <Link
                  to="/"
                  className={cn(
                    'flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-semibold transition-colors',
                    isActive('/') ? 'bg-primary/10 text-primary' : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Waves className="h-5 w-5 opacity-70" />
                  Home
                </Link>
                <Link
                  to="/doctors"
                  className={cn(
                    'flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-semibold transition-colors',
                    isActive('/doctors') ? 'bg-primary/10 text-primary' : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Stethoscope className="h-5 w-5 opacity-70" />
                  Find a Doctor
                </Link>
                <Link
                  to="/about"
                  className={cn(
                    'flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-semibold transition-colors',
                    isActive('/about') ? 'bg-primary/10 text-primary' : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                  )}
                >
                  <InfoIcon className="h-5 w-5 opacity-70" />
                  About Sawahel
                </Link>
              </div>

              <div className="h-px bg-border/50 mx-4 my-2" />

              {/* Auth Section */}
              {isCheckingAuth ? (
                <div className="flex justify-center py-6 text-muted-foreground">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : isAuthenticated ? (
                <div className="space-y-1">
                  <div className="px-5 py-3 mb-2 bg-muted/30 rounded-2xl mx-1">
                    <p className="text-base font-bold text-foreground truncate">{user?.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
                  </div>

                  <Link
                    to="/profile"
                    className="flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-semibold text-foreground/80 hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <User className="h-5 w-5 text-muted-foreground" />
                    My Profile
                  </Link>

                  {isDoctor && (
                    <Link
                      to="/doctor/manage-info"
                      className="flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-semibold text-foreground/80 hover:bg-muted hover:text-foreground transition-colors"
                    >
                      <Settings className="h-5 w-5 text-muted-foreground" />
                      Doctor Dashboard
                    </Link>
                  )}

                  {isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-semibold text-foreground/80 hover:bg-muted hover:text-foreground transition-colors"
                    >
                      <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                      Admin Dashboard
                    </Link>
                  )}

                  <div className="p-2 mt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 w-full px-5 py-4 rounded-2xl text-base font-bold text-destructive bg-destructive/10 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      <LogOut className="h-5 w-5" />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-2 space-y-3 mt-1">
                  <Button asChild className="w-full h-14 rounded-2xl text-base shadow-lg shadow-primary/20">
                    <Link to="/signup">Quick Registration</Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full h-14 rounded-2xl text-base border-2 bg-transparent">
                    <Link to="/login">Sign In</Link>
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

// Quick component for info icon locally in this file
function InfoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}
