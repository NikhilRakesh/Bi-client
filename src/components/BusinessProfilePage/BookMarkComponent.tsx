"use client";
import { token_api } from "@/lib/api";
import { parseCookies } from "@/lib/cookies";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { FaRegBookmark } from "react-icons/fa";
import { IoMdBookmark } from "react-icons/io";

export default function BookMarkComponent({ bid }: { bid: number }) {
  const [browser, setBrowser] = useState(false);
  const [bookMark, setBookMark] = useState(false);
  const cookies = parseCookies();
  const access_token = cookies?.access_token;

  const FetchBookMark = async () => {
    try {
      const response = await token_api(access_token).get(
        `users/check_bookmarked/?bid=${bid}`
      );

      if (response.status === 200) {
        if (response.data.Bookmarked) setBookMark(true);
      }
    } catch (error) {
      console.error("Error BookMarked:", error);
      throw error;
    }
  };

  useEffect(() => {
    setBrowser(true);
    if (access_token) FetchBookMark();
  }, []);

  if (!browser) return null;

  const BookMark = async () => {
    try {
      const response = await token_api(access_token).post(
        `users/groups/add-business/`,
        { bid: bid }
      );
      if (response.status === 201) {
        setBookMark(true);
      }
      if (response.status === 200) {
        setBookMark(false);
      }
    } catch (error) {
      console.error("Error BookMarked:", error);
      throw error;
    }
  };

  return (
    <div>
      {access_token ? (
        <div>
          <div
            className={`transition-transform duration-300 ease-in-out ${
              bookMark ? "scale-125" : "scale-90"
            }`}
          >
            {!bookMark ? (
              <FaRegBookmark
                onClick={BookMark}
                size={20}
                className="text-gray-700 text-xl cursor-pointer"
              />
            ) : (
              <IoMdBookmark
                onClick={BookMark}
                className="text-gray-700 text-xl cursor-pointer"
                size={20}
              />
            )}
          </div>
        </div>
      ) : (
        <Link href={"/login"}>
          <FaRegBookmark className="text-gray-700 text-xl cursor-pointer" />
        </Link>
      )}
      <Toaster />
    </div>
  );
}
