import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // For feature icons

const PricingPage = () => {
  const allFeatures = [
    'Brand Identity', 'Business Address', 'Contact Information', 'Email Address', 'Operating Hours',
    'Image Gallery', 'Visitor Analytics', 'Website URL', 'Social Sharing',
    'Company Description', 'Business Location', 'Video Gallery', 'Lead Generation Tools',
    'Social Media Exposure', 'One-Time YouTube Campaign',
    'Verified Badge & Trust', 'Customer Reviews', 'Product Catalog', 'Booking & Payment System',
    'WhatsApp Integration', 'Business Certification', 'Awards & Recognition'
  ];

  const plans = [
    {
      name: 'Basic Pack',
      description: 'For essential business needs with core features.',
      price: 'Rs.11,999/Y',
      features: [
        'Brand Identity', 'Business Address', 'Contact Information', 'Email Address', 'Operating Hours',
        'Image Gallery', 'Visitor Analytics', 'Website URL', 'Social Sharing',
        'Company Description', 'Business Location',
      ],
    },
    {
      name: 'Growth Pack',
      description: 'Designed for growing businesses with added marketing tools.',
      price: 'Rs.16,999/Y',
      features: [
        'Brand Identity', 'Business Address', 'Contact Information', 'Email Address', 'Operating Hours',
        'Image Gallery', 'Visitor Analytics', 'Website URL', 'Social Sharing',
        'Company Description', 'Business Location', 'Video Gallery', 'Lead Generation Tools',
        'Social Media Exposure', 'One-Time YouTube Campaign',
      ],
    },
    {
      name: 'Premium Pack',
      description: 'Comprehensive features for established businesses with advanced options.',
      price: 'Rs.24,999/Y',
      features: [
        'Brand Identity', 'Business Address', 'Contact Information', 'Email Address', 'Operating Hours',
        'Image Gallery', 'Visitor Analytics', 'Website URL', 'Social Sharing',
        'Company Description', 'Business Location', 'Verified Badge & Trust', 'Customer Reviews',
        'Product Catalog', 'Booking & Payment System', 'Lead Generation Tools', 'WhatsApp Integration',
        'Business Certification', 'Awards & Recognition', 'Video Gallery', 'Social Media Exposure',
        'One-Time YouTube Campaign',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r font-ubuntu from-indigo-50 to-sky-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden flex items-center justify-center">
      <div className="max-w-7xl mx-auto">
        <h1 className="md:text-5xl text-3xl font-ubuntuMedium font-extrabold text-center text-gray-900 mb-12">
          Choose Your Plan
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-2xl p-6 md:p-8 transition duration-300 transform hover:scale-105 hover:shadow-2xl hover:text-white relative flex flex-col h-full"
            >
              {index === 1 && (
                <div className="absolute top-0 right-0 bg-orange-500 text-white py-1 px-4 rounded-full text-xs font-semibold">
                  Recommended
                </div>
              )}
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">{plan.name}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">{plan.description}</p>
              {/* Limit height and allow scrolling for features */}
              <div className="flex-grow overflow-y-auto max-h-56">
                <ul className="list-none pl-0 space-y-3 text-gray-700">
                  {allFeatures.map((feature, i) => (
                    <li key={i} className="flex items-center text-lg">
                      {plan.features.includes(feature) ? (
                        <FaCheckCircle className="text-green-500 mr-3" />
                      ) : (
                        <FaTimesCircle className="text-red-500 mr-3" />
                      )}
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 flex flex-col items-center">
                <p className="text-4xl font-bold text-gray-900 mb-4">{plan.price}</p>
                <button className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-3 rounded-lg hover:bg-gradient-to-l hover:from-orange-700 hover:to-orange-600 transition duration-300 transform hover:scale-105">
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
