"use client";

import { useState, useEffect, useRef } from "react";
import { baseurl } from "@/lib/api";
import { IoCloseOutline } from "react-icons/io5";

interface PexelImage {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_id: number;
  photographer_url: string;
  src: {
    original: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
  };
  alt: string;
}

interface GalleryImage {
  image: string;
  buisness: number;
}

type MergedImage = GalleryImage | PexelImage;

export default function BusinessProfileImageGallery({
  imageGallery,
  dcats,
}: {
  imageGallery: GalleryImage[];
  dcats: string[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pexelPics, setPexelPics] = useState<PexelImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const apiKey = process.env.NEXT_PUBLIC_Pexels_api;

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

    fetchPexelPhotos(dcats[0]);

    return () => clearInterval(interval);
  }, [dcats]);

  async function fetchPexelPhotos(query: string) {
    if (!apiKey) {
      throw new Error("API Key is missing");
    }
    if (imageGallery.length >= 5) return;

    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&per_page=10`,
      {
        headers: {
          Authorization: `${apiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from Pexels");
    }

    const data = await response.json();
    setPexelPics(data.photos);
  }

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === mergedImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? mergedImages.length - 1 : prevIndex - 1
    );
  };

  const mergedImages: MergedImage[] = [...imageGallery, ...pexelPics];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <div className="overflow-hidden relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hidden"
        >
          {mergedImages.map((image, index) => (
            <div
              key={index}
              className="relative md:w-64 md:h-48 w-48 h-56 flex-shrink-0"
              onClick={() => openModal(index)}
            >
              <img
                src={
                  "image" in image ? baseurl + image.image : image.src.medium
                }
                alt={
                  "buisness" in image
                    ? `Image ${image.buisness}`
                    : image.photographer
                }
                className="w-full h-full object-cover cursor-pointer rounded-lg shadow-lg transition-transform transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 left-4 ">
        <button
          onClick={scrollLeft}
          className="text-gray-200 text-3xl bg-black bg-opacity-50 rounded-full p-2"
        >
          &#10094;
        </button>
      </div>
      <div className="absolute top-1/2 right-4 ">
        <button
          onClick={scrollRight}
          className="text-gray-200 text-3xl bg-black bg-opacity-50 rounded-full p-2"
        >
          &#10095;
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed sm:-inset-2 inset-0 z-40 flex justify-center items-center bg-black bg-opacity-90 px-4 md:p-52">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-30 text-gray-300 font-bold text-xl"
          >
            <IoCloseOutline size={25} />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-200 text-3xl"
          >
            &#10094;
          </button>
          <div className="flex items-center justify-center relative">
            <img
              src={
                "image" in mergedImages[currentImageIndex]
                  ? baseurl + mergedImages[currentImageIndex].image
                  : mergedImages[currentImageIndex].src.original
              }
              alt={`Image ${
                "buisness" in mergedImages[currentImageIndex]
                  ? mergedImages[currentImageIndex].buisness
                  : mergedImages[currentImageIndex].photographer
              }`}
              className="w-full h-full object-contain"
            />
          </div>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-200 text-3xl"
          >
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
}
