"use client";

import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaPercent, FaTags } from "react-icons/fa"; 
import {motion} from 'framer-motion'

interface Offer {
  buisness: number;
  id: number;
  is_flat: boolean;
  is_percent: boolean;
  minimum_bill_amount: number;
  offer: number;
  valid_upto: string;
}

export default function OfferBiProfile({ Offers }: { Offers: Offer[] }) {
  const [browser, setBrowser] = useState(false);
  
  useEffect(() => {
    setBrowser(true);
  }, []);

  if (!browser) return null;

  const offerHandle = (offer: Offer) => {
    if (offer.is_percent) {
      return `${offer.offer}% off on purchases over ₹${offer.minimum_bill_amount}`;
    } else {
      return `₹${offer.offer} flat off on purchases over ₹${offer.minimum_bill_amount}`;
    }
  };

  return (
    <div className="space-y-6 font-ubuntu">
    <div className="mb-4">
      <h1 className="text-2xl font-bold text-gray-800 font-ubuntuMedium">Special Offers</h1>
      <p className="text-gray-500 mt-1">Exclusive deals just for you</p>
    </div>
  
    {Offers?.length === 0 ? (
      <div className="text-center py-8 bg-white rounded-xl border border-dashed border-gray-300">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
          <FaTags className="text-gray-400 text-xl" />
        </div>
        <h3 className="text-lg font-medium text-gray-700">No current offers</h3>
        <p className="text-gray-500 mt-1">Check back later for special deals</p>
      </div>
    ) : (
      Offers?.map((offer_data) => (
        <motion.div 
          key={offer_data.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-300 overflow-hidden"
        >
          <div className={`absolute top-0 left-0 w-1 h-full ${
            offer_data.is_percent ? 'bg-gradient-to-b from-indigo-500 to-blue-600' : 'bg-gradient-to-b from-green-500 to-teal-600'
          }`}></div>
  
          <div className="pl-5 pr-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                  offer_data.is_percent ? 'bg-indigo-100 text-indigo-600' : 'bg-green-100 text-green-600'
                }`}>
                  {offer_data.is_percent ? (
                    <FaPercent className="text-lg" />
                  ) : (
                    <FaTags className="text-lg" />
                  )}
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {offerHandle(offer_data)}
                  </h3>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <FaCalendarAlt className="mr-1.5 text-gray-400" />
                    <span>Valid till: {offer_data.valid_upto}</span>
                  </div>
                </div>
              </div>
  
              {new Date(offer_data.valid_upto) > new Date() && (
                <div className="hidden sm:flex flex-col items-center px-3 py-1 bg-gray-50 rounded-lg">
                  <span className="text-xs font-medium text-gray-500">Expires in</span>
                  <span className="text-sm font-semibold text-gray-700">
                    {Math.ceil((new Date(offer_data.valid_upto).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                  </span>
                </div>
              )}
            </div>
  
            {new Date(offer_data.valid_upto) > new Date() && (
              <div className="mt-3 sm:hidden">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Time remaining</span>
                  <span>
                    {Math.ceil((new Date(offer_data.valid_upto).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${
                      offer_data.is_percent ? 'bg-gradient-to-r from-indigo-400 to-blue-500' : 'bg-gradient-to-r from-green-400 to-teal-500'
                    }`}
                    style={{
                      width: `${Math.min(100, 100 - ((new Date(offer_data.valid_upto).getTime() - Date.now()) / (7 * 24 * 60 * 60 * 1000)) * 100)}%`
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))
    )}
  </div>
  );
}
