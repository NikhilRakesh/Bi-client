import { BsQuestionCircleFill } from "react-icons/bs";
import ProfileScore from "./ProfileScore";
import { FaClock, FaSearch } from "react-icons/fa";
import ProfileGraph from "./ProfileGraph";
import MobileProfileScore from "./MobileProfileScore";
import MobileProfileGraph from "./MobileProfileGraph";

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
}

interface analytics {
  average_time_spend: string;
}

interface BusinessProfileAnalytics {
  businessData: Business;
  analyticsData: analytics | null;
}

export default function BusinessProfileAnalytics({
  businessData,
  analyticsData,
}: BusinessProfileAnalytics) {
  const business = {
    name: "ABC Plumbing Services",
    type: "Plumbing & Repairs",
    logo: "https://imgs.search.brave.com/SvR8DkkaRiGX9MreBIAlDUA6fppsOM7HcuzQFCGy3gg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzA3LzI5LzQ2/LzM2MF9GXzEwNzI5/NDYzMF9wNmZ4bVBT/SnpUUXZuaU5aZlFi/RHpKSVN4NE9Gd1V5/Yy5qcGc",
    address: "123 Main St, Kollam, Kerala",
    phone: "+91 98765 43210",
    email: "abcplumbing@example.com",
    website: "https://abcplumbing.com",
    viewCount: 1500,
    profileScore: 75,
    profileVisitsData: [
      { name: "Jan", visits: 100 },
      { name: "Feb", visits: 200 },
      { name: "Mar", visits: 300 },
      { name: "Apr", visits: 400 },
      { name: "May", visits: 500 },
      { name: "Jun", visits: 600 },
      { name: "Jul", visits: 700 },
    ],
    products: [
      {
        id: 1,
        name: "Pipe Repair Kit",
        description: "High-quality pipe repair kit for all types of pipes.",
        price: "₹500",
        image:
          "https://imgs.search.brave.com/BrWs_BN_eph0Sk4Ys6bLHuut-rtHw_6QuhIkJ6cxUMg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4x/MS5iaWdjb21tZXJj/ZS5jb20vcy13NXJ4/OWRnZjBwL2ltYWdl/cy9zdGVuY2lsLzM1/N3g0NzYvcHJvZHVj/dHMvNTQwNy80NDcz/L1NwYXJ0YW4tQ29t/cGxldGUtQm94LURp/c3BsYXktUmlnaHRf/XzgwMjgyLjE2Njk3/NTc0NDQuanBnP2M9/MQ",
        searchCount: 350,
      },
      {
        id: 2,
        name: "Leak Detection Tool",
        description: "Advanced tool for detecting leaks in pipes.",
        price: "₹1200",
        image:
          "https://imgs.search.brave.com/YCDgEnVBfluIamx1_YBW5C8ta93mE-W_h_yNgZBGvxc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9iZW5j/aG1hcmtzdXBwbHku/Y29tL2Nkbi9zaG9w/L3Byb2R1Y3RzL0xS/NTAtMS5qcGc_dj0x/NjkzNDk3NjY4Jndp/ZHRoPTEwMDA",
        searchCount: 350,
      },
      // New product 1
      {
        id: 3,
        name: "Water Heater",
        description:
          "Efficient water heater for residential and commercial use.",
        price: "₹4500",
        image:
          "https://imgs.search.brave.com/XZm4v5ImkVVFVqX1lwVd8ZZubOB0r26EYwbgMNEJlD4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4x/MS5iaWdjb21tZXJj/ZS5jb20vcy13NXJ4/cGx1bWJpbmcvcHJvZHVj/dHMvNTQwNy80NDcz/L1NwYXJ0YW4tQ29t/cGxldGUtQm94LURp/c3BsYXktUmlnaHRf/XzgwMjgyLjE2Njk3/NTc0NDQuanBnP2M9/MQ",
        searchCount: 150,
      },
      // New product 2
      {
        id: 4,
        name: "Plumbing Wrench Set",
        description: "Professional-grade plumbing wrench set for all tasks.",
        price: "₹1500",
        image:
          "https://imgs.search.brave.com/aD0A2L3V_s7uHV_yd4Eq6OKwXz6hLgCHymYZdoC_jzI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4x/MS5iaWdjb21tZXJj/ZS5jb20vcy13NXJ4/cGx1bWJpbmcvcHJvZHVj/dHMvNTQwNy80NDcz/L1NwYXJ0YW4tQ29t/cGxldGUtQm94LURp/c3BsYXktUmlnaHRf/XzgwMjgyLjE2Njk3/NTc0NDQuanBnP2M9/MQ",
        searchCount: 200,
      },
    ],
    services: [
      {
        id: 1,
        name: "Pipe Repair",
        description: "Professional pipe repair services.",
        price: "₹2000",
        image:
          "https://imgs.search.brave.com/aYSCzrPINFQkyNO1vkU5KMVAH9oBDijSFjKDJpMvcBY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cGV0ZXJzZW5wcm9k/dWN0cy5jb20vbWVk/aWEvYmxvZy9jYWNo/ZS8zMDB4MjAwL21h/Z2VmYW5fYmxvZy9z/aW1wbGUtc2VjcmV0/LXBsdW1iZXJzLXVz/ZS10by11bmNsb2ct/cGlwZXMtMi5qcGc",
        searchCount: 350,
      },
      {
        id: 2,
        name: "Leak Detection",
        description: "Accurate leak detection services.",
        price: "₹1500",
        image:
          "https://imgs.search.brave.com/zdbyOn5-ue-HvD3_DheoYfYlG09AxOYsk70_7awftjo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/MDA4NWFiNzk0YTUz/MDYzNGM0ZTczY2Uv/NjYyN2Q2NmZiODVk/ZjQzN2EzN2MxMmZk/X0xlYWstRGVtby1T/aG9vdC0zMyUyMDEu/d2VicA",
        searchCount: 350,
      },
      // New service 1
      {
        id: 3,
        name: "Emergency Plumbing",
        description: "24/7 emergency plumbing services for urgent issues.",
        price: "₹2500",
        image:
          "https://imgs.search.brave.com/ldjkmIoJpp_RbXbWeMOtFhtqk4qU8cBL60ADc1ZTkO0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC5nb3VjZXMvdGVzdGlsZWRjb250ZXh0cy5jb20vcmVmZXJlbmNlcy1vbnRocmVhL21hZ2luL3BhcnRuZXJzaGlwLnBuZy8uZD0zMTYwOjo3OjAyYmY6MGMyMzc4YzRhYmUwNTgxYzcwMGYyMTNjZTgxZThlYw==",
        searchCount: 150,
      },
      // New service 2
      {
        id: 4,
        name: "Water Heater Installation",
        description:
          "Expert installation of water heaters for residential & commercial spaces.",
        price: "₹3500",
        image:
          "https://imgs.search.brave.com/_dB12kl0N5rY4Duxp0P1sYfbZxQT1F-8KwX2H0_d8u8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4uY2VydC5jby5jb20vc3RhdGVmYWlkbGVmZXJwb2xsYWN5LzEwY3AyMDQwLzM3L2V2aWRlbmNlcy1kZWFsZXJpbmctbWVtYmVyY2hpcC8/",
        searchCount: 180,
      },
    ],
    ratings: 4.5,
    reviews: 120,
    offers: "10% off on first service!",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  };

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
          <div className="flex items-center space-x-4">
            <FaSearch className="text-indigo-600 md:text-3xl" />
            <div className="flex flex-row md:flex-col gap-2 items-center">
              <p className="md:text-xl font-semibold text-gray-800">
                {businessData.sa_rate}
              </p>
              <p className="text-sm text-gray-500">Search Appearance Rate</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <FaClock className="text-indigo-600 md:text-3xl" />
            <div className="flex flex-row md:flex-col gap-2 items-center">
              <p className="text-xl font-semibold text-gray-800">
                {formatTime(Number(analyticsData?.average_time_spend))}
              </p>
              <p className="text-sm text-gray-500">Avg. Profile Time</p>
            </div>
          </div>

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
              <button className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300">
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
            <ProfileGraph business={business} />
          </div>
          <div className="md:hidden block">
            <MobileProfileGraph business={business} />
          </div>
        </div>

        <div className="flex-1">
          <h2 className="md:text-xl font-semibold font-ubuntuMedium text-gray-700 mb-4">
            Most Searched Products
          </h2>
          <div className="flex flex-col space-y-4 h-[250px] overflow-y-auto custom-scrollbar px-3">
            {business.products
              .sort((a, b) => b.searchCount - a.searchCount)
              .map((product) => (
                <div
                  key={product.id}
                  className="bg-white text-sm md:text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102"
                >
                  <div className="md:p-4 px-2 py-1">
                    <div className="flex items-center justify-between">
                      <h3 className="md:text-md font-semibold text-gray-800">
                        {product.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {product.price}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center text-gray-500 text-xs">
                      <FaSearch className="mr-2 text-yellow-500" />
                      <span>{product.searchCount} Searches</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
