"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import api, { baseurl, token_api } from "@/lib/api";
import GallerySkelton from "../Common/GallerySkelton";
import { MdDelete } from "react-icons/md";
import { parseCookies } from "@/lib/cookies";

interface images {
  image: string;
  id: number;
}
export default function ImageGalleryModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [images, setImages] = useState<images[]>([]);
  const cookies = parseCookies();
  const access_token = cookies?.access_token;

  const searchParams = useSearchParams();
  const bid = searchParams.get("bid");

  const fetchImages = async () => {
    if (!bid) return;

    try {
      const response = await api.get(`users/buisness_pics/?bid=${bid}`);

      if (response.status === 200) {
        const imageUrls = response.data;

        setImages(imageUrls);
      } else {
        toast.error("No images found.");
      }
    } catch (error) {
      console.error("Unknown error:", error);
      toast.error("Something went wrong, please try again.");
    }
  };

  async function deleteImages(id: number) {
    try {
      const response = await token_api(access_token).delete(
        `users/delete_pic/${id}/`
      );

      if (response.status === 204) {
        fetchImages();
        toast.success("images deleted");
      } else {
        toast.error("No images found.");
      }
    } catch (error) {
      console.error("error on deleteImages:", error);
      toast.error("Something went wrong, please try again.");
    }
  }

  useEffect(() => {
    fetchImages();
  }, [bid]);

  if (images.length === 0) return <GallerySkelton />;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50  h-screen">
      <div className="bg-white p-3 md:p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Image Gallery</h2>
          <button onClick={onClose} className="text-red-600">
            Close
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 overflow-y-scroll custom-scrollbar px-3 h-[600px]">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative md:w-full md:h-40 w-40 h-40 bg-gray-200 rounded-md"
            >
              <img
                src={baseurl + image.image}
                alt={`Gallery Image ${index + 1}`}
                className="object-cover w-full h-full rounded-md"
              />
              <div
                onClick={() => {
                  deleteImages(image.id);
                }}
                className="absolute bottom-3 right-3 bg-black bg-opacity-50 rounded-full p-2 cursor-pointer hover:bg-opacity-75 transition duration-300 ease-in-out"
              >
                <MdDelete className="text-white" size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
