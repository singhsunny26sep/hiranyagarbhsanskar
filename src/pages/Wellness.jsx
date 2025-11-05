import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Wellness() {
  const [activeCategory, setActiveCategory] = useState('all');

  const wellnessActivities = [
    {
      id: 1,
      title: "Guided Meditation",
      category: "mindfulness",
      duration: "10-15 mins",
      difficulty: "Beginner",
      description: "Peaceful meditation sessions designed for pregnant women to reduce stress and promote relaxation.",
      benefits: ["Reduces anxiety", "Improves sleep", "Enhances emotional well-being"],
      icon: "🧘‍♀️",
      color: "from-purple-400 to-purple-600"
    },
    {
      id: 2,
      title: "Prenatal Yoga",
      category: "physical",
      duration: "30-45 mins",
      difficulty: "Intermediate",
      description: "Gentle yoga poses and breathing exercises specifically designed for pregnancy comfort.",
      benefits: ["Improves flexibility", "Strengthens core", "Reduces back pain"],
      icon: "🧘",
      color: "from-pink-400 to-pink-600"
    },
    {
      id: 3,
      title: "Breathing Exercises",
      category: "mindfulness",
      duration: "5-10 mins",
      difficulty: "Beginner",
      description: "Simple breathing techniques to manage stress and prepare for labor.",
      benefits: ["Calms nervous system", "Improves oxygen flow", "Labor preparation"],
      icon: "💨",
      color: "from-blue-400 to-blue-600"
    },
    {
      id: 4,
      title: "Gentle Walking",
      category: "physical",
      duration: "20-30 mins",
      difficulty: "Beginner",
      description: "Low-impact walking routines suitable for all trimesters of pregnancy.",
      benefits: ["Cardiovascular health", "Mood enhancement", "Weight management"],
      icon: "🚶‍♀️",
      color: "from-green-400 to-green-600"
    },
    {
      id: 5,
      title: "Body Awareness",
      category: "physical",
      duration: "15-20 mins",
      difficulty: "Beginner",
      description: "Exercises to connect with your changing body and promote positive body image.",
      benefits: ["Body positivity", "Posture improvement", "Self-awareness"],
      icon: "🤰",
      color: "from-yellow-400 to-orange-500"
    },
    {
      id: 6,
      title: "Stress Management",
      category: "mindfulness",
      duration: "10-15 mins",
      difficulty: "Beginner",
      description: "Techniques to identify and manage pregnancy-related stress and anxiety.",
      benefits: ["Emotional balance", "Coping strategies", "Mental clarity"],
      icon: "🌸",
      color: "from-indigo-400 to-purple-600"
    }
  ];

  const filteredActivities = activeCategory === 'all'
    ? wellnessActivities
    : wellnessActivities.filter(activity => activity.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Wellness & Mindfulness
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover inner peace and physical harmony during your pregnancy journey.
            Our comprehensive wellness program nurtures both body and mind.
          </p>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-3 rounded-full font-semibold transition duration-300 ${
                activeCategory === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Activities
            </button>
            <button
              onClick={() => setActiveCategory('mindfulness')}
              className={`px-6 py-3 rounded-full font-semibold transition duration-300 ${
                activeCategory === 'mindfulness'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🧘 Mindfulness
            </button>
            <button
              onClick={() => setActiveCategory('physical')}
              className={`px-6 py-3 rounded-full font-semibold transition duration-300 ${
                activeCategory === 'physical'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              💪 Physical Wellness
            </button>
          </div>
        </div>

        {/* Wellness Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <div className={`h-32 bg-gradient-to-r ${activity.color} flex items-center justify-center`}>
                <span className="text-4xl">{activity.icon}</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">{activity.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    activity.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    activity.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {activity.difficulty}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4">{activity.description}</p>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">⏱️ {activity.duration}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activity.category === 'mindfulness' ? 'bg-purple-100 text-purple-800' : 'bg-pink-100 text-pink-800'
                  }`}>
                    {activity.category === 'mindfulness' ? 'Mindfulness' : 'Physical'}
                  </span>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Benefits:</h4>
                  <div className="flex flex-wrap gap-1">
                    {activity.benefits.map((benefit, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-semibold transition duration-300 transform hover:scale-105">
                  Start Session
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Wellness Tips Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Daily Wellness Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Stay Hydrated</h3>
                  <p className="text-gray-600">Drink plenty of water throughout the day. Proper hydration supports amniotic fluid levels and overall health.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-pink-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Practice Deep Breathing</h3>
                  <p className="text-gray-600">Take 5 minutes daily for deep breathing exercises to reduce stress and prepare for labor.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Gentle Movement</h3>
                  <p className="text-gray-600">Incorporate light walking or prenatal yoga to maintain physical health and reduce discomfort.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Mindful Eating</h3>
                  <p className="text-gray-600">Eat nutritious meals mindfully, focusing on how food nourishes both you and your baby.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-yellow-600 font-bold">5</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Quality Sleep</h3>
                  <p className="text-gray-600">Prioritize restful sleep by creating a comfortable sleep environment and consistent bedtime routine.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-600 font-bold">6</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Positive Affirmations</h3>
                  <p className="text-gray-600">Use positive affirmations daily to boost confidence and maintain a positive mindset.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Your Wellness Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">23</div>
              <div className="text-purple-100">Sessions Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">85%</div>
              <div className="text-purple-100">Consistency Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">12</div>
              <div className="text-purple-100">Weeks Active</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Begin Your Wellness Journey?</h2>
            <p className="text-gray-600 mb-6">
              Start with our beginner-friendly sessions and gradually build your wellness routine.
              Each session is designed to be safe and beneficial for you and your baby.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105">
                Start Free Session
              </button>
              <button className="bg-white hover:bg-gray-50 text-purple-600 px-8 py-3 rounded-lg font-semibold border-2 border-purple-600 transition duration-300">
                View All Programs
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Wellness;