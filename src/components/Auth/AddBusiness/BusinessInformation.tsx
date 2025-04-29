"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api, { baseurl, token_api } from "@/lib/api";
import { parseCookies } from "@/lib/cookies";

interface BusinessData {
  name: string;
  description: string;
  manager_name: string;
  building_name: string;
  pincode: string;
  locality: string;
  district: string;
  city: string;
  state: string;
  latitude: string;
  longitude: string;
  opens_at: string | null;
  closes_at: string | null;
  since: string | null;
  profile_pic: string | null;
  instagram_link: string;
  facebook_link: string;
  web_link: string;
  whatsapp_number: string;
  incharge_number: string;
  buisness_type: string;
}
interface Locality {
  id: number;
  locality_name: string;
}

interface BusinessInformationProps {
  businessData: BusinessData | undefined;
  updateBusinessData: (newData: Partial<BusinessData>) => void;
}

const BusinessInformation = ({
  businessData,
  updateBusinessData,
}: BusinessInformationProps) => {
  const safeBusinessData = businessData || {
    name: "",
    description: "",
    manager_name: "",
    building_name: "",
    pincode: "",
    locality: "",
    district: "",
    city: "",
    state: "",
    latitude: "",
    longitude: "",
    opens_at: null,
    closes_at: null,
    since: null,
    no_of_views: null,
    profile_pic: null,
    instagram_link: "",
    facebook_link: "",
    web_link: "",
    whatsapp_number: "",
    incharge_number: "",
    buisness_type: "",
  };

  const [errors, setErrors] = useState<{
    nameError: string;
    pincodeError: string;
    localityError: string;
    whatsappError: string;
    productOrServiceError: string;
  }>({
    nameError: "",
    pincodeError: "",
    localityError: "",
    whatsappError: "",
    productOrServiceError: "",
  });

  const [localities, setLocalities] = useState<Locality[]>([]);
  const [browser, setBrowser] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setBrowser(true);
    trackIP()
  }, []);

  if (!browser) return;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    updateBusinessData({ [name]: value });
  };

  const cookies = parseCookies();
  const access_token = cookies?.access_token;
  const apiKey = process.env.NEXT_PUBLIC_Geocoding_api;

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!safeBusinessData.name) {
      newErrors.nameError = "Business name is required.";
      valid = false;
    } else {
      newErrors.nameError = "";
    }

    if (!safeBusinessData.buisness_type) {
      newErrors.productOrServiceError = "Please select type of business.";
      valid = false;
    } else {
      newErrors.productOrServiceError = "";
    }

    if (!safeBusinessData.pincode) {
      newErrors.pincodeError = "Pincode is required.";
      valid = false;
    } else {
      newErrors.pincodeError = "";
    }

    if (!safeBusinessData.locality) {
      newErrors.localityError = "Locality is required.";
      valid = false;
    } else {
      newErrors.localityError = "";
    }

    const whatsappPattern = /^[0-9]{10}$/;
    if (!whatsappPattern.test(safeBusinessData.whatsapp_number)) {
      newErrors.whatsappError =
        "Please enter a valid 10-digit WhatsApp number.";
      valid = false;
    } else {
      newErrors.whatsappError = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const goToNextStep = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await token_api(access_token).post(
        "users/buisnesses/",
        businessData
      );

      if (response.status === 201) {
        const { buisness_type, id } = response.data;
        const urlWithId = `/business-listing/add-business?step=${
          buisness_type === "Service" ? 3 : 2
        }&id=${id}`;

        switch (buisness_type) {
          case "Products & Services":
          case "Product":
            router.push(urlWithId);
            break;
          case "Service":
            router.push(urlWithId);
            break;
          default:
            console.log("Unknown business type", buisness_type);
            break;
        }
      }
    } catch (error) {
      console.error("Unknown error:", error);

      throw error;
    }
  };

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 10) {
      updateBusinessData({ whatsapp_number: value });
    }
  };

  const handlePincodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    if (value.length <= 6) {
      updateBusinessData({ pincode: value });

      if (value.length === 6) {
        const searchUrl = `https://nominatim.openstreetmap.org/search?postalcode=${value}&country=India&format=json`;

        try {
          const response = await fetch(searchUrl);
          const data = await response.json();

          if (data.error || data.length === 0) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              pincodeError: "Invalid pincode.",
            }));
            return;
          }

          try {
            const searchUrl2 = `https://api.opencagedata.com/geocode/v1/json?q=${data[0].lat},${data[0].lon}&key=${apiKey}`;
            const response = await fetch(searchUrl2);
            const data2 = await response.json();

            const state = data2.results[0]?.components.state;
            const district =
              data2.results[0]?.components.city ||
              data2.results[0]?.components.state_district;

            updateBusinessData({ state, district });

            try {
              const response = await api.get(
                `users/getlocality/?city=${district}`
              );

              if (response.status === 200) {
                setLocalities(response.data.data);
                const city = response.data.city;
                updateBusinessData({ city });
              }
            } catch (error) {
              console.error("Unknown error:", error);

              setErrors((prevErrors) => ({
                ...prevErrors,
                pincodeError: "Failed to fetch locality . Please try again.",
              }));
            }
          } catch (error) {
            console.error("Error fetching Geocoding data:", error);
            setErrors((prevErrors) => ({
              ...prevErrors,
              pincodeError: "Failed to fetch pincode data. Please try again.",
            }));
          }

          setErrors((prevErrors) => ({
            ...prevErrors,
            pincodeError: "",
          }));
        } catch (error) {
          console.error("Error fetching nominatim pincode data:", error);
          setErrors((prevErrors) => ({
            ...prevErrors,
            pincodeError: "Failed to fetch pincode data. Please try again.",
          }));
        }
      }
    }
  };

  async function trackIP() {
    fetch(`${baseurl}/analytics/track_visit/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: window.location.pathname,
        extra: window.location.search,
      }),
    }).catch((error) => {
      console.error("Tracking error:", error);
    });
  }
  return (
    <div className={` md:w-4/12 w-full px-7 py-5 bg-white rounded-lg`}>
      <h2 className="font-ubuntuMedium text-center text-3xl text-gray-600 mb-4">
        Business Information
      </h2>

      <form onSubmit={goToNextStep}>
        <div className="mb-4">
          <input
            type="text"
            id="name"
            name="name"
            value={safeBusinessData.name}
            onChange={handleInputChange}
            placeholder="Enter your business name"
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f28b21]"
          />
          {errors.nameError && (
            <p className="text-red-600 font-ubuntu text-xs py-1 px-1">
              {errors.nameError}
            </p>
          )}
        </div>

        <div className="mb-4">
          <select
            id="buisness_type"
            name="buisness_type"
            value={safeBusinessData.buisness_type}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f28b21]"
          >
            <option value="" className="text-gray-600">
              Type of Business
            </option>
            <option value="Products & Services">Products & Services</option>
            <option value="Product">Product</option>
            <option value="Service">Service</option>
          </select>
          {errors.productOrServiceError && (
            <p className="text-red-600 font-ubuntu text-xs py-1 px-1">
              {errors.productOrServiceError}
            </p>
          )}
        </div>

        <div className="mb-4">
          <textarea
            id="description"
            name="description"
            value={safeBusinessData.description}
            onChange={handleInputChange}
            placeholder="Enter your business description"
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f28b21]"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            id="building_name"
            name="building_name"
            value={safeBusinessData.building_name}
            onChange={handleInputChange}
            placeholder="Address Line"
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f28b21]"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            id="pincode"
            name="pincode"
            value={safeBusinessData.pincode}
            onChange={handlePincodeChange}
            placeholder="Pincode"
            maxLength={6}
            className="w-full px-4 py-2 no-arrows border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f28b21]"
          />
          {errors.pincodeError && (
            <p className="text-red-600 font-ubuntu text-xs py-1 px-1">
              {errors.pincodeError}
            </p>
          )}
        </div>

        <div className="flex gap-5">
          <div className="mb-4">
            <input
              type="text"
              id="state"
              name="state"
              value={safeBusinessData.state}
              onChange={handleInputChange}
              placeholder="Enter state"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f28b21]"
              disabled
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="district"
              name="district"
              value={safeBusinessData.district}
              onChange={handleInputChange}
              placeholder="Enter district"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f28b21]"
              disabled
            />
          </div>
        </div>

        <div className="mb-4">
          <select
            id="locality"
            name="locality"
            value={safeBusinessData.locality}
            onChange={handleInputChange}
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f28b21]"
          >
            <option value="" disabled>
              Select a locality
            </option>
            {localities.map((item) => (
              <option key={item.id} value={item.id}>
                {item.locality_name}
              </option>
            ))}
          </select>
          {errors.localityError && (
            <p className="text-red-600 font-ubuntu text-xs py-1 px-1">
              {errors.localityError}
            </p>
          )}
        </div>

        <div className="mb-4">
          <div className="flex items-center border border-gray-300 rounded-md">
            <span className="px-4 py-2 bg-gray-100 text-gray-600">+91</span>
            <input
              type="number"
              id="whatsapp_number"
              name="whatsapp_number"
              value={safeBusinessData.whatsapp_number}
              onChange={handleWhatsappChange}
              placeholder="Enter WhatsApp number"
              className="w-full px-4 py-2 text-black border-l no-arrows border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#f28b21] placeholder-gray-500"
            />
          </div>
          {errors.whatsappError && (
            <p className="text-red-600 font-ubuntu text-xs py-1 px-1">
              {errors.whatsappError}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-[#f28b21] text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-[#f28b21] mt-4"
        >
          Save and Continue
        </button>
      </form>
    </div>
  );
};

export default BusinessInformation;
