"use client";

import { FaTimes, FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import api, { baseurl, get_api_form, token_api } from "@/lib/api";
import { CiCircleRemove, CiImageOn } from "react-icons/ci";
import { FiCheckCircle, FiUpload } from "react-icons/fi";
import { parseCookies } from "@/lib/cookies";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../Common/LoadingSpinner";

interface Service {
  id: number;
  name: string;
  description: string;
  service_images: { image: string; id: number }[];
  price: string;
  buisness: number;
  cat: number;
  searched: number;
}

interface item {
  name: string;
  description: string;
  price: string;
  searchCount: number;
  images: { image: string; id: number }[];
  id: number;
}

interface PAndSViewModalProps {
  onClose: () => void;
  data: Service;
  render: () => void;
}

export default function ServiceEditModal({
  onClose,
  data,
  render,
}: PAndSViewModalProps) {
  const [item, setItem] = useState<item>({
    name: data.name,
    description: data.description,
    price: data.price,
    searchCount: data.searched,
    images: data.service_images,
    id: data.id,
  });

  useEffect(() => {
    setItem({
      name: data.name,
      description: data.description,
      price: data.price,
      searchCount: data.searched,
      images: data.service_images,
      id: data.id,
    });
  }, [data]);

  const cookies = parseCookies();
  const access_token = cookies?.access_token;
  const [activeImage, setActiveImage] = useState(0);
  const [openImageAddModal, setOpenImageAddModal] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const nextImage = () => {
    setActiveImage((prev) => (prev === item.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev === 0 ? item.images.length - 1 : prev - 1));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleFileChange = useCallback((file: File | null) => {
    if (!file) return;

    if (file.size > 1024 * 1024) {
      // 1MB limit
      setUploadStatus("error");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
      setUploadStatus("success");
    };
    reader.readAsDataURL(file);
    setSelectedImage(file);
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const addImage = async () => {
    if (!selectedImage) return;
    setLoading(true);
    try {
      const response = await get_api_form(access_token).post(
        `users/add_service_img/`,
        { ["images"]: [selectedImage], sid: item.id }
      );
      if (response.status === 201) {
        render();
        toast.success("Image Added");
        setLoading(false);
        setOpenImageAddModal(false);
        setPreview(null);
      }
    } catch (error) {
      setLoading(false);
      console.error("Unknown error:", error);
      throw error;
    }
  };

  async function deleteImage(id: number) {
    setLoading(true);
    try {
      const response = await token_api(access_token).delete(
        `users/dlt_service_img/${id}/`
      );
      if (response.status === 204) {
        render();
        setLoading(false);
      toast.success('Image Deleted')
      }
    } catch (error) {
      setLoading(false);
      console.error("Unknown error:", error);
      throw error;
    }
  }

  async function editProduct() {
    if (!item.name || !item.description || !item.price) {
      toast.error("Please Fill All Fields");
      return;
    }
    setLoading(true);
    try {
      const response = await token_api(access_token).patch(
        `users/edt_service/${item.id}/`,
        { name: item.name, price: item.price, description: item.description }
      );
      if (response.status === 200) {
        render();
        setLoading(false);
        toast.success("Product Edite Successfully");
        onClose();
      }
    } catch (error) {
      setLoading(false);
      console.error("Unknown error:", error);
      throw error;
    }
  }

  function closeImageAddModal() {
    setPreview(null);
    setOpenImageAddModal(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl">
        <div className="absolute top-4  right-4 flex justify-between items-center z-10">
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <FaTimes className="text-gray-700" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-6 pt-14">
          <div className="relative">
            <div className="aspect-square w-full rounded-xl bg-gray-100 overflow-hidden relative">
              {item.images.length > 0 ? (
                <img
                  src={baseurl + item.images[activeImage].image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No images
                </div>
              )}

              {item.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
                  >
                    <FaChevronLeft className="text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
                  >
                    <FaChevronRight className="text-gray-700" />
                  </button>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              {item.images.map((img, index) => (
                <div key={index} className="relative">
                  <button
                    onClick={() => setActiveImage(index)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                      activeImage === index
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={baseurl + img.image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>

                  <button
                    onClick={() => deleteImage(img.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    <FaTimes size={10} />
                  </button>
                </div>
              ))}

              <div
                onClick={() => setOpenImageAddModal(true)}
                className="w-16 cursor-pointer h-16 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center"
              >
                <button className="text-gray-400 hover:text-gray-600">
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={item.name}
                  onChange={handleChange}
                  className="w-full border border-orange-400 outline-none text-gray-700  rounded-md px-3 py-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={item.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-orange-400 outline-none rounded-md text-gray-700 px-3 py-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹)
                </label>
                <input
                  type="text"
                  name="price"
                  value={item.price}
                  onChange={handleChange}
                  className="w-full border border-orange-400 outline-none text-gray-700 rounded-md px-3 py-2"
                />
              </div>
            </>

            <div className="mt-auto grid grid-cols-2 gap-4 pt-6">
              <>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-500 text-gray-100 rounded-lg font-medium hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={editProduct}
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-700"
                >
                  Save Changes
                </button>
              </>
            </div>
          </div>
        </div>
      </div>
      {openImageAddModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transition-all ${
              isDragging ? "scale-[1.02]" : "scale-100"
            }`}
          >
            <button
              onClick={closeImageAddModal}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
              aria-label="Close modal"
            >
              <CiCircleRemove className="w-5 h-5 text-gray-600" />
            </button>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                Upload Image
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Maximum file size: 1MB
              </p>

              <div
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-3 transition-all ${
                  isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                } ${
                  uploadStatus === "error" ? "border-red-500 bg-red-50" : ""
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {preview ? (
                  <>
                    <div className="relative w-full aspect-square">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-contain rounded-md"
                      />
                      {uploadStatus === "success" && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                          <FiCheckCircle className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setPreview(null);
                        setUploadStatus("idle");
                      }}
                      className="mt-3 text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                    >
                      <CiCircleRemove className="w-4 h-4" />
                      Remove image
                    </button>
                  </>
                ) : (
                  <>
                    <CiImageOn className="w-12 h-12 text-gray-400" />
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">
                        {isDragging
                          ? "Drop your image here"
                          : "Drag & drop your image here"}
                      </p>
                      <p className="text-xs text-gray-500">or</p>
                    </div>
                    <label className="cursor-pointer">
                      <div className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                        <FiUpload className="w-4 h-4" />
                        Browse files
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleInputChange}
                      />
                    </label>
                  </>
                )}
              </div>

              {uploadStatus === "error" && (
                <p className="mt-3 text-sm text-red-600 text-center">
                  File size exceeds 1MB limit. Please choose a smaller image.
                </p>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={closeImageAddModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addImage}
                  disabled={!preview}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                    preview
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-400 cursor-not-allowed"
                  }`}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {Loading && <LoadingSpinner />}
      <Toaster />
    </div>
  );
}
