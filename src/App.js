import React, { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Prenatal from "./pages/Prenatal";
import Nutrition from "./pages/Nutrition";
import Wellness from "./pages/Wellness";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Download from "./pages/Download";
import Gallery from "./pages/Gallery";
import VideoLectures from "./pages/VideoLectures";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Subscription from "./pages/Subscription";
import PatientSubscriptionPreview from "./pages/PatientSubscriptionPreview";
import PatientSubscriptionCheckout from "./pages/PatientSubscriptionCheckout";
import SubscriptionDetails from "./pages/SubscriptionDetails";
import Appointment from "./pages/Appointment";
import MySubscriptions from "./pages/MySubscriptions";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DataDeletion from "./pages/DataDeletion";
import TermsAndConditions from "./pages/TermsAndConditions";
import TodayJourney from "./pages/TodayJourney";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/prenatal" element={<Prenatal />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/wellness" element={<Wellness />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
          <Route path="/product" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment" element={<ProtectedRoute><Appointment /></ProtectedRoute>} />
          <Route path="/download" element={<Download />} />
          <Route path="/gallery" element={<Gallery />} />
           <Route path="/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
           <Route path="/my-subscriptions" element={<ProtectedRoute><MySubscriptions /></ProtectedRoute>} />
           <Route path="/subscription/:id" element={<ProtectedRoute><SubscriptionDetails /></ProtectedRoute>} />
          <Route
            path="/patient-subscriptions/preview"
            element={<ProtectedRoute><PatientSubscriptionPreview /></ProtectedRoute>}
          />
          <Route
            path="/patient-patient-subscriptions/checkout"
            element={<ProtectedRoute><PatientSubscriptionCheckout /></ProtectedRoute>}
          />

          <Route path="/video-lectures" element={<VideoLectures />} />
          <Route path="/today-journey" element={<TodayJourney />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/data-deletion" element={<DataDeletion />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
