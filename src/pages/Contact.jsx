import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    message: "",
    isPermissionGiven: true,
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }

    // Mobile validation
    if (!formData.mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10,15}$/.test(formData.mobile.replace(/\s/g, ""))) {
      errors.mobile = "Please enter a valid mobile number (10-15 digits)";
    }

    // City validation
    if (!formData.city.trim()) {
      errors.city = "City is required";
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      try {
        // Prepare data for API
        const apiData = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          mobile: formData.mobile.trim(), // Keeping as string as per API example
          city: formData.city.trim(),
          message: formData.message.trim(),
          isPermissionGiven: formData.isPermissionGiven,
        };

        console.log("Contact form submission:", apiData);

        // Send request to API
        const response = await fetch(
          "https://hiranyagarbha.onrender.com/hiranyagarbha/contact-us/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(apiData),
          },
        );

        const result = await response.json();

        if (response.ok && result.success) {
          // Reset form on successful submission
          setFormData({
            name: "",
            email: "",
            mobile: "",
            city: "",
            message: "",
            isPermissionGiven: true,
          });
          alert("Thank you for contacting us! We will get back to you soon.");
        } else {
          throw new Error(result.message || "Failed to submit contact form");
        }
      } catch (err) {
        console.error("Contact form error:", err);
        alert(
          err.message || "Failed to submit contact form. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our prenatal care services? We're here to help.
            Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 ${formErrors.name ? "border-red-500" : ""}`}
                  placeholder="Enter your full name"
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 ${formErrors.email ? "border-red-500" : ""}`}
                  placeholder="Enter your email address"
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 ${formErrors.mobile ? "border-red-500" : ""}`}
                  placeholder="Enter your mobile number"
                />
                {formErrors.mobile && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.mobile}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 ${formErrors.city ? "border-red-500" : ""}`}
                  placeholder="Enter your city"
                />
                {formErrors.city && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 resize-none ${formErrors.message ? "border-red-500" : ""}`}
                  placeholder="Tell us how we can help you..."
                ></textarea>
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.message}
                  </p>
                )}
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="isPermissionGiven"
                    name="isPermissionGiven"
                    type="checkbox"
                    checked={formData.isPermissionGiven}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 mt-0.5">
                  <label
                    htmlFor="isPermissionGiven"
                    className="text-sm text-gray-700"
                  >
                    I agree and authorise to call/ send SMS/ WhatsApp/ RCS/
                    Promotional/ Informational notifications. This will override
                    the registry with DNC/NDNC.
                  </label>
                  <span className="text-red-500">*</span>
                </div>
              </div>

              {Object.keys(formErrors).length > 0 && (
                <div
                  className="p-4 mb-4 bg-red-50 border-l-4 border-red-500 text-sm text-red-700"
                  role="alert"
                >
                  <p>Please fix the following errors:</p>
                  <ul className="list-disc pl-5">
                    {Object.entries(formErrors).map(([field, message]) => (
                      <li key={field}>{message}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? "Sending Message..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone</h3>
            <p className="text-gray-600">+91 7972833428</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
            <p className="text-gray-600">contact@hiranyagarbhsanskar.co</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Location
            </h3>
            <p className="text-gray-600">
              Bapji Jeevandeep Multispeciality Hospital Chalisgaon-424101
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
