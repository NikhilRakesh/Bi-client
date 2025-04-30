"use client";
import PageNotAvailable from "@/components/Common/PageNotAvailable";
import { parseCookies } from "@/lib/cookies";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
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
import { FiChevronDown, FiChevronUp, FiSearch } from "react-icons/fi";
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
import { MdOutlineInfo } from "react-icons/md";
import LocationWarningModal from "./LocationWarningModal";
import BusinessCatAdd from "./BusinessCatAdd";
import { WebSocketProvider } from "@/lib/WebSocketContext";

interface video_gallery {
  id: number;
  hls_path: string;
  video_file: string;
}

interface PlanDetails {
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
  sa_rate: boolean;
  keywords: boolean;
  average_time_spend: boolean;
  offers: boolean;
}

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
  latittude: string;
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
  image: string;
  plan: PlanDetails;
  video_gallery: video_gallery[];
}

interface UserProfile {
  first_name: string;
  mobile_number: string;
}

interface Product {
  name: string;
  price: string;
  description: string;
  product_images: { image: string; id: number }[];
  sub_cat: number;
  buisness: number;
  id: number;
  searched: number;
}

interface Service {
  id: number;
  name: string;
  description: string;
  service_images: { image: string; id: number }[];
  price: string;
  buisness: number;
  cat: number;
  searched: number;
}

interface mostsearchedproducts {
  id: number;
  name: string;
  price: string;
  searched: number;
}

interface mostsearchedservices {
  id: number;
  name: string;
  price: string;
  searched: number;
}

interface visits {
  date: string;
  count: number;
}

interface analytics {
  average_time_spend: string;
  keywords: [];
  most_serched_products: mostsearchedproducts[];
  most_serched_services: mostsearchedservices[];
  searched: string;
  visits: visits[];
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
  id: number;
}

interface dcat {
  id: number;
  cat_name: string;
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
  const [dcat, setDcat] = useState<dcat[] | null>(null);
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
  const scrollToDivRef = useRef<HTMLDivElement | null>(null);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const fetchProfileData = async () => {
    try {
      const response = await token_api(access_token).get(
        `users/buisnesses/?bid=${bid}`
      );

      if (response.status === 200) {
        setProfileData(response.data.user);
        setBusinessData(response.data.buisness);
        setProductData(response.data.products);
        setServiceData(response.data.services);
        setAnalyticsData(response.data.analytics);
        setOfferData(response.data.offers);
        setDcat(response.data.d_cats);
      }
      console.log(response.data);
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
            ["latittude"]: latitude,
            ["longitude"]: longitude,
          }
        );

