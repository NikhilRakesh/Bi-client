"use client";
import LoadingSpinner from "@/components/Common/LoadingSpinner";
import api, { get_api_form } from "@/lib/api";
import { parseCookies } from "@/lib/cookies";
import { useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

interface ProductData {
  name: string;
  description: string;
  price: string;
  sub_cat: number;
  buisness: string | null;
  images: (string | File)[];
}

interface Category {
  id: string;
  name: string;
}

export default function AddProductModal({
  onClose,
  render,
}: {
  onClose: () => void;
  render: () => void;
}) {
  const searchParams = useSearchParams();
  const id = searchParams.get("bid");
  const [productData, setProductData] = useState<ProductData>({
    name: "",
    description: "",
    price: "",
    sub_cat: 0,
    buisness: id,
    images: [],
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [selectedcat, setSelectedcat] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const cookies = parseCookies();
  const access_token = cookies?.access_token;
  const formRef = useRef<HTMLFormElement>(null);
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      if (files.length + productData.images.length > 5) {
        setImageError("You can only upload up to 5 images.");
      } else {
        for (let i = 0; i < files.length; i++) {
          if (files[i].size > 1024 * 1024) { 
            setImageError("One or more files exceed 1MB .");
            return; 
          }
        }
        const selectedImages = Array.from(files).map((file) => file);

        setProductData((prevData) => ({
          ...prevData,
          images: selectedImages,
        }));
        setImageError(null);
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !productData.name ||
      !productData.description ||
      !productData.price ||
      productData.sub_cat === 0 ||
      productData.images.length === 0
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await get_api_form(access_token).post(
        "users/addproduct/",
        productData
      );
      if (response.status === 201) {
        render()
        onClose();
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

  const getProductCategories = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value } = e.target;
    setSelectedcat(value);
    try {
      const response = await api.get(`users/searchpcats/?q=${value}/`);
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Unknown error:", error);
      throw error;
    }
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedcat(category.name);
    setProductData({ ...productData, sub_cat: Number(category.id) });
    setCategories([]);
  };

  const handleButtonClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <div className="md:px-7 px-4 md:w-4/12 w-full bg-white p-6 rounded-lg shadow-lg ">
      <h2 className="text-2xl text-center font-ubuntuMedium text-gray-600 mb-6 flex  justify-center">
        Add Product
        <IoCloseOutline
          onClick={onClose}
          className="text-gray-700 cursor-pointer text-3xl  absolute right-[520px]"
        />
      </h2>

      <form
        onSubmit={handleFormSubmit}
        ref={formRef}
        className="space-y-7 font-ubuntu"
      >
        <div className="flex md:gap-5 gap-2">
          <div>
            <input
              type="text"
              id="name"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              placeholder="Product name"
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f28b21]"
              required
            />
          </div>

          <div>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              placeholder="Product price"
              className="w-full px-4 py-2 text-black border no-arrows border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f28b21]"
              required
            />
          </div>
        </div>

        <div className="flex md:gap-5 gap-2">
          <div className="w-full relative">
            <input
              type="text"
              name="sub_cat"
              value={selectedcat}
              onChange={getProductCategories}
              placeholder="Product category"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f28b21]"
            />

            {categories.length > 0 && selectedcat && (
              <ul className="absolute w-full border border-gray-300 bg-white rounded-md mt-1 max-h-48 overflow-y-auto scrollbar-hidden shadow-lg">
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200 text-black flex justify-between items-center border-b"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category.name}
                    <FaArrowUp className="-rotate-45 text-gray-500" />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="w-full relative">
            {productData.images.length > 0 && (
              <p className="font-ubuntu text-xs absolute right-1 top-[-17px] bg-blue-500 px-1 rounded-tl-sm rounded-tr-sm cursor-pointer">
                Preview
              </p>
            )}

            <div
              className="w-full py-2 text-gray-500 border border-gray-300 rounded-md cursor-pointer flex justify-center items-center bg-white"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              <p>
                {productData.images.length > 0
                  ? "Image Uploaded"
                  : "Click to upload images"}
              </p>
            </div>

            <input
              type="file"
              id="image-upload"
              name="images"
              accept="image/*"
              onChange={handleImageChange}
              multiple
              className="hidden"
            />

            {imageError && (
              <p className="text-red-500 font-ubuntu text-xs mt-2">
                {imageError}
              </p>
            )}
          </div>
        </div>

        <div className="">
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            placeholder="Enter product description"
            className="w-full px-4 h-full custom-scrollbar text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f28b21] text-sm"
            rows={4}
            maxLength={200}
            required
          />
        </div>

        <div>
          {errorMessage && (
            <p className="text-red-500 font-ubuntu text-sm mt-2">
              {errorMessage}
            </p>
          )}
        </div>
      </form>

      <div className="mt-7 flex justify-end">
        <button
          onClick={handleButtonClick}
          type="button"
          className="w-full bg-[#f28b21] py-2 text-white text-sm rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-[#f28b21] flex flex-col items-center justify-center"
        >
          <div className="flex justify-center items-center gap-2 ">
            <IoIosAddCircle className="text-white w-5 h-5" />
            <span className="text-xs font-medium">Add Product</span>
          </div>
        </button>
      </div>

      {loading && <LoadingSpinner />}
    </div>
  );
}
