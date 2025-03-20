"use client";
import PageNotAvailable from "@/components/Common/PageNotAvailable";
import { parseCookies } from "@/lib/cookies";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaClock,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaFlag,
} from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { FaLocationCrosshairs, FaSquareXTwitter } from "react-icons/fa6";
import ProfileHeader from "@/components/Header/ProfileHeader";
import BusinessProfileSkeleton from "@/components/Common/BusinessProfileSkeleton";
import { baseurl, token_api } from "@/lib/api";
import ProductCardProfile from "@/components/Profile/ProductCardProfile";
import ServiceCardProfile from "@/components/Profile/ServiceCardProfile";
import BusinessProfileAnalytics from "@/components/Profile/BusinessProfileAnalytics";
import EmailOtpModal from "@/components/Profile/EmailOtpModal";
import SocialLinksModal from "@/components/Profile/SocialLinksModal";
import { AiOutlineEdit } from "react-icons/ai";
import ImageUploadModal from "@/components/Profile/ImageUploadModal";
import ImageGallery from "@/components/Profile/ImageGallery";
import toast, { Toaster } from "react-hot-toast";
import ImageGalleryModal from "@/components/Profile/ImageGalleryModal";
import { IoPersonSharp } from "react-icons/io5";
import OfferModal from "./OfferModal";
import BackButton from "../Common/BackButton";

interface Business {
  building_name: string;
  buisness_type: string;
  city: number;
  closes_at: string | null;
  description: string;
  facebook_link: string;
  youtube_link: string;
  x_link: string;
  id: number;
  incharge_number: string;
  instagram_link: string;
  latitude: string;
  locality: number;
  longitude: string;
  email: string;
  manager_name: string;
  name: string;
  no_of_views: number;
  opens_at: string | null;
  pincode: string;
  score: string;
  since: string | null;
  state: string;
  user: number;
  no_of_enquiries: number;
  web_link: string;
  whatsapp_number: string;
  avg_time_spend_in_profile: string;
  sa_rate: string;
  image: string;
}

interface UserProfile {
  first_name: string;
  mobile_number: string;
}

interface Product {
  name: string;
  price: string;
  description: string;
  product_images: { image: string }[];
  sub_cat: number;
  buisness: number;
  id: number;
  searched: number;
}

interface Service {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  buisness: number;
  cat: number;
  searched: number;
}

interface analytics {
  average_time_spend: string;
  keywords: [];
}

interface Position {
  coords: {
    latitude: number;
    longitude: number;
  };
}

interface OfferData {
  offer_type: string;
  minimum_bill_amount: number;
  valid_upto: string;
  is_percent: boolean;
  is_flat: boolean;
  offer: number;
  buisness: string | null;
}

