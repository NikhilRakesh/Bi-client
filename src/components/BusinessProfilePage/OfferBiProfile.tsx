"use client";

import React, { useEffect, useState } from "react";
import { FaPercent, FaTags } from "react-icons/fa"; 

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
    <div className="space-y-4">
        <div>
            <h1 className="text-gray-700 font-ubuntuMedium">Offers</h1>
        </div>
      {Offers?.map((offer_data) => (
        <React.Fragment key={offer_data.id}>
          <div className=" bg-gradient-to-r from-indigo-50 to-sky-50 md:p-4 px-2   rounded-lg shadow-lg ">
            <div className="md:flex items-center justify-between text-white">
              <div className="flex items-center space-x-2">
                {offer_data.is_percent ? (
                  <FaPercent className="md:text-xl text-sm text-gray-700" />
                ) : (
                  <FaTags className="md:text-xl text-sm text-gray-700" />
                )}
                <span className="font-semibold md:text-lg text-gray-600">{offerHandle(offer_data)}</span>
              </div>
              <span className="md:text-sm text-xs opacity-80 text-gray-600 text-end">Valid till: {offer_data.valid_upto}</span>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
