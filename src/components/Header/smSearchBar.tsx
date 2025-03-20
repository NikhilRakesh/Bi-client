"use client";

import api from "@/lib/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowUp } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

interface data {
  category: string;
  city: string;
}

export default function SmSearchBar({ category, city }: data) {
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
    <div className=" w-full h-full relative flex ">
      <div className="flex justify-center items-center">
        <CiSearch className="text-1xl text-gray-600" />
      </div>
      <input
        type="text"
        placeholder="Search Category"
        value={inputValue}
        onChange={handleChange}
        className=" w-full h-full outline-none text-gray-600 px-2 rounded-md"
      />
      <div onClick={searchOnClick} className="bg-black px-10 rounded-md h-full flex justify-center items-center">
        <h1 className="text-gray-400">search</h1>
      </div>
      {Categories.length !== 0 && (
        <div className="text-gray-600  bg-white absolute top-10 max-h-[350]  md:max-h-[400] border border-orange-400 w-full p-2 space-y-3 rounded-md  overflow-y-auto custom-scrollbar">
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
    </div>
  );
}
