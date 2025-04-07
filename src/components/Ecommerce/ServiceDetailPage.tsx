"use client";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import { baseurl } from "@/lib/api";

interface Data {
  name: string;
  description: string;
  service_images: { image: string; }[];
  price: string;
}

export default function ServiceDetailPage({
  onClose,
  itemdata,
}: {
  onClose: () => void;
  itemdata: Data;
}) {
  const [item] = useState({
    name: itemdata.name,
    description: itemdata.description,
    price: itemdata.price,
    images: itemdata.service_images,
  });

  const [activeImage, setActiveImage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const nextImage = () => {
    setActiveImage((prev) => (prev === item.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev === 0 ? item.images.length - 1 : prev - 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-lg bg-black/30 overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-white/90 rounded-2xl overflow-hidden shadow-2xl border border-white/20"
        style={{
          backdropFilter: "blur(16px)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="absolute top-4 right-4 flex justify-between items-center z-10">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/80 hover:bg-white transition-all shadow-md"
            aria-label="Close"
          >
            <FaTimes className="text-gray-700" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-6">
          <div className="relative">
            <div className="aspect-square w-full rounded-xl bg-gray-100 overflow-hidden relative">
              <img
                src={baseurl + item.images[activeImage].image}
                alt={item.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {item.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-all shadow-md text-gray-700"
                    aria-label="Previous image"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-all shadow-md text-gray-700"
                    aria-label="Next image"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>

            <div className="flex flex-wrap  md:flex-nowrap  md:space-x-3 gap-3 md:gap-0 custom-scrollbar space-x-0 mt-4 overflow-x-auto  pb-2">
              {item.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                    activeImage === index
                      ? "border-orange-500"
                      : "border-transparent"
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={baseurl + img.image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-4">
              <h1 className="text-3xl font-ubuntuMedium font-bold text-gray-900 mt-2">
                {item.name}
              </h1>
            </div>

            <div className="my-4">
              <div className="text-4xl font-bold text-gray-900">
                ₹{item.price.toLocaleString()}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900">Description</h3>
              <p
                className={`mt-2 text-gray-700 ${
                  isExpanded ? "" : "line-clamp-3"
                }`}
              >
                {item.description}
              </p>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-orange-600 text-sm font-medium mt-1 hover:underline focus:outline-none"
              >
                {isExpanded ? "Show less" : "Read more"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
