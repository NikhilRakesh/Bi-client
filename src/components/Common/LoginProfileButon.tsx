"use client";
import { parseCookies } from "@/lib/cookies";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoPersonCircle } from "react-icons/io5";

export default function LoginProfileButon() {
  const [browser, setBrowser] = useState(false);
  const cookies = parseCookies();
  const access_token = cookies?.access_token;

  useEffect(() => {
    setBrowser(true);
  }, []);

  if (!browser) {
    return (
      <div className="bg-[#f28b21] hover:bg-[#f8ac5f] px-3 py-1 font-ubuntuMedium rounded-md cursor-pointer">
        <Link href={"/login"}>
          <p className="text-sm">Login / Sign Up</p>
        </Link>
      </div>
    );
  }

  return (
    <div className="">
      {access_token ? (
        <Link href={"/profile"}>
          <IoPersonCircle className="text-[#f28b21] w-10 h-10 " />
        </Link>
      ) : (
        <div className="bg-[#f28b21] hover:bg-[#f8ac5f] px-3 py-1 font-ubuntuMedium rounded-md cursor-pointer">
          <Link href={"/login"}>
            <p className="text-sm">Login / Sign Up</p>
          </Link>
        </div>
      )}
    </div>
  );
}
