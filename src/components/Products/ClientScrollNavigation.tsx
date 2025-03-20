"use client";

import { baseurl } from "@/lib/api";
import Link from "next/link";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Product {
  name: string;
  image: string;
  tittle: string;
}

interface ClientScrollNavigationProps {
  Products: Product[];
  city: string;
}

export default function ClientScrollNavigation({
  Products,
  city,
}: ClientScrollNavigationProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -240,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 240,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative pl-3 md:pl-6">
      <button
        onClick={scrollLeft}
        className="hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-700 text-white p-2 rounded-full"
      >
        <FaChevronLeft size={24} />
      </button>

      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hidden w-full border border-transparent"
      >
        {Products?.map((product, index) => (
          <Link
            key={index}
            href={`/${city}/${product.name.replace(/\s+/g, "-")}`}
          >
            <div className="relative bg-white rounded-xl w-[236px] md:h-[300px] sm:h-[250px] sm:w-[236px] md:w-[236px] lg:w-[236px] shadow-lg hover:shadow-2xl transition-shadow duration-300 flex-shrink-0">
              <img
                src={baseurl + product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4 rounded-b-xl">
                <h3 className="text-lg sm:text-2xl font-bold text-white text-center">
                  {product.name}
                </h3>
                {/* <p className="text-xs font-ubuntu truncate sm:text-sm text-white text-center">
                {product.description}
              </p> */}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-700 text-white p-2 rounded-full"
      >
        <FaChevronRight size={24} />
      </button>
    </div>
  );
}
