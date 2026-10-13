import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import {
  API_URL,
  RAZORPAY_KEY_ID,
  TRIMETHER_OPTIONS,
  getAuthHeaders,
} from '../config/api';
import { loadRazorpayScript, extractRazorpayResponse } from '../utils/razorpay';

function Subscription() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [packagesError, setPackagesError] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [trimester, setTrimester] = useState('second');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    coupon: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getTrimesterPlan = (pkg) => {
    if (!Array.isArray(pkg.plans) || pkg.plans.length === 0) return null;
    const exact = pkg.plans.find((p) => p.trimester === trimester);
    if (exact) return exact;
    return (
      pkg.plans.find((p) => p.trimester === 'all') || pkg.plans[0]
    );
  };

  const getDisplayPrice = (pkg) => {
    const plan = getTrimesterPlan(pkg);
    if (plan) return formatPrice(plan.price);
    if (pkg.price != null) return formatPrice(pkg.price);
    return '—';
  };

  const getDisplayDuration = (pkg) => {
    const plan = getTrimesterPlan(pkg);
    if (plan?.durationInDays) return `${plan.durationInDays} days`;
    if (pkg.durationInDays) return `${pkg.durationInDays} days`;
    if (pkg.duration) return pkg.duration;
    return '';
  };

  const getFeatureList = (pkg) => {
    if (Array.isArray(pkg.includes)) return pkg.includes;
    if (Array.isArray(pkg.modules)) return pkg.modules;
    if (Array.isArray(pkg.benefits)) return pkg.benefits;
    return [];
  };

  const getTierLabel = (tier) => {
    const t = (tier || '').toLowerCase();
    if (t.includes('elite')) return 'Elite';
    if (t === 'pro') return 'Pro';
    if (t === 'basic') return 'Basic';
    return tier || 'Package';
  };

  const getTierColor = (pkg) => {
    if (pkg.theme?.color) return pkg.theme.color;
    const t = (pkg.tier || '').toLowerCase();
    if (t.includes('elite')) return 'from-amber-500 to-orange-500';
    if (t === 'pro') return 'from-purple-500 to-purple-600';
    if (t === 'basic') return 'from-blue-500 to-blue-600';
    return 'from-green-500 to-blue-500';
  };

  const formatPrice = (price) => {
    if (price == null) return '—';
    if (price === 0) return 'Free';
    const num = Number(price);
    if (isNaN(num)) return price;
    return `₹${num.toLocaleString('en-IN')}`;
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(API_URL.getPackages, {
          method: 'GET',
          headers: getAuthHeaders(),
        });

        const result = await response.json().catch(() => ({
          success: false,
          message: 'Invalid response from server',
        }));

        if (response.ok && result.success) {
          const pagination = result.data;
          let items = [];
          if (Array.isArray(pagination?.data)) {
            items = pagination.data;
          } else if (Array.isArray(result.packages)) {
            items = result.packages;
          } else if (Array.isArray(result.data)) {
            items = result.data;
          }
          const active = items.filter(
            (p) => p.isActive !== false && p.isDeleted !== true
          );
          setPackages(active);
          if (active.length > 0 && !selectedPackage) {
            const defaultPkg =
              active.find((p) => p.isPopular) || active[0];
            setSelectedPackage(defaultPkg);
          }
        } else {
          if (response.status === 401) {
            setPackagesError(
              'Please log in to view subscription packages.'
            );
          } else {
            setPackagesError(
              result.message || 'Failed to fetch subscription packages'
            );
          }
        }
      } catch (err) {
        console.error('Error fetching packages:', err);
        setPackagesError(
          'Unable to fetch subscription packages. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const verifyPayment = async (response) => {
    setProcessing(true);
    setError('');

    console.log('Razorpay checkout response:', response);

    const verifyPayload = extractRazorpayResponse(response);

    if (
      !verifyPayload.razorpayOrderId ||
      !verifyPayload.razorpayPaymentId ||
      !verifyPayload.razorpaySignature
    ) {
      setProcessing(false);
      setError('Payment details missing. Please try again.');
      return;
    }

    try {
      const verifyResponse = await fetch(API_URL.verifyPayment, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(verifyPayload),
      });

      const verifyResult = await verifyResponse.json().catch(() => ({
        success: false,
        message: 'Invalid response',
      }));

      if (verifyResponse.ok && verifyResult.success) {
        setSuccess(true);
      } else {
        if (verifyResponse.status === 401) {
          navigate('/login', { replace: true });
          return;
        }
        setError(
          verifyResult.message ||
            'Payment verification failed. Please contact support if amount was deducted.'
        );
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError(
        'Payment verification failed. Please contact support if amount was deducted.'
      );
    } finally {
      setProcessing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    if (!selectedPackage) {
      setError('Please select a subscription package.');
      return;
    }

    setProcessing(true);

    try {
      const packageId = selectedPackage._id || selectedPackage.id;

      const orderResponse = await fetch(API_URL.createOrder, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ packageId, trimester }),
      });

      const orderResult = await orderResponse.json().catch(() => ({
        success: false,
        message: 'Invalid response',
      }));

      if (!orderResponse.ok || !orderResult.success) {
        if (orderResponse.status === 401) {
          navigate('/login', { replace: true });
          return;
        }
        throw new Error(
          orderResult.message || 'Failed to create payment order'
        );
      }

      const orderData = orderResult.data || orderResult;

      const razorpay = await loadRazorpayScript();

      const options = {
        key: orderData.keyId || RAZORPAY_KEY_ID,
        order_id:
          orderData.orderId || orderData.razorpayOrderId || orderData.id,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: orderData.name || 'Hiranyagarbha Sanskar',
        description:
          orderData.description ||
          `Subscription - ${selectedPackage.name}`,
        image: orderData.image,
        handler: async (response) => {
          await verifyPayment(response);
        },
        modal: {
          ondismiss: () => {
            setProcessing(false);
            setError('Payment cancelled. You can try again anytime.');
          },
        },
        prefill: {
          name: formData.name || orderData.name || '',
          email: formData.email || orderData.email || '',
          contact: formData.mobile || orderData.contact || '',
        },
        theme: {
          color: '#7c3aed',
        },
      };

      const rzp = new razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Subscription error:', err);
      setError(
        err.message || 'Unable to process subscription. Please try again.'
      );
    } finally {
      setProcessing(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-2">
              Your {selectedPackage?.name || 'subscription'} has been
              activated.
            </p>
            <p className="text-gray-600 mb-8">
              You now have access to all features for the selected trimester.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate('/profile')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg"
              >
                Go to My Profile
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
            Unlock personalized pregnancy care with our premium subscription
            packages. Choose the plan that best fits your needs and journey.
          </p>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <span className="ml-4 text-gray-600 text-lg">
              Loading subscription packages...
            </span>
          </div>
        ) : packagesError ? (
          <div className="text-center py-20">
            <p className="text-red-600 text-lg mb-4">{packagesError}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
            >
              Try Again
            </button>
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">
              No subscription packages available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg) => {
              const isSelected = selectedPackage?._id === pkg._id;
              const tierColor = getTierColor(pkg);
              const displayPrice = getDisplayPrice(pkg);
              const displayDuration = getDisplayDuration(pkg);
              const features = getFeatureList(pkg);
              const badge = pkg.badge || getTierLabel(pkg.tier);

              return (
                <div
                  key={pkg._id || pkg.id}
                  onClick={() => {
                    setSelectedPackage(pkg);
                    setError('');
                  }}
                  className={`border-2 rounded-2xl shadow-lg p-6 cursor-pointer transition duration-300 transform hover:-translate-y-1 ${
                    isSelected
                      ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-300'
                      : 'border-gray-200 bg-white hover:border-purple-300'
                  }}`}
                >
                  {pkg.isFree && (
                    <div className="absolute -top-3 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Free
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div
                      className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-r ${tierColor} mb-3 flex items-center justify-center text-white font-bold text-sm`}
                    >
                      {getTierLabel(pkg.tier).charAt(0)}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">
                      {pkg.name}
                    </h3>
                    {pkg.subtitle && (
                      <p className="text-sm text-purple-600 font-medium mb-1">
                        {pkg.subtitle}
                      </p>
                    )}
                    {pkg.badge && !pkg.isFree && (
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                          badge === 'Popular'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {badge}
                      </span>
                    )}
                  </div>

                  {pkg.description && (
                    <p className="text-gray-600 text-sm text-center mb-4">
                      {pkg.description}
                    </p>
                  )}

                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-bold text-purple-600">
                        {displayPrice}
                      </span>
                      {pkg.originalPrice && pkg.originalPrice > 0 && (
                        <span className="text-lg text-gray-500 line-through">
                          ₹{Number(pkg.originalPrice).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    {displayDuration && (
                      <p className="text-gray-500 text-sm mt-1">
                        {displayDuration}
                      </p>
                    )}
                  </div>

                  {features.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {features.slice(0, 6).map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start text-sm text-gray-600"
                        >
                          <svg
                            className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                      {features.length > 6 && (
                        <li className="text-xs text-gray-400 ml-6">
                          +{features.length - 6} more features
                        </li>
                      )}
                    </ul>
                  )}

                  <div className="border-t border-gray-200 pt-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPackage(pkg);
                        setError('');
                      }}
                      className={`w-full py-2 px-4 rounded-lg font-semibold text-sm transition duration-300 ${
                        isSelected
                          ? 'bg-purple-600 text-white hover:bg-purple-700'
                          : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Select Package'}
                    </button>
                    <Link
                      to={`/subscription/${pkg._id || pkg.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-purple-600 hover:text-purple-800 text-center mt-2"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && !packagesError && packages.length > 0 && !success && (
          <div className="max-w-2xl mx-auto mt-12 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Complete Your Subscription
            </h2>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
                {error}
              </div>
            )}

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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                  placeholder="Enter your full name"
                />
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                  placeholder="Enter your email"
                />
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                  placeholder="Enter your 10-digit mobile number"
                />
              </div>

              <div>
                <label
                  htmlFor="trimester"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Current Trimester <span className="text-red-500">*</span>
                </label>
                <select
                  id="trimester"
                  value={trimester}
                  onChange={(e) => setTrimester(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 bg-white"
                >
                  {TRIMETHER_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="coupon"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
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
                  <span className="text-gray-700">Selected Package:</span>
                  <span className="font-semibold text-purple-600">
                    {selectedPackage?.name || 'None selected'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">
                    Trimester: {
                      TRIMETHER_OPTIONS.find((t) => t.value === trimester)
                        ?.label || trimester
                    }
                  </span>
                  <span className="text-2xl font-bold text-purple-600">
                    {selectedPackage ? getDisplayPrice(selectedPackage) : '—'}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={processing || !selectedPackage}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  'Proceed to Payment'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-purple-600 hover:text-purple-500 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Subscription;
