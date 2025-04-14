"use client";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

interface PlanVariant {
  id: number;
  duration: string;
  price: string;
  plan: number;
}

interface Plan {
  id: number;
  plan_name: string;
  average_time_spend: boolean;
  bi_assured: boolean;
  bi_certification: boolean;
  bi_verification: boolean;
  chat: boolean;
  google_map: boolean;
  image_gallery: boolean;
  keywords: boolean;
  most_searhed_p_s: boolean;
  products_and_service_visibility: boolean;
  profile_view_count: boolean;
  profile_visit: boolean;
  sa_rate: boolean;
  search_priority_1: boolean;
  search_priority_2: boolean;
  search_priority_3: boolean;
  social_media_paid_promotion_in_bi_youtube: boolean;
  todays_offer: boolean;
  video_gallery: boolean;
  whatsapp_chat: boolean;
  varients: PlanVariant[];
}

const FEATURES_MAP: { key: keyof Plan; label: string; category: string }[] = [
  { key: "chat", label: "Live Chat", category: "Communication" },
  { key: "whatsapp_chat", label: "WhatsApp Chat", category: "Communication" },
  { key: "google_map", label: "Google Map Integration", category: "Visibility" },
  { key: "image_gallery", label: "Image Gallery", category: "Content" },
  { key: "video_gallery", label: "Video Gallery", category: "Content" },
  { key: "keywords", label: "Keyword Support", category: "SEO" },
  { key: "most_searhed_p_s", label: "Top Searched Products", category: "Analytics" },
  { key: "profile_view_count", label: "Profile View Count", category: "Analytics" },
  { key: "profile_visit", label: "Profile Visit Analytics", category: "Analytics" },
  { key: "search_priority_1", label: "Highest Search Priority", category: "Visibility" },
  { key: "search_priority_2", label: "High Search Priority", category: "Visibility" },
  { key: "search_priority_3", label: "Standard Search Priority", category: "Visibility" },
];

const PricingPage = ({ onClick }: { onClick: (variantId: number) => void }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<Record<number, number>>({});
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await api.get("users/plans/");
      if (response.status === 200) {
        setPlans(response.data);
        const defaultSelections = response.data.reduce((acc: Record<number, number>, plan: Plan) => {
          if (plan.varients.length > 0) {
            acc[plan.id] = plan.varients[0].id;
          }
          return acc;
        }, {});
        setSelectedVariants(defaultSelections);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  const handleVariantChange = (planId: number, variantId: number) => {
    setSelectedVariants(prev => ({ ...prev, [planId]: variantId }));
  };

  const getFeaturesByCategory = (plan: Plan) => {
    const featuresByCategory: Record<string, { label: string; included: boolean }[]> = {};
    
    FEATURES_MAP.forEach(({ key, label, category }) => {
      if (!featuresByCategory[category]) {
        featuresByCategory[category] = [];
      }
      featuresByCategory[category].push({
        label,
        included: plan[key] as boolean
      });
    });
    
    return featuresByCategory;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Choose Your Perfect Plan
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the plan that best fits your business needs and budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const featuresByCategory = getFeaturesByCategory(plan);
            const isPopular = index === 1;
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${isPopular ? 'border-2 border-blue-500 shadow-xl' : 'border border-gray-200 shadow-lg'}`}
              >
                {isPopular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                
                <div className="bg-white p-6">
                  <div className="mb-6">
                    <h2 className={`text-2xl font-bold mb-2 ${isPopular ? 'text-blue-600' : 'text-gray-800'}`}>
                      {plan.plan_name}
                    </h2>
                    
                    <div className="space-y-3 mb-4">
                      {plan.varients.map(variant => (
                        <label 
                          key={variant.id} 
                          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${selectedVariants[plan.id] === variant.id ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 hover:bg-gray-100'}`}
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name={`variant-${plan.id}`}
                              value={variant.id}
                              checked={selectedVariants[plan.id] === variant.id}
                              onChange={() => handleVariantChange(plan.id, variant.id)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-3 text-gray-700 font-medium">
                              {variant.duration} days
                            </span>
                          </div>
                          <span className="text-gray-900 font-bold">
                            ₹{variant.price}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Features</h3>
                    
                    <div className="space-y-4">
                      {Object.entries(featuresByCategory).map(([category, features]) => (
                        <div key={category}>
                          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                            {category}
                          </h4>
                          <ul className="space-y-2">
                            {features.map(({ label, included }) => (
                              <li key={label} className="flex items-start">
                                <span className={`flex-shrink-0 ${included ? 'text-green-500' : 'text-gray-300'}`}>
                                  <FaCheckCircle className="h-5 w-5" />
                                </span>
                                <span className={`ml-2 ${included ? 'text-gray-700' : 'text-gray-400 line-through'}`}>
                                  {label}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const selectedId = selectedVariants[plan.id];
                      if (selectedId) onClick(selectedId);
                    }}
                    className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all ${isPopular ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md hover:shadow-lg' : 'bg-white border border-blue-500 text-blue-600 hover:bg-blue-50'}`}
                  >
                    Get Started
                    <FiArrowRight className="ml-2" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">Need help choosing the right plan?</p>
          <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
            Contact our sales team <FiArrowRight className="inline ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;