import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    coupon: ''
  });

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: '₹499',
      period: '/month',
      features: [
        'Access to basic prenatal content',
        'Weekly wellness tips',
        'Community forum access',
        'Email support'
      ],
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: '₹999',
      period: '/month',
      features: [
        'All Basic features',
        'Personalized nutrition plans',
        'One-on-one consultation (2 sessions/month)',
        'Video lectures access',
        'Priority support',
        'Downloadable resources'
      ],
      popular: true
    },
    {
      id: 'elite',
      name: 'Elite Plan',
      price: '₹1999',
      period: '/month',
      features: [
        'All Premium features',
        'Unlimited consultation sessions',
        'Personal health tracking',
        'Family member access (2 members)',
        '24/7 emergency support',
        'Exclusive workshops',
        'Offline content access'
      ],
      popular: false
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscription:', { plan: selectedPlan, ...formData });
    alert(`Thank you for subscribing to ${plans.find(p => p.id === selectedPlan)?.name}! We will contact you shortly.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Choose Your Subscription Plan
          </h1>
          <p className="text-lg sm:text-xl text-purple-100 max-w-2xl mx-auto">
            Unlock personalized pregnancy care with our premium subscription plans.
            Choose the plan that best fits your needs and journey.
          </p>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl shadow-xl p-8 relative transition duration-300 transform hover:-translate-y-2 ${
                plan.popular ? 'border-2 border-purple-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-purple-600">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedPlan(plan.id)}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition duration-300 ${
                  selectedPlan === plan.id
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                }`}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>

        {/* Subscription Form */}
        <div className="max-w-2xl mx-auto mt-12 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Complete Your Subscription
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                placeholder="Enter your 10-digit mobile number"
              />
            </div>

            <div>
              <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                Coupon Code (Optional)
              </label>
              <input
                type="text"
                id="coupon"
                name="coupon"
                value={formData.coupon}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                placeholder="Enter coupon code for discount"
              />
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Selected Plan:</span>
                <span className="font-semibold text-purple-600">
                  {plans.find(p => p.id === selectedPlan)?.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total Amount:</span>
                <span className="text-2xl font-bold text-purple-600">
                  {plans.find(p => p.id === selectedPlan)?.price}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Proceed to Payment
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

export default Subscription;