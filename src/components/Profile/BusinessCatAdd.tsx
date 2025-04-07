"use client";

import api, { token_api } from "@/lib/api";
import { parseCookies } from "@/lib/cookies";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiPlus, FiSearch, FiX, FiTrash2 } from "react-icons/fi";
import LoadingSpinner from "../Common/LoadingSpinner";

interface specificCategories {
  cat_name: string;
  id: number;
}

interface dcat {
  id: number;
  cat_name: string;
}

interface BusinessCatAdd {
  dcat: dcat[];
  bid: string | null;
  render: () => void;
}

export default function BusinessCatAdd({ dcat, bid, render }: BusinessCatAdd) {
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<specificCategories[]>([]);
  const cookies = parseCookies();
  const access_token = cookies?.access_token;

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
    } else {
      handleSearchChange();
    }
  }, [searchTerm]);

  const handleSearchChange = async () => {
    if (!searchTerm) return;
    try {
      const response = await api.get(
        `users/suggestions_bdcats/?q=${searchTerm}`
      );
      if (response.status === 200) {
        setSuggestions(response.data.suggestions);
      }
    } catch (error) {
      console.error("Unknown error:", error);
      throw error;
    }
  };

  const addSpecificCategory = async (id: number) => {
    if (!bid) return;
    if (dcat.length >= 10) {
      toast.error("Maximum Limit Exeed");
      return;
    }
    setLoading(true);
    try {
      const response = await token_api(access_token).post(
        `users/add_descats/`,
        { bid: bid, dcid: [id] }
      );
      if (response.status === 200) {
        render();
        setLoading(false);
        toast.success("Successfully Added Specific Categories");
      }
    } catch (error) {
      setLoading(false);
      console.error("Unknown error:", error);
      throw error;
    }
  };

  async function removeCategory(id: number) {
    if (!bid) return;
    setLoading(true);
    try {
      const response = await token_api(access_token).delete(
        `users/dlt_descats/${id}/`
      );
      if (response.status === 204) {
        render();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Unknown error:", error);
      throw error;
    }
  }

  return (
    <div className="w-full  md:p-6 mt-10">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-ubuntuMedium font-semibold text-gray-900">
            Business Categories
          </h2>
          <button
            onClick={() => setIsCatModalOpen(true)}
            className="flex items-center text-sm gap-2 px-4 md:py-2 py-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
          >
            <FiPlus /> Add Categories
          </button>
        </div>

        {dcat.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {dcat.map((category, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-50 rounded-xl md:p-4 p-1 border border-gray-200"
              >
                <span className="font-medium text-gray-800">
                  {category.cat_name}
                </span>
                <button
                  onClick={() => removeCategory(category.id)}
                  className="text-gray-400 text-xs md:text-base hover:text-red-500 transition-colors"
                  aria-label={`Remove ${category}`}
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No categories added yet
          </div>
        )}
      </div>

      {isCatModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl border border-gray-100">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Add Categories
                </h3>
                <button
                  onClick={() => {
                    setIsCatModalOpen(false);
                    setSearchTerm("");
                    setSuggestions([]);
                  }}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                  aria-label="Close modal"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="relative mb-4 text-gray-700">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search categories..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
                  />
                </div>

                {suggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="px-4 py-3 text-gray-600 hover:bg-indigo-50 cursor-pointer flex justify-between items-center transition-colors"
                        onClick={() => addSpecificCategory(suggestion.id)}
                      >
                        <span>{suggestion.cat_name}</span>
                        <FiPlus className="text-indigo-500" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Current Categories
                </h4>
                {dcat.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {dcat.map((category, index) => (
                      <div
                        key={index}
                        className="inline-flex text-gray-600 items-center bg-white px-3 py-1.5 rounded-full border border-gray-200 text-sm"
                      >
                        {category.cat_name}
                        <button
                          onClick={() => removeCategory(category.id)}
                          className="ml-2 text-gray-400 hover:text-red-500"
                          aria-label={`Remove ${category}`}
                        >
                          <FiX size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No categories selected
                  </p>
                )}
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsCatModalOpen(false);
                  setSearchTerm("");
                  setSuggestions([]);
                }}
                className="px-4 py-2 text-gray-100 bg-black rounded-full transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsCatModalOpen(false);
                  setSearchTerm("");
                  setSuggestions([]);
                }}
                className="px-4 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && <LoadingSpinner />}
    </div>
  );
}
