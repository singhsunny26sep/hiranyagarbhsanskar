const RAZORPAY_CHECKOUT_URL =
  "https://checkout.razorpay.com/v1/checkout.js";

let loadPromise = null;

export const loadRazorpayScript = async () => {
  if (window.Razorpay) {
    return Promise.resolve(window.Razorpay);
  }
  if (loadPromise) {
    return loadPromise;
  }
  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = RAZORPAY_CHECKOUT_URL;
    script.async = true;
    script.onload = () => resolve(window.Razorpay);
    script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
    document.body.appendChild(script);
  });
  return loadPromise;
};
