import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home', isAnchor: true },
    { label: 'How It Works', href: '#how-it-works', isAnchor: true },
    { label: 'Restaurant Partner', href: 'https://my-ezz-restaurants.vercel.app/', external: true },
  ];

  const handleAnchorClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Logo - larger */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img 
              src="/Myezz final logo.svg" 
              alt="MyEzz" 
              className="h-8 md:h-10 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative text-gray-600 hover:text-orange-500 font-medium text-sm transition-colors group"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full" />
                </a>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="relative text-gray-600 hover:text-orange-500 font-medium text-sm transition-colors group"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full" />
                </a>
              )
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="px-5 py-2 text-orange-500 font-medium text-sm border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2.5 text-white font-semibold text-sm rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 shadow-md hover:shadow-xl hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
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
                  className="block py-2 text-gray-600 hover:text-orange-500 font-medium transition-colors border-b border-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="block py-2 text-gray-600 hover:text-orange-500 font-medium transition-colors border-b border-gray-100"
                  onClick={(e) => handleAnchorClick(e, link.href)}
                >
                  {link.label}
                </a>
              )
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <Link
                to="/login"
                className="block w-full text-center py-3 text-gray-700 font-medium rounded-xl border border-gray-200 hover:border-orange-400 hover:text-orange-500 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full text-center py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-md shadow-orange-500/25 transition-all"
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
