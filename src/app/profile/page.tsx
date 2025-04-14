"use client";
import PageNotAvailable from "@/components/Common/PageNotAvailable";
import ProfileSkelton from "@/components/Common/ProfileSkelton";
import ProfileHeader from "@/components/Header/ProfileHeader";
import MobileProfileScore from "@/components/Profile/MobileProfileScore";
import ProfileNameModal from "@/components/Profile/ProfileNameModal";
import ProfileNav from "@/components/Profile/ProfileNav";
import ProfileScore from "@/components/Profile/ProfileScore";
import { baseurl, token_api } from "@/lib/api";
import { parseCookies } from "@/lib/cookies";
import { WebSocketProvider } from "@/lib/WebSocketContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaPlus, FaBullhorn, FaEye } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";

interface Plan {
  bi_assured: boolean;
  bi_certification: boolean;
  bi_verification: boolean;
  google_map: boolean;
  image_gallery: boolean;
  plan_name: string;
  products_and_service_visibility: boolean;
  profile_view_count: boolean;
  profile_visit: boolean;
  video_gallery: boolean;
  whatsapp_chat: boolean;
}

interface Business {
  id: number;
  name: string;
  buisness_type: string;
  city: number;
  state: string;
  pincode: string;
  whatsapp_number: string;
  score: string;
  user: number;
  no_of_views: number | null;
  building_name: string;
  description: string;
  facebook_link: string;
  instagram_link: string;
  latittude: string;
  longitude: string;
  locality: number;
  manager_name: string;
  opens_at: string | null;
  closes_at: string | null;
  since: string | null;
  web_link: string;
  image: string;
  plan: Plan;
}

