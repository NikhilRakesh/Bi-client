"use client";
import BackButton from "@/components/Common/BackButton";
import ProfileHeader from "@/components/Header/ProfileHeader";
import ProfileNav from "@/components/Profile/ProfileNav";
import EnquiresListSkelton from "@/components/Skeltons/EnquiresListSkelton";
import { token_api } from "@/lib/api";
import { parseCookies } from "@/lib/cookies";
import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";

interface Enquiry {
  id: number;
  name: string;
  mobile_number: string;
  message: string | null;
  buisness: number;
  date: string;
  time: string;
  is_read: boolean;
  user: number;
}

export default function EnquiryList() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const cookies = parseCookies();
  const access_token = cookies?.access_token;

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await token_api(access_token).get("users/enquiries/");
        const data = await response.data;
        setEnquiries(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching enquiries:", error);
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  const formatTime = (date: string, time: string) => {
    const dateTime = `${date}T${time}`;
    const dateObj = new Date(dateTime);
    return dateObj.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="py-8 bg-gradient-to-r md:px-10 px-2 from-indigo-100 to-sky-100  bg-white  rounded-2xl shadow-lg font-ubuntu min-h-screen">
      <ProfileHeader />
      <div className="md:px-6 mb-6">
        <h1 className="text-4xl font-bold font-ubuntuMedium text-gray-800">
          Enquiries
        </h1>
      </div>

      {loading ? (
        <div className=" w-full py-8">
          <EnquiresListSkelton />
        </div>
      ) : (
        <div className="space-y-7 px-3 md:px-10 ">
          <BackButton />
          {enquiries.length > 0 ? (
            enquiries
              .slice()
              .reverse()
              .map((enquiry) => (
                <div
                  key={enquiry.id}
                  className="bg-white md:p-6 p-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold font-ubuntuMedium text-gray-800">
                      {enquiry.name}
                    </h2>
                  </div>
                  {enquiry.is_read && (
                    <p className="absolute top-0 right-10 text-sm bg-green-500 px-2 rounded-br-lg">
                      New
                    </p>
                  )}
                  <div className="flex justify-between items-center text-gray-600">
                    <p className="flex items-center text-sm">
                      <FaPhoneAlt className="mr-2 text-blue-500" />{" "}
                      {enquiry.mobile_number}
                    </p>
                    <p className="flex items-center text-sm">
                      <FaCalendarAlt className="mr-2 text-blue-500" />{" "}
                      {enquiry.date}
                    </p>
                    <p className="flex items-center text-sm">
                      <FaClock className="mr-2 text-blue-500" />
                      {formatTime(enquiry.date, enquiry.time)}
                    </p>
                  </div>

                  {enquiry.message && (
                    <div className="mt-4 text-gray-700 flex gap-1">
                      <FiMessageSquare
                        className="mr-2 text-blue-500"
                        size={20}
                      />
                      <p className="text-sm"> {enquiry.message}</p>
                    </div>
                  )}
                </div>
              ))
          ) : (
            <div className="text-center text-gray-600 py-4">
              No enquiries available.
            </div>
          )}
        </div>
      )}
      <ProfileNav business={"Enquires"} />
    </div>
  );
}
