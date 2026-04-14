import { Link } from 'react-router-dom';
import { Waves, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
export default function NavBar() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );

  const handleThemeToggle = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Waves className="h-8 w-8 text-primary" />
            <span className="font-bold text-2xl tracking-tight text-foreground">
              Sawahel
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link to="/about">About</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/doctors">Services</Link>
            </Button>
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
