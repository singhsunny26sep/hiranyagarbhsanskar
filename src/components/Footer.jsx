import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [supportFormData, setSupportFormData] = useState({
    name: '',
    email: '',
    phone: '',
    urgency: '',
    issue: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Close modal and reset form
    setIsModalOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    alert('Thank you for your message! We will get back to you soon.');
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    // Handle 24/7 support form submission here
    console.log('24/7 Support submitted:', supportFormData);
    // Close modal and reset form
    setIsSupportModalOpen(false);
    setSupportFormData({
      name: '',
      email: '',
      phone: '',
      urgency: '',
      issue: ''
    });
    alert('Your 24/7 support request has been submitted! Our emergency team will contact you within 15 minutes.');
  };

  const handleSupportInputChange = (e) => {
    const { name, value } = e.target;
    setSupportFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <footer className="bg-gradient-to-r from-purple-600 to-pink-600 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Hiranyagarbh </h3>
            <p className="text-purple-100 mb-4">
              Your trusted companion for a healthy and mindful pregnancy journey.
              We provide comprehensive care, nutrition guidance, and wellness support
              for expectant mothers.
            </p>
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Contact Information</h4>
              <p className="text-purple-100 text-sm mb-2">
                <strong>Address:</strong><br />
                Bapji Jeevandeep Multispeciality Hospital<br />
                Chalisgaon-424101
              </p>
              <p className="text-purple-100 text-sm">
                <strong>Email:</strong> hiranyagarbhagarbhasanskar@gmail.com
              </p>
            </div>
            <div className="flex space-x-4">
              {/* Instagram */}
              <a href="https://www.instagram.com/hiranyagarbha_garbhasanskar123/" target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-white transition duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.253 14.894 3.762 13.743 3.762 12.446s.49-2.448 1.364-3.323c.875-.875 2.026-1.365 3.323-1.365s2.448.49 3.323 1.365c.875.875 1.365 2.026 1.365 3.323s-.49 2.448-1.365 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718 0c-.99 0-1.805-.322-2.475-.962-.67-.64-1.007-1.475-1.007-2.465s.337-1.825.995-2.465c.67-.64 1.485-.962 2.487-.962s1.805.322 2.475.962c.67.64 1.007 1.475 1.007 2.465s-.337 1.825-.995 2.465c-.67.64-1.485.962-2.487.962z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/profile.php?id=61577324100615" target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-white transition duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/hiranyagarbh-garbhsanskar-051647377/" target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-white transition duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com/channel/UCoRPQ5NXLHPt3w7KbCxyEJA" target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-white transition duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-purple-200 hover:text-white transition duration-300">Dashboard</Link></li>
              <li><Link to="/prenatal" className="text-purple-200 hover:text-white transition duration-300">Prenatal Care</Link></li>
              <li><Link to="/nutrition" className="text-purple-200 hover:text-white transition duration-300">Nutrition</Link></li>
              <li><Link to="/wellness" className="text-purple-200 hover:text-white transition duration-300">Wellness</Link></li>
              <li><Link to="/profile" className="text-purple-200 hover:text-white transition duration-300">Profile</Link></li>
              <li><Link to="/privacy-policy" className="text-purple-200 hover:text-white transition duration-300">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-purple-200">Health Monitoring</li>
              <li className="text-purple-200">Nutrition Planning</li>
              <li className="text-purple-200">Wellness Programs</li>
              <li className="text-purple-200">Educational Resources</li>
              <button
                onClick={() => setIsSupportModalOpen(true)}
                className="text-purple-200 hover:text-white transition duration-300 text-left cursor-pointer"
              >
                24/7 Support
              </button>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-500 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-purple-200">&copy; 2024 Hiranyagarbh Sanskar. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-purple-200 hover:text-white transition duration-300 text-sm">Privacy Policy</Link>
            <a href="#" className="text-purple-200 hover:text-white transition duration-300 text-sm">Terms of Service</a>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-purple-200 hover:text-white transition duration-300 text-sm cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="appointment">Book Appointment</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 24/7 Support Modal */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">24/7 Emergency Support</h2>
                  <p className="text-red-600 text-sm font-medium mt-1">Available 24 hours a day, 7 days a week</p>
                </div>
                <button
                  onClick={() => setIsSupportModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="font-semibold text-red-800">Emergency Hotline</span>
                </div>
                <p className="text-red-700 text-sm">For life-threatening emergencies, call 108 immediately</p>
              </div>

              <form onSubmit={handleSupportSubmit} className="space-y-4">
                <div>
                  <label htmlFor="support-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="support-name"
                    name="name"
                    value={supportFormData.name}
                    onChange={handleSupportInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="support-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="support-email"
                    name="email"
                    value={supportFormData.email}
                    onChange={handleSupportInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="support-phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="support-phone"
                    name="phone"
                    value={supportFormData.phone}
                    onChange={handleSupportInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1">
                    Urgency Level *
                  </label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={supportFormData.urgency}
                    onChange={handleSupportInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300"
                  >
                    <option value="">Select urgency level</option>
                    <option value="emergency">🚨 Emergency - Immediate response needed</option>
                    <option value="urgent">⚠️ Urgent - Response within 1 hour</option>
                    <option value="high">🔴 High - Response within 4 hours</option>
                    <option value="medium">🟡 Medium - Response within 24 hours</option>
                    <option value="low">🟢 Low - General inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="support-issue" className="block text-sm font-medium text-gray-700 mb-1">
                    Describe Your Issue *
                  </label>
                  <textarea
                    id="support-issue"
                    name="issue"
                    value={supportFormData.issue}
                    onChange={handleSupportInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300 resize-none"
                    placeholder="Please describe your medical concern or emergency in detail..."
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold text-blue-800">Response Time</span>
                  </div>
                
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsSupportModalOpen(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
                  >
                    Submit Emergency Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;