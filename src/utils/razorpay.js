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

export const extractRazorpayResponse = (response) => {
  let source = response;
  if (typeof source === "string") {
    try {
      source = JSON.parse(source);
    } catch (err) {
      source = {};
    }
  }

  const normalize = (key) => String(key).toLowerCase().replace(/[_\-\s]/g, "");

  const findValue = (obj, targets, depth = 0) => {
    if (!obj || typeof obj !== "object" || depth > 2) return undefined;
    for (const [key, value] of Object.entries(obj)) {
      if (targets.indexOf(normalize(key)) !== -1) return value;
    }
    for (const value of Object.values(obj)) {
      if (value && typeof value === "object") {
        const found = findValue(value, targets, depth + 1);
        if (found !== undefined) return found;
      }
    }
    return undefined;
  };

  return {
    razorpayOrderId: findValue(source, ["razorpayorderid", "orderid"]),
    razorpayPaymentId: findValue(source, ["razorpaypaymentid", "paymentid"]),
    razorpaySignature: findValue(source, ["razorpaysignature", "signature"]),
  };
};
