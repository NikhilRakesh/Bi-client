"use client";

import api from "@/lib/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
interface Data {
  city: string;
  category: string;
}

export default function HeaderSearchBar({ category, city }: Data) {
  const [inputValue, setInputValue] = useState(category.replace(/-/g, " "));
  const [Categories, setCategories] = useState<string[]>([]);
  const router = useRouter();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    try {
      const response = await api.get(`users/suggestions/?q=${e.target.value}/`);
      if (response.status === 200) {
        setCategories(response.data.suggestions);
      }
    } catch (error) {
      console.error("Unknown error:", error);
      throw error;
    }
  };

  function onClickCategory(cat: string) {
    router.push(`/${city}/${cat.replace(/ /g, "-")}`);
  }

  function searchOnClick() {
    if (!inputValue) return;
    router.push(`/${city}/${inputValue.replace(/ /g, "-")}`);
  }

  return (
    <div className="flex justify-between gap-2 items-center md:min-w-fit w-full">
      <div className="border flex items-center py-1  border-l-[#f28b21] border-r-[#f28b21] bg-gray-100 relative">
        <input
          className=" w-full p-1 bg-gray-100 font-ubuntu outline-none text-black text-sm"
          type="text"
          placeholder="what are you looking for?"
          id="searchinput-home"
          onChange={handleChange}
          value={inputValue}
        />

        {Categories.length !== 0 && (
          <div className="text-gray-600  bg-white absolute top-10  max-h-[400] border border-orange-400 w-full p-2 space-y-3 rounded-md  overflow-y-auto custom-scrollbar">
            {Categories?.map((category, index) => (
              <React.Fragment key={index}>
                <div
                  onClick={() => onClickCategory(category)}
                  className="flex justify-between cursor-pointer  "
                >
                  <div className="flex gap-3 items-center">
                    <IoIosSearch className="text-[#f28b21]" />
                    <p>{category}</p>
                  </div>
                  <FaArrowUp className="-rotate-45" />
                </div>
                <hr />
              </React.Fragment>
            ))}
          </div>
        )}
        <div>
          <div className="flex gap-1 items-center cursor-pointer hover:bg-gray-100 py-1 px-2 rounded-lg">
            <MdLocationOn className="text-black" />
            <h1 className="text-black font-ubuntu text-sm">{city}</h1>
          </div>
        </div>
      </div>
      <div onClick={searchOnClick} className="cursor-pointer">
        <img className="w-5" src="/search.png" alt="search-logo" />
      </div>
    </div>
  );
}
