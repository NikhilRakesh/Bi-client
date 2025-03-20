"use client";
import { get_api_form } from "@/lib/api";
import { parseCookies } from "@/lib/cookies";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaImage } from "react-icons/fa";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  render: () => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  render,
}) => {
  const searchParams = useSearchParams();
  const bid = searchParams.get("bid");
  const cookies = parseCookies();
  const access_token = cookies?.access_token;
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [submit, setSubmit] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const uploadImage = async () => {
    if (selectedImage) {
      setSubmit(true);
      try {
        const response = await get_api_form(access_token).patch(
          `users/buisnessesedit/${bid}/`,
          { ["image"]: selectedImage }
        );

        if (response.status === 200) {
          setSubmit(false);
          setSelectedImage(null);
          render();
          onClose();
        }
      } catch (error) {
        setSubmit(false);
        console.error("Unknown error:", error);
        toast.error("Something went wrong, please try again.");
      }
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Upload Image</h2>
              <button onClick={onClose} className="text-gray-500 text-xl">
                &times;
              </button>
            </div>

            {!selectedImage ? (
              <div
                onClick={() => document.getElementById("imageInput")?.click()}
                className="flex justify-center items-center cursor-pointer mt-4 p-4 border-2 border-dashed border-gray-400 rounded-md"
              >
                <FaImage className="text-gray-500 text-3xl mr-2" />
                <span className="text-gray-500">Upload Image</span>
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="flex justify-center items-center flex-col">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="w-48 h-48 object-cover rounded-md"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="mt-4  text-black font-ubuntu py-2 px-4 rounded-md"
                >
                  Change Image
                </button>
              </div>
            )}

            <div className="mt-4 flex justify-between items-center gap-3">
              <button
                onClick={onClose}
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
    </>
  );
};

export default ImageUploadModal;
