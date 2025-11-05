import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import lady from "../img/women.jpg"
function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6">
              Welcome to Your
              <span className="text-purple-600 block">HiranyaGarbha </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Your trusted companion for a healthy, mindful, and joyful pregnancy experience.
              Access personalized care, nutrition guidance, and wellness support all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link to="/prenatal" className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105 text-center">
                Start Your Journey
              </Link>
              <Link to="/profile" className="bg-white hover:bg-gray-50 text-purple-600 px-6 sm:px-8 py-3 rounded-lg font-semibold border-2 border-purple-600 transition duration-300 text-center">
                View Profile
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-purple-200 rounded-full opacity-20"></div>
        <div className="absolute -top-10 -left-10 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-pink-200 rounded-full opacity-20"></div>
      </div>
      {/* Featured Section */}
      <div className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
                Your Journey to Parenthood Starts with Us
                <br />

              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                At Hiranyagarbha Garbha Sanskar LLP, we bring together ancient wisdom with modern techniques to commemorate the origins of life. Prenatal care is essential for both the mother and the child. Our purpose is to support you through this transforming journey while protecting your and your child’s well-being, using the traditional Indian method of Garbha Sanskar, which translates to ‘education of mind inside the womb.’ We offer expert advice, supporting your overall health and the journey to motherhood. Your journey to parenthood starts here –
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/prenatal" className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition duration-300 text-center">
                  Learn More
                </Link>
                <Link to="/wellness" className="bg-white hover:bg-gray-50 text-purple-600 px-6 sm:px-8 py-3 rounded-lg font-semibold border-2 border-purple-600 transition duration-300 text-center">
                  Our Programs
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <svg className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-purple-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <p className="text-purple-600 font-semibold text-sm sm:text-base">Pregnancy Wellness</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-purple-200 rounded-full opacity-30"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 sm:w-20 sm:h-20 bg-pink-200 rounded-full opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
              9 Months of Care,<br />
              <span className="text-purple-600">a Lifetime of LOVE</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              Creating Lasting Bonds. With Hiranyagarbha Garbha Sanskar LLP, set out on an enriching journey as a parent.
              Our personalized Garbha Sanskar care guarantees a positive and healthy relationship between you and your unborn child.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/prenatal" className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition duration-300 text-center">
                Learn More
              </Link>
              <Link to="/wellness" className="bg-white hover:bg-gray-50 text-purple-600 px-6 sm:px-8 py-3 rounded-lg font-semibold border-2 border-purple-600 transition duration-300 text-center">
                Our Programs
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2 py-2">
            <img src={lady} />
          </div>
        </div>
        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
            <div className="text-gray-600">Weeks Tracked</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-pink-600 mb-2">85%</div>
            <div className="text-gray-600">Goals Achieved</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">24</div>
            <div className="text-gray-600">Sessions Completed</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
            <div className="text-gray-600">Milestones Reached</div>
          </div>
        </div>

        {/* Pregnancy Journey Stages */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12 px-4">Your Pregnancy Journey</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-pink-600">1-12</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">First Trimester</h3>
              <p className="text-gray-600 text-sm">Weeks 1-12: Foundation building, early development, and essential care</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">13-26</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Second Trimester</h3>
              <p className="text-gray-600 text-sm">Weeks 13-26: Energy returns, baby grows rapidly, prepare for delivery</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">27-40</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Third Trimester</h3>
              <p className="text-gray-600 text-sm">Weeks 27-40: Final preparations, birth planning, and newborn care</p>
            </div>
          </div>
        </div>

        {/* Service Cards */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12 px-4">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <Link to="/prenatal" className="group">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-200 transition duration-300">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Prenatal Care</h3>
              <p className="text-gray-600 mb-4">Comprehensive medical care and monitoring throughout your pregnancy journey</p>
              <div className="flex items-center text-purple-600 font-medium">
                Learn More
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          <Link to="/nutrition" className="group">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-200 transition duration-300">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Nutrition</h3>
              <p className="text-gray-600 mb-4">Personalized meal plans and nutritional guidance for optimal health</p>
              <div className="flex items-center text-green-600 font-medium">
                Learn More
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          <Link to="/wellness" className="group">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-pink-200 transition duration-300">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Wellness</h3>
              <p className="text-gray-600 mb-4">Mindful practices, meditation, and emotional support for mothers</p>
              <div className="flex items-center text-pink-600 font-medium">
                Learn More
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 px-2">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center p-3 sm:p-4 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-800 text-sm sm:text-base">Completed prenatal check-up</p>
                <p className="text-xs sm:text-sm text-gray-600">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center p-3 sm:p-4 bg-green-50 rounded-lg">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-800 text-sm sm:text-base">Updated nutrition goals</p>
                <p className="text-xs sm:text-sm text-gray-600">1 week ago</p>
              </div>
            </div>
            <div className="flex items-center p-3 sm:p-4 bg-pink-50 rounded-lg">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-100 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-800 text-sm sm:text-base">Completed meditation session</p>
                <p className="text-xs sm:text-sm text-gray-600">3 days ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 px-2">Upcoming Appointments</h3>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg gap-3 sm:gap-0">
              <div className="flex items-center min-w-0 flex-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-800 text-sm sm:text-base">Prenatal Check-up</p>
                  <p className="text-xs sm:text-sm text-gray-600">Dr. Sarah Johnson</p>
                </div>
              </div>
              <div className="text-left sm:text-right flex-shrink-0">
                <p className="font-medium text-gray-800 text-sm sm:text-base">Tomorrow</p>
                <p className="text-xs sm:text-sm text-gray-600">10:00 AM</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg gap-3 sm:gap-0">
              <div className="flex items-center min-w-0 flex-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-800 text-sm sm:text-base">Nutrition Consultation</p>
                  <p className="text-xs sm:text-sm text-gray-600">Dietitian Emma Wilson</p>
                </div>
              </div>
              <div className="text-left sm:text-right flex-shrink-0">
                <p className="font-medium text-gray-800 text-sm sm:text-base">Next Week</p>
                <p className="text-xs sm:text-sm text-gray-600">2:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pregnancy Wellness Gallery */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12 px-4">Pregnancy Wellness Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                <svg className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="p-4 sm:p-5 lg:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Prenatal Yoga</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Gentle yoga poses designed specifically for pregnant women to improve flexibility, strength, and relaxation.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center">
                <svg className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="p-4 sm:p-5 lg:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Healthy Nutrition</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Balanced meals rich in essential nutrients like folic acid, iron, calcium, and omega-3 for you and your baby.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                <svg className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="p-4 sm:p-5 lg:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Meditation & Mindfulness</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Guided meditation sessions to reduce stress, improve sleep, and connect with your changing body.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-blue-200 to-green-200 flex items-center justify-center">
                <svg className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="p-4 sm:p-5 lg:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Regular Check-ups</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Comprehensive prenatal care with monitoring of both mother and baby's health throughout pregnancy.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-yellow-200 to-orange-200 flex items-center justify-center">
                <svg className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="p-4 sm:p-5 lg:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Support Community</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Connect with other expecting mothers for shared experiences, advice, and emotional support.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-red-200 to-pink-200 flex items-center justify-center">
                <svg className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="p-4 sm:p-5 lg:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Emotional Well-being</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Tools and resources to manage pregnancy emotions, anxiety, and prepare for motherhood.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Expert Team */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12 px-4">Meet Our Expert Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">Dr. S</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Dr. Sarah Johnson</h3>
              <p className="text-purple-600 font-medium text-sm mb-3">Chief Obstetrician</p>
              <p className="text-gray-600 text-xs sm:text-sm">15+ years of experience in maternal care and high-risk pregnancies</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">Dr. E</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Dr. Emma Wilson</h3>
              <p className="text-green-600 font-medium text-sm mb-3">Nutrition Specialist</p>
              <p className="text-gray-600 text-xs sm:text-sm">Certified dietitian specializing in pregnancy nutrition and meal planning</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">Ms. L</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Lisa Chen</h3>
              <p className="text-pink-600 font-medium text-sm mb-3">Wellness Coach</p>
              <p className="text-gray-600 text-xs sm:text-sm">Certified yoga instructor and mindfulness meditation guide for expectant mothers</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">Dr. s</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Dr. Sandeep Deshmukh</h3>
              <p className="text-blue-600 font-medium text-sm mb-3">MD (MS, MA (Sanskrit))</p>
              <p className="text-gray-600 text-xs sm:text-sm">
                (Work experience - 13 years)</p>
            </div>
          </div>
        </div>

        {/* Client Reviews Slider */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12 px-4">What Our Clients Say</h2>
          <div className="relative overflow-hidden">
            <div className="flex space-x-4 sm:space-x-6 lg:space-x-8 overflow-x-auto pb-4 px-4 scrollbar-hide">
              <div className="flex-shrink-0 w-80 sm:w-96 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-purple-600 font-bold text-lg">P</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Priya Sharma</h4>
                    <div className="flex text-yellow-400">
                      ★★★★★
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm sm:text-base italic">
                  "The personalized care and nutrition guidance helped me have a healthy pregnancy.
                  The wellness programs were incredibly supportive throughout my journey."
                </p>
              </div>

              <div className="flex-shrink-0 w-80 sm:w-96 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-pink-600 font-bold text-lg">A</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Anjali Patel</h4>
                    <div className="flex text-yellow-400">
                      ★★★★★
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm sm:text-base italic">
                  "Amazing experience! The meditation sessions helped me stay calm during my first pregnancy.
                  Highly recommend their prenatal care services."
                </p>
              </div>

              <div className="flex-shrink-0 w-80 sm:w-96 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold text-lg">R</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Radhika Singh</h4>
                    <div className="flex text-yellow-400">
                      ★★★★★
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm sm:text-base italic">
                  "The nutrition planning was exceptional. I felt confident and healthy throughout my pregnancy.
                  The support community is also very helpful."
                </p>
              </div>

              <div className="flex-shrink-0 w-80 sm:w-96 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold text-lg">M</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Meera Joshi</h4>
                    <div className="flex text-yellow-400">
                      ★★★★★
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm sm:text-base italic">
                  "Outstanding service! The regular check-ups and monitoring gave me peace of mind.
                  Their team is professional and caring."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="text-center px-4">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8">Daily Pregnancy Tip</h3>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 sm:p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-lg sm:text-xl font-medium mb-4">Stay Hydrated!</p>
            <p className="text-purple-100 text-sm sm:text-base">
              Drinking plenty of water is crucial during pregnancy. Aim for at least 8-10 glasses per day
              to support your increased blood volume and amniotic fluid levels.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;