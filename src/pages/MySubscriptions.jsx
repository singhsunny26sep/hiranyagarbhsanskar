import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL, getAuthHeaders } from '../config/api';

function MySubscriptions() {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fetchSubscriptions = async (pageNum = 1) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    try {
      const response = await fetch(
        `${API_URL.mySubscriptions}?page=${pageNum}&limit=${limit}`,
        {
          method: 'GET',
          headers: getAuthHeaders(),
        }
      );

      const result = await response.json().catch(() => ({
        success: false,
        message: 'Invalid response from server',
      }));

      if (response.ok && result.success) {
        const pagination = result.data;
        const items =
          Array.isArray(pagination?.data) &&
          pagination.data.length > 0 &&
          pagination.data[0]?.name
            ? pagination.data
            : Array.isArray(result.packages)
            ? result.packages
            : Array.isArray(result.data)
            ? result.data
            : [];

        setSubscriptions(items);
        setTotal(pagination?.total || result.total || items.length || 0);
        setTotalPages(pagination?.totalPages || result.totalPages || 1);
        setPage(pagination?.page || pageNum);
        setError('');
      } else {
        if (response.status === 401) {
          navigate('/login', { replace: true });
          return;
        }
        setError(result.message || 'Failed to fetch subscriptions');
      }
    } catch (err) {
      console.error('Error fetching subscriptions:', err);
      setError('Unable to fetch subscriptions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions(1);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setLoading(true);
    fetchSubscriptions(newPage);
  };

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

  const getTierColor = (tier) => {
    const t = (tier || '').toLowerCase();
    if (t.includes('elite') || t === 'elite') return 'from-amber-500 to-orange-500';
    if (t.includes('pro') || t === 'pro') return 'from-purple-500 to-purple-600';
    if (t.includes('basic') || t === 'basic') return 'from-blue-500 to-blue-600';
    return 'from-green-500 to-blue-500';
  };

  const getPlanInfo = (sub) => {
    if (Array.isArray(sub.plans) && sub.plans.length > 0) {
      const activePlan = sub.plans.find((p) => p.isActive !== false) || sub.plans[0];
      return activePlan;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            My Subscriptions
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            View all your subscription packages and track your pregnancy care journey.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <span className="ml-4 text-gray-600 text-lg">
              Loading subscriptions...
            </span>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button
              onClick={() => fetchSubscriptions(page)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
            >
              Try Again
            </button>
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="w-24 h-24 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-12 h-12 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h21v2H3zM3 7h21v14a2 2 0 002 2h-2M7 11h10M7 15h10M7 19h10"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Subscriptions Found
            </h3>
            <p className="text-gray-600 mb-6">
              You don't have any subscription packages yet.
            </p>
            <Link
              to="/subscription"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Browse Subscription Plans
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {subscriptions.map((sub) => {
                const plan = getPlanInfo(sub);
                const price = plan?.price ?? sub.price;
                const originalPrice = plan?.originalPrice ?? sub.originalPrice;
                const durationInDays =
                  plan?.durationInDays ?? sub.durationInDays;
                const tierColor = sub.theme?.color || getTierColor(sub.tier);

                return (
                  <div
                    key={sub._id || sub.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition duration-300"
                  >
                    <div
                      className={`h-3 bg-gradient-to-r ${tierColor} border-t-4 border-t-current border-0`}
                    />
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">
                            {sub.name}
                          </h3>
                          {sub.subtitle && (
                            <p className="text-sm text-purple-600 font-medium">
                              {sub.subtitle}
                            </p>
                          )}
                        </div>
                        {sub.isFree && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                            Free
                          </span>
                        )}
                        {sub.isPopular && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                            Popular
                          </span>
                        )}
                      </div>

                      {sub.description && (
                        <p className="text-gray-600 text-sm mb-4">
                          {sub.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-2xl font-bold text-purple-600">
                            {formatPrice(price)}
                          </p>
                          {originalPrice && originalPrice > 0 && (
                            <p className="text-sm text-gray-500 line-through">
                              ₹{Number(originalPrice).toLocaleString('en-IN')}
                            </p>
                          )}
                        </div>
                        {sub.duration && (
                          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            {sub.duration}
                          </span>
                        )}
                      </div>

                      {sub.idealFor && (
                        <p className="text-xs text-gray-500 mb-3">
                          Ideal for: {sub.idealFor}
                        </p>
                      )}

                      {Array.isArray(sub.includes) && sub.includes.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-medium text-gray-700 mb-2">
                            Includes:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {sub.includes.slice(0, 3).map((item, idx) => (
                              <span
                                key={idx}
                                className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded"
                              >
                                {item}
                              </span>
                            ))}
                            {sub.includes.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{sub.includes.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {plan && plan !== sub && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Plan:</span>{' '}
                            {plan.label || 'All Trimesters'} |{' '}
                            {plan.trimester === 'all'
                              ? 'All Trimesters'
                              : plan.trimester}
                          </p>
                        </div>
                      )}

                      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center text-xs text-gray-400">
                        <span>Created: {formatDate(sub.createdAt)}</span>
                        <Link
                          to={`/subscription/${sub._id || sub.id}`}
                          className="text-purple-600 hover:text-purple-800 font-medium"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex justify-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1 || loading}
                    className="px-4 py-2 bg-white text-gray-600 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-sm text-gray-700">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= totalPages || loading}
                    className="px-4 py-2 bg-white text-gray-600 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-block bg-white hover:bg-gray-50 text-purple-600 px-8 py-3 rounded-lg font-semibold border-2 border-purple-600 transition duration-300"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MySubscriptions;
