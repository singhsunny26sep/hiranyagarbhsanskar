import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../img/LOGO.png";

const navItems = [
  { path: '/', label: 'Dashboard', icon: '🏠' },
  { path: '/prenatal', label: 'Prenatal', icon: '👶' },
  { path: '/nutrition', label: 'Nutrition', icon: '🥗' },
  { path: '/wellness', label: 'Wellness', icon: '🧘' },
  { path: '/product', label: 'Products', icon: '🛍️' },
  { path: '/gallery', label: 'Gallery', icon: '📸' },
  { path: '/video-lectures', label: 'Videos', icon: '🎬' },
  { path: '/appointment', label: 'Appointment', icon: '📅' },
  { path: '/contact', label: 'Contact', icon: '📞' },
];

const mobileNavItems = [
  ...navItems,
  { path: '/profile', label: 'Profile', icon: '👤' },
  { path: '/download', label: 'Download App', icon: '📱' },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-purple-100/50 border-purple-200/50'
            : 'bg-white/80 backdrop-blur-md border-purple-100'
        }`}
      >
        {/* Animated gradient top line */}
        <div className="h-[3px] w-full bg-gradient-to-r from-purple-500 via-pink-400 to-purple-500 bg-[length:200%_100%] animate-gradient" />

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2.5 md:py-3">
            {/* Brand */}
            <Link
              to="/"
              className="flex items-center mr-10 gap-2 sm:gap-2.5 shrink-0 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                <img
                  src={logo}
                  alt="Hiranyagarbh Sanskar Logo"
                  className="relative h-9 w-9 sm:h-10 sm:w-10 lg:h-12 lg:w-12 object-contain rounded-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
             
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative flex items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-full text-xs xl:text-sm font-semibold transition-all duration-300 ${
                      active
                        ? 'text-white bg-gradient-to-r from-purple-600 to-pink-500 shadow-md shadow-purple-300/50 scale-105'
                        : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50 hover:scale-105'
                    }`}
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Auth Buttons */}
              <div className="flex items-center gap-2 ml-3 pl-3 border-l border-purple-100">
                <Link
                  to="/login"
                  className="px-3 xl:px-4 py-2 rounded-full text-xs xl:text-sm font-semibold text-purple-600 hover:bg-purple-50 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="group relative px-4 xl:px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs xl:text-sm font-bold rounded-full shadow-md shadow-purple-300/50 hover:shadow-lg hover:shadow-purple-400/60 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10">Sign up</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden relative p-2 rounded-xl text-purple-600 hover:bg-purple-50 active:scale-95 transition-all duration-200"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu — slide down animation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? 'max-h-[85vh] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-3 pb-4">
            <nav className="flex flex-col gap-1 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-purple-100 max-h-[70vh] overflow-y-auto">
              {mobileNavItems.map((item, idx) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      active
                        ? 'text-white bg-gradient-to-r from-purple-600 to-pink-500 shadow-md shadow-purple-200'
                        : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      animation: isMenuOpen
                        ? `fadeSlideIn 0.3s ease-out ${idx * 0.03}s both`
                        : 'none',
                    }}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Quick Actions */}
              <div className="mt-3 pt-3 border-t border-purple-100 grid grid-cols-2 gap-2.5">
                <a
                  href="tel:+919999999999"
                  className="text-center py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl text-sm font-bold hover:from-green-600 hover:to-emerald-600 shadow-md shadow-green-200 active:scale-95 transition-all duration-200"
                >
                  📞 Call Now
                </a>
                <a
                  href="mailto:info@hiranyagarbh.com"
                  className="text-center py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-bold hover:from-purple-600 hover:to-pink-600 shadow-md shadow-purple-200 active:scale-95 transition-all duration-200"
                >
                  ✉️ Email Us
                </a>
              </div>

              {/* Mobile Auth Buttons */}
              <div className="mt-3 pt-3 border-t border-purple-100 grid grid-cols-2 gap-2.5">
                <Link
                  to="/login"
                  className="text-center py-2.5 bg-purple-50 text-purple-700 rounded-xl text-sm font-bold hover:bg-purple-100 active:scale-95 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-center py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl text-sm font-bold hover:shadow-lg active:scale-95 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fadeIn"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Add keyframes via inline style tag */}
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 4s ease infinite;
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

export default Header;