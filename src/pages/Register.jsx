import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    role: 'user',
    fcmToken: '',
    isPermissionGiven: true
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    // Email or Mobile validation (at least one required)
    if (!formData.email.trim() && !formData.mobile.trim()) {
      errors.email = 'Email or mobile number is required';
      errors.mobile = 'Email or mobile number is required';
    } else {
      // Validate email if provided
      if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email address is invalid';
      }
      
      // Validate mobile if provided
      if (formData.mobile.trim() && !/^\d{10}$/.test(formData.mobile.replace(/\s/g, ''))) {
        errors.mobile = 'Please enter a valid 10-digit mobile number';
      }
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
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
          email: formData.email.trim() || undefined,
          mobile: formData.mobile.trim() ? parseInt(formData.mobile.replace(/\s/g, '')) : undefined,
          password: formData.password,
          role: formData.role || 'user',
          fcmToken: formData.fcmToken.trim() || undefined,
          isPermissionGiven: formData.isPermissionGiven
        };
        
        // Remove undefined values
        Object.keys(apiData).forEach(key => apiData[key] === undefined && delete apiData[key]);
        
        console.log('Registration attempt:', apiData);
        
        // Send request to API
        const response = await fetch('https://hiranyagarbha.onrender.com/hiranyagarbha/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(apiData)
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
          // Reset form on successful submission
          setFormData({
            name: '',
            email: '',
            mobile: '',
            password: '',
            role: 'user',
            fcmToken: '',
            isPermissionGiven: true
          });
          alert('Registration successful! Please check your email to verify your account.');
          // Redirect to login page
          window.location.href = '/login';
        } else {
          throw new Error(result.message || 'Registration failed');
        }
      } catch (err) {
        console.error('Registration error:', err);
        alert(err.message || 'Registration failed. Please try again.');
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

      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-600">Join Hiranyagarbh Sanskar community</p>
          </div>

           <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ${formErrors.name ? 'border-red-500' : ''}`}
                  placeholder="Enter your full name"
                />
                {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ${formErrors.email ? 'border-red-500' : ''}`}
                  placeholder="Enter your email (optional if mobile provided)"
                />
                {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ${formErrors.mobile ? 'border-red-500' : ''}`}
                  placeholder="Enter your 10-digit mobile number (optional if email provided)"
                />
                {formErrors.mobile && <p className="mt-1 text-sm text-red-600">{formErrors.mobile}</p>}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ${formErrors.password ? 'border-red-500' : ''}`}
                  placeholder="Create a password"
                />
                {formErrors.password && <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>}
              </div>
              
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
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
                 <label htmlFor="isPermissionGiven" className="text-sm text-gray-700">
                   I agree to receive notifications
                 </label>
               </div>
             </div>
             
             {Object.keys(formErrors).length > 0 && (
               <div className="p-4 mb-4 bg-red-50 border-l-4 border-red-500 text-sm text-red-700" role="alert">
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
               className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
             >
               {loading ? 'Creating Account...' : 'Create Account'}
             </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-600 hover:text-purple-500 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Register;