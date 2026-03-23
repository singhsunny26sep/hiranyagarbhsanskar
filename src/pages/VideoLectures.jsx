import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import placeholderImg from '../img/LOGO.png';

function VideoLectures() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      // Fetch all banners by setting limit to high value to get all 14+ videos
      const response = await fetch('https://hiranyagarbha.onrender.com/hiranyagarbha/banners/getAll?limit=100');
      const result = await response.json();
      
      if (result.success) {
        setBanners(result.data.data);
      } else {
        setError('Failed to fetch banners');
      }
    } catch (err) {
      setError('Error fetching data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories from subCategory
  const categories = [
    { id: 'all', name: 'All Lectures', count: banners.length },
    ...banners
      .filter(banner => banner.subCategory && banner.subCategory.name)
      .reduce((acc, banner) => {
        const existing = acc.find(c => c.id === banner.subCategory._id);
        if (!existing) {
          acc.push({
            id: banner.subCategory._id,
            name: banner.subCategory.name,
            count: 1
          });
        } else {
          existing.count += 1;
        }
        return acc;
      }, [])
  ];

  const filteredBanners = activeCategory === 'all' 
    ? banners 
    : banners.filter(banner => banner.subCategory && banner.subCategory._id === activeCategory);

  const handleVideoClick = (banner) => {
    setSelectedVideo(banner);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  // Handle image error - use fallback image
  const handleImageError = (bannerId) => {
    setImageErrors(prev => ({ ...prev, [bannerId]: true }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600 border-opacity-75 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading video lectures...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button 
              onClick={fetchBanners}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
        {categories.length > 1 && (
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
        )}

        {/* Video Grid */}
        {filteredBanners.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No video lectures available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBanners.map((banner) => (
              <div 
                key={banner._id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={() => handleVideoClick(banner)}
              >
                <div className="relative">
                  {/* Thumbnail with play button overlay */}
                  <div className="w-full h-48 bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                    <img
                      src={imageErrors[banner._id] ? placeholderImg : banner.image}
                      alt={banner.name}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(banner._id)}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-40 transition duration-300 flex items-center justify-center">
                    <div className="bg-white bg-opacity-95 hover:bg-opacity-100 text-purple-600 p-4 rounded-full transition duration-300 transform hover:scale-110">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  {banner.subCategory && (
                    <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {banner.subCategory.name}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{banner.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{banner.description}</p>

                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-semibold transition duration-300">
                    Watch Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

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

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-[#000000cf] bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition duration-300"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className=" rounded-lg overflow-hidden">
              <div className="relative pt-[56.25%]">
                <video
                  src={selectedVideo.video}
                  controls
                  autoPlay
                  className="absolute inset-0 w-full h-full"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className="bg-white p-6 rounded-b-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedVideo.name}</h3>
              <p className="text-gray-600">{selectedVideo.description}</p>
              {selectedVideo.subCategory && (
                <span className="inline-block mt-3 bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                  {selectedVideo.subCategory.name}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoLectures;