import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <Header />
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center px-4">

      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-purple-600 mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Go to Dashboard
          </Link>

          <div className="text-gray-500">
            <p>Or try these popular pages:</p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Link to="/prenatal" className="text-purple-600 hover:text-purple-800 font-medium">Prenatal Care</Link>
              <Link to="/gallery" className="text-purple-600 hover:text-purple-800 font-medium">Gallery</Link>
              <Link to="/contact" className="text-purple-600 hover:text-purple-800 font-medium">Contact</Link>
            </div>
          </div>
        </div>
      </div>

    </div>
      <Footer />
      </>
  );
}

export default NotFound;