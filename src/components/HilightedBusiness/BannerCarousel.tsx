"use client";

import { baseurl } from "@/lib/api";
import { useEffect, useState } from "react";
interface ads {
  banner: string;
  name: string;
}

interface BannerCarouselProps {
  images: ads[];
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="relative w-full rounded-md overflow-hidden">
      <img
        className="object-cover w-full  h-full"
        src={baseurl + images[currentIndex].banner}
        alt="carousel"
      />

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images?.map((_, index) => (
          <div
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              currentIndex === index ? "bg-[#eaeaea]" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
          >
            &gt;
          </button>
        </>
      )}
    </div>
  );
};

export default BannerCarousel;
