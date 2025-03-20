"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function BackButton() {
  const router = useRouter();
  const [browser, setBrowser] = useState(false);
  useEffect(() => {
    setBrowser(true);
  }, []);

  function handleOnClick() {
    router.back();
  }
  return browser ? (
    <button
      onClick={handleOnClick}
      className="text-gray-600 font-ubuntu py-2 flex items-center gap-2 cursor-pointer"
    >
      <FaArrowLeftLong />
      <span className="text-sm font-semibold font-ubuntuMedium ">back</span>
    </button>
  ) : (
    <button className="text-gray-600 font-ubuntu py-2 flex items-center gap-2 cursor-pointer">
      <FaArrowLeftLong />
      <span className="text-sm font-semibold font-ubuntuMedium ">back</span>
    </button>
  );
}
