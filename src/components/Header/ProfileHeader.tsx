"use client";
import { clearTokenCookie } from "@/lib/cookies";
import { useWebSocket } from "@/lib/WebSocketContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiBell } from "react-icons/fi";
import { IoPricetags } from "react-icons/io5";

export default function ProfileHeader() {
  const router = useRouter();

  const logout = () => {
    clearTokenCookie("refresh_token");
    clearTokenCookie("access_token");
    router.push("/");
  };

  const { notificationCount } = useWebSocket();

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

        <Link href="/profile/notifications">
          <div className="relative flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <FiBell
                className="text-xl text-gray-600 group-hover:text-indigo-600 "
                size={18}
              />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-red-500 text-white text-xs rounded-full ">
                  {notificationCount}
                </span>
              )}
            </div>
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