export default function BusinessProfile() {
  const [isBrowser, setIsBrowser] = useState(false);
  const cookies = parseCookies();
  const access_token = cookies?.access_token;
  const refresh_token = cookies?.refresh_token;
  const searchParams = useSearchParams();
  const bid = searchParams.get("bid");
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [businessData, setBusinessData] = useState<Business | null>(null);
  const [offerData, setOfferData] = useState<OfferData[]>([]);
  const [productData, setProductData] = useState<Product[]>([]);
  const [serviceData, setServiceData] = useState<Service[]>([]);
  const [analyticsData, setAnalyticsData] = useState<analytics | null>(null);
  const [openEmailModal, setopenEmailModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLink, setSelectedLink] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openTime, setOpenTime] = useState(businessData?.opens_at || "");
  const [closeTime, setCloseTime] = useState(businessData?.closes_at || "");
  const [isOpenTimeModalOpen, setIsOpenTimeModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [galleryModal, setGalleyModal] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const fetchProfileData = async () => {
    try {
      const response = await token_api(access_token).get(
        `users/buisnesses/?bid=${bid}`
      );
      console.log(response.data);
      if (response.status === 200) {
        setProfileData(response.data.user);
        setBusinessData(response.data.buisness);
        setProductData(response.data.products);
        setServiceData(response.data.services);
        setAnalyticsData(response.data.analytics);
        setOfferData(response.data.offers);
      }
    } catch (error) {
      console.error("Unknown error:", error);

      throw error;
    }
  };

  const setEmailToParent = (email: string) => {
    setBusinessData((prevData) => {
      if (prevData) {
        return { ...prevData, email: email };
      }
      return prevData;
    });
    setopenEmailModal(false);
  };

  const handleOpenModal = (link: string) => {
    setSelectedLink(link);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedLink(null);
  };

  const handleSaveLinks = (newLinks: Partial<Business>) => {
    setBusinessData((prevData) => {
      if (prevData) {
        return { ...prevData, ...newLinks };
      }
      return prevData;
    });
    handleCloseModal();
  };

  const render = () => {
    setRefresh(!refresh);
  };

  const handleAddTime = async (timeType: "opens_at" | "closes_at") => {
    if (businessData) {
      if (timeType === "opens_at") {
        businessData.opens_at = openTime;
      } else {
        businessData.closes_at = closeTime;
      }
      try {
        const response = await token_api(access_token).patch(
          `users/buisnessesedit/${bid}/`,
          { ["opens_at"]: openTime, ["closes_at"]: closeTime }
        );

        if (response.status === 200) {
          toast.success("added successfully!");
        } else {
          toast.error("Invalid Time.");
        }
      } catch (error) {
        console.error("Unknown error:", error);
        toast.error("Something went wrong, please try again.");
      }
      setIsOpenTimeModalOpen(false);
    }
  };

  async function getDeviceLocation() {
    try {
      const position = await new Promise<Position>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude, longitude } = position.coords;
      try {
        const response = await token_api(access_token).patch(
          `users/buisnessesedit/${bid}/`,
          {
            ["latitude"]: latitude,
            ["longitude"]: longitude,
          }
        );

        if (response.status === 200) {
          toast.success("Location added successfully!");
        } else {
          toast.error("Failed to add location.");
        }
      } catch {
        toast.error("An error occurred while adding the location.");
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error retrieving device location:", error);
      return null;
    }
  }

  useEffect(() => {
    setIsBrowser(true);
    console.log("here");

    if (refresh_token) fetchProfileData();
  }, [refresh_token, refresh]);

  if (!isBrowser || !businessData) {
    return <BusinessProfileSkeleton />;
  }

  if (!refresh_token) {
    return <PageNotAvailable />;
  }

  return (
    <div className="bg-gradient-to-r h-screen from-indigo-100 to-sky-100 overflow-x-hidden  bg-white shadow-2xl rounded-2xl px-4 md:px-8 py-5 font-ubuntu ">
      <ProfileHeader />
      <BackButton />
      {/* <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-8 rounded-3xl shadow-xl text-white">
        <h2 className="text-3xl font-bold font-ubuntuMedium">
          Boost Your Business with Our Premium Packages!
        </h2>
        <p className="mt-2 text-lg">
          Unlock more features, visibility, and growth with our exclusive
          packages designed to promote your business.
        </p>
        <button
          className="mt-4 bg-black text-gray-200 py-3 px-8 rounded-xl shadow-md hover:scale-105 transition duration-300"
        >
          Choose a Package
        </button>
      </div> */}

      <div className="flex items-center space-x-6 mt-5 group ">
        <div className="relative rounded-full overflow-hidden">
          <img
            src={baseurl + businessData.image}
            alt={businessData?.name}
            className="object-cover  w-24 h-24 rounded-full shadow-xl transform group-hover:scale-110 transition duration-300"
          />
          <div className="absolute bottom-0 left-0 cursor-pointer right-0 flex justify-center items-center bg-gray-800 bg-opacity-50 rounded-b-full p-1">
            <AiOutlineEdit
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="text-white"
            />
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-semibold font-ubuntuMedium text-gray-800 transition duration-300">
            {businessData?.name}
          </h1>
          <p className="text-lg text-gray-600 font-ubuntu">
            Business Type : {businessData?.buisness_type}
          </p>
          {businessData?.since && (
            <p className="text-sm text-gray-600 font-ubuntu">
              Since {new Date(businessData?.since).getFullYear()}
            </p>
          )}
        </div>
      </div>

      <BusinessProfileAnalytics
        businessData={businessData}
        analyticsData={analyticsData}
      />

      <div className="md:p-8 p-4 mt-8 font-ubuntu">
        <div className="mb-6">
          <h3 className="md:text-2xl text-lg font-semibold text-gray-800 mb-4">
            Keywords That The Account Was Shown For
          </h3>
          <div className="flex overflow-x-auto gap-4 py-2">
            {analyticsData?.keywords.map((keyword, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-sky-50 p-1 md:p-3 rounded-lg shadow-lg w-max"
              >
                <span className="text-gray-700 font-medium">{keyword}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="md:text-2xl text-lg font-semibold text-gray-800 mb-4">
            Social Media Platforms
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                platform: "Instagram",
                icon: <FaInstagram size={24} />,
                link: businessData.instagram_link,
                linkid: "instagram_link",
              },
              {
                platform: "Facebook",
                icon: <FaFacebook size={24} />,
                link: businessData.facebook_link,
                linkid: "facebook_link",
              },
              {
                platform: "X",
                icon: <FaSquareXTwitter size={24} />,
                link: businessData.x_link,
                linkid: "x_link",
              },
              {
                platform: "YouTube",
                icon: <FaYoutube size={24} />,
                link: businessData.youtube_link,
                linkid: "youtube_link",
              },
            ].map((social, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-sky-50 md:p-4 p-1 rounded-lg shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl text-gray-700">{social.icon}</span>
                  <span className="text-gray-700 font-medium">
                    {social.platform}
                  </span>
                </div>
                {social.link ? (
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm"
                  >
                    {`Link`}{" "}
                  </a>
                ) : (
                  <div
                    onClick={() => {
                      handleOpenModal(`${social.linkid}`);
                    }}
                    className="flex gap-1 cursor-pointer"
                  >
                    <IoIosAddCircle className="text-gray-700" />
                    <p className="text-gray-600 text-xs sm:hidden md:block">
                      Add Link
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="md:text-2xl text-xl font-semibold text-gray-800 mb-4">
            Business Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="flex items-center justify-between  gap-1 bg-gradient-to-r from-indigo-50 to-sky-50 md:p-4 p-2 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt size={24} className="text-gray-700" />
                <span className="text-gray-700">Address</span>
              </div>
              <p className="text-sm font-medium text-gray-800">
                {businessData?.locality || "Not Set"},{" "}
                {businessData?.city || "Not Set"},{" "}
                {businessData?.state || "Not Set"}
              </p>
            </div>

            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-sky-50 p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <FaEnvelope size={24} className="text-gray-700" />
                <span className="text-gray-700 font-medium">Email</span>
              </div>
              {businessData?.email ? (
                <span className="text-gray-600">{businessData?.email}</span>
              ) : (
                <button
                  onClick={() => setopenEmailModal(true)}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <IoIosAddCircle className="text-gray-700" size={14} />
                  <div>
                    <p className="text-xs text-gray-800">Add Email</p>
                  </div>
                </button>
              )}
            </div>

            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-sky-50 p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <FaPhoneAlt size={24} className="text-gray-700" />
                <span className="text-gray-700 font-medium">Phone</span>
              </div>
              <span className="text-gray-600">
                {profileData?.mobile_number}
              </span>
            </div>

            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-sky-50 p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <FaGlobe size={24} className="text-gray-700" />
                <span className="text-gray-700 font-medium">Website</span>
              </div>
              {businessData?.web_link ? (
                <div className="flex items-center ">
                  <div>
                    <a
                      href={
                        businessData?.web_link.startsWith("http")
                          ? businessData.web_link
                          : `https://${businessData.web_link}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" font-medium text-blue-600 hover:text-indigo-500 transition duration-300"
                    >
                      {businessData?.web_link}
                    </a>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleOpenModal("web_link");
                  }}
                  className="flex items-center gap-1 "
                >
                  <IoIosAddCircle className="text-gray-500" size={14} />
                  <div>
                    <p className="text-xs text-gray-800">Add Website</p>
                  </div>
                </button>
              )}
            </div>

            <div className="flex items-center justify-between  bg-gradient-to-r from-indigo-50 to-sky-50 p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <FaClock size={24} className="text-gray-700" />
                <span className="text-gray-700 font-medium">
                  Business Hours
                </span>
              </div>
              <div>
                {!businessData?.opens_at || !businessData?.closes_at ? (
                  <button
                    onClick={() => setIsOpenTimeModalOpen(true)}
                    className="w-full md:w-auto flex gap-1 items-center "
                  >
                    <IoIosAddCircle className="text-gray-500" size={14} />
                    <div>
                      <p className="text-xs text-gray-800">Add Time</p>
                    </div>
                  </button>
                ) : (
                  <span className="text-gray-600">
                    {new Date(
                      `1970-01-01T${businessData?.opens_at}`
                    ).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}{" "}
                    <span className="px-2">-</span>
                    {new Date(
                      `1970-01-01T${businessData?.closes_at}`
                    ).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-sky-50 p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <FaFlag size={24} className="text-gray-700" />
                <span className="text-gray-700 font-medium">Since</span>
              </div>
              <div>
                {businessData.since ? (
                  <span className="text-gray-600">{businessData.since}</span>
                ) : (
                  <button
                    onClick={() => {
                      handleOpenModal("since");
                    }}
                    className="w-full md:w-auto flex gap-1 items-center "
                  >
                    <IoIosAddCircle className="text-gray-500" size={14} />
                    <div>
                      <p className="text-xs text-gray-800">Add Year</p>
                    </div>
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-sky-50 p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <FaPhoneAlt size={24} className="text-gray-700" />
                <span className="text-gray-700 font-medium">Incharge</span>
              </div>
              <div>
                {businessData.incharge_number ? (
                  <span className="text-gray-600">
                    {businessData.incharge_number}
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      handleOpenModal("incharge_number");
                    }}
                    className="w-full md:w-auto flex gap-1 items-center "
                  >
                    <IoIosAddCircle className="text-gray-500" size={14} />
                    <div>
                      <p className="text-xs text-gray-800">Add Number</p>
                    </div>
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-sky-50 p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <IoPersonSharp size={24} className="text-gray-700" />
                <span className="text-gray-700 font-medium">Manager</span>
              </div>
              <div>
                {businessData.manager_name ? (
                  <span className="text-gray-600">
                    {businessData.manager_name}
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      handleOpenModal("manager_name");
                    }}
                    className="w-full md:w-auto flex gap-1 items-center "
                  >
                    <IoIosAddCircle className="text-gray-500" size={14} />
                    <div>
                      <p className="text-xs text-gray-800">Add Name</p>
                    </div>
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-sky-50 p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <FaLocationCrosshairs size={24} className="text-gray-700" />
                <span className="text-gray-700 font-medium">Shop Location</span>
              </div>

              <div>
                {businessData.latitude && businessData.longitude ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Location Added</span>
                    <span className="text-gray-500">
                      ({businessData.latitude}, {businessData.longitude})
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={getDeviceLocation}
                    className={` md:w-auto flex justify-center gap-1 items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-300 ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                  >
                    <IoIosAddCircle className="text-white" size={18} />
                    <div className="flex">
                      <p className="text-xs text-white">Add </p>
                      <p className="text-xs text-white">Location </p>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <OfferModal render={render} bid={bid} offerDatas={offerData} />

      <ProductCardProfile
        productData={productData}
        render={render}
        businessData={businessData}
      />

      <ServiceCardProfile
        services={serviceData}
        render={render}
        businessData={businessData}
      />

      {openEmailModal && (
        <EmailOtpModal
          setEmailToParent={setEmailToParent}
          bid={businessData.id}
        />
      )}

      <SocialLinksModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveLinks}
        selectedLink={selectedLink}
      />

      <ImageUploadModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        render={render}
      />

      <ImageGallery openModal={() => setGalleyModal(true)} />

      {isOpenTimeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 w-full flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg text-gray-700 font-ubuntuMedium font-semibold mb-4">
              Add Open and Close Time
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-600 text-sm font-medium">
                  Open Time (24-hour format):
                </label>
                <input
                  type="time"
                  value={openTime}
                  onChange={(e) => setOpenTime(e.target.value)}
                  className="w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium">
                  Close Time (24-hour format):
                </label>
                <input
                  type="time"
                  value={closeTime}
                  onChange={(e) => setCloseTime(e.target.value)}
                  className="w-full text-gray-800 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setIsOpenTimeModalOpen(false)}
                className="px-4 py-2 bg-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleAddTime("opens_at");
                  handleAddTime("closes_at");
                }}
                className="px-4 py-2 bg-orange-500 text-white rounded-md"
              >
                Save Times
              </button>
            </div>
          </div>
        </div>
      )}

      {galleryModal && (
        <ImageGalleryModal onClose={() => setGalleyModal(false)} />
      )}
      <Toaster />
    </div>
  );
}
