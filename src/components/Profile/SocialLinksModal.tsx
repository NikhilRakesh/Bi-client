"use client";
import { token_api } from "@/lib/api";
import { parseCookies } from "@/lib/cookies";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

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
  image: string;
}
interface SocialLinksModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (newLinks: Partial<Business>) => void;
  selectedLink: string | null;
}

const SocialLinksModal: React.FC<SocialLinksModalProps> = ({
  isVisible,
  onClose,
  onSave,
  selectedLink,
}) => {
  const [linkInput, setLinkInput] = useState<string>("");
  const searchParams = useSearchParams();
  const bid = searchParams.get("bid");
  const cookies = parseCookies();
  const access_token = cookies?.access_token;
  const handleSave = async () => {
    try {
      if (selectedLink) {
        const response = await token_api(access_token).patch(
          `users/buisnessesedit/${bid}/`,
          { [selectedLink]: linkInput }
        );

        if (response.status === 200) {
          toast.success("Link added successfully!");
          if (selectedLink && linkInput) {
            onSave({ [selectedLink]: linkInput });
            setLinkInput("");
            onClose();
          }
        } else {
          toast.error("Invalid Link.");
        }
      } else {
        toast.error("Selected link is not provided.");
      }
    } catch (error) {
      console.error("Unknown error:", error);
      toast.error("Something went wrong, please try again.");
    }
  };

  const renderInputField = () => {
    switch (selectedLink) {
      case "facebook_link":
        return (
          <input
            type="text"
            className="text-gray-600 outline-orange-400 mt-4 p-3 border border-gray-300 rounded-md w-full"
            placeholder="Enter Facebook URL"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
          />
        );
      case "youtube_link":
        return (
          <input
            type="text"
            className="text-gray-600 outline-orange-400 mt-4 p-3 border border-gray-300 rounded-md w-full"
            placeholder="Enter YouTube URL"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
          />
        );
      case "x_link":
        return (
          <input
            type="text"
            className="text-gray-600 outline-orange-400 mt-4 p-3 border border-gray-300 rounded-md w-full"
            placeholder="Enter X (Twitter) URL"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
          />
        );
      case "instagram_link":
        return (
          <input
            type="text"
            className="text-gray-600 outline-orange-400 mt-4 p-3 border border-gray-300 rounded-md w-full"
            placeholder="Enter Instagram URL"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
          />
        );
      case "web_link":
        return (
          <input
            type="text"
            className="text-gray-600 outline-orange-400 mt-4 p-3 border border-gray-300 rounded-md w-full"
            placeholder="Enter Website URL"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
          />
        );
      case "since":
        return (
          <input
            type="date"
            className="text-gray-600 outline-orange-400 mt-4 p-3 border border-gray-300 rounded-md w-full"
            placeholder="Enter Since Date"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
          />
        );
      case "incharge_number":
        return (
          <input
            type="number"
            className="text-gray-600 outline-orange-400 no-arrows mt-4 p-3 border border-gray-300 rounded-md w-full"
            placeholder="Enter Number"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
          />
        );
      case "manager_name":
        return (
          <input
            type="text"
            className="text-gray-600 outline-orange-400 mt-4 p-3 border border-gray-300 rounded-md w-full"
            placeholder="Enter Manager Name"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
          />
        );
      default:
        return (
          <input
            type="text"
            className="text-gray-600 outline-orange-400 mt-4 p-3 border border-gray-300 rounded-md w-full"
            placeholder={`Enter ${selectedLink}`}
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
          />
        );
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${
        isVisible ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg md:w-full max-w-md">
        <h2 className="md:text-2xl text-xl font-semibold mb-4 text-gray-700 font-ubuntuMedium">
          Add Social Media Link
        </h2>

        {selectedLink && renderInputField()}

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-black rounded-md hover:bg-black"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-orange-600 rounded-md hover:bg-orange-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialLinksModal;
