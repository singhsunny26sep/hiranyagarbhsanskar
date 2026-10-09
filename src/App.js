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
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DataDeletion from "./pages/DataDeletion";
import TermsAndConditions from "./pages/TermsAndConditions";
import TodayJourney from "./pages/TodayJourney";
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/download" element={<Download />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/subscription" element={<Subscription />} />

          <Route path="/video-lectures" element={<VideoLectures />} />
          <Route path="/today-journey" element={<TodayJourney />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/data-deletion" element={<DataDeletion />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
