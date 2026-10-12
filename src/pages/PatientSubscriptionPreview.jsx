import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { API_URL, TRIMETHER_OPTIONS, getAuthHeaders } from "../config/api";

function PatientSubscriptionPreview() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [trimester, setTrimester] = useState("second");
  const [requiresLogin, setRequiresLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setRequiresLogin(true);
      setLoading(false);
      return;
    }

    const fetchPackages = async () => {

      try {
        const response = await fetch(API_URL.getPackages, {
          method: "GET",
          headers: getAuthHeaders(),
        });
        const result =
          await response.json().catch(() => ({ success: false, message: "Invalid response" }));

        if (response.ok && result.success) {
          const items = result.data?.packages || result.packages || result.data || [];
          setPackages(items);
        } else {
          setError(result.message || "Failed to fetch subscription packages");
        }
      } catch (err) {
        console.error("Error fetching packages:", err);
        setError("Unable to fetch subscription packages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [navigate]);

  const handleSubscribe = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
    if (!selectedPackage) {
      setError("Please select a subscription package.");
      return;
    }
    setError("");
    navigate("/patient-subscriptions/checkout", {
      state: {
        packageId: selectedPackage._id || selectedPackage.id,
        trimester,
        packageName: selectedPackage.name,
        packagePrice: selectedPackage.price,
      },
    });
  };

  const formatPrice = (price) => {
    if (price == null) return "—";
    const num = Number(price);
    if (isNaN(num)) return price;
    return `₹${num.toLocaleString("en-IN")}`;
  };

  const getFeatureList = (pkg) => {
    if (Array.isArray(pkg.features)) return pkg.features;
    if (Array.isArray(pkg.benefits)) return pkg.benefits;
    return [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Patient Subscription Packages
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose a subscription package that suits your pregnancy journey and
            start enjoying premium care from day one.
          </p>
        </div>

        {error && (
          <div className="mb-6 text-center">
            <p className="text-red-600 text-lg font-medium">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <span className="ml-4 text-gray-600 text-lg">
              Loading packages...
            </span>
          </div>
        ) : requiresLogin ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg mb-4">
              Please log in to view subscription packages.
            </p>
            <Link
              to="/login"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Go to Login
            </Link>
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">
              No subscription packages available at the moment.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg) => {
              const pkgId = pkg._id || pkg.id;
              const isSelected = selectedPackage?._id === pkg._id;
              return (
                <div
                  key={pkgId}
                  onClick={() => {
                    setSelectedPackage(pkg);
                    setError("");
                  }}
                  className={`border-2 rounded-2xl shadow-lg p-6 cursor-pointer transition duration-300 transform hover:-translate-y-1 ${
                    isSelected
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-200 bg-white hover:border-purple-300"
                  }`}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {pkg.name || "Subscription Package"}
                    </h3>
                    <div className="flex items-center justify-center mb-4">
                      <span className="text-4xl font-bold text-purple-600">
                        {formatPrice(pkg.price)}
                      </span>
                      {pkg.duration && (
                        <span className="text-gray-500 ml-2 text-sm">
                          {pkg.duration}
                        </span>
                      )}
                    </div>
                    {pkg.description && (
                      <p className="text-gray-600 text-sm mb-4">
                        {pkg.description}
                      </p>
                    )}
                  </div>

                  {getFeatureList(pkg).length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {getFeatureList(pkg).map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600">
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
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
                    </ul>
                  )}

                  <div className="border-t border-gray-200 pt-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPackage(pkg);
                        setError("");
                      }}
                      className={`w-full py-2 px-4 rounded-lg font-semibold text-sm transition duration-300 ${
                        isSelected
                          ? "bg-purple-600 text-white"
                          : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                      }`}
                    >
                      {isSelected ? "Selected" : "Select Package"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!requiresLogin && (
        <div className="mt-12 max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Choose Your Trimester
          </h2>
          <div className="space-y-3 mb-6">
            {TRIMETHER_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center p-3 border border-gray-300 rounded-lg hover:border-purple-400 transition duration-200 cursor-pointer"
              >
                <input
                  type="radio"
                  name="trimester"
                  value={opt.value}
                  checked={trimester === opt.value}
                  onChange={(e) => setTrimester(e.target.value)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                />
                <span className="ml-3 text-gray-700">{opt.label}</span>
              </label>
            ))}
          </div>

          <button
            onClick={handleSubscribe}
            disabled={!selectedPackage}
            className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg ${
              !selectedPackage ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {selectedPackage
              ? `Proceed to Payment - ${selectedPackage.name || "Package"}`
              : "Select a Package to Continue"}
          </button>
        </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default PatientSubscriptionPreview;
