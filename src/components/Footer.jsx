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
              <a href="https://www.instagram.com/hiranya_garbha_garbhasanskar?stkn=OXJ5ZDM4aXNxaGFh" target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-white transition duration-300">
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
              <a href="https://www.youtube.com/@HiranyagarbhGarbhsanskar" target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-white transition duration-300">
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
                <li><Link to="/subscription" className="text-purple-200 hover:text-white transition duration-300">Subscription</Link></li>
                <li><Link to="/appointment" className="text-purple-200 hover:text-white transition duration-300">Appointment</Link></li>
                <li><Link to="/profile" className="text-purple-200 hover:text-white transition duration-300">Profile</Link></li>
                <li><Link to="/privacy-policy" className="text-purple-200 hover:text-white transition duration-300">Privacy Policy</Link></li>
                <li><Link to="/terms-and-conditions" className="text-purple-200 hover:text-white transition duration-300">Terms & Conditions</Link></li>
              </ul>
             <div className="mt-4">
               <h4 className="text-lg font-semibold mb-3">Download App</h4>
               <div className="flex flex-col gap-2">
                 <a
                   href="https://play.google.com/store/apps/details?id=com.hiranyagarbhsanskar&hl=en_IN"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition duration-300 text-sm font-medium shadow-md"
                 >
                   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M3,20.5V3.5C3,2.91667 3.45833,2.5 4,2.5H17.59C18.1333,2.5 18.6167,2.71 19,3.1C19.3833,3.49 19.6167,3.99167 19.7,4.575L19,4.5L15.5,8L19,11.425C19.6167,11.9917 19.925,12.725 19.925,13.55C19.925,14.375 19.6167,15.1167 19.0333,15.6833C18.45,16.25 17.7667,16.4833 17.2233,16.4833H17.225L19,20.5L4,20.5C3.45833,20.5 3,20.0833 3,19.5V20.5Z" />
                   </svg>
                   Google Play
                 </a>
                 <a
                   href="https://apps.apple.com/app/id6477528990"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition duration-300 text-sm font-medium shadow-md"
                 >
                   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M17.5682 12.0129C17.5871 9.2114 19.8887 7.96445 19.9873 7.90421C17.8759 5.95215 15.8555 5.74191 15.1285 5.72262C13.3203 5.56475 11.5315 6.78148 10.7578 6.78148C9.97148 6.78148 8.50586 5.867 7.16309 5.867C5.12586 5.867 3.47657 6.6985 2.64502 8.07315C1.27539 10.4332 2.22559 14.1768 4.3545 16.0361C5.09766 16.7828 6.24024 18.1415 7.44727 18.1415C8.65429 18.1415 9.35645 17.4687 10.7871 17.4687C12.252 17.4687 12.8291 18.1415 14.1416 18.1415C15.4014 18.1415 16.3281 17.1172 16.9951 16.3696C17.7871 15.4878 18.2109 14.4635 18.2666 14.4123C18.2666 14.4123 17.5682 13.7885 17.5871 12.0129M15.0234 3.76379C16.3359 2.16827 16.2217 1.06055 16.1621 0.619141C15.2002 -0.203125 13.9092 0.494141 12.5146 1.15747C11.3818 1.72914 9.94141 2.35735 8.60352 2.35735C7.26563 2.35735 5.97534 1.72914 4.98975 1.15747C3.59473 0.494141 2.1709 0 1.209 0C1.14941 0.446899 1.02051 1.55461 2.33398 3.23645C3.36035 4.46357 4.51172 5.72351 5.90723 5.72351C7.24707 5.72351 9.47461 4.88245 10.6074 3.76038C11.9824 2.4225 12.9179 2.41699 12.9179 2.41699C12.9179 2.41699 11.6016 2.83827 12.9668 4.10004C14.4482 5.46008 16.1592 6.39832 17.4229 6.83697C18.897 7.37652 19.9395 7.62344 19.999 7.62344C19.999 7.62344 15.0234 3.76379 12.9746 2.35735L15.0234 3.76379Z" />
                   </svg>
                   App Store
</a>
                </div>
              </div>
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
            <Link to="/terms-and-conditions" className="text-purple-200 hover:text-white transition duration-300 text-sm">Terms of Service</Link>
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