"use client";
import LoadingSpinner from "@/components/Common/LoadingSpinner";
import api, { get_api_form } from "@/lib/api";
import { parseCookies } from "@/lib/cookies";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

interface ServiceData {
  title: string;
  services: {
    name: string;
    price: string;
    description: string;
    images: (string | File)[];
  }[];
}

export default function AddService({
  onClose,
  render,
}: {
  onClose: () => void;
  render: () => void;
}) {
  const cookies = parseCookies();
  const access_token = cookies?.access_token;
  const searchParams = useSearchParams();
  const id = searchParams.get("bid");
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
          cat: cat_id,
          buisness: id,
        }
      );

      if (response.status === 201) {
        setAddedServices(updatedServices);
        setServiceData({ name: "", price: "", description: "", images: [] });
        setServiceErrorMessage(null);
        settitleErrorMessage("");
        setLoading(false);
        render()
        onClose();
      }
    } catch (error) {
      console.error("Unknown error:", error);
      setLoading(false);
      throw error;
    }
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
      }
    } catch (error) {
      console.error("Unknown error:", error);
      setLoading(false);
      throw error;
    }
  };

  return (
    <div className=" w-full overflow-y-auto custom-scrollbar fixed top-0 flex h-screen justify-center items-center bg-gray-700 bg-opacity-50 inset-0">
      <div className="bg-white py-5 px-5 rounded-md">
        <h2 className="text-2xl text-center font-ubuntuMedium text-gray-600 mb-6 flex justify-center items-center">
          Add Service
          <IoCloseOutline onClick={onClose} className="text-gray-700 cursor-pointer text-3xl  absolute right-[520px]" />
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
                <p className="font-ubuntu text-xs absolute right-1 top-[-17px] bg-blue-500 px-1 rounded-tl-sm rounded-tr-sm cursor-pointer">
                  Preview
                </p>
              )}

              <div
                className="w-full py-2 px-2 h-full text-gray-500 border gap-2 border-gray-300 rounded-md cursor-pointer flex justify-center items-center bg-white"
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                <AiOutlineUpload className="text-xl" />
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
                <span>Upload Image</span>
              </div>
            </div>
          </div>
        </form>

        {serviceErrorMessage && (
          <p className="text-red-500 font-ubuntu text-sm mt-2">
            {serviceErrorMessage}
          </p>
        )}

        <div className="w-full mt-4">
          <button
            className=" w-full bg-[#f28b21] text-white text-sm py-3 rounded-md"
            onClick={handleServiceAdd}
          >
            {loading ? <LoadingSpinner /> : <span>+ Add Service</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
