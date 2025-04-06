"use client";
import { BsQuestionCircleFill } from "react-icons/bs";
import ProfileScore from "./ProfileScore";
import { FaClock, FaSearch } from "react-icons/fa";
import ProfileGraph from "./ProfileGraph";
import MobileProfileScore from "./MobileProfileScore";
import MobileProfileGraph from "./MobileProfileGraph";

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

interface BusinessProfileAnalytics {
  businessData: Business;
  analyticsData: analytics | null;
  handleScrollToChildDiv: () => void;
}

export default function BusinessProfileAnalytics({
  businessData,
  analyticsData,
  handleScrollToChildDiv,
}: BusinessProfileAnalytics) {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    let formattedTime = "";

    if (hours > 0) {
      formattedTime += `${hours} .h `;
    }
    if (minutes > 0 || hours > 0) {
      formattedTime += `${minutes} .m `;
    }
    formattedTime += `${remainingSeconds}.s`;

    return formattedTime;
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-sky-50 bg-white shadow-2xl rounded-2xl p-4 md:p-8 mt-8 font-ubuntu">
      <div className="bg-gradient-to-r from-indigo-100 to-sky-100 bg-white shadow-md rounded-lg py-5 md:py-0 px-6 font-ubuntu ">
        <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-8">
          {businessData.plan.sa_rate && (
            <div className="flex items-center space-x-4">
              <FaSearch className="text-indigo-600 md:text-3xl" />
              <div className="flex flex-row md:flex-col gap-2 items-center">
                <p className="md:text-xl font-semibold text-gray-800">
                  {analyticsData?.searched}
                </p>
                <p className="text-sm text-gray-500">Search Appearance Rate</p>
              </div>
            </div>
          )}

          {businessData.plan.average_time_spend && (
            <div className="flex items-center space-x-4">
              <FaClock className="text-indigo-600 md:text-3xl" />
              <div className="flex flex-row md:flex-col gap-2 items-center">
                <p className="text-xl font-semibold text-gray-800">
                  {formatTime(Number(analyticsData?.average_time_spend))}
                </p>
                <p className="text-sm text-gray-500">Avg. Profile Time</p>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-4">
            <BsQuestionCircleFill className="text-indigo-600 md:text-3xl" />
            <div className="flex flex-row md:flex-col gap-2 items-center">
              <p className="text-xl font-semibold text-gray-800">
                {businessData.no_of_enquiries}
              </p>
              <p className="text-sm text-gray-500">Number of Enquiries</p>
            </div>
          </div>

          <div className="md:flex hidden items-center space-x-6 md:space-x-4">
            {businessData?.score && (
              <ProfileScore score={businessData?.score} />
            )}
            <div>
              <h1 className="text-xl font-semibold font-ubuntuMedium text-gray-800">
                Increase score for visibility
              </h1>
              <p className="text-gray-500">
                Boost your visibility by increasing your profile score.
              </p>
            </div>
            <div>
              <button
                onClick={() => handleScrollToChildDiv()}
                className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              >
                Increase Score
              </button>
            </div>
          </div>
          <div className="md:hidden flex flex-col justify-start items-start  relative">
            <div className="flex absolute right-0 bottom-[-45px]">
              {businessData?.score && (
                <MobileProfileScore score={businessData?.score} />
              )}
            </div>
            <div>
              <h1 className="md:text-xl font-semibold font-ubuntuMedium text-gray-800">
                Increase score for visibility
              </h1>
              <p className="text-gray-500 text-xs">
                Boost your visibility by increasing your profile score.
              </p>
            </div>
            <div className="flex ">
              <button className="mt-2 text-sm bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300">
                Increase Score
              </button>
            </div>
          </div>
        </div>
      </div>
      {businessData.plan.profile_visit && (
        <div className="md:flex gap-5 mt-8">
          <div className="flex-1">
            <h2 className="md:text-xl font-semibold font-ubuntuMedium text-gray-700">
              Profile Visits Over Time
            </h2>

            <div className="mt-2 text-sm md:text-lg font-medium text-gray-500">
              <span>Total Visits: </span>
              <span className="text-orange-500">
                {businessData.no_of_views}
              </span>{" "}
            </div>
            <div className="hidden md:block">
              {analyticsData?.visits && (
                <ProfileGraph business={analyticsData} />
              )}
            </div>
            <div className="md:hidden block">
              {analyticsData?.visits && (
                <MobileProfileGraph business={analyticsData} />
              )}
            </div>
          </div>

          <div className="flex-1">
            <h2 className="md:text-xl font-semibold font-ubuntuMedium text-gray-700 mb-4">
              {analyticsData &&
                (analyticsData.most_serched_products?.length > 0 &&
                analyticsData.most_serched_services?.length > 0
                  ? "Most Searched Products and Services"
                  : analyticsData.most_serched_products?.length > 0
                  ? "Most Searched Products"
                  : analyticsData.most_serched_services?.length > 0
                  ? "Most Searched Services"
                  : "")}
            </h2>
            <div className="flex flex-col space-y-4 h-[250px] overflow-y-auto custom-scrollbar px-3">
              {[
                ...(analyticsData?.most_serched_products || []),
                ...(analyticsData?.most_serched_services || []),
              ]
                ?.sort((a, b) => b.searched - a.searched)
                ?.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white text-sm md:text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102"
                  >
                    <div className="md:p-4 px-2 py-1">
                      <div className="flex items-center justify-between">
                        <h3 className="md:text-md font-semibold text-gray-800">
                          {item.name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          ₹ {item.price}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center text-gray-500 text-xs">
                        <FaSearch className="mr-2 text-yellow-500" />
                        <span>{item.searched} Searches</span>
                      </div>
                    </div>
                  </div>
                ))}
              {!analyticsData?.most_serched_products?.length &&
                !analyticsData?.most_serched_services?.length && (
                  <div className="text-gray-500 text-xs">
                    No products or services available
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
