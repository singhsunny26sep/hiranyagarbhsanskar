import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from "../img/LOGO.png";
import { isAuthenticated, getUserData, logout } from "../utils/auth";

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
  { path: '/my-subscriptions', label: 'My Subscriptions', icon: '💳' },
  { path: '/download', label: 'Download App', icon: '📱' },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const user = getUserData();
  const userName = user.name || user.firstName || '';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/', { replace: true });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-50 border-b border-purple-100 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-md shadow-purple-100/40'
        : 'bg-white/80 backdrop-blur-sm'
    }`}>
      {/* Subtle gradient line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img
              src={logo}
              alt="Hiranyagarbh Sanskar Logo"
              className="h-10 sm:h-11 lg:h-12 w-10 sm:w-11 lg:w-12 object-contain"
            />
            <span className="hidden sm:block text-lg sm:text-xl font-bold whitespace-nowrap bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
              Hiranyagarbh Sanskar
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'text-white bg-gradient-to-r from-purple-600 to-pink-500 shadow-sm'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <span className="text-xs">{item.icon}</span>
                {item.label}
              </Link>
            ))}

            {/* Auth / User Menu */}
            <div className="flex items-center ml-3 pl-3 border-l border-purple-100">
              {authenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-purple-50 transition-colors duration-200"
                    aria-label="Account menu"
                  >
                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                      {userName.trim().charAt(0).toUpperCase() || 'U'}
                    </span>
                    <span className="text-sm font-semibold text-gray-700 max-w-[110px] truncate">
                      {userName.trim() || 'My Account'}
                    </span>
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-purple-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-purple-100">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {userName.trim() || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email || user.mobile || ''}
                        </p>
                      </div>
                       <Link
                         to="/profile"
                         className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 transition-colors duration-200"
                       >
                         👤 My Profile
                       </Link>
                       <Link
                         to="/my-subscriptions"
                         className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 transition-colors duration-200"
                       >
                         💳 My Subscriptions
                       </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        🚪 Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-full text-sm font-medium text-purple-600 hover:bg-purple-50 transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-xl text-purple-600 hover:bg-purple-50 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            <nav className="flex flex-col space-y-1 bg-white rounded-2xl p-3 shadow-lg border border-purple-100">
              {mobileNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-white bg-gradient-to-r from-purple-600 to-pink-500'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              ))}

              {/* Quick Actions */}
              <div className="mt-3 pt-3 border-t border-purple-100 flex gap-2.5">
                <a href="tel:+919999999999" className="flex-1 text-center py-2.5 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors duration-200">
                  📞 Call Now
                </a>
                <a href="mailto:info@hiranyagarbh.com" className="flex-1 text-center py-2.5 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-600 transition-colors duration-200">
                  ✉️ Email Us
                </a>
              </div>

              {/* Auth / Logout for mobile */}
              {authenticated ? (
                <button
                  onClick={handleLogout}
                  className="mt-2 w-full py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors duration-200"
                >
                  🚪 Logout
                </button>
              ) : (
                <div className="mt-2 flex gap-2.5">
                  <Link
                    to="/login"
                    className="flex-1 text-center py-2.5 border-2 border-purple-300 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex-1 text-center py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:opacity-90 transition-colors duration-200"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
