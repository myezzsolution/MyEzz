import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#', isAnchor: true },
    { label: 'How It Works', href: '#how-it-works', isAnchor: true },
    { label: 'Partner', href: 'https://my-ezz-restaurants.vercel.app/', external: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img 
              src="/myezzlogopage0001removebgpreview2329-xmz0h-400w.png" 
              alt="MyEzz" 
              className="h-10 md:h-12 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-orange-500 font-medium text-sm transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-600 hover:text-orange-500 font-medium text-sm transition-colors"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2 text-gray-700 font-medium text-sm rounded-xl border border-gray-200 hover:border-orange-300 hover:text-orange-500 transition-all"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 text-white font-semibold text-sm rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-md shadow-orange-500/25 hover:from-orange-600 hover:to-orange-700 hover:shadow-lg hover:shadow-orange-500/40 transition-all"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-orange-500 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 text-gray-600 hover:text-orange-500 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="block py-2 text-gray-600 hover:text-orange-500 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              )
            ))}
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <Link
                to="/login"
                className="block w-full text-center py-2.5 text-gray-700 font-medium rounded-xl border border-gray-200 hover:border-orange-300 hover:text-orange-500 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full text-center py-2.5 text-white font-semibold rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-md shadow-orange-500/25 hover:from-orange-600 hover:to-orange-700 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
