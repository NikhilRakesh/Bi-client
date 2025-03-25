"use client";

import api from "@/lib/api";
import { setcityCookie } from "@/lib/cookies";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";

interface Data {
  city: string;
  category: string;
  changeCity: (data: string) => void;
}

interface location {
  place_name: string;
}

export default function HeaderSearchBar({ category, city, changeCity }: Data) {
  const [inputValue, setInputValue] = useState(category.replace(/-/g, " "));
  const [cityValue, setCityValue] = useState(city);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [Categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<location[]>([]);
  const [debouncedCityValue, setDebouncedCityValue] = useState(city);
  const router = useRouter();
  const apiKey = process.env.NEXT_PUBLIC_MapBox_api;
 

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

  async function selectLocation(data: string) {
    setCityValue(data);
    changeCity(data)
    setcityCookie(data);
    setLocations([]);
    setOpenDropDown(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCityValue(cityValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [cityValue]);

  useEffect(() => {
    setCityValue(city);
  }, [city]);

  useEffect(() => {
    if (debouncedCityValue && openDropDown) {
      const searchUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityValue}.json?access_token=${apiKey}&country=in`;
      const fetchLocationData = async () => {
        try {
          const response = await fetch(searchUrl);
          const data = await response.json();
          setLocations(data.features);
        } catch (error) {
          console.error("Error fetching location data:", error);
        }
      };

      fetchLocationData();
    }
  }, [debouncedCityValue]);

  return (
    <div className="flex justify-between gap-2 items-center md:min-w-fit w-full ">
      <div className="border flex items-center py-1  border-l-[#f28b21] border-r-[#f28b21] bg-gray-100 relative">
        <div className="w-6/12">
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
        </div>

        <div className="flex w-6/12 gap-1 relative items-center cursor-pointer hover:bg-gray-100 py-1 px-2 border border-orange-400">
          <MdLocationOn className="text-black" />
          <input
            type="text"
            onClick={() => {
              setCityValue("");
              setOpenDropDown(true);
            }}
            onChange={(e) => setCityValue(e.target.value)}
            value={cityValue}
            className="text-black font-ubuntu text-sm bg-gray-100 outline-none w-11/12 "
          />
          {openDropDown && locations.length !== 0 && (
            <div className="text-xs text-gray-700 absolute top-10 right-0 left-0 border p-2 bg-white w-full rounded-sm">
              {locations?.map((location, index) => (
                <div
                  key={index}
                  onClick={() => {
                    selectLocation(location.place_name.split(",")[0]);
                  }}
                  className="py-1"
                >
                  <p>{location.place_name.replace(", India", "")}</p>
                  <hr />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div onClick={searchOnClick} className="cursor-pointer">
        <img className="w-5" src="/search.png" alt="search-logo" />
      </div>
    </div>
  );
}
