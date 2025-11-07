import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../img/LOGO.png";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 sm:py-6">
          <div className="flex items-center">
            <img src={logo} alt="Hiranyagarbh Sanskar Logo" className="h-16 sm:h-20 lg:h-24 w-20 sm:w-24 lg:w-28 mr-2 sm:mr-3" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            <Link to="/" className={`${isActive('/') ? 'text-purple-600 bg-purple-50 px-3 py-2 rounded-lg' : 'text-gray-700'} hover:text-purple-600 transition duration-300 font-medium`}>Dashboard</Link>
            <Link to="/prenatal" className={`${isActive('/prenatal') ? 'text-purple-600 bg-purple-50 px-3 py-2 rounded-lg' : 'text-gray-700'} hover:text-purple-600 transition duration-300 font-medium`}>Prenatal</Link>
            <Link to="/nutrition" className={`${isActive('/nutrition') ? 'text-purple-600 bg-purple-50 px-3 py-2 rounded-lg' : 'text-gray-700'} hover:text-purple-600 transition duration-300 font-medium`}>Nutrition</Link>
            <Link to="/wellness" className={`${isActive('/wellness') ? 'text-purple-600 bg-purple-50 px-3 py-2 rounded-lg' : 'text-gray-700'} hover:text-purple-600 transition duration-300 font-medium`}>Wellness</Link>
            <Link to="/product" className={`${isActive('/product') ? 'text-purple-600 bg-purple-50 px-3 py-2 rounded-lg' : 'text-gray-700'} hover:text-purple-600 transition duration-300 font-medium`}>Products</Link>
            <Link to="/contact" className={`${isActive('/contact') ? 'text-purple-600 bg-purple-50 px-3 py-2 rounded-lg' : 'text-gray-700'} hover:text-purple-600 transition duration-300 font-medium`}>Contact</Link>
            <Link to="/profile" className={`${isActive('/profile') ? 'text-purple-600 bg-purple-50 px-3 py-2 rounded-lg' : 'text-gray-700'} hover:text-purple-600 transition duration-300 font-medium`}>Profile</Link>
            <Link to="/gallery" className={`${isActive('/gallery') ? 'text-purple-600 bg-purple-50 px-3 py-2 rounded-lg' : 'text-gray-700'} hover:text-purple-600 transition duration-300 font-medium`}>Gallery</Link>
            <Link to="/download" className={`${isActive('/download') ? 'text-purple-600 bg-purple-50 px-3 py-2 rounded-lg' : 'text-gray-700'} hover:text-purple-600 transition duration-300 font-medium`}>Download App</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition duration-300"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`${isActive('/') ? 'text-purple-600 bg-purple-50' : 'text-gray-700'} hover:text-purple-600 transition duration-300 font-medium px-2 py-1 rounded hover:bg-purple-50`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/prenatal"
                className={`${isActive('/prenatal') ? 'text-purple-600 bg-purple-50' : 'text-gray-700'} hover:text-purple-600 transition duration-300 font-medium px-2 py-1 rounded hover:bg-purple-50`}
                onClick={() => setIsMenuOpen(false)}
              >
                Prenatal
              </Link>
              <Link
                to="/nutrition"
                className={`${isActive('/nutrition') ? 'text-purple-600 bg-purple-50' : 'text-gray-700'} hover:text-purple-600 transition duration-300 font-medium px-2 py-1 rounded hover:bg-purple-50`}
                onClick={() => setIsMenuOpen(false)}
              >
                Nutrition
              </Link>
              <Link
                to="/wellness"
                className={`${isActive('/wellness') ? 'text-purple-600 bg-purple-50' : 'text-gray-700'} hover:text-purple-600 transition duration-300 font-medium px-2 py-1 rounded hover:bg-purple-50`}
                onClick={() => setIsMenuOpen(false)}
              >
                Wellness
              </Link>
              <Link
                to="/product"
                className={`${isActive('/product') ? 'text-purple-600 bg-purple-50' : 'text-gray-700'} hover:text-purple-600 transition duration-300 font-medium px-2 py-1 rounded hover:bg-purple-50`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/contact"
                className={`${isActive('/contact') ? 'text-purple-600 bg-purple-50' : 'text-gray-700'} hover:text-purple-600 transition duration-300 font-medium px-2 py-1 rounded hover:bg-purple-50`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/profile"
                className={`${isActive('/profile') ? 'text-purple-600 bg-purple-50' : 'text-gray-700'} hover:text-purple-600 transition duration-300 font-medium px-2 py-1 rounded hover:bg-purple-50`}
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/gallery"
                className={`${isActive('/gallery') ? 'text-purple-600 bg-purple-50' : 'text-gray-700'} hover:text-purple-600 transition duration-300 font-medium px-2 py-1 rounded hover:bg-purple-50`}
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                to="/download"
                className={`${isActive('/download') ? 'text-purple-600 bg-purple-50' : 'text-gray-700'} hover:text-purple-600 transition duration-300 font-medium px-2 py-1 rounded hover:bg-purple-50`}
                onClick={() => setIsMenuOpen(false)}
              >
                Download App
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;