        if (response.status === 200) {
          render();
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

  const handleScrollToChildDiv = () => {
    if (scrollToDivRef.current) {
      scrollToDivRef.current.scrollIntoView({ behavior: "smooth" });
      toast("Complete the information to boost your score!", {
        icon: (
          <img
            src="/Brandsinfo-logo.png"
            alt="Custom Icon"
            style={{ width: "20px", height: "20px" }}
          />
        ),
      });
    }
  };

  const convertTo12HourFormat = (time24: string) => {
    const timeWithoutSeconds = time24.split(":").slice(0, 2).join(":");
    const date = new Date(`1970-01-01T${timeWithoutSeconds}:00`);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  function ProceedAccessLocation() {
    setIsWarningModalOpen(false);
    getDeviceLocation();
  }

  const filteredKeywords = Array.isArray(analyticsData?.keywords)
    ? analyticsData.keywords.filter((keyword: string) =>
        keyword.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const visibleKeywords = expanded
    ? filteredKeywords
    : filteredKeywords.slice(0, 5);

  useEffect(() => {
    setIsBrowser(true);

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
      <WebSocketProvider>
        <ProfileHeader />
      </WebSocketProvider>
      <BackButton />

      <div className="flex items-center space-x-6 mt-5  ">
        <div className="relative rounded-full h-fit overflow-hidden ">
          <img
            src={baseurl + businessData.image}
            alt={businessData?.name}
            className="object-cover  w-24 h-24 rounded-full shadow-xl transform transition duration-300"
          />
          <div className="absolute bottom-0 left-0 cursor-pointer right-0 flex justify-center items-center bg-gray-800 bg-opacity-50 rounded-b-full p-1">
            <AiOutlineEdit
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="text-white"
            />
          </div>
        </div>

        <div>
          <h1 className="md:text-4xl text-2xl font-semibold font-ubuntuMedium text-gray-800 transition duration-300">
            {businessData?.name}
          </h1>
          <p className="md:text-lg text-sm text-gray-600 font-ubuntu">
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
        handleScrollToChildDiv={handleScrollToChildDiv}
      />
      {businessData?.plan?.plan_name !== "Default Plan" && dcat && (
        <BusinessCatAdd render={render} dcat={dcat} bid={bid} />
      )}

      <div ref={scrollToDivRef} className="md:p-8 p-4 mt-8 font-ubuntu">
        {businessData?.plan?.keywords &&
          analyticsData?.keywords.length !== 0 && (
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="md:text-xl font-ubuntuMedium font-semibold text-gray-900">
                    Keywords That The Account Was Shown For
                  </h3>
                  <p className="md:text-sm text-xs text-gray-500 mt-1">
                    Keywords that triggered your content in search results
                  </p>
                </div>

                <div className="relative w-full md:w-64">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 text-gray-700 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
                  />
                </div>
              </div>

              {filteredKeywords.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
                  No keywords found matching your search
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                    {visibleKeywords.map((keyword, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-start ">
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                            {index + 1}
                          </span>
                          <span className="font-medium md:text-base text-xs text-gray-800 break-words">
                            {keyword}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredKeywords.length > 5 && (
                    <div className="mt-4 text-center">
                      <button
                        onClick={() => setExpanded(!expanded)}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        {expanded ? (
                          <>
                            <FiChevronUp className="mr-1" />
                            Show Less
                          </>
                        ) : (
                          <>
                            <FiChevronDown className="mr-1" />
                            View All {filteredKeywords.length} Keywords
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

        <div className="mb-6">
          <h3 className="md:text-2xl text-lg font-ubuntuMedium font-semibold text-gray-800 mb-4">
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
                className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-sky-50 md:p-4 p-2 rounded-lg shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <span className="md:text-xl text-gray-700">
                    {social.icon}
                  </span>
                  <span className="md:text-base text-xs text-gray-700 font-medium">
                    {social.platform}
                  </span>
                </div>
                {social.link ? (
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 md:text-sm text-xs"
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
          <h3 className="md:text-2xl text-xl font-ubuntuMedium font-semibold text-gray-800 mb-4">
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

            <div className="flex items-center relative justify-between bg-gradient-to-r from-indigo-50 to-sky-50 p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2 ">
                <FaEnvelope size={24} className="text-gray-700" />
                <span className="text-gray-700 font-medium">Email</span>
              </div>
              {businessData?.email ? (
                <span className="text-gray-600">{businessData?.email}</span>
              ) : (
                <div>
                  <button
                    onClick={() => setopenEmailModal(true)}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <IoIosAddCircle className="text-gray-700" size={14} />
                    <div>
                      <p className="text-xs text-gray-800">Add Email</p>
                    </div>
                  </button>
                  <div className="text-xs bg-red-100 text-red-500 px-2 absolute top-0 right-0 rounded-tr-md flex gap-1 items-center rounded-bl-md">
                    <MdOutlineInfo />
                    <p>missing</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex relative items-center justify-between bg-gradient-to-r from-indigo-50 to-sky-50 p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <FaPhoneAlt size={24} className="text-gray-700" />
                <span className="text-gray-700 font-medium">Phone</span>
              </div>
              <span className="text-gray-600">
                {profileData?.mobile_number}
              </span>
            </div>

            <div className="flex relative items-center justify-between bg-gradient-to-r from-indigo-50 to-sky-50 p-4 rounded-lg shadow-lg">
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
                <div>
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
                  <div className="text-xs bg-red-100 text-red-500 px-2 absolute top-0 right-0 rounded-tr-md flex gap-1 items-center rounded-bl-md">
                    <MdOutlineInfo />
                    <p>missing</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex relative items-center justify-between  bg-gradient-to-r from-indigo-50 to-sky-50 p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <FaClock size={24} className="text-gray-700" />
                <span className="text-gray-700 font-medium">
                  Business Hours
                </span>
              </div>
              <div>
                {!businessData?.opens_at || !businessData?.closes_at ? (
                  <div>
                    <button
                      onClick={() => setIsOpenTimeModalOpen(true)}
                      className="w-full md:w-auto flex gap-1 items-center "
                    >
                      <IoIosAddCircle className="text-gray-500" size={14} />
                      <div>
                        <p className="text-xs text-gray-800">Add Time</p>
                      </div>
                    </button>
                    <div className="text-xs bg-red-100 text-red-500 px-2 absolute top-0 right-0 rounded-tr-md flex gap-1 items-center rounded-bl-md">
                      <MdOutlineInfo />
                      <p>missing</p>
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-600 text-sm">
                    {convertTo12HourFormat(businessData?.opens_at)}
                    <span className="px-2">-</span>

                    {convertTo12HourFormat(businessData?.closes_at)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex relative items-center justify-between bg-gradient-to-r from-indigo-50 to-sky-50 p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <FaFlag size={24} className="text-gray-700" />
                <span className="text-gray-700 font-medium">Since</span>
              </div>
              <div>
                {businessData.since ? (
                  <span className="text-gray-600">{businessData.since}</span>
                ) : (
                  <div>
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
                    <div className="text-xs bg-red-100 text-red-500 px-2 absolute top-0 right-0 rounded-tr-md flex gap-1 items-center rounded-bl-md">
                      <MdOutlineInfo />
                      <p>missing</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex relative items-center justify-between bg-gradient-to-r from-indigo-50 to-sky-50 p-4 rounded-lg shadow-lg">
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
                  <div>
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
                    <div className="text-xs bg-red-100 text-red-500 px-2 absolute top-0 right-0 rounded-tr-md flex gap-1 items-center rounded-bl-md">
                      <MdOutlineInfo />
                      <p>missing</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex relative items-center justify-between bg-gradient-to-r from-indigo-50 to-sky-50 p-4 rounded-lg shadow-lg">
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
                  <div>
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
                    <div className="text-xs bg-red-100 text-red-500 px-2 absolute top-0 right-0 rounded-tr-md flex gap-1 items-center rounded-bl-md">
                      <MdOutlineInfo />
                      <p>missing</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex relative items-center justify-between bg-gradient-to-r from-indigo-50 to-sky-50 p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <FaLocationCrosshairs size={24} className="text-gray-700" />
                <span className="text-gray-700 font-medium">Shop Location</span>
              </div>

              <div>
                {businessData.latittude && businessData.longitude ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Location Added</span>
                    {/* <span className="text-gray-500">
                      ({businessData.latittude}, {businessData.longitude})
                    </span> */}
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => setIsWarningModalOpen(true)}
                      className={` md:w-auto flex justify-center gap-1 items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-300 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={loading}
                    >
                      <IoIosAddCircle className="text-white" size={18} />
                      <div className="flex">
                        <p className="text-xs text-white">Add </p>
                        <p className="text-xs text-white"> Location </p>
                      </div>
                    </button>
                    <div className="text-xs bg-red-100 text-red-500 px-2 absolute top-0 right-0 rounded-tr-md flex gap-1 items-center rounded-bl-md">
                      <MdOutlineInfo />
                      <p>missing</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {businessData.plan.offers && (
        <OfferModal render={render} bid={bid} offerDatas={offerData} />
      )}

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

      {businessData.plan.image_gallery && (
        <ImageGallery render={render} openModal={() => setGalleyModal(true)} />
      )}

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
        <ImageGalleryModal
          render={render}
          videos={businessData.video_gallery}
          onClose={() => setGalleyModal(false)}
        />
      )}
      {isWarningModalOpen && (
        <LocationWarningModal
          onClose={() => setIsWarningModalOpen(false)}
          proceed={ProceedAccessLocation}
        />
      )}

      <Toaster />
    </div>
  );
}
