"use client";

import { parseCookies } from "@/lib/cookies";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoPersonCircle } from "react-icons/io5";

export default function LoginButton() {
  const [browser, setBrowser] = useState(false);
  useEffect(() => {
    setBrowser(true);
  }, []);
  if (!browser)
    return (
      <div>
        <Link
          href={"/login"}
          className="bg-[#f28b21] hover:bg-[#f8ac5f] px-6 py-3 font-ubuntuMedium rounded-md text-white text-center inline-block"
        >
          <p className="text-sm">Login / Sign Up</p>
        </Link>
      </div>
    );
  const cookies = parseCookies();
  const access_token = cookies?.access_token;
  return (
    <div>
      {!access_token ? (
        <Link
          href={"/login"}
          className="bg-[#f28b21] hover:bg-[#f8ac5f] px-6 py-3 font-ubuntuMedium rounded-md text-white text-center inline-block"
        >
          <p className="text-sm">Login / Sign Up</p>
        </Link>
      ) : (
        <Link href={"/profile"}>
          <IoPersonCircle className="text-[#f28b21] w-10 h-10 " />
        </Link>
      )}
    </div>
  );
}
