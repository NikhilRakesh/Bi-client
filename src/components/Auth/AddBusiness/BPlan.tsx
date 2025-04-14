"use client";
import PricingPage from "@/components/package/PricingPage";
import { token_api } from "@/lib/api";
import { parseCookies } from "@/lib/cookies";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function BPlan() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const cookies = parseCookies();
  const access_token = cookies?.access_token;

  async function onClick(pvid: number) {
    if (!access_token) {
      toast.error("Please Login");
      return;
    }
    if (!pvid) return;
    try {
      const response = await token_api(access_token).post("initiate-payment/", {
        pvid,
        bid: "31",
      });
      console.log(response);

      if (response.status === 200) {
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  }
  return (
    <div className="absolute w-full h-screen">
      <div className="absolute md:block hidden top-6 right-10">
        <button
          onClick={() => router.push("/profile")}
          className="backdrop-blur-md  bg-white text-black font-semibold text-lg px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-orange-500 transition duration-300 ease-in-out"
        >
          Skip
        </button>
      </div>
      <div className="absolute md:hidden block top-3 right-2">
        <button
          onClick={() => router.push("/profile")}
          className="backdrop-blur-md  bg-white text-black font-semibold text-sm px-5 py-2 rounded-lg shadow-md hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-orange-500 transition duration-300 ease-in-out"
        >
          Skip
        </button>
      </div>
      <PricingPage onClick={onClick} />
      <Toaster />
    </div>
  );
}
