"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import api, { baseurl, token_api } from "@/lib/api";
import GallerySkelton from "../Common/GallerySkelton";
import { MdDelete, MdClose, MdVideoLibrary, MdImage } from "react-icons/md";
import { parseCookies } from "@/lib/cookies";
import HLSVideoPlayer from "../Common/HLSVideoPlayer";

interface Image {
  id: number;
  image: string;
}

interface Video {
  id: number;
  hls_path: string;
  video_file: string;
}

export default function MediaGalleryModal({
  onClose,
  videos,
  render,
}: {
  onClose: () => void;
  render: () => void;
  videos: Video[];
}) {
  const [images, setImages] = useState<Image[]>([]);
  const [activeTab, setActiveTab] = useState<"images" | "videos">("images");
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const cookies = parseCookies();
  const access_token = cookies?.access_token;
  const searchParams = useSearchParams();
  const bid = searchParams.get("bid");

  const fetchImages = async () => {
    if (!bid) return;

    try {
      const response = await api.get(`users/buisness_pics/?bid=${bid}`);
      if (response.status === 200) {
        setImages(response.data);
      } else {
        toast.error("No images found.");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      toast.error("Failed to load images.");
    }
  };

  const deleteMedia = async (id: number, type: "image" | "video") => {
    setIsDeleting(id);
    try {
      const endpoint =
        type === "image"
          ? `users/delete_pic/${id}/`
          : `users/deletevideo/${id}/`;

      const response = await token_api(access_token).delete(endpoint);

      if (response.status === 204) {
        toast.success(
          `${type.charAt(0).toUpperCase() + type.slice(1)} deleted`
        );
        if (type === "image") {
          fetchImages();
        } else {
          render();
        }
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      toast.error(`Failed to delete ${type}`);
    } finally {
      setIsDeleting(null);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [bid]);

  if (images.length === 0 && activeTab === "images") return <GallerySkelton />;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
      
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Media Gallery
            </h2>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("images")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "images"
                    ? "bg-white shadow-sm text-indigo-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <MdImage className="inline mr-2" size={18} />
                Images ({images.length})
              </button>
              <button
                onClick={() => setActiveTab("videos")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "videos"
                    ? "bg-white shadow-sm text-indigo-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <MdVideoLibrary className="inline mr-2" size={18} />
                Videos ({videos.length})
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <MdClose size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "images" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="relative group rounded-lg overflow-hidden aspect-square"
                >
                  <img
                    src={baseurl + image.image}
                    alt={`Gallery Image ${image.id}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <button
                    onClick={() => deleteMedia(image.id, "image")}
                    disabled={isDeleting === image.id}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                  >
                    {isDeleting === image.id ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <MdDelete size={18} />
                    )}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="relative group rounded-lg overflow-hidden aspect-square bg-black"
                >
                
                  <HLSVideoPlayer
                    src={"https://api.brandsinfo.in/media/" + video.hls_path}
                  />

                  <button
                    onClick={() => deleteMedia(video.id, "video")}
                    disabled={isDeleting === video.id}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                  >
                    {isDeleting === video.id ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <MdDelete size={18} />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "images" && images.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 py-12">
              <MdImage size={48} className="mb-4" />
              <p className="text-lg font-medium">No images available</p>
              <p className="text-sm">Upload images to showcase your business</p>
            </div>
          )}

          {activeTab === "videos" && videos.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 py-12">
              <MdVideoLibrary size={48} className="mb-4" />
              <p className="text-lg font-medium">No videos available</p>
              <p className="text-sm">Upload videos to showcase your business</p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
