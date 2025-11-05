import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Product() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    {
      id: 1,
      name: "Garbha Sanskar Kit",
      category: "kits",
      price: "₹2,499",
      originalPrice: "₹3,499",
      rating: 4.8,
      reviews: 156,
      image: "/img/garbha-kit.jpg",
      description: "Complete 9-month Garbha Sanskar program kit with audio CDs, books, and guided meditations.",
      features: ["9 Audio CDs", "Guided Meditation", "Daily Practice Book", "Progress Tracker"]
    },
    {
      id: 2,
      name: "Prenatal Yoga Mat",
      category: "equipment",
      price: "₹1,299",
      originalPrice: "₹1,799",
      rating: 4.6,
      reviews: 89,
      image: "/img/yoga-mat.jpg",
      description: "Premium non-slip yoga mat designed specifically for pregnant women with extra cushioning.",
      features: ["Non-slip surface", "Extra cushioning", "Eco-friendly material", "Carrying strap"]
    },
    {
      id: 3,
      name: "Nutrition Guide Book",
      category: "books",
      price: "₹599",
      originalPrice: "₹899",
      rating: 4.9,
      reviews: 234,
      image: "/img/nutrition-book.jpg",
      description: "Comprehensive nutrition guide for pregnant women with meal plans and recipes.",
      features: ["Meal plans", "Recipes", "Nutritional facts", "Weekly planners"]
    },
    {
      id: 4,
      name: "Meditation Cushion",
      category: "equipment",
      price: "₹899",
      originalPrice: "₹1,299",
      rating: 4.7,
      reviews: 67,
      image: "/img/meditation-cushion.jpg",
      description: "Comfortable meditation cushion with supportive design for extended sitting.",
      features: ["Ergonomic design", "Removable cover", "Washable fabric", "Foldable"]
    },
    {
      id: 5,
      name: "Baby Brain Development Cards",
      category: "books",
      price: "₹449",
      originalPrice: "₹649",
      rating: 4.5,
      reviews: 123,
      image: "/img/brain-cards.jpg",
      description: "Interactive cards designed to stimulate baby's brain development in the womb.",
      features: ["52 cards", "Age-appropriate", "Colorful illustrations", "Instruction guide"]
    },
    {
      id: 6,
      name: "Pregnancy Wellness Package",
      category: "kits",
      price: "₹3,999",
      originalPrice: "₹5,499",
      rating: 4.9,
      reviews: 78,
      image: "/img/wellness-package.jpg",
      description: "Complete wellness package including yoga mat, meditation cushion, and nutrition guide.",
      features: ["Yoga mat", "Meditation cushion", "Nutrition guide", "Bonus audio tracks"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'kits', name: 'Program Kits', count: products.filter(p => p.category === 'kits').length },
    { id: 'books', name: 'Books & Guides', count: products.filter(p => p.category === 'books').length },
    { id: 'equipment', name: 'Equipment', count: products.filter(p => p.category === 'equipment').length }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">☆</span>);
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Our Products
            </h1>
            <p className="text-xl sm:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Discover our carefully curated collection of products designed to support your pregnancy journey and enhance your wellness experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition duration-300">
                Shop Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-white/10 rounded-full"></div>
        <div className="absolute -top-10 -left-10 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-white/10 rounded-full"></div>
      </div>

      {/* Category Filter */}
      <div className="bg-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-600'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <div className="h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-purple-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <p className="text-purple-600 font-semibold text-sm sm:text-base">{product.name}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  SALE
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                    <span className="text-gray-600 text-sm ml-2">({product.reviews})</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">{product.name}</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed">{product.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl sm:text-3xl font-bold text-purple-600">{product.price}</span>
                    <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
                  </div>
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
                    SAVE ₹{parseInt(product.originalPrice.replace('₹', '').replace(',', '')) - parseInt(product.price.replace('₹', '').replace(',', ''))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition duration-300">
                    Add to Cart
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold transition duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Start Your Wellness Journey Today
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Invest in products that support your pregnancy and enhance your overall wellness experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition duration-300">
              Contact Us
            </Link>
            <Link to="/" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition duration-300">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Product;