"use client";
import LoadingSpinner from "@/components/Common/LoadingSpinner";
import api, { get_api_form } from "@/lib/api";
import { parseCookies } from "@/lib/cookies";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { IoIosAdd, IoIosAddCircle } from "react-icons/io";

interface ServiceData {
  title: string;
  services: {
    name: string;
    price: string;
    description: string;
    images: (string | File)[];
  }[];
}

export default function AddService() {
  const cookies = parseCookies();
  const access_token = cookies?.access_token;
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const [titles, setTitles] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [cat_id, seCat_id] = useState<string>("");
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [serviceData, setServiceData] = useState<{
    name: string;
    price: string;
    description: string;
    images: (string | File)[];
  }>({
    name: "",
    price: "",
    description: "",
    images: [],
  });
  const [addedServices, setAddedServices] = useState<ServiceData[]>([]);
  const [serviceErrorMessage, setServiceErrorMessage] = useState<string | null>(
    null
  );
  const [titleErrorMessage, settitleErrorMessage] = useState<string | null>(
    null
  );
  const [imageModalVisible, setImageModalVisible] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setServiceErrorMessage("");
    settitleErrorMessage("");
  };

  const handleAddTitle = () => {
    if (selectedTitle && !titles.includes(selectedTitle)) {
      setTitles([selectedTitle, ...titles]);
      setSelectedTitle(null);
      setServiceData({ name: "", price: "", description: "", images: [] });
      setTitle("");
      setServiceErrorMessage(null);
    } else {
      setServiceErrorMessage("Please provide a unique title.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setServiceData({ ...serviceData, [name]: value });
    setServiceErrorMessage("");
    settitleErrorMessage("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const imageFiles = Array.from(files).map((file) => file);
      setServiceData((prevData) => ({
        ...prevData,
        images: imageFiles,
      }));
    }
  };

  const handleServiceAdd = async () => {
    if (!serviceData.name || !serviceData.price || !serviceData.description) {
      setServiceErrorMessage("Please fill in all required fields.");
      return;
    } else if (!selectedTitle) {
      settitleErrorMessage("Please add a title ");
      return;
    }

    const updatedServices = [...addedServices];
    const titleIndex = updatedServices.findIndex(
      (service) => service.title === selectedTitle
    );

    if (titleIndex >= 0) {
      updatedServices[titleIndex].services.push({
        name: serviceData.name,
        price: serviceData.price,
        description: serviceData.description,
        images: serviceData.images,
      });
    } else {
      updatedServices.push({
        title: selectedTitle,
        services: [
          {
            name: serviceData.name,
            price: serviceData.price,
            description: serviceData.description,
            images: serviceData.images,
          },
        ],
      });
    }

    setLoading(true);

    try {
      const response = await get_api_form(access_token).post(
        "users/services/",
        {
          name: serviceData.name,
          price: serviceData.price,
          images: serviceData.images,
          description: serviceData.description,
          cat: cat_id,
          buisness: id,
        }
      );

      if (response.status === 201) {
        setAddedServices(updatedServices);
        setServiceData({ name: "", price: "", description: "", images: [] });
        setServiceErrorMessage(null);
        settitleErrorMessage('')
        setLoading(false);
      }
    } catch (error) {
      console.error("Unknown error:", error);
      setLoading(false);
      throw error;
    }
  };

  const openImageModal = (index: number) => {
    setImageModalVisible(true);
    setCurrentImageIndex(index);
  };

  const closeImageModal = () => {
    setImageModalVisible(false);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < serviceData.images.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const addCategory = async () => {
    if (!title) {
      settitleErrorMessage("Please add a title ");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("users/servicecats/", {
        cat_name: title,
        buisness: id,
      });

      if (response.status === 201) {
        setSelectedTitle(title);
        seCat_id(response.data.id);
        setLoading(false);
        settitleErrorMessage("");
      }
    } catch (error) {
      console.error("Unknown error:", error);
      setLoading(false);
      throw error;
    }
  };

  const saveAndContinue = () => {
    if (addedServices.length === 0) {
      setServiceErrorMessage("Please add a service");
      return;
    }
    router.push(`/business-listing/add-business?step=4&id=${id}`);
  };

  return (
    <div className="md:px-7 px-4 md:w-4/12 w-full overflow-y-auto custom-scrollbar">
      <h2 className="text-2xl text-center font-ubuntuMedium text-gray-600 mb-6">
        Add Service
      </h2>

      <div className="mb-4">
        <div className="border border-gray-300 rounded-md flex py-1 px-1  focus:outline-none focus:ring-2 focus:ring-[#f28b21] focus-within:border-[#f28b21]">
          <input
            type="text"
            value={title || ""}
            onChange={handleTitleChange}
            placeholder="Enter Service Title"
            className=" px-4 py-2 w-full text-black rounded-md outline-none"
          />
          {!selectedTitle && (
            <button
              type="button"
              onClick={addCategory}
              className="text-gray-300 bg-black w-2/12 rounded-md text-sm flex justify-center items-center"
            >
              <IoIosAdd className="text-white w-7 h-7" />
            </button>
          )}
        </div>
        {titleErrorMessage && (
          <p className="text-red-500 font-ubuntu text-sm mt-2">
            {titleErrorMessage}
          </p>
        )}
        {selectedTitle && (
          <button
            onClick={handleAddTitle}
            className="text-[#f28b21] text-sm mt-2"
            disabled={!selectedTitle}
          >
            + Add New Title
          </button>
        )}
        {selectedTitle && (
          <p className="text-gray-800 text-xs mt-2 font-ubuntu">
            Services will be added under this title:{" "}
            <strong>{selectedTitle}</strong>
          </p>
        )}
      </div>

      <form className="space-y-3 font-ubuntu mt-4 ">
        <div className="flex gap-2">
          <div className="w-1/2">
            <input
              type="text"
              name="name"
              value={serviceData.name}
              onChange={handleInputChange}
              placeholder="Service Name"
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f28b21]"
            />
          </div>
          <div className="w-1/2 ">
            <input
              type="number"
              name="price"
              value={serviceData.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="w-full px-4 py-2 no-arrows text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f28b21]"
            />
          </div>
        </div>

        <div className="flex w-full gap-2 justify-between h-12">
          <div className="w-8/12">
            <textarea
              name="description"
              value={serviceData.description}
              onChange={handleInputChange}
              placeholder="Service Description"
              className="w-full px-4 py-2 h-12 custom-scrollbar text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f28b21]"
              rows={4}
            />
          </div>

          <div className=" relative w-4/12">
            {serviceData.images.length > 0 && (
              <p
                className="font-ubuntu text-xs absolute right-1 top-[-17px] bg-blue-500 px-1 rounded-tl-sm rounded-tr-sm cursor-pointer"
                onClick={() => openImageModal(0)}
              >
                Preview
              </p>
            )}

            <div
              className="w-full py-2 px-2 h-full text-gray-500 border gap-2 border-gray-300 rounded-md cursor-pointer flex justify-center items-center bg-white"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              <p className="text-sm">
                {serviceData.images.length > 0
                  ? "Image Uploaded"
                  : "Upload images"}
              </p>
              <AiOutlineUpload />
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
          </div>
        </div>

        <button
          type="button"
          onClick={handleServiceAdd}
          className="w-full bg-[#f28b21] flex justify-center items-center gap-1 py-1 text-white text-sm rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-[#f28b21] mt-4"
        >
          <IoIosAddCircle className="text-white w-7 h-7" />
          <span className="text-xs font-medium">Add Service</span>
        </button>
      </form>

      {serviceErrorMessage && (
        <p className="text-red-500 font-ubuntu text-sm mt-2">
          {serviceErrorMessage}
        </p>
      )}

      {imageModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg relative max-w-xl">
            <button
              onClick={closeImageModal}
              className="absolute top-2 right-2 text-red-500 text-2xl"
            >
              &times;
            </button>

            <img
              src={
                typeof serviceData.images[currentImageIndex] === "string"
                  ? serviceData.images[currentImageIndex]
                  : URL.createObjectURL(
                      serviceData.images[currentImageIndex] as File
                    )
              }
              alt={`Service Preview`}
              className="w-full h-auto rounded-lg"
            />

            <div className="mt-4 flex justify-between">
              <button
                onClick={prevImage}
                disabled={currentImageIndex === 0}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Previous
              </button>
              <button
                onClick={nextImage}
                disabled={currentImageIndex === serviceData.images.length - 1}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-7">
        {addedServices.length > 0 && (
          <div className="relative w-full">
            {addedServices.reverse().map((service, index) => (
              <div key={index} className="my-4">
                <h3 className="text-xl font-ubuntuMedium text-gray-600 mb-4">
                  {service.title}
                </h3>
                <div className="flex gap-5 py-4 px-2 w-full overflow-x-auto custom-scrollbar scroll-smooth">
                  {service.services.map((serviceItem, idx) => (
                    <div
                      key={idx}
                      className="flex-shrink-0 w-96 border border-gray-300 bg-white p-3 rounded-lg flex items-center gap-3 shadow-lg transition-shadow duration-300 ease-in-out"
                    >
                      {serviceItem.images.length > 0 && (
                        <div className="w-6/12 h-32 rounded-lg overflow-hidden">
                          <img
                            src={
                              typeof serviceItem.images[0] === "string"
                                ? serviceItem.images[0]
                                : URL.createObjectURL(
                                    serviceItem.images[0] as File
                                  )
                            }
                            alt={serviceItem.name}
                            className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                          />
                        </div>
                      )}

                      <div className="w-6/12 h-full flex flex-col justify-center text-left relative">
                        <h4 className="font-ubuntuMedium text-md text-gray-800 truncate">
                          {serviceItem.name}
                        </h4>
                        <p className="text-sm text-gray-600 truncate">
                          {serviceItem.description}
                        </p>
                        <p className="text-md font-semibold text-gray-700 mt-2">
                          ₹{serviceItem.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-7">
        <button
          onClick={saveAndContinue}
          type="button"
          className="w-full py-2 bg-[#f28b21] text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-[#f28b21]"
        >
          Continue
        </button>
      </div>
      {loading && <LoadingSpinner />}
    </div>
  );
}
