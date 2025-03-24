"use client";

import { useState, useEffect, useRef } from "react";
import { baseurl } from "@/lib/api";

export default function BusinessProfileImageGallery({
  imageGallery,
}: {
  imageGallery: { image: string; buisness: number }[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const scrollWidth = container.scrollWidth;
        const containerWidth = container.clientWidth;
        const tolerance = 1;

        if (container.scrollLeft + containerWidth + tolerance >= scrollWidth) {
          container.scrollLeft = 0;
        } else {
          container.scrollBy({ left: containerWidth, behavior: "smooth" });
        }
      }
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imageGallery.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imageGallery.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative">
      <div className="overflow-hidden relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hidden"
        >
          {imageGallery.map((image, index) => (
            <div
              key={index}
              className="relative md:w-96 md:h-72 w-48 h-56 flex-shrink-0"
              onClick={() => openModal(index)}
            >
              <img
                src={baseurl + image.image}
                alt={`Image ${image.buisness}`}
                className="w-full h-full object-cover cursor-pointer rounded-lg shadow-lg transition-transform transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {imageGallery.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              index === currentImageIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div> */}

      {isModalOpen && (
        <div className="fixed sm:-inset-2 inset-0 z-50 flex justify-center items-center bg-black bg-opacity-75 px-4 md:px-0">
          <div className="relative w-full md:max-w-4xl bg-black bg-opacity-70 p-4 rounded-lg shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-30 text-red-500 font-bold text-xl"
            >
              close
            </button>
            <div className="flex items-center justify-center relative">
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-200 text-3xl"
              >
                &#10094;
              </button>
              <img
                src={baseurl + imageGallery[currentImageIndex].image}
                alt={`Image ${imageGallery[currentImageIndex].buisness}`}
                className="w-full md:w-96 object-contain"
              />
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-200 text-3xl"
              >
                &#10095;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
