import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_BASE = "https://api.hiranyagarbhsanskar.co/hiranyagarbha";
const API_URL = `${API_BASE}/doctors/get-all?limit=100`;
const APPOINTMENT_BOOK_URL = `${API_BASE}/appointments/book`;

function Appointment() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    concern: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        if (response.ok && result.success) {
          setDoctors(result.doctors || result.data?.data || []);
        } else {
          setError(result.message || "Failed to fetch doctors");
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Unable to fetch doctors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "date" && selectedDoctor && value) {
      fetchSlots(selectedDoctor._id || selectedDoctor.id, value);
    }
  };

  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      concern: "",
    });
    setSubmitMsg("");
    setSlots([]);
    setSelectedSlot(null);
    setSlotsError("");
  };

  const extractSlots = (result) => {
    const data = result?.data;
    let list = [];
    if (Array.isArray(data)) {
      list = data;
    } else if (data && typeof data === "object") {
      list = Array.isArray(data.availableSlots)
        ? data.availableSlots
        : Array.isArray(data.slots)
        ? data.slots
        : [];
    }
    if (!list.length && Array.isArray(result?.slots)) {
      list = result.slots;
    }
    return list.filter((s) =>
      s && typeof s.available === "boolean" ? s.available : true
    );
  };

  const fetchSlots = async (doctorId, date) => {
    if (!doctorId || !date) return;
    setSlotsLoading(true);
    setSlotsError("");
    setSlots([]);
    setSelectedSlot(null);
    setFormData((prev) => ({ ...prev, time: "" }));

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${API_BASE}/appointments/slots?doctorId=${doctorId}&appointmentDate=${date}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
      const result = await response.json();
      if (response.ok && result.success) {
        setSlots(extractSlots(result));
      } else if (response.status === 401) {
        setSlotsError("Session expired. Please log in again.");
      } else {
        setSlotsError(result.message || "No slots available");
      }
    } catch (err) {
      console.error("Error fetching slots:", err);
      setSlotsError("Failed to fetch available slots.");
    } finally {
      setSlotsLoading(false);
    }
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setFormData((prev) => ({
      ...prev,
      time: formatSlotTime(slot.startTime),
    }));
  };

  const formatSlotTime = (isoString) => {
    if (!isoString) return "";
    const d = new Date(isoString);
    if (!isNaN(d.getTime())) {
      return d
        .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })
        .replace(/\u202f/g, " ");
    }
    const match = String(isoString).match(/(\d{1,2}):(\d{2})/);
    if (match) {
      let h = parseInt(match[1], 10);
      const ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      return `${h}:${match[2]} ${ampm}`;
    }
    return String(isoString);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMsg("");

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("token");

    if (!token) {
      setSubmitMsg("Please log in to book an appointment.");
      setSubmitting(false);
      return;
    }

    if (!selectedSlot && !formData.time) {
      setSubmitMsg(
        slots.length > 0
          ? "Please select a time slot."
          : "Please enter a preferred time."
      );
      setSubmitting(false);
      return;
    }

    let startDateTime = selectedSlot?.startTime;
    if (!startDateTime) {
      const parsed = new Date(`${formData.date}T${formData.time}`);
      if (isNaN(parsed.getTime())) {
        setSubmitMsg("Please enter a valid date and time.");
        setSubmitting(false);
        return;
      }
      startDateTime = parsed.toISOString();
    }
    const endDateTime = selectedSlot?.endTime || new Date(
      new Date(startDateTime).getTime() + 30 * 60000
    ).toISOString();

    const appointmentData = {
      doctorId: selectedDoctor._id || selectedDoctor.id,
      patientId: user._id || user.id,
      appointmentDate: formData.date,
      startTime: startDateTime,
      endTime: endDateTime,
      concern: formData.concern,
      scheduledBy: "ADMIN",
    };

    try {
      const response = await fetch(APPOINTMENT_BOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setSubmitMsg("Appointment booked successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          concern: "",
        });
        setSelectedDoctor(null);
      } else {
        setSubmitMsg(result.message || "Failed to book appointment");
      }
    } catch (err) {
      console.error("Error booking appointment:", err);
      setSubmitMsg("Failed to book appointment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const getSpecialtyTag = (specialty) => {
    const specialties = Array.isArray(specialty)
      ? specialty
      : [specialty];
    return specialties.join(", ");
  };

  const getInitials = (name) => {
    if (!name) return "D";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Book Your Appointment
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect with our expert doctors and take the first step towards
            a healthy, mindful pregnancy journey.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <span className="ml-4 text-gray-600 text-lg">
              Loading doctors...
            </span>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
            >
              Try Again
            </button>
          </div>
        ) : doctors.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No doctors available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {doctors.map((doctor) => (
              <div
                key={doctor._id || doctor.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-300"
              >
                <div className="p-6 text-center">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                    {doctor.image ? (
                      <img
                          src={doctor.image}
                        alt={doctor.fullName}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-3xl font-bold">
                        {getInitials(doctor.fullName)}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {doctor.fullName}
                  </h3>
                  <p className="text-purple-600 font-medium text-sm mb-3">
                    {getSpecialtyTag(doctor.expertise)}
                  </p>
                  {doctor.qualifications && (
                    <p className="text-gray-600 text-xs mb-2">
                      {doctor.qualifications}
                    </p>
                  )}
                  {doctor.experience && (
                    <p className="text-gray-500 text-xs">
                      Experience: {doctor.experience}
                    </p>
                  )}
                  <button
                    onClick={() => handleBookClick(doctor)}
                    className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2.5 rounded-lg font-semibold transition duration-300 transform hover:scale-105"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedDoctor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Book Appointment with{" "}
                    <span className="text-purple-600">{selectedDoctor.fullName || selectedDoctor.name}</span>
                  </h2>
                  <button
                    onClick={() => setSelectedDoctor(null)}
                    className="text-gray-400 hover:text-gray-600 transition duration-300"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {submitMsg && (
                  <p
                    className={`mb-4 text-sm font-medium ${
                      submitMsg.includes("success")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {submitMsg}
                  </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
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
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="time"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Preferred Time *
                      </label>
                      {formData.date && selectedDoctor && slotsLoading ? (
                        <div className="flex items-center space-x-3 text-gray-600">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                          <span>Loading available slots...</span>
                        </div>
                      ) : formData.date && selectedDoctor && slots.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                          {slots.map((slot, idx) => (
                            <button
                              key={slot._id || slot.startTime || idx}
                              type="button"
                              onClick={() => handleSlotSelect(slot)}
                              className={`px-3 py-2 text-sm font-medium rounded-lg border transition duration-200 ${
                                selectedSlot?.startTime === slot.startTime
                                  ? "bg-purple-600 text-white border-purple-600"
                                  : "bg-gray-50 text-gray-800 border-gray-300 hover:bg-purple-100"
                              }`}
                            >
                              {formatSlotTime(slot.startTime)}
                            </button>
                          ))}
                        </div>
                      ) : formData.date && selectedDoctor && slotsError ? (
                        <p className="text-sm text-gray-500 mb-2">{slotsError}</p>
                      ) : formData.date && selectedDoctor ? (
                        <p className="text-sm text-gray-500 mb-2">
                          No slots available for this date.
                        </p>
                      ) : null}
                      {!slotsLoading && !slots.length && (
                        <input
                          type="time"
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                        />
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="concern"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Concern / Specialization
                      </label>
                      <select
                        id="concern"
                        name="concern"
                        value={formData.concern}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                      >
                        <option value="">Select a concern</option>
                        <option value="prenatal">Prenatal Care</option>
                        <option value="nutrition">Nutrition</option>
                        <option value="wellness">Wellness & Mindfulness</option>
                        <option value="general">General Check-up</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Additional Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 resize-none"
                      placeholder="Any specific concerns or notes..."
                    />
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedDoctor(null)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold transition duration-300 transform hover:scale-105 ${
                        submitting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {submitting ? "Booking..." : "Confirm Appointment"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Appointment;
