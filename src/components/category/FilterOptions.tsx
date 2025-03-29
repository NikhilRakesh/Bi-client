"use client";

import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaShieldAlt } from "react-icons/fa";
import { PiLightningFill } from "react-icons/pi";
import api from "@/lib/api";

interface Offer {
  buisness: number;
  id: number;
  is_flat: boolean;
  is_percent: boolean;
  minimum_bill_amount: number;
  offer: number;
  valid_upto: string;
}

interface results {
  id: number;
  image: string;
  name: string;
  whatsapp_number: string;
  locality: string;
  city: string;
  rating: number;
  redirect_link: {
    id: number;
    link: string;
    meta_keywords: string;
  };
  offers: Offer[];
  assured: boolean;
  verified: boolean;
}
interface Metadata {
  buisness: string | null;
  cc_combination: boolean;
  change_freq: string | null;
  city: number;
  dcat: number;
  id: number;
  last_mod: string;
  link: string;
  meta_author: string | null;
  meta_description: string;
  meta_keywords: string;
  meta_og_description: string | null;
  meta_og_image: string | null;
  meta_og_site_name: string | null;
  meta_og_title: string | null;
  meta_og_url: string | null;
  meta_title: string;
  page_title: string | null;
  priority: number;
  share_link: string;
  single_buisness: boolean;
}

interface BusinessCard {
  metadata: Metadata;
  count: number;
  next: string | null;
  previous: string | null;
  results: results[];
}

interface FilterOptionsProps {
  category: string;
  city: string;
  filteredData: (data: BusinessCard) => void;
}

export default function FilterOptions({
  category,
  city,
  filteredData,
}: FilterOptionsProps) {
  const [openNow, setOpenNow] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [biVerified, setBiVerified] = useState(false);
  const [biTrust, setBiTrust] = useState(false);
  const [browser, setBrowser] = useState(false);

  const handleFilterChange = async () => {
    const filters = {
      q: category,
      location: city,
      open_now: openNow ? "True" : "false",
      rated_high: topRated ? "True" : "false",
      verified: biVerified ? "True" : "false",
      assured: biTrust ? "True" : "false",
    };

    try {
      const response = await api.get("users/esearch/", {
        params: filters,
      });

      filteredData(response.data);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };
  const handleAllFilter = async () => {
    setOpenNow(true);
    setTopRated(true);
    setBiTrust(true);
    setBiVerified(true);
    const filters = {
      q: category,
      location: city,
      open_now: openNow ? "True" : "false",
      rated_high: topRated ? "True" : "false",
      verified: biVerified ? "True" : "false",
      assured: biTrust ? "True" : "false",
    };

    try {
      const response = await api.get("users/esearch/", {
        params: filters,
      });

      filteredData(response.data);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

  useEffect(() => {
    if (browser) handleFilterChange();
    setBrowser(true);
  }, [openNow, topRated, biVerified, biTrust]);

  return (
    <div className="font-ubuntu bg-white backdrop-blur-lg rounded-bl-3xl rounded-br-3xl shadow-xl py-1 px-2 sm:px-0 lg:px-10 gap-4 sm:gap-6 lg:gap-10 border border-gray-200 overflow-x-auto">
      <div className="flex justify-between items-center w-full relative">
        <div className="flex overflow-x-auto scrollbar-hidden gap-4 lg:gap-10 py-3 mx-2">
          <div className="flex items-center justify-center gap-1 bg-gray-200 px-1 rounded-sm">
            <PiLightningFill className="text-gray-700" />
            <div className="flex gap-1">
              <p className="text-gray-700 font-ubuntuMedium">Quick </p>
              <p className="text-gray-700 font-ubuntuMedium"> Response</p>
            </div>
          </div>

          <div className="flex w-fit items-center gap-3 ">
            <input
              type="checkbox"
              id="openNow"
              checked={openNow}
              onChange={(e) => setOpenNow(e.target.checked)}
              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <div className="flex ">
              <label htmlFor="openNow" className="text-sm text-gray-600">
                Open
              </label>
              <label htmlFor="openNow" className="text-sm text-gray-600">
                Now
              </label>
            </div>
          </div>

          <div className="flex w-fit items-center gap-3 ">
            <input
              type="checkbox"
              id="topRated"
              checked={topRated}
              onChange={(e) => setTopRated(e.target.checked)}
              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <div className="flex ">
              <label htmlFor="openNow" className="text-sm text-gray-600">
                Top
              </label>
              <label htmlFor="openNow" className="text-sm text-gray-600">
                Rated
              </label>
            </div>
          </div>

          <div className="flex w-fit items-center gap-3 ">
            <FaCheckCircle className="text-gray-600" />
            <input
              type="checkbox"
              id="Verified"
              checked={biVerified}
              onChange={(e) => setBiVerified(e.target.checked)}
              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <div className="flex ">
              <label htmlFor="openNow" className="text-sm text-gray-600">
                BI
              </label>
              <label htmlFor="openNow" className="text-sm text-gray-600">
                Verified
              </label>
            </div>
          </div>

          <div className="flex w-fit items-center gap-3 ">
            <FaShieldAlt className="text-gray-600" />
            <input
              type="checkbox"
              id="Assured"
              checked={biTrust}
              onChange={(e) => setBiTrust(e.target.checked)}
              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <label htmlFor="openNow" className="text-sm text-gray-600">
              BI
            </label>
            <label htmlFor="openNow" className="text-sm text-gray-600">
              Assured
            </label>
          </div>
        </div>

        <button
          className="px-6 sm:hidden md:block  py-2 sm:py-3 text-sm text-white bg-orange-400 rounded-md hover:bg-orange-500 transition-colors w-full lg:w-auto"
          onClick={handleAllFilter}
        >
          All Filters
        </button>
      </div>
    </div>
  );
}
