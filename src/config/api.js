export const API_BASE = "https://api.hiranyagarbhsanskar.co/hiranyagarbha";

export const API_URL = {
  getPackages: `${API_BASE}/subscriptions/getAll`,
  createOrder: `${API_BASE}/patient-subscriptions/checkout`,
  verifyPayment: `${API_BASE}/patient-subscriptions/verify`,
  mySubscriptions: `${API_BASE}/patient-subscriptions/my`,
  getSubscription: (id) => `${API_BASE}/subscriptions/get/${id}`,
};

export const RAZORPAY_KEY_ID =
  process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_Tgh01xTmj8XtbJ";

export const TRIMETHER_OPTIONS = [
  { value: "first", label: "First Trimester (0-13 weeks)" },
  { value: "second", label: "Second Trimester (13-28 weeks)" },
  { value: "third", label: "Third Trimester (28-40 weeks)" },
];

export const getAuthHeaders = (extra = {}) => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
};

export const getUserId = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user._id || user.id || null;
};
