"use client";
import Link from "next/link";
import React from "react";

interface subcat {
  name: string;
  tittle: string;
}

interface RandomCategoriesProbs {
  SubCat: subcat[];
  city: string;
}

const RandomCategories: React.FC<RandomCategoriesProbs> = ({
  SubCat,
  city,
}) => {
  return (
    <div className="py-3">
      <h2 className="text-3xl font-ubuntuMedium text-gray-800 mb-4">
        Explore Categories
      </h2>
      <div className="flex md:hidden flex-wrap md:gap-4 gap-2 justify-center">
        {SubCat?.slice(0, 12).map((category, index) => (
          <Link
            key={index}
            href={`/${city}/${category.name
              .replace(/[\u200B-\u200D\uFEFF]/g, "")
              .replace(/\s+/g, "-")}`}
          >
            <div className="group relative p-1 border rounded-lg shadow-md bg-gray-100 hover:bg-[#f28b21] hover:shadow-lg transition duration-300 cursor-pointer">
              <span className="md:text-sm text-xs font-ubuntu text-gray-700 group-hover:text-white">
                {category.name}
              </span>

              <div className="absolute bottom-0 left-1/2 w-0 h-1 bg-[#c6884a] group-hover:w-full transition-all duration-300 transform -translate-x-1/2"></div>
            </div>
          </Link>
        ))}
        {/* <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-5 rounded-lg transition duration-200 ease-in-out focus:outline-none ">
          Show All
        </button> */}
      </div>
      <div className="md:flex hidden flex-wrap md:gap-4 gap-2 justify-center">
        {SubCat?.map((category, index) => (
          <Link
            key={index}
            href={`/${city}/${category.name
              .replace(/[\u200B-\u200D\uFEFF]/g, "")
              .replace(/\s+/g, "-")}`}
          >
            <div className="group relative p-1 border rounded-lg shadow-md bg-gray-100 hover:bg-[#f28b21] hover:shadow-lg transition duration-300 cursor-pointer">
              <span className="md:text-sm text-xs font-ubuntu text-gray-700 group-hover:text-white">
                {category.name}
              </span>

              <div className="absolute bottom-0 left-1/2 w-0 h-1 bg-[#c6884a] group-hover:w-full transition-all duration-300 transform -translate-x-1/2"></div>
            </div>
          </Link>
        ))}
        {/* <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-5 rounded-lg transition duration-200 ease-in-out focus:outline-none ">
          Show All
        </button> */}
      </div>
    </div>
  );
};

export default RandomCategories;
