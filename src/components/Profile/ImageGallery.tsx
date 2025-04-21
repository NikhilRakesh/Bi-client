"use client";
import api, { baseurl, get_api_form } from "@/lib/api";
import { parseCookies } from "@/lib/cookies";
import { AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaImage } from "react-icons/fa";

interface images {
  image: string;
  buisness: number;
}

interface ApiResponse {
  status: number;
}

export default function ImageGalleryWithModal({
  openModal,
}: {
  openModal: () => void;
}) {
  const searchParams = useSearchParams();
  const bid = searchParams.get("bid");
  const cookies = parseCookies();
  const access_token = cookies?.access_token;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayImages, setDisplayImages] = useState(7);
  const [images, setImages] = useState<images[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<string>("");
  const totalImages = images.length;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMedia(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);

    if (file) {
      if (file.type.startsWith("image/")) {
        if (file.size > 1024 * 1024) {
          toast.error("Image size exceeds 1MB. Please upload a smaller image.");
          return;
        }
        setMediaType("image");
        setSelectedMedia(file);
      } else if (file.type.startsWith("video/")) {
        setMediaType("video");
        setSelectedMedia(file);
      } else {
        toast.error("Invalid file type. Please upload an image or video.");
      }
    }
  };

  const uploadImage = async () => {
    if (selectedMedia) {
      setSubmit(true);
      let response: AxiosResponse<ApiResponse> | undefined;
      try {
        if (mediaType === "image") {
          response = await get_api_form(access_token).post(
            `users/buisness_pics/`,
            { ["images"]: [selectedMedia], ["buisness"]: bid }
          );
        } else if (mediaType === "video") {
          response = await get_api_form(access_token).post(
            `users/uploadvideo/`,
            { ["video"]: selectedMedia, ["buisness"]: bid }
          );
        }

        if (response?.status === 201 || 200) {
          setSubmit(false);
          setSelectedMedia(null);
          setRefresh(!refresh);
          handleCloseModal();
        }
      } catch (error) {
        setSubmit(false);
        console.error("Unknown error:", error);
        toast.error("Something went wrong, please try again.");
      }
    }
  };

  const fetchImages = async () => {
    try {
      const response = await api.get(`users/buisness_pics/?bid=${bid}`);

      if (response.status === 200) {
        setImages(response.data);
      }
    } catch (error) {
      console.error("Unknown error:", error);
      toast.error("Something went wrong, please try again.");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setDisplayImages(2);
      } else {
        setDisplayImages(7);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    fetchImages();
  }, [refresh]);

  return (
    <div className="bg-white mb-10 mt-10 p-5 rounded-md shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="md:text-2xl text-xl font-ubuntuMedium text-gray-700 font-semibold">
          Image Gallery
        </h2>
        {images.length !== 0 && (
          <button
            onClick={handleOpenModal}
            className="bg-black text-gray-300 py-2 px-4 rounded-md flex items-center"
          >
            <FaImage className="mr-2" /> Add Media
          </button>
        )}
      </div>

      {images.length === 0 ? (
        <div className="flex justify-center items-center flex-col mt-8">
          <div className="text-center flex flex-col justify-center items-center">
            <p className="md:text-xl font-semibold font-ubuntuMedium text-gray-600 mb-4">
              No images available
            </p>
            <p className="text-gray-500 mb-6 text-xs md:text-base">
              It looks like you haven&apos;t uploaded any images yet. Click
              below to add some!
            </p>
            <button
              onClick={handleOpenModal}
              className="bg-orange-500 md:w-4/12 flex justify-center items-center text-white py-2 px-6 rounded-md hover:bg-orange-600 transition-all"
            >
              <FaImage className="mr-2" /> Add Image
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-4">
          {images.slice(0, displayImages).map((image, index) => (
            <div
              key={index}
              className={`relative w-48 h-48 rounded-md overflow-hidden ${
                index === displayImages - 1 ? "blurred-image" : ""
              }`}
            >
              <img
                src={baseurl + image.image}
                alt={`Image ${image.buisness}`}
                className="w-full h-full object-cover"
              />
              {index === displayImages - 1 && totalImages > displayImages && (
                <div
                  onClick={openModal}
                  className="absolute cursor-pointer inset-0 flex justify-center items-center bg-black bg-opacity-50 text-white text-lg"
                >
                  +{totalImages - displayImages}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Upload Image</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 text-xl"
              >
                &times;
              </button>
            </div>

            {selectedMedia ? (
              <div className="mt-4 flex justify-center">
                {mediaType === "image" ? (
                  <img
                    src={URL.createObjectURL(selectedMedia)}
                    alt="Selected"
                    className="w-48 h-48 object-cover rounded-md"
                  />
                ) : mediaType === "video" ? (
                  <video
                    className="w-full h-full object-cover rounded-md"
                    controls
                    src={URL.createObjectURL(selectedMedia)}
                  />
                ) : null}
              </div>
            ) : (
              <div className="mt-4 flex cursor-pointer justify-center items-center">
                <label className="cursor-pointer flex flex-col justify-center items-center">
                  <FaImage className="text-4xl text-gray-600" />
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <p className="text-gray-700 ">click here to upload</p>
                </label>
              </div>
            )}
            <div className="mt-4 flex gap-3">
              <button
                onClick={handleCloseModal}
                className="bg-gray-800 w-6/12 text-white py-2 px-4 rounded-md"
              >
                Close
              </button>
              <button
                onClick={uploadImage}
                className="bg-orange-500 w-6/12 text-white py-2 px-4 rounded-md"
              >
                {!submit ? <p>Upload</p> : <p>Uploading...</p>}
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
}
