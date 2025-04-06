"use client";
import { parseCookies } from "@/lib/cookies";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TbLocationShare } from "react-icons/tb";

interface LocationButtonProps {
  latitude: number;
  longitude: number;
}

const LocationButton: React.FC<LocationButtonProps> = ({
  latitude,
  longitude,
}) => {
  const [browser, setBrowser] = useState(false);
  useEffect(() => {
    setBrowser(true);
  }, []);

  const cookies = parseCookies();
  const access_token = cookies?.access_token;
  const router = useRouter();

  const handleLocationClick = () => {
    if (!access_token) {
      router.push("/login");
      return;
    }
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <button
      onClick={handleLocationClick}
      className="flex w-4/12 justify-center items-center bg-blue-500 py-2 px-4 rounded-md"
    >
      <TbLocationShare className="mr-2" size={15} />
      <span className="text-xs">{browser ? "Location" : "Loading..."}</span>
    </button>
  );
};

export default LocationButton;
