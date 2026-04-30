import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../img/LOGO.png";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`${isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white/90 backdrop-blur-sm'} sticky top-0 z-50 transition-all duration-300 border-b border-purple-100`}>
      {/* Decorative gradient bar */}
      <div className="h-1 w-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 sm:py-5">
          <div className="flex items-center group">
            <div className="relative">
              <img 
                src={logo} 
                alt="Hiranyagarbh Sanskar Logo" 
                className="h-16 sm:h-20 lg:h-24 w-20 sm:w-24 lg:w-28 mr-2 sm:mr-3 object-contain transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md" 
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-purple-400 opacity-0 group-hover:opacity-20 rounded-full blur-xl transition-opacity duration-300"></div>
            </div>
            {/* <div className="ml-2 sm:ml-4 flex flex-wrap gap-1.5 sm:gap-2">
              <span className="bg-gradient-to-r from-green-400 to-green-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold shadow-sm hover:shadow-md transition-shadow cursor-pointer animate-pulse">Live</span>
              <span className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold shadow-sm hover:shadow-md transition-shadow cursor-pointer">Prenatal</span>
              <span className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold shadow-sm hover:shadow-md transition-shadow cursor-pointer">Wellness</span>
            </div> */}
          </div>

           {/* Desktop Navigation */}
           <nav className="hidden lg:flex items-center space-x-1">
             {[
               { path: '/', label: 'Dashboard', icon: '🏠' },
               { path: '/prenatal', label: 'Prenatal', icon: '👶' },
               { path: '/nutrition', label: 'Nutrition', icon: '🥗' },
               { path: '/wellness', label: 'Wellness', icon: '🧘' },
               { path: '/product', label: 'Products', icon: '🛍️' },
               { path: '/gallery', label: 'Gallery', icon: '📸' },
               { path: '/video-lectures', label: 'Videos', icon: '🎬' },
               { path: '/contact', label: 'Contact', icon: '📞' },
             ].map((item) => (
               <Link
                 key={item.path}
                 to={item.path}
                 className={`relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 group overflow-hidden ${
                   isActive(item.path) 
                     ? 'text-purple-700 bg-purple-100 shadow-sm' 
                     : 'text-gray-600 hover:text-purple-600'
                 }`}
               >
                 <span className="relative z-10 flex items-center gap-1">
                   <span className="text-xs">{item.icon}</span>
                   {item.label}
                 </span>
                 {/* Hover background effect */}
                 <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                 {/* Active indicator */}
                 {isActive(item.path) && (
                   <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                 )}
               </Link>
             ))}
             
             {/* Auth Buttons */}
             <div className="flex items-center space-x-3">
               <Link
                 to="/login"
                 className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border border-purple-500 text-purple-600 hover:bg-purple-50"
               >
                 Login
               </Link>
               <Link
                 to="/register"
                 className="ml-3 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
               >
                 Sign up
               </Link>
             </div>
           </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2.5 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 transition-all duration-300 shadow-sm"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="md:hidden border-t border-purple-100 py-4 bg-gradient-to-b from-purple-50 to-white rounded-b-2xl shadow-lg">
            <nav className="flex flex-col space-y-2">
              {[
                { path: '/', label: 'Dashboard', icon: '🏠' },
                { path: '/prenatal', label: 'Prenatal', icon: '👶' },
                { path: '/nutrition', label: 'Nutrition', icon: '🥗' },
                { path: '/wellness', label: 'Wellness', icon: '🧘' },
                { path: '/product', label: 'Products', icon: '🛍️' },
                { path: '/gallery', label: 'Gallery', icon: '📸' },
                { path: '/video-lectures', label: 'Video Lectures', icon: '🎬' },
                { path: '/contact', label: 'Contact', icon: '📞' },
                { path: '/profile', label: 'Profile', icon: '👤' },
                { path: '/download', label: 'Download App', icon: '📱' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    isActive(item.path) 
                      ? 'text-purple-700 bg-gradient-to-r from-purple-100 to-pink-100 shadow-sm' 
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                  {isActive(item.path) && (
                    <span className="ml-auto w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                  )}
                </Link>
              ))}
            </nav>
            
            {/* Quick Actions */}
            <div className="mt-4 pt-4 border-t border-purple-100">
              <div className="flex justify-center gap-3">
                <a href="tel:+919999999999" className="flex-1 text-center py-2.5 bg-green-500 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300">
                  📞 Call Now
                </a>
                <a href="mailto:info@hiranyagarbh.com" className="flex-1 text-center py-2.5 bg-purple-500 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300">
                  ✉️ Email Us
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;