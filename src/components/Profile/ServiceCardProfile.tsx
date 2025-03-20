"use client";

import { baseurl, token_api } from "@/lib/api";
import { FaSearch, FaTrash } from "react-icons/fa";
import { useState } from "react";
import LoadingSpinner from "../Common/LoadingSpinner";
import { parseCookies } from "@/lib/cookies";
import toast, { Toaster } from "react-hot-toast";
import AddServiceModal from "./AddServiceModal";

interface Service {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  buisness: number;
  cat: number;
  searched: number;
}

interface Business {
  building_name: string;
  buisness_type: string;
  city: number;
  closes_at: string | null;
  description: string;
  facebook_link: string;
  youtube_link: string;
  x_link: string;
  id: number;
  incharge_number: string;
  instagram_link: string;
  latitude: string;
  locality: number;
  longitude: string;
  email: string;
  manager_name: string;
  name: string;
  no_of_views: number;
  opens_at: string | null;
  pincode: string;
  score: string;
  since: string | null;
  state: string;
  user: number;
  no_of_enquiries: number;
  web_link: string;
  whatsapp_number: string;
  avg_time_spend_in_profile: string;
  sa_rate: string;
}

interface ServiceCardProfileProps {
  services: Service[];
  render: () => void;
  businessData: Business;
}

export default function ServiceCardProfile({
  services,
  render,
  businessData,
}: ServiceCardProfileProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cookies = parseCookies();
  const access_token = cookies?.access_token;

  const handleDelete = async (id: number, name: string) => {
    setLoading(true);
    try {
      const response = await token_api(access_token).delete(
        `users/deleteservice/${id}/`
      );
      if (response.status === 204) {
        toast.success(`${name} deleted`);
        render();
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Unknown error:", error);
      setLoading(false);
      throw error;
    }
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="mt-8 w-full">
      {(businessData?.buisness_type === "Products & Services" ||
        businessData?.buisness_type === "Service") && (
        <div>
          {services.length !== 0 ? (
            <div className="flex justify-between">
              <h2 className="md:text-2xl text-xl font-semibold text-gray-800">Services</h2>
              <button
                onClick={toggleModal}
                className="text-gray-300 font-ubuntu text-sm md:text-base bg-black px-1 py-1 rounded-md"
              >
                Add Service
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5 justify-center bg-white p-3 rounded-lg shadow-lg items-center space-x-4">
              <p className="text-gray-500">
                Add your services to expand your offerings and reach more
                customers!
              </p>
              <button
                onClick={toggleModal}
                className="text-white font-ubuntu text-sm md:text-base bg-black px-4 py-2 rounded-md"
              >
                Add Service
              </button>
            </div>
          )}
        </div>
      )}
      <div className="flex gap-8 w-full mt-6 overflow-x-auto custom-scrollbar pb-5">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white border w-7/12 md:w-2/12 border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform flex-shrink-0"
          >
            <div className="relative">
              <div className="absolute z-10  flex justify-between items-center top-0 w-full bg-black bg-opacity-50 text-white p-2 font-semibold">
                ₹{service.price}
                <p className="text-sm text-white">{service.cat}</p>
              </div>
              <img
                src={baseurl + service.image}
                alt={service.name}
                className="w-full h-48 object-cover rounded-t-xl transition-transform duration-500 ease-in-out transform hover:scale-105"
              />
            </div>

            <div className="px-2 py-2">
              <div className="flex justify-between items-center space-x-3 mt-1">
                <h3 className="text-xl font-semibold text-gray-800 truncate">
                  {service.name}
                </h3>
              </div>

              <div className="text-sm text-gray-600 flex gap-2 mt-2">
                <FaSearch className="text-gray-600" size={20} />
                <span>Appeared in Search:</span>
                <span className="font-semibold text-gray-800">
                  {service.searched}%
                </span>
              </div>

              <div className="mt-3 w-full">
                <button
                  onClick={() => handleDelete(service.id, service.name)}
                  className="px-4 py-2 bg-red-600 flex justify-center items-center gap-2 w-full text-sm rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-300"
                >
                  <FaTrash className="text-white" size={15} />
                  <p>Delete</p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && <LoadingSpinner />}
      {isModalOpen && (
        <AddServiceModal
          onClose={() => setIsModalOpen(!isModalOpen)}
          render={render}
        />
      )}
      <Toaster />
    </div>
  );
}
