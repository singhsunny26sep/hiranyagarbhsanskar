import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  API_URL,
  RAZORPAY_KEY_ID,
  TRIMETHER_OPTIONS,
  getAuthHeaders,
} from "../config/api";
import { loadRazorpayScript, extractRazorpayResponse } from "../utils/razorpay";

function PatientSubscriptionCheckout() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state || {};
  const {
    packageId,
    trimester = "second",
    packageName,
    packagePrice,
  } = state;

  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [requiresLogin, setRequiresLogin] = useState(false);

  const fetchPackageDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL.getPackages}/${packageId}`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );
      const result = await response.json();
      if (response.ok && result.success) {
        setPackageDetails(result.data?.package || result.package || result.data);
      } else {
        setError(result.message || "Failed to fetch package details");
      }
    } catch (err) {
      console.error("Error fetching package:", err);
      setError("Unable to fetch package details. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [packageId]);

  useEffect(() => {
    if (!packageId) {
      navigate("/patient-subscriptions/preview", { replace: true });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setRequiresLogin(true);
      setLoading(false);
      return;
    }

    if (packageName && packagePrice) {
      setPackageDetails({
        name: packageName,
        price: packagePrice,
      });
    } else {
      fetchPackageDetails();
    }
  }, [packageId, packageName, packagePrice, navigate, fetchPackageDetails]);

  const getTrimesterLabel = () => {
    const found = TRIMETHER_OPTIONS.find((t) => t.value === trimester);
    return found ? found.label : trimester;
  };

  const formatPrice = (price) => {
    if (price == null) return "—";
    const num = Number(price);
    if (isNaN(num)) return price;
    return `₹${num.toLocaleString("en-IN")}`;
  };

  const handlePayment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setRequiresLogin(true);
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const razorpay = await loadRazorpayScript();

      const orderPayload = {
        packageId,
        trimester,
      };

      const orderResponse = await fetch(API_URL.createOrder, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(orderPayload),
      });

      const orderResult = await orderResponse.json();

      if (!orderResponse.ok || !orderResult.success) {
        if (orderResponse.status === 401) {
          setRequiresLogin(true);
          return;
        }
        throw new Error(
          orderResult.message || "Failed to create payment order"
        );
      }

      const orderData = orderResult.data || orderResult;

      const options = {
        key: orderData.keyId || RAZORPAY_KEY_ID,
        order_id: orderData.orderId || orderData.razorpayOrderId || orderData.id,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: orderData.name || "Hiranyagarbha Sanskar",
        description:
          orderData.description ||
          `Subscription - ${packageDetails?.name || packageName || "Package"} (${getTrimesterLabel()})`,
        image: orderData.image,
        handler: async (response) => {
          await verifyPayment(response);
        },
        modal: {
          ondismiss: () => {
            setProcessing(false);
            setError("Payment cancelled. You can try again anytime.");
          },
        },
        prefill: {
          name: orderData.name || "",
          email: orderData.email || "",
          contact: orderData.contact || "",
        },
        theme: {
          color: "#7c3aed",
        },
      };

      const rzp = new razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message || "Unable to process payment. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const verifyPayment = async (response) => {
    setProcessing(true);
    setError("");

    console.log("Razorpay checkout response:", response);

    const verifyPayload = extractRazorpayResponse(response);

    if (
      !verifyPayload.razorpayOrderId ||
      !verifyPayload.razorpayPaymentId ||
      !verifyPayload.razorpaySignature
    ) {
      setProcessing(false);
      setError("Payment details missing. Please try again.");
      return;
    }

    try {
      const verifyResponse = await fetch(API_URL.verifyPayment, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(verifyPayload),
      });

      const verifyResult = await verifyResponse.json();

      if (verifyResponse.ok && verifyResult.success) {
        setSuccess(true);
      } else {
        if (verifyResponse.status === 401) {
          setRequiresLogin(true);
          return;
        }
        setError(
          verifyResult.message ||
            "Payment verification failed. Please contact support if amount was deducted."
        );
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError(
        "Payment verification failed. Please contact support if amount was deducted."
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
            <p className="text-gray-600 mb-8">
              Your subscription has been activated. You now have access to all
              premium features for the selected trimester.
            </p>
            <button
              onClick={() => navigate("/profile")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Go to My Profile
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <Header />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Checkout
          </h1>
          <p className="text-lg text-gray-600">
            Complete your subscription payment securely via Razorpay.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <span className="ml-4 text-gray-600 text-lg">
              Loading package details...
            </span>
          </div>
        ) : requiresLogin ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg mb-4">
              Please log in to complete your subscription payment.
            </p>
            <Link
              to="/login"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Go to Login
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Package:</span>
                  <span className="font-semibold text-gray-800">
                    {packageDetails?.name || packageName || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Trimester:</span>
                  <span className="font-semibold text-gray-800">
                    {getTrimesterLabel()}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="text-gray-800 font-bold">Total Amount:</span>
                  <span className="text-2xl font-bold text-purple-600">
                    {formatPrice(
                      packageDetails?.price || packagePrice || packageDetails?.amount
                    )}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h4l3-3v8l3-3h7"
                    />
                  </svg>
                  <span>Pay with Razorpay</span>
                </>
              )}
            </button>
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/patient-subscriptions/preview")}
            className="text-purple-600 hover:text-purple-800 font-medium text-sm transition duration-200"
          >
            ← Back to Packages
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PatientSubscriptionCheckout;
