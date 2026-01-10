import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function DataDeletion() {
  const [formData, setFormData] = useState({
    email: '',
    reason: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Data deletion request:', formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Data Deletion Request
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Request deletion of your personal data from our systems. We will process your request within 30 days.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About Data Deletion</h2>
            <p className="text-gray-600 mb-4">
              In accordance with privacy regulations and our commitment to user data protection, you have the right to request deletion of your personal information from our systems. This includes:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Account information and profile data</li>
              <li>Health and pregnancy-related information</li>
              <li>Usage history and preferences</li>
              <li>Any other personal data collected through our app</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Important Notes</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Please note:</strong> Data deletion is permanent and cannot be undone. Some data may be retained for legal compliance purposes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {!submitted ? (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Submit Deletion Request</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Deletion
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="">Select a reason (optional)</option>
                    <option value="no-longer-using">No longer using the service</option>
                    <option value="privacy-concerns">Privacy concerns</option>
                    <option value="account-closure">Closing account</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Any additional information or specific data you'd like deleted"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition duration-200"
                >
                  Submit Deletion Request
                </button>
              </form>
            </section>
          ) : (
            <section className="text-center">
              <div className="bg-green-50 border border-green-200 rounded-md p-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Request Submitted Successfully
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>
                        Your data deletion request has been submitted. We will process your request within 30 days and send a confirmation to the email address provided.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about the data deletion process or need assistance, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700"><strong>Email:</strong> privacy@hiranyagarbhsanskar.com</p>
              <p className="text-gray-700"><strong>Phone:</strong> +91 8149343628</p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DataDeletion;