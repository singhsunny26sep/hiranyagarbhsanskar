import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import todayJourneyData from "../data/todayJourney.json";

function TodayJourney() {
  const [waterIntake, setWaterIntake] = useState(0);
  const [mood, setMood] = useState("");
  const [meditationCompleted, setMeditationCompleted] = useState(false);
  const [activityCompleted, setActivityCompleted] = useState(false);

  const handleWaterChange = (increment) => {
    const newIntake = Math.max(0, waterIntake + increment);
    setWaterIntake(newIntake);
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Today's Journey
          </h1>
          <p className="text-lg text-gray-600">{formattedDate}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Baby's Development */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">🌸</span>
              <h2 className="text-xl font-bold text-gray-800">Baby's Development</h2>
            </div>
            <div className="space-y-3">
              <p className="text-gray-700">{todayJourneyData.babyDevelopment.tip}</p>
              <div className="bg-pink-50 rounded-lg p-3">
                <p className="text-sm text-pink-700 font-medium">
                  Week {todayJourneyData.babyDevelopment.week}: {todayJourneyData.babyDevelopment.title}
                </p>
              </div>
            </div>
          </div>

          {/* Nutrition Tip */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">🍎</span>
              <h2 className="text-xl font-bold text-gray-800">Nutrition Tip</h2>
            </div>
            <p className="text-gray-700 mb-3">{todayJourneyData.nutritionTip.tip}</p>
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-sm text-green-700">{todayJourneyData.nutritionTip.description}</p>
            </div>
          </div>

          {/* Water Intake Tracker */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">💧</span>
              <h2 className="text-xl font-bold text-gray-800">Water Intake</h2>
            </div>
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-blue-600">{waterIntake}</div>
              <div className="text-gray-600">/ {todayJourneyData.waterGoal} glasses</div>
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => handleWaterChange(-1)}
                className="bg-blue-100 hover:bg-blue-200 text-blue-700 w-10 h-10 rounded-full font-bold text-lg"
              >
                -
              </button>
              <button
                onClick={() => handleWaterChange(1)}
                className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full font-bold text-lg"
              >
                +
              </button>
            </div>
            <div className="mt-4 bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (waterIntake / todayJourneyData.waterGoal) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Activity Goal */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">🚶</span>
              <h2 className="text-xl font-bold text-gray-800">Activity Goal</h2>
            </div>
            <div className="space-y-3">
              <p className="text-gray-700">{todayJourneyData.activityGoal.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {todayJourneyData.activityGoal.current} / {todayJourneyData.activityGoal.target} {todayJourneyData.activityGoal.unit}
                </span>
                <button
                  onClick={() => setActivityCompleted(!activityCompleted)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activityCompleted
                      ? "bg-green-600 text-white"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                >
                  {activityCompleted ? "Completed ✓" : "Mark Done"}
                </button>
              </div>
            </div>
          </div>

          {/* 10-Minute Meditation */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">🧘</span>
              <h2 className="text-xl font-bold text-gray-800">10-Minute Meditation</h2>
            </div>
            <div className="space-y-3">
              <p className="text-gray-700">{todayJourneyData.meditation.description}</p>
              <button
                onClick={() => setMeditationCompleted(!meditationCompleted)}
                className={`w-full py-3 rounded-lg font-medium transition ${
                  meditationCompleted
                    ? "bg-green-600 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {meditationCompleted ? "Completed ✓" : "Start Meditation"}
              </button>
            </div>
          </div>

          {/* GarbhSanskar Music */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">🎵</span>
              <h2 className="text-xl font-bold text-gray-800">GarbhSanskar Music</h2>
            </div>
            <div className="space-y-3">
              <p className="text-gray-700">{todayJourneyData.garbhSanskarMusic.description}</p>
              <div className="bg-purple-50 rounded-lg p-3 text-center">
                <p className="text-sm text-purple-700 font-medium">{todayJourneyData.garbhSanskarMusic.track}</p>
              </div>
            </div>
          </div>

          {/* Positive Affirimation */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">❤️</span>
              <h2 className="text-xl font-bold text-gray-800">Positive Affirimation</h2>
            </div>
            <p className="text-gray-700 italic text-center">"{todayJourneyData.affirmation.text}"</p>
          </div>

          {/* Learning Lesson */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">📖</span>
              <h2 className="text-xl font-bold text-gray-800">One Learning Lesson</h2>
            </div>
            <p className="text-gray-700 mb-3">{todayJourneyData.learningLesson.title}</p>
            <p className="text-sm text-gray-600">{todayJourneyData.learningLesson.content}</p>
          </div>

          {/* Mood Journal */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">📝</span>
              <h2 className="text-xl font-bold text-gray-800">Mood Journal</h2>
            </div>
            <div className="space-y-3">
              <p className="text-gray-700 text-sm">How are you feeling today?</p>
              <div className="flex flex-wrap gap-2">
                {todayJourneyData.moodOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setMood(option.value)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                      mood === option.value
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {mood && (
                <textarea
                  placeholder="Write your thoughts..."
                  className="w-full mt-2 p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                  rows="3"
                ></textarea>
              )}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">📅</span>
              <h2 className="text-xl font-bold text-gray-800">Upcoming Appointments</h2>
            </div>
            <div className="space-y-3">
              {todayJourneyData.upcomingAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{appointment.title}</p>
                    <p className="text-sm text-gray-600">{appointment.doctor}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800 text-sm">{appointment.date}</p>
                    <p className="text-xs text-gray-600">{appointment.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default TodayJourney;