import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function VideoLectures() {
  const [activeCategory, setActiveCategory] = useState('all');

  const videoLectures = [
    {
      id: 1,
      title: "Understanding Prenatal Nutrition",
      category: "nutrition",
      tags: ["Prenatal", "Nutrition", "Health"],
      duration: "15:30",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Learn about essential nutrients needed during pregnancy and how to maintain a balanced diet."
    },
    {
      id: 2,
      title: "First Trimester Care Guide",
      category: "prenatal",
      tags: ["Prenatal", "First Trimester", "Care"],
      duration: "12:45",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Comprehensive guide to managing your health during the first three months of pregnancy."
    },
    {
      id: 3,
      title: "Prenatal Yoga for Beginners",
      category: "wellness",
      tags: ["Wellness", "Yoga", "Exercise"],
      duration: "20:15",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Gentle yoga poses and breathing exercises designed specifically for pregnant women."
    },
    {
      id: 4,
      title: "Baby Brain Development",
      category: "education",
      tags: ["Education", "Development", "Baby"],
      duration: "18:20",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Understanding fetal brain development and how you can support it during pregnancy."
    },
    {
      id: 5,
      title: "Postpartum Recovery Tips",
      category: "postnatal",
      tags: ["Postnatal", "Recovery", "Tips"],
      duration: "14:10",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Essential tips for recovery and self-care after childbirth."
    },
    {
      id: 6,
      title: "Breastfeeding Basics",
      category: "nutrition",
      tags: ["Nutrition", "Breastfeeding", "Newborn"],
      duration: "16:55",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Everything you need to know about starting your breastfeeding journey."
    }
  ];

  const categories = [
    { id: 'all', name: 'All Lectures', count: videoLectures.length },
    { id: 'prenatal', name: 'Prenatal Care', count: videoLectures.filter(v => v.category === 'prenatal').length },
    { id: 'nutrition', name: 'Nutrition', count: videoLectures.filter(v => v.category === 'nutrition').length },
    { id: 'wellness', name: 'Wellness', count: videoLectures.filter(v => v.category === 'wellness').length },
    { id: 'education', name: 'Education', count: videoLectures.filter(v => v.category === 'education').length },
    { id: 'postnatal', name: 'Postnatal Care', count: videoLectures.filter(v => v.category === 'postnatal').length }
  ];

  const filteredLectures = activeCategory === 'all' ? videoLectures : videoLectures.filter(video => video.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Video Lectures
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Educational video content to guide you through your pregnancy and parenting journey.
            Learn from experts and stay informed with our comprehensive video library.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition duration-300 ${
                activeCategory === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLectures.map((video) => (
            <div key={video.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition duration-300 flex items-center justify-center">
                  <button className="bg-white bg-opacity-90 hover:bg-opacity-100 text-purple-600 p-3 rounded-full transition duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {video.tags.map((tag, index) => (
                    <span key={index} className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-2">{video.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{video.description}</p>

                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-semibold transition duration-300">
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Have Questions?</h2>
            <p className="text-gray-600 mb-6">
              Our experts are here to help you understand the content better and provide personalized guidance.
            </p>
            <button
              onClick={() => window.open('https://wa.me/7972833428', '_blank')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default VideoLectures;