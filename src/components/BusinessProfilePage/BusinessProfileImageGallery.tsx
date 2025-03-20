"use client";
import { useEffect, useState } from "react";
import { baseurl } from "@/lib/api";

export default function BusinessProfileImageGallery({
  imageGallery,
}: {
  imageGallery: { image: string; buisness: number }[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayImages, setDisplayImages] = useState(5);
  const totalImages = imageGallery.length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setDisplayImages(2);
      } else {
        setDisplayImages(5);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className=" ">
      {imageGallery.length === 0 ? (
        <div className="flex justify-center items-center flex-col mt-8">
          <div className="text-center flex flex-col justify-center items-center">
            <p className="text-xl font-semibold text-gray-600 mb-4">
              No images available
            </p>
          </div>
        </div>
      ) : (
        <div className="flex gap-4">
          {imageGallery.slice(0, displayImages).map((image, index) => (
            <div
              key={index}
              className={`relative w-48 h-48 rounded-md overflow-hidden`}
            >
              <img
                src={baseurl + image.image}
                alt={`Image ${image.buisness}`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={handleOpenModal}
              />
              {index === displayImages - 1 && totalImages > displayImages && (
                <div
                  onClick={handleOpenModal}
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
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 md:px-20 px-5 ">
          <div className="bg-white p-6 rounded-md ">
            <div className="flex justify-between items-center">
              <h2 className="md:text-2xl text-xl font-semibold text-gray-800 font-ubuntuMedium">
                Image Gallery
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-red-500 md:text-xl"
              >
                close
              </button>
            </div>
            <div className="flex flex-wrap  gap-4 mt-4 h-[600px] overflow-y-scroll custom-scrollbar">
              {imageGallery.map((image, index) => (
                <div
                  key={index}
                  className="md:w-60 md:h-52 w-24 h-24 rounded-md overflow-hidden"
                >
                  <img
                    src={baseurl + image.image}
                    alt={`Image ${image.buisness}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
