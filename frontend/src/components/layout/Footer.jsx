import { Link } from 'react-router-dom'
import { Waves } from 'lucide-react'

export default  function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Waves className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl tracking-tight text-foreground">
                Sawahel
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              Your all-in-one digital guide for Ras Sedr. Connecting the
              community with trusted local professionals and services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-muted-foreground hover:text-primary transition-colors">
                  Service Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Professionals</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/doctors/create" className="text-muted-foreground hover:text-primary transition-colors">
                  List Your Service
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-muted-foreground hover:text-primary transition-colors">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sawahel. All rights reserved.</p>
          <p>Built for Ras Sedr, Egypt.</p>
        </div>
      </div>
    </footer>
  )
}