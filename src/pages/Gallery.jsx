import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Dynamically import all images from src/img folder
  const importAll = (r) => {
    return r.keys().map((key, index) => ({
      id: index + 1,
      src: r(key),
      alt: key.replace('./', '').replace(/\.(png|jpe?g|webp)$/i, '').replace(/[-_]/g, ' ')
    }));
  };

  const images = importAll(require.context('../img', false, /\.(png|jpe?g|webp)$/));


  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our journey, team, certifications, and memorable moments that define Hiranyagarbh Sanskar.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => openModal(image)}
            >
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={closeModal}>
            <div className="max-w-4xl max-h-full bg-white rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="relative">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto max-h-screen object-contain"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition duration-300"
                >
                  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4 bg-gray-50">
                <p className="text-gray-800 font-medium text-center">{selectedImage.alt}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Gallery;