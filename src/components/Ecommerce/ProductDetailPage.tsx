"use client";

import { FaTimes, FaHeart, FaShare, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function PAndSViewModal({ onClose }: { onClose: () => void }) {
  const item = {
    name: "Wireless Headphones",
    description: "High-quality Bluetooth headphones with noise cancellation. Perfect for immersive audio experiences with 40mm drivers and 30-hour battery life.",
    price: 2999,
    category: "Electronics · Audio",
    searchCount: 150,
    images: [
      "https://imgs.search.brave.com/gIN9ZMBFAc-fVGxeEvRY8hGMkp6ThVe5FagX1tLFm2A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM0/NzY3NTM5OS9waG90/by90cmVuZHktd2ly/ZWxlc3Mtd2hpdGUt/aGVhZHBob25lcy1v/bi1yZWQtYmFja2dy/b3VuZC5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9Z3hJQ2RT/NHNOMHRacWttU3oy/Z0NiQWZrTDRpOExV/dnBTcnMwR04xZ2w1/WT0",
      "https://imgs.search.brave.com/1BNs6HrQ4SYLkThi8KFdldPDQG4LTilDynihyFihDDw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM3/MzAxNzU5NC9waG90/by9oZWFkcGhvbmVz/LW9uLXRoZS1vcmFu/Z2UtY29sb3ItYmFj/a2dyb3VuZC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9OVNF/QlQtNmtVaklCeTMz/R2EtQzluNkNRTWQ3/Rk9VazN5Qzg5bU9B/YTB0cz0",
      "https://imgs.search.brave.com/MGyWuttWD49cFbqzcHOFKvhvrvlUCHE0mHkrc3vC3QU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE5/Nzg4NzExOS9waG90/by9oZWFkcGhvbmVz/LW9uLWJsdWUtYmFj/a2dyb3VuZC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9dzZx/eWhla1I4UXY5aVhs/Sy0wWFRScUl4Q1ox/a3RKN3QtcHhUM2NP/cFFxQT0",
    ],
    type: "product",
    rating: 4.7,
    reviews: 128,
    colors: ["Space Gray", "Midnight Blue", "Rose Gold"],
    features: [
      "Active Noise Cancellation",
      "30-hour battery",
      "Touch controls",
      "Built-in mic",
    ],
  };

  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const nextImage = () => {
    setActiveImage((prev) => (prev === item.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev === 0 ? item.images.length - 1 : prev - 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-lg bg-black/30">
      <div 
        className="relative w-full max-w-4xl bg-white/90 rounded-2xl overflow-hidden shadow-2xl border border-white/20"
        style={{
          backdropFilter: 'blur(16px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
      >
        {/* Header */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-white/80 hover:bg-white transition-all shadow-md"
            aria-label="Close"
          >
            <FaTimes className="text-gray-700" />
          </button>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-full ${isFavorite ? 'bg-red-100 text-red-500' : 'bg-white/80 text-gray-700'} transition-all shadow-md`}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <FaHeart className={isFavorite ? "fill-current" : ""} />
            </button>
            <button className="p-2 rounded-full bg-white/80 hover:bg-white transition-all shadow-md text-gray-700">
              <FaShare />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Image Gallery */}
          <div className="relative">
            <div className="aspect-square w-full rounded-xl bg-gray-100 overflow-hidden relative">
              <img
                src={item.images[activeImage]}
                alt={item.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              
              {/* Navigation Arrows */}
              {item.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-all shadow-md text-gray-700"
                    aria-label="Previous image"
                  >
                    <FaChevronLeft />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-all shadow-md text-gray-700"
                    aria-label="Next image"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="flex space-x-3 mt-4 overflow-x-auto pb-2">
              {item.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${activeImage === index ? 'border-orange-500' : 'border-transparent'}`}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                {item.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">{item.name}</h1>
              
              <div className="flex items-center mt-1">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(item.rating) ? 'fill-current' : 'fill-none stroke-current'}`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {item.rating} ({item.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="my-4">
              <div className="text-4xl font-bold text-gray-900">
                ₹{item.price.toLocaleString()}
              </div>
              <div className="text-sm text-green-600 mt-1">
                Includes GST • Free shipping
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900">Colors</h3>
              <div className="flex space-x-2 mt-2">
                {item.colors.map((color, i) => (
                  <button
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    style={{ backgroundColor: color.toLowerCase().includes('gray') ? '#6b7280' : color.toLowerCase().includes('blue') ? '#1e40af' : '#be185d' }}
                    aria-label={color}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900">Key Features</h3>
              <ul className="mt-2 space-y-2">
                {item.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900">Description</h3>
              <p className={`mt-2 text-gray-700 ${isExpanded ? '' : 'line-clamp-3'}`}>
                {item.description}
              </p>
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-orange-600 text-sm font-medium mt-1 hover:underline focus:outline-none"
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </button>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-4">
              <button className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Add to Cart
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity shadow-md">
                Buy Now
              </button>
            </div>

            <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
              <span>{item.searchCount} searches this month</span>
              <span>Item #HD-{Math.floor(Math.random() * 10000)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}