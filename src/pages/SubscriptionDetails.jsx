import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { API_URL, getAuthHeaders, TRIMETHER_OPTIONS } from '../config/api';

function SubscriptionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTrimester, setSelectedTrimester] = useState('all');

  useEffect(() => {
    const fetchSubscription = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', { replace: true });
        return;
      }

      try {
        const response = await fetch(API_URL.getSubscription(id), {
          method: 'GET',
          headers: getAuthHeaders(),
        });

        const result = await response.json().catch(() => ({
          success: false,
          message: 'Invalid response from server',
        }));

        if (response.ok && result.success) {
          const data =
            result.subscription ||
            result.data?.subscription ||
            result.data ||
            null;
          setSubscription(data);
          setError('');
          if (data?.plans?.length > 0 && !data.plans.find((p) => p.trimester === 'all')) {
            setSelectedTrimester(data.plans[0].trimester);
          }
        } else {
          if (response.status === 401) {
            navigate('/login', { replace: true });
            return;
          }
          setError(result.message || 'Failed to fetch subscription details');
          setSubscription(null);
        }
      } catch (err) {
        console.error('Error fetching subscription:', err);
        setError('Unable to fetch subscription details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [id, navigate]);

  const formatPrice = (price) => {
    if (price == null) return '—';
    if (price === 0) return 'Free';
    const num = Number(price);
    if (isNaN(num)) return price;
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return 'N/A';
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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

  const getTrimesterPlan = (pkg) => {
    if (!Array.isArray(pkg.plans) || pkg.plans.length === 0) return null;
    const exact = pkg.plans.find((p) => p.trimester === selectedTrimester);
    if (exact) return exact;
    return pkg.plans.find((p) => p.trimester === 'all') || pkg.plans[0];
  };

  const getFeatureList = (pkg) => {
    if (Array.isArray(pkg.includes)) return pkg.includes;
    if (Array.isArray(pkg.modules)) return pkg.modules;
    return [];
  };

  const handleSubscribe = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
    navigate('/subscription', {
      state: { selectedPackageId: id },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100">
        <Header />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <span className="ml-4 text-gray-600 text-lg">
            Loading subscription details...
          </span>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !subscription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {error && (
            <p className="text-red-600 text-lg mb-4">{error}</p>
          )}
          {!subscription && !error && (
            <p className="text-gray-600 text-lg mb-4">
              Subscription not found.
            </p>
          )}
          <Link
            to="/my-subscriptions"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
          >
            Back to My Subscriptions
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const plan = getTrimesterPlan(subscription);
  const displayPrice =
    plan?.price != null ? formatPrice(plan.price) : formatPrice(subscription.price);
  const originalPrice = plan?.originalPrice || subscription.originalPrice;
  const features = getFeatureList(subscription);
  const tierColor = getTierColor(subscription);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100">
      <Header />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link
            to="/my-subscriptions"
            className="text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center gap-1"
          >
            ← Back to My Subscriptions
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className={`h-2 bg-gradient-to-r ${tierColor}`}></div>

          <div className="p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-full bg-gradient-to-r ${tierColor} flex items-center justify-center text-white font-bold text-xl`}
                >
                  {getTierLabel(subscription.tier).charAt(0)}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {subscription.name}
                  </h1>
                  {subscription.subtitle && (
                    <p className="text-purple-600 font-medium">
                      {subscription.subtitle}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {subscription.isFree && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                    Free
                  </span>
                )}
                {subscription.isPopular && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-semibold rounded-full">
                    Popular
                  </span>
                )}
                {subscription.badge && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                    {subscription.badge}
                  </span>
                )}
              </div>
            </div>

            {subscription.description && (
              <p className="text-gray-600 text-lg mb-6">
                {subscription.description}
              </p>
            )}

            {subscription.idealFor && (
              <p className="text-sm text-gray-500 mb-4">
                <span className="font-medium">Ideal for:</span>{' '}
                {subscription.idealFor}
              </p>
            )}

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Pricing
              </h2>

              {Array.isArray(subscription.plans) &&
              subscription.plans.length > 0 ? (
                <div className="space-y-4">
                  {subscription.plans.map((p, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0"
                    >
                      <div>
                        <span className="font-medium text-gray-700">
                          {p.label || p.trimester}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-purple-600">
                          {formatPrice(p.price)}
                        </span>
                        {p.originalPrice && p.originalPrice > 0 && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ₹{Number(p.originalPrice).toLocaleString('en-IN')}
                          </span>
                        )}
                        {p.durationInDays && (
                          <span className="text-xs text-gray-500 block">
                            {p.durationInDays} days
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-bold text-purple-600">
                    {formatPrice(subscription.price)}
                  </span>
                  {originalPrice && originalPrice > 0 && (
                    <span className="text-lg text-gray-500 line-through">
                      ₹{Number(originalPrice).toLocaleString('en-IN')}
                    </span>
                  )}
                  {subscription.durationInDays && (
                    <span className="text-gray-500">
                      ({subscription.durationInDays} days)
                    </span>
                  )}
                </div>
              )}
            </div>

            {features.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  What's Included
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start p-3 bg-gray-50 rounded-lg"
                    >
                      <svg
                        className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5"
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
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {Array.isArray(subscription.modules) &&
              subscription.modules.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Course Modules
                  </h2>
                  <div className="space-y-2">
                    {subscription.modules.map((module, idx) => (
                      <div
                        key={idx}
                        className="flex items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="w-7 h-7 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-gray-700">{module}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {subscription.premiumFeatures && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Premium Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {Object.entries(subscription.premiumFeatures).map(
                    ([category, items]) =>
                      Array.isArray(items) && items.length > 0 && (
                        <div key={category} className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-medium text-gray-800 mb-2 capitalize">
                            {category
                              .replace(/([A-Z])/g, ' $1')
                              .replace(/^./, (s) => s.toUpperCase())}
                          </h3>
                          <ul className="space-y-1">
                            {items.map((item, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-gray-600 flex items-center"
                              >
                                <svg
                                  className="w-3 h-3 text-purple-500 mr-2"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M7.05 10.293a1 1 0 10-1.414 1.414L3 10.707l-1.632 1.632a1 1 0 01-1.414-1.414l2.347-2.347a1 1 0 011.414 0L7 10.182l4.34 4.34a1 1 0 01-1.293 1.505l-.007-.006L7.05 10.293z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}

            {Array.isArray(subscription.exclusiveBenefits) &&
              subscription.exclusiveBenefits.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Exclusive Benefits
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {subscription.exclusiveBenefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-start p-3 bg-yellow-50 border border-yellow-100 rounded-lg"
                      >
                        <svg
                          className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6-9l3 3 4-4"
                          />
                        </svg>
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>

          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
              <span>
                Created: {formatDate(subscription.createdAt)}
              </span>
              <span>
                Updated: {formatDate(subscription.updatedAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleSubscribe}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
          >
            {subscription.isFree ? 'Get Started (Free)' : 'Subscribe Now'}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SubscriptionDetails;
