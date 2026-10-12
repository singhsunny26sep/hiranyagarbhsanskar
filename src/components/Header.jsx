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

const mobileItems = [
  ...navItems,
  { path: '/profile', label: 'Profile', icon: '👤' },
  { path: '/download', label: 'Download App', icon: '📱' },
];

const tickerMessages = [
  '✨ Experience the Magic of Garbhsanskar',
  '🌸 Free Consultation with Experts',
  '🧘 Holistic Prenatal & Wellness Care',
  '📅 Book Your Appointment Today',
  '💛 Trusted by Thousands of Families',
  '🏆 MSME Recognized Startup',
];

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

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50">
      {/* ── Announcement ticker ── */}
      <div
        className={`overflow-hidden bg-gradient-to-r from-purple-800 via-fuchsia-600 to-pink-600 transition-all duration-500 ease-in-out ${
          isScrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
        }`}
      >
        <div className="relative flex h-9 items-center overflow-hidden">
          <div className="flex w-max animate-marquee">
            {[...tickerMessages, ...tickerMessages].map((msg, i) => (
              <span
                key={i}
                className="mx-7 flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wide text-white/95 whitespace-nowrap"
              >
                {msg}
                <span className="text-amber-300">✦</span>
              </span>
            ))}
          </div>
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-purple-800 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-pink-600 to-transparent" />
        </div>
      </div>

      {/* ── Main header bar ── */}
      <div
        className={`relative overflow-hidden border-b border-purple-100/70 bg-white/85 backdrop-blur-xl transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 shadow-[0_10px_35px_-8px_rgba(147,51,234,0.3)]'
            : 'shadow-[0_2px_12px_-2px_rgba(147,51,234,0.12)]'
        }`}
      >
        {/* Decorative floating orbs */}
        <div className="pointer-events-none absolute -top-20 -left-16 h-44 w-44 rounded-full bg-gradient-to-br from-purple-300/40 to-fuchsia-300/30 blur-2xl animate-float" />
        <div className="pointer-events-none absolute -top-14 right-8 h-36 w-36 rounded-full bg-gradient-to-br from-amber-200/60 to-pink-200/40 blur-2xl animate-float-delayed" />

        {/* Animated gradient bottom border */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-purple-500 via-fuchsia-500 to-amber-400 bg-[length:200%_100%] animate-gradient-x opacity-80" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 sm:py-4">
            {/* ── Logo + Brand ── */}
            <Link to="/" className="group flex shrink-0 items-center gap-3">
              <div className="relative">
                {/* Gradient ring */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-amber-400 opacity-90 transition-all duration-500 group-hover:opacity-100 group-hover:blur-[6px]" />
                {/* Rotating dashed ring */}
                <div className="absolute -inset-2.5 rounded-[1.1rem] border-2 border-dashed border-purple-300/60 animate-spin-slow" />
                <div className="relative rounded-2xl bg-white p-1 shadow-md">
                  <img
                    src={logo}
                    alt="Hiranyagarbh Sanskar Logo"
                    className="h-11 w-11 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 sm:h-12 sm:w-12"
                  />
                </div>
              </div>
              <div className="hidden leading-tight sm:block">
                <h1 className="flex items-center gap-1.5 text-xl font-extrabold tracking-tight sm:text-2xl">
                  <span className="bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                    Hiranyagarbh
                  </span>
                  <span className="animate-twinkle text-sm text-amber-400">✦</span>
                </h1>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-500 sm:text-xs">
                  Garbhsanskar
                </p>
              </div>
            </Link>

            {/* ── Desktop Navigation ── */}
            <nav className="hidden items-center space-x-1 lg:flex">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group relative flex items-center gap-1.5 overflow-hidden rounded-full px-3.5 py-2 text-sm font-semibold transition-all duration-300 ${
                      active
                        ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                        : 'text-gray-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700'
                    }`}
                  >
                    <span
                      className={`text-sm transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6 ${
                        active ? '' : 'grayscale-[35%] group-hover:grayscale-0'
                      }`}
                    >
                      {item.icon}
                    </span>
                    {item.label}
                    {/* Animated underline */}
                    <span
                      className={`absolute bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${
                        active ? 'w-6 opacity-0' : 'w-0 opacity-0 group-hover:w-6 group-hover:opacity-100'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* ── Auth + CTA Buttons ── */}
            <div className="hidden items-center space-x-3 lg:flex">
              <Link
                to="/login"
                className="rounded-full border-2 border-purple-300 px-4 py-2 text-sm font-bold text-purple-700 transition-all duration-300 hover:border-purple-500 hover:bg-purple-50 hover:shadow-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-500/40"
              >
                <span className="animate-shine-sweep absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <span className="relative z-10">Sign up</span>
              </Link>
              <Link
                to="/appointment"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-amber-500/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/50"
              >
                <span className="animate-pulse-ring absolute inset-0 rounded-full" />
                <span className="animate-shine-sweep absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className="transition-transform duration-300 group-hover:rotate-12">📅</span>
                  Book Now
                </span>
              </Link>
            </div>

            {/* ── Mobile Menu Button ── */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 p-2.5 shadow-md shadow-purple-500/30 transition-all duration-300 hover:shadow-lg lg:hidden"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* ── Mobile Navigation Menu ── */}
          {isMenuOpen && (
            <div className="animate-slide-down rounded-b-2xl border-t border-purple-100 bg-gradient-to-b from-purple-50/95 to-white py-4 shadow-xl lg:hidden">
              <nav className="flex flex-col space-y-1.5 px-3">
                {mobileItems.map((item, idx) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      style={{ animationDelay: `${idx * 45}ms` }}
                      className={`animate-fade-up flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold transition-all duration-300 ${
                        active
                          ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white shadow-md shadow-purple-500/30'
                          : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      {item.label}
                      {active && (
                        <span className="ml-auto h-2 w-2 animate-pulse rounded-full bg-white" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile CTAs */}
              <div className="mt-4 space-y-2.5 px-4">
                <Link
                  to="/register"
                  className="block rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 py-3 text-center text-sm font-bold text-white shadow-md shadow-purple-500/30 transition-all duration-300 hover:shadow-lg"
                >
                  ✨ Sign up Free
                </Link>
                <Link
                  to="/appointment"
                  className="block rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 py-3 text-center text-sm font-bold text-white shadow-md shadow-amber-500/30 transition-all duration-300 hover:shadow-lg"
                >
                  📅 Book Appointment Now
                </Link>
              </div>

              {/* Quick Actions */}
              <div className="mt-4 border-t border-purple-100 pt-4">
                <div className="flex justify-center gap-3 px-4">
                  <a
                    href="tel:+919999999999"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg"
                  >
                    📞 Call Now
                  </a>
                  <a
                    href="mailto:info@hiranyagarbh.com"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg"
                  >
                    ✉️ Email Us
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
