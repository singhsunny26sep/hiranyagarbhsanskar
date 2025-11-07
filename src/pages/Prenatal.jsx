import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Prenatal() {
  const [activeTrimester, setActiveTrimester] = useState('first');

  const trimesterData = {
    first: {
      title: "First Trimester (Weeks 1-12)",
      focus: "Foundation & Development",
      checkups: [
        { week: "Week 4-6", tests: ["Initial consultation", "Blood tests", "Ultrasound"] },
        { week: "Week 8-10", tests: ["NT scan", "Blood pressure check", "Weight monitoring"] },
        { week: "Week 11-12", tests: ["Nuchal translucency", "First trimester screening"] }
      ],
      symptoms: ["Nausea", "Fatigue", "Breast tenderness", "Frequent urination"],
      tips: [
        "Take prenatal vitamins daily",
        "Stay hydrated and eat small meals",
        "Get plenty of rest",
        "Avoid raw or undercooked foods"
      ]
    },
    second: {
      title: "Second Trimester (Weeks 13-26)",
      focus: "Growth & Energy",
      checkups: [
        { week: "Week 16-18", tests: ["Anatomy scan", "Blood tests", "Amniocentesis (optional)"] },
        { week: "Week 20-22", tests: ["Detailed ultrasound", "Glucose screening"] },
        { week: "Week 24-26", tests: ["Growth scan", "Blood pressure monitoring"] }
      ],
      symptoms: ["Reduced nausea", "Increased energy", "Visible baby bump", "Back pain"],
      tips: [
        "Continue prenatal vitamins",
        "Practice prenatal yoga",
        "Monitor fetal movements",
        "Consider maternity clothes"
      ]
    },
    third: {
      title: "Third Trimester (Weeks 27-40)",
      focus: "Preparation & Birth",
      checkups: [
        { week: "Week 28-30", tests: ["Rh antibody screening", "Tetanus booster"] },
        { week: "Week 32-34", tests: ["Growth scan", "Pelvic exam"] },
        { week: "Week 36-38", tests: ["Final check-ups", "Birth plan discussion"] }
      ],
      symptoms: ["Braxton Hicks", "Swelling", "Sleep difficulties", "Back pain"],
      tips: [
        "Prepare birth plan",
        "Pack hospital bag",
        "Practice relaxation techniques",
        "Monitor for preterm labor signs"
      ]
    }
  };

  const services = [
    {
      icon: "🏥",
      title: "Medical Check-ups",
      description: "Regular monitoring of maternal and fetal health with comprehensive screenings and ultrasounds.",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: "🩺",
      title: "Health Monitoring",
      description: "Continuous tracking of blood pressure, weight, and other vital signs throughout pregnancy.",
      color: "from-green-400 to-green-600"
    },
    {
      icon: "📚",
      title: "Educational Resources",
      description: "Comprehensive guides, workshops, and materials to prepare you for pregnancy and parenthood.",
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: "💊",
      title: "Nutrition Guidance",
      description: "Personalized dietary recommendations and meal planning for optimal maternal and fetal health.",
      color: "from-orange-400 to-orange-600"
    },
    {
      icon: "🧘‍♀️",
      title: "Mental Health Support",
      description: "Counseling services and emotional support to help manage pregnancy-related stress and anxiety.",
      color: "from-pink-400 to-pink-600"
    },
    {
      icon: "⚕️",
      title: "Emergency Care",
      description: "24/7 access to medical professionals for urgent pregnancy-related concerns and complications.",
      color: "from-red-400 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Prenatal Care Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive medical care and support throughout your pregnancy journey.
            From conception to delivery, we're here to ensure a healthy pregnancy for you and your baby.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mb-4`}>
                <span className="text-2xl">{service.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Trimester Guide */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Pregnancy Journey by Trimester</h2>

          {/* Trimester Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {Object.keys(trimesterData).map((trimester) => (
              <button
                key={trimester}
                onClick={() => setActiveTrimester(trimester)}
                className={`px-6 py-3 rounded-full font-semibold capitalize transition duration-300 ${
                  activeTrimester === trimester
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {trimester} Trimester
              </button>
            ))}
          </div>

          {/* Trimester Content */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{trimesterData[activeTrimester].title}</h3>
              <p className="text-purple-600 font-medium">{trimesterData[activeTrimester].focus}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Check-ups */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Recommended Check-ups</h4>
                <div className="space-y-3">
                  {trimesterData[activeTrimester].checkups.map((checkup, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="font-medium text-gray-800">{checkup.week}</div>
                      <div className="text-sm text-gray-600">{checkup.tests.join(", ")}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Symptoms */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Common Symptoms</h4>
                <div className="space-y-2">
                  {trimesterData[activeTrimester].symptoms.map((symptom, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                      {symptom}
                    </div>
                  ))}
                </div>
              </div>

              {/* Helpful Tips */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Helpful Tips</h4>
                <div className="space-y-2">
                  {trimesterData[activeTrimester].tips.map((tip, index) => (
                    <div key={index} className="flex items-start text-gray-700">
                      <span className="w-2 h-2 bg-pink-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span className="text-sm">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">When to Call Your Doctor</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-red-600 text-xs font-bold">!</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Emergency Signs</h3>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• Severe bleeding</li>
                    <li>• Severe abdominal pain</li>
                    <li>• High fever (over 101°F)</li>
                    <li>• Decreased fetal movement</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-yellow-600 text-xs font-bold">?</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Concerning Signs</h3>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• Mild bleeding or spotting</li>
                    <li>• Severe headaches</li>
                    <li>• Vision changes</li>
                    <li>• Swelling in hands/face</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Prenatal Care Excellence</h2>
            <div className="text-center">
              <img
                src={require('../img/women.jpg')}
                alt="Prenatal Care"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-purple-100">
                Our comprehensive prenatal care ensures the health and well-being of both mother and baby throughout the entire pregnancy journey.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Schedule Your First Appointment</h2>
            <p className="text-gray-600 mb-6">
              Begin your prenatal care journey with a comprehensive initial consultation.
              We'll create a personalized care plan tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open('https://wa.me/7972833428', '_blank')}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span>Book Appointment</span>
              </button>
              <button className="bg-white hover:bg-gray-50 text-purple-600 px-8 py-3 rounded-lg font-semibold border-2 border-purple-600 transition duration-300">
                Call Now: +91 8149343628
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Prenatal;