"use client";
import BackButton from "@/components/Common/BackButton";
import ProfileHeader from "@/components/Header/ProfileHeader";
import ProfileNav from "@/components/Profile/ProfileNav";
import BookMarkSkelton from "@/components/Skeltons/BookMarkSkelton";
import { baseurl, token_api } from "@/lib/api";
import { parseCookies } from "@/lib/cookies";
import { WebSocketProvider } from "@/lib/WebSocketContext";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

interface liked_buisnesses {
  id: number;
  business_name: string;
  city: string;
  locality: string;
  image: string;
  redirect_link: {
    id: number;
    link: string;
    meta_keywords: string;
  };
}

interface Business {
  id: number;
  name: string;
  city: string;
  liked_buisnesses: liked_buisnesses[];
}

export default function BookMarkPage() {
  const cookies = parseCookies();
  const access_token = cookies?.access_token;

  const [bookmarkedBusinesses, setBookmarkedBusinesses] = useState<Business[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (access_token) {
      fetchBookMarkData();
    }
  }, [access_token]);

  async function fetchBookMarkData() {
    setLoading(true);
    try {
      const response = await token_api(access_token).get("users/groups/user/");
      setBookmarkedBusinesses(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Unknown error:", error);
    }
  }

  const handleOnclick = (link: string) => {
    const urlWithDashes = link.replace(/ /g, "-");
    const truncatedUrl = urlWithDashes.split(",")[0];
    window.open(truncatedUrl, "_blank");
  };

  return (
    <div className=" py-8 bg-gradient-to-r from-indigo-100 to-sky-100 px-6  bg-white min-h-screen font-ubuntuMedium">
      <WebSocketProvider>
        <ProfileHeader />
      </WebSocketProvider>
      <ProfileNav business={"BookMarks"} />

      <div className="">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Bookmarked Businesses
        </h1>

        <BackButton />
        {!loading ? (
          <div className="flex flex-wrap gap-6 md:px-10 mt-5 w-full">
            {bookmarkedBusinesses.length > 0 ? (
              bookmarkedBusinesses?.map((BookMarked) => (
                <div key={BookMarked.id} className=" w-full gap-3 border">
                  <div>
                    <p className="text-gray-700 font-ubuntuMedium text-xl">
                      {BookMarked.name}
                    </p>
                  </div>
                  <div className="flex overflow-x-auto w-full  py-5 custom-scrollbar space-x-4">
                    {BookMarked?.liked_buisnesses.map((business) => (
                      <div
                        key={business.id}
                        onClick={() => {
                          handleOnclick(business.redirect_link.link);
                        }}
                        className="flex-shrink-0 w-64 border cursor-pointer bg-white border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
                      >
                        <img
                          src={baseurl + business.image}
                          alt={business.business_name}
                          className="w-full h-48 object-cover transform hover:scale-105 transition-all duration-300"
                        />
                        <div className="p-4">
                          <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-200">
                            {business.business_name}
                          </h3>
                          <p className="text-sm text-gray-600 font-ubuntu flex items-center">
                            <i className="mr-2">
                              <FaMapMarkerAlt />
                            </i>
                            {business.locality}, {business.city}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center text-gray-600 ">
                <p className="text-lg mb-4">
                  You haven&apos;t bookmarked any businesses yet.
                </p>
                <p className="text-md font-ubuntu">
                  Start exploring and bookmark your favorite businesses!
                </p>
              </div>
            )}
          </div>
        ) : (
          <BookMarkSkelton />
        )}
      </div>
    </div>
  );
}
