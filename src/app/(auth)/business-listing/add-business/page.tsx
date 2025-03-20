"use client";
import { Suspense, useEffect, useState } from "react";
import { RenderStep } from "@/components/Auth/AddBusiness/RenderStep";
import SkeletonLoader from "@/components/Skeltons/SkeltonLoader";

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

export default function AddBusiness() {
  const [localBusinessData, setLocalBusinessData] = useState<BusinessData>({
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
    profile_pic: null,
    instagram_link: "",
    facebook_link: "",
    web_link: "",
    whatsapp_number: "",
    incharge_number: "",
    buisness_type: "",
  });
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) {
    return <SkeletonLoader />;
  }

  const updateBusinessData = (newData: Partial<BusinessData>) => {
    setLocalBusinessData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen relative">
      <div className="flex justify-center">
        <img
          src="/Brandsinfo-logo.png"
          alt="Logo"
          className="w-20 h-20 mb-4 rounded-full border-4 border-[#f28b21] p-5 shadow-xl"
        />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <RenderStep
          businessData={localBusinessData}
          updateBusinessData={updateBusinessData}
        />
      </Suspense>
    </div>
  );
}