interface UserProfile {
  first_name: string;
  mobile_number: string;
}

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [businessData, setBusinessData] = useState<Business[]>([]);

  const cookies = parseCookies();
  const access_token = cookies?.access_token;
  const refresh_token = cookies?.refresh_token;
  const router = useRouter();

  const handleSave = (name: string, phone: string) => {
    console.log("Updated user:", { name, phone });
  };

  const fetchProfileData = async () => {
    try {
      const response = await token_api(access_token).get("users/buisnesses/");
      setProfileData(response.data.user);
      setBusinessData(response.data.buisnesses);
      console.log(response.data);
    } catch (error) {
      console.error("Unknown error:", error);
      throw error;
    }
  };

  const AddBusiness = () => {
    router.push("/business-listing/add-business?step=1");
  };

  const pricingPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push("/pricing");
  };

  const BusinessProfile = (bid: number) => {
    router.push(`/profile/bi-business?bid=${bid}`);
  };

  useEffect(() => {
    setIsBrowser(true);
    if (refresh_token) fetchProfileData();
  }, [refresh_token]);

  if (!isBrowser) {
    return <ProfileSkelton />;
  }

  if (!refresh_token) {
    return <PageNotAvailable />;
  }

  if (!profileData) {
    return <ProfileSkelton />;
  }

  function BackButton() {
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-sky-50 md:p-8 p-4 font-ubuntu overflow-x-hidden">
      <WebSocketProvider>
        <ProfileHeader />
      </WebSocketProvider>
      <button
        onClick={BackButton}
        className="text-gray-600 font-ubuntu py-2 flex items-center gap-2 cursor-pointer"
      >
        <FaArrowLeftLong />
        <span className="text-sm font-semibold font-ubuntuMedium ">back</span>
      </button>
      <div className="flex flex-row mb-8 px-4 md:px-10 w-full justify-between items-center">
        <div className="flex flex-row items-center justify-between mb-4 relative">
          <div className="flex flex-col items-start">
            <h1 className="md:text-3xl text-xl font-bold text-gray-800 mb-1 font-ubuntuMedium">
              {profileData?.first_name}
            </h1>
            <div className="flex gap-1">
              <p className="text-gray-600">{profileData?.mobile_number}</p>
            </div>
          </div>
          {/* <button
            onClick={() => setIsModalOpen(true)}
            className="text-gray-600 absolute right-0 bottom-0 hover:text-gray-800 p-2 rounded-full hover:border-gray-300 focus:outline-none"
          >
            <FaEdit className="inline-block text-xl" />
          </button> */}
        </div>

        <div>
          <button
            onClick={AddBusiness}
            className="bg-black text-gray-200 px-6 py-3 rounded-lg flex items-center md:text-base text-sm  font-ubuntu transition-colors shadow-lg"
          >
            <FaPlus className="mr-2" />
            Add New Business
          </button>
        </div>
      </div>

      <div className=" px-0  flex gap-5 ">
        <div className="md:px-44 w-full">
          {businessData.length !== 0 ? (
            <div className="space-y-6">
              {businessData?.map((business) => (
                <div
                  onClick={() => {
                    BusinessProfile(business.id);
                  }}
                  key={business.id}
                  className="bg-white rounded-lg shadow-md px-4 py-2 hover:shadow-xl transition-shadow relative cursor-pointer"
                >
                  <p className="md:text-sm text-xs absolute top-0 text-gray-300 px-2 rounded-bl-lg bg-black">
                    {business.buisness_type}
                  </p>

                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="flex items-center space-x-6">
                      <div className="flex-shrink-0 md:mt-0 mt-3">
                        <img
                          src={baseurl + business.image}
                          alt="Business Image"
                          className="w-32 h-32 object-cover rounded-lg shadow-md"
                        />
                      </div>
                      <div>
                        <h2 className="md:text-2xl text-md font-semibold font-ubuntuMedium text-gray-800 mb-2">
                          {business.name}
                        </h2>
                        <div className="flex items-center text-sm text-gray-600 space-x-2">
                          <MdLocationPin className="text-gray-700" />
                          <p>
                            {business.state}, {business.city},{" "}
                            {business.locality}
                          </p>
                        </div>
                        {business?.plan?.profile_visit && (
                          <div className="flex items-center space-x-2 text-gray-700  py-2 ">
                            <FaEye className="text-blue-600" />
                            <span className="md:text-lg text-sm font-semibold">
                              {business?.no_of_views} Views
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex md:flex-col flex-row justify-end w-full md:w-auto ">
                      <div className="text-center md:flex justify-center hidden">
                        {business?.score && (
                          <ProfileScore score={business?.score} />
                        )}
                      </div>
                      <div className="text-center absolute top-[-38] right-[-30] flex  md:hidden">
                        {business?.score && (
                          <MobileProfileScore score={business?.score} />
                        )}
                      </div>
                      <div className="md:flex hidden justify-center sm:justify-end w-full md:w-auto">
                        {business?.plan?.plan_name === "Default Plan" ? (
                          <button
                            onClick={pricingPage}
                            className="bg-yellow-500 text-white h-fit px-6 py-2 rounded-lg flex items-center hover:bg-yellow-600 transition-colors shadow-lg"
                          >
                            <FaBullhorn className="mr-2" />
                            Promote Business
                          </button>
                        ) : (
                          <div className=" text-black h-fit px-6 py-1 rounded-md flex gap-2 items-center ">
                            <img
                              src="/verified-user.png"
                              className="w-5 h-5"
                              alt=""
                            />
                            <span className="font-ubuntu font-semibold">
                              {business?.plan?.plan_name}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex md:hidden absolute bottom-2 right-10 justify-end w-full md:w-auto">
                        {business?.plan?.plan_name === "Default Plan" ? (
                          <button
                            onClick={pricingPage}
                            className="bg-yellow-500 text-white h-fit px-6 py-1 text-sm rounded-lg flex items-center hover:bg-yellow-600 transition-colors shadow-lg"
                          >
                            <FaBullhorn className="mr-2" />
                            Promote Business
                          </button>
                        ) : (
                          <div className=" text-black h-fit px-6 py-1 rounded-md flex gap-2 items-center ">
                            <img
                              src="/verified-user.png"
                              className="w-5 h-5"
                              alt=""
                            />
                            <span className="font-ubuntu font-semibold">
                              {business?.plan?.plan_name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p className="font-ubuntuMedium text-2xl text-center text-gray-700">
                No Business Added. . .
              </p>
            </div>
          )}
        </div>
        {profileData && (
          <ProfileNameModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            user={profileData}
            onSave={handleSave}
          />
        )}
      </div>
      <ProfileNav business={"Business"} />
    </div>
  );
};

export default Profile;
