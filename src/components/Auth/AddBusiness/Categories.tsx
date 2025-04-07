"use client";
import LoadingSpinner from "@/components/Common/LoadingSpinner";
import CategorySkeleton from "@/components/Skeltons/CategorySkeleton";
import api, { token_api } from "@/lib/api";
import { parseCookies } from "@/lib/cookies";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoIosAddCircle } from "react-icons/io";

interface Category {
  id: number;
  name: string;
}

interface specificCategories {
  cat_name: string;
  id: number;
}

export default function Categories() {
  const cookies = parseCookies();
  const access_token = cookies?.access_token;
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const [specificCategories, setspecificCategories] = useState<
    specificCategories[]
  >([]);
  const [popularCategorie, setPopularCategorie] = useState<Category[]>([]);
  const [selectedSpecificCategories, setselectedSpecificCategories] = useState<
    number[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestedCategories, setsuggestedCategories] = useState<Category[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!e.target.value) return;
    try {
      const response = await api.get(
        `users/search_gencats/?q=${e.target.value}`
      );
      setsuggestedCategories(response.data);
    } catch (error) {
      console.error("Unknown error:", error);
      throw error;
    }
  };

  const handleAddCategory = async (category: Category) => {
    try {
      const response = await token_api(access_token).post(
        `users/add_bgencats/`,
        { cid: category.id, bid: id }
      );
      if (response.status === 200) {
        setStep(2);
        getSpecificCategory(category.id);
      }
    } catch (error) {
      console.error("Unknown error:", error);
      throw error;
    }
    setSearchTerm("");
  };

  const handleSpecificCategorySelect = (category: specificCategories) => {
    setselectedSpecificCategories((prevSelectedCategories) => {
      if (!prevSelectedCategories.includes(category.id)) {
        return [...prevSelectedCategories, category.id];
      }
      return prevSelectedCategories;
    });
  };

  const getSpecificCategory = async (id: number) => {
    setLoading(true);
    try {
      const response = await api.get(`users/get_descats/?gcid=${id}`);
      if (response.status === 200) {
        setspecificCategories(response.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Unknown error:", error);
      throw error;
    }
  };

  const addSpecificCategory = async () => {
    if (selectedSpecificCategories.length === 0) {
      toast.error("please select a specific category");
      return;
    }
    setLoading(true);
    try {
      const response = await token_api(access_token).post(
        `users/add_descats/`,
        { bid: id, dcid: selectedSpecificCategories }
      );
      if (response.status === 200) {
        toast.success("Successfully Added Specific Categories");
        setLoading(false);
        router.push(`/business-listing/add-business?step=5`);
      }
    } catch (error) {
      setLoading(false);
      console.error("Unknown error:", error);
      throw error;
    }
  };

  const fetchPopularCategories = async () => {
    try {
      const response = await api.get(`users/popular_gencats/`);

      if (response.status === 200) {
        setPopularCategorie(response.data);
      }
    } catch (error) {
      console.error("Unknown error:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchPopularCategories();
  }, []);

  return (
    <div className="md:p-8 font-ubuntu md:max-w-7xl md:mx-auto">
      {/* <p
        className="text-red-500 cursor-pointer hover:underline"
        onClick={() => {
          setStep(1);
          setselectedSpecificCategories([]);
          fetchPopularCategories();
        }}
      >
        Reset
      </p> */}
      {step === 1 && (
        <>
          <h2 className="md:text-4xl text-xl font-ubuntuMedium text-center font-bold text-gray-800 md:mb-12 mb-5">
            Tell us which sector you belong to
          </h2>

          <div className="mb-12">
            <div className="mb-12">
              <h3 className="md:text-2xl  font-semibold text-gray-700 mb-6 text-center">
                Search Categories
              </h3>
              <div className="relative md:max-w-2xl md:mx-auto">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search for categories..."
                  className="w-full px-6 py-3 text-gray-800 border-2 rounded-xl focus:outline-none border-orange-500 transition-all shadow-sm"
                />
                {searchTerm && (
                  <div className="absolute top-full mt-2 w-full custom-scrollbar bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-72 overflow-y-auto p-4">
                    <div className="space-y-3">
                      {suggestedCategories.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center justify-between p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleAddCategory(category)}
                        >
                          <p className="text-gray-800">{category.name}</p>
                          <IoIosAddCircle className="text-gray-500 hover:text-orange-500 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {popularCategorie.length !== 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {popularCategorie.map((category) => (
                  <div
                    key={category.id}
                    className="px-2 py-1 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleAddCategory(category)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="md:text-lg text-sm font-medium text-gray-800">
                        {category.name}
                      </span>
                      <IoIosAddCircle className="text-gray-500 hover:text-orange-500 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <CategorySkeleton />
            )}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="md:text-4xl text-2xl font-ubuntuMedium text-center font-bold text-gray-800 mb-12">
            Let&rsquo;s make it more specific
          </h2>

          <div className="mb-12">
            <h3 className="md:text-2xl font-ubuntuMedium font-semibold text-gray-700 mb-8 text-center">
              Specific Categories
            </h3>
            {specificCategories.length !== 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                {specificCategories.map((category) => (
                  <div
                    key={category.id}
                    className={`px-1 py-1 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                      selectedSpecificCategories.includes(category.id)
                        ? "bg-orange-100 border-orange-500"
                        : ""
                    }`}
                    onClick={() => handleSpecificCategorySelect(category)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="md:text-base text-sm truncate font-medium text-gray-800">
                        {category.cat_name}
                      </span>
                      <IoIosAddCircle className="text-gray-500 hover:text-orange-500 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <CategorySkeleton />
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={addSpecificCategory}
              className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors shadow-md"
            >
              Save and Continue
            </button>
          </div>
        </>
      )}
      <Toaster />
      {loading && <LoadingSpinner />}
    </div>
  );
}
