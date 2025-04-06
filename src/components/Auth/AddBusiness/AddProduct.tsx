"use client";
import LoadingSpinner from "@/components/Common/LoadingSpinner";
import api, { get_api_form } from "@/lib/api";
import { parseCookies } from "@/lib/cookies";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

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

export default function AddProduct() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
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
  const [businesstype, setBusinesstype] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [addedProducts, setAddedProducts] = useState<ProductData[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const cookies = parseCookies();
  const access_token = cookies?.access_token;

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
        setBusinesstype(response.data.buisness_type);
        setAddedProducts([...addedProducts, productData]);
        setProductData({
          name: "",
          description: "",
          price: "",
          sub_cat: 0,
          buisness: id,
          images: [],
        });
        setSelectedcat("");
        setErrorMessage(null);
        setLoading(false);
        return;
      }
      setLoading(false);
    } catch (error) {
      console.error("Unknown error:", error);
      setLoading(false);
      throw error;
    }
  };

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImageIndex !== null) {
      const newIndex =
        direction === "prev"
          ? (selectedImageIndex - 1 + productData.images.length) %
            productData.images.length
          : (selectedImageIndex + 1) % productData.images.length;
      setSelectedImageIndex(newIndex);
    }
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
  };

  const scrollProducts = (direction: "prev" | "next") => {
    const container = document.querySelector(".overflow-x-auto");
    if (container) {
      const scrollAmount = 250;
      if (direction === "prev") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else if (direction === "next") {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
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

  const saveAndContinue = () => {
    if (addedProducts.length === 0) {
      setErrorMessage("please add a product to continue");
      return;
    }else if (productData.name||productData.price||productData.sub_cat||productData.description){
      setErrorMessage("please that product to continue");
      return;
    }
    setLoading(true);
    const urlWithId = `/business-listing/add-business?step=${
      businesstype === "Products & Services"
        ? 3
        : businesstype === "Product"
        ? 4
        : 1
    }&id=${id}`;
    switch (businesstype) {
      case "Products & Services":
      case "Product":
      case "Service":
        router.push(urlWithId);
        break;
      default:
        console.log("Unknown business type", businesstype);
        break;
    }
    setImageError("");
    setErrorMessage("");
    setLoading(false);
  };

  return (
    <div className="md:px-7 px-4 md:w-4/12 w-full ">
      <h2 className="text-2xl text-center font-ubuntuMedium text-gray-600 mb-6">
        Add Product
      </h2>

      <form onSubmit={handleFormSubmit} className="space-y-7 font-ubuntu">
        <div className="flex md:gap-5 gap-2">
          <div className="">
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

          <div className="">
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

          <div className=" w-full relative">
            {productData.images.length > 0 && (
              <p
                className="font-ubuntu text-xs absolute right-1 top-[-17px] bg-blue-500 px-1 rounded-tl-sm rounded-tr-sm cursor-pointer"
                onClick={() => openImageModal(0)}
              >
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
              <p className="text-red-500 font-ubuntu text-sm mt-2">
                {imageError}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4 ">
          <div className=" w-10/12">
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

          <div className="w-2/12 flex justify-center">
            <button
              type="submit"
              className="w-full  bg-[#f28b21] text-white text-sm rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-[#f28b21] flex flex-col items-center justify-center"
            >
              <div className="flex justify-center items-center mb-2">
                <IoIosAddCircle className="text-white w-8 h-8" />
              </div>
              <span className="text-xs font-medium">Add Product</span>
            </button>
          </div>
        </div>

        <div className="">
          {errorMessage && (
            <p className="text-red-500 font-ubuntu text-sm mt-2">
              {errorMessage}
            </p>
          )}
        </div>
      </form>

      <div className="mt-7">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-ubuntuMedium text-gray-600 mb-1">
            Added Products
          </h3>
          <p className="text-gray-600 font-ubuntu text-sm">
            total products: <span>{addedProducts.length}</span>
          </p>
        </div>

        {addedProducts.length > 0 ? (
          <div className="relative w-full  ">
            <button
              onClick={() => scrollProducts("prev")}
              className="absolute left-[-10px] md:left-[-40px] top-1/2 transform -translate-y-1/2 text-white bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-600 focus:outline-none z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex gap-5 py-4 px-2 w-full overflow-x-auto scrollbar-hidden scroll-smooth">
              {addedProducts
                .slice()
                .reverse()
                .map((product, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-96 border border-gray-300 bg-white p-3 rounded-lg flex items-center gap-3 shadow-lg transition-shadow duration-300 ease-in-out"
                  >
                    {product.images.length > 0 && (
                      <div className=" w-6/12 h-32 rounded-lg overflow-hidden">
                        <img
                          src={
                            typeof product.images[0] === "string"
                              ? product.images[0]
                              : URL.createObjectURL(product.images[0])
                          }
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                        />
                      </div>
                    )}

                    <div className=" w-6/12 h-full flex flex-col justify-center text-left relative">
                      <h4 className="font-ubuntuMedium text-md text-gray-800 truncate">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-600 truncate">
                        {product.description}
                      </p>
                      <p className="text-md font-semibold text-gray-700 mt-2">
                        ₹{product.price}
                      </p>
                      {/* <p className="text-xs text-gray-500">
                        Category: {product.sub_cat}
                      </p> */}
                      <div className="border-2 border-[#f28b21] p-1 rounded-full absolute top-[-6px] right-0">
                        <div className="w-4 h-4 text-black flex items-center justify-center rounded-full">
                          <p className="text-xs">
                            {addedProducts.length - index}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <button
              onClick={() => scrollProducts("next")}
              className="absolute md:right-[-40px] right-[-10px] top-1/2 transform -translate-y-1/2 text-white bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-600 focus:outline-none z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500 font-ubuntu text-lg">
            No products added yet.
          </p>
        )}
      </div>

      <div>
        <button
          type="button"
          onClick={saveAndContinue}
          className="w-full py-2 bg-[#f28b21] cursor-pointer text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-[#f28b21]"
        >
          Continue
        </button>
      </div>

      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
          <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
              <button
                className="text-white bg-gray-800 p-3 rounded-full shadow-md hover:bg-gray-700 focus:outline-none"
                onClick={() => navigateImage("prev")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                className="text-white bg-red-600 p-3 rounded-full shadow-md hover:bg-red-500 focus:outline-none"
                onClick={closeImageModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <button
                className="text-white bg-gray-800 p-3 rounded-full shadow-md hover:bg-gray-700 focus:outline-none"
                onClick={() => navigateImage("next")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="flex justify-center items-center mt-10">
              <img
                src={
                  typeof productData.images[selectedImageIndex] === "string"
                    ? productData.images[selectedImageIndex]
                    : URL.createObjectURL(
                        productData.images[selectedImageIndex]
                      )
                }
                alt="Selected"
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
      {loading && <LoadingSpinner />}
    </div>
  );
}
