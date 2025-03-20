"use client";
import { clearTokenCookie } from "@/lib/cookies";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoPricetags } from "react-icons/io5";

export default function ProfileHeader() {
  const router = useRouter();
  
  const logout = () => {
    clearTokenCookie("refresh_token");
    clearTokenCookie("access_token");
    router.push("/");
  };
  return (
    <div className="flex justify-between items-center mb-8 bg-white px-5 py-2 shadow-lg rounded-lg">
      <Link href={"/"}>
        <img
          src="/Brandsinfo-logo.png"
          alt="Brandsinfo Logo"
          className="h-10 w-10 cursor-pointer"
        />
      </Link>
      <div className="relative flex gap-4 items-center">

        <Link href={"/pricing"}>
          <div className="flex items-center gap-1 cursor-pointer ">
            <IoPricetags className="text-xl text-gray-700" size={15} />
            <span className="text-gray-700">Pricing</span>
          </div>
        </Link>

        <div>
          <button
            onClick={logout}
            className="font-ubuntu bg-orange-400 text-sm px-1 py-1 rounded-md"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
