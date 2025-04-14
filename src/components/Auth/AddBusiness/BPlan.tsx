"use client";
import BackButton from "@/components/Common/BackButton";
import LoadingSpinner from "@/components/Common/LoadingSpinner";
import { BusinessSelectionModal } from "@/components/package/BusinessSelectionModal";
import PricingPage from "@/components/package/PricingPage";
import { token_api } from "@/lib/api";
import { parseCookies } from "@/lib/cookies";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Business {
  name: string;
  id: number;
}

export default function BPlan() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [browser, setbrowser] = useState(false);
  const id = searchParams.get("id");
  const [business, setbusiness] = useState<Business[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pvid, setpvid] = useState<number | null>(null);
  const cookies = parseCookies();
  const access_token = cookies?.access_token;

  useEffect(() => {
    setbrowser(true);
  }, []);

  async function onClick(pvid: number, bid: number | null) {
    if (!pvid) return;

    if (!id && !bid && access_token) {
      setpvid(pvid);
      try {
        const fetchedBid = await fetchBusinesses();
        if (fetchedBid !== undefined) {
          setbusiness(fetchedBid);
          setIsModalOpen(true);
          return;
        }
      } catch (e) {
        toast.error("try again");
        console.error("Error fetching bid:", e);
      }
    }

    try {
      const response = await token_api(access_token).post("initiate-payment/", {
        pvid,
        bid: id ? id : bid,
      });

      if (response?.status === 200) {
        const redirectUrl = response?.data?.redirect_url;

        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  }

  async function fetchBusinesses() {
    try {
      const response = await token_api(access_token).get("users/bwithnplan/");

      if (response?.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  }

  async function onSelect(id: number) {
    if (pvid) {
      setLoading(false);
      await onClick(pvid, id);
    }
  }

  if (!browser) return null;
  return (
    <div className="absolute w-full h-screen">
      {access_token && (
        <div className="absolute md:block hidden top-6 right-10">
          <button
            onClick={() =>
              router.push(`${access_token ? "/profile" : "/login"}`)
            }
            className="backdrop-blur-md  bg-white text-black font-semibold text-lg px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-orange-500 transition duration-300 ease-in-out"
          >
            Skip
          </button>
        </div>
      )}
      {!access_token && (
        <div className="absolute md:top-12 top-3 left-5">
          <BackButton />
        </div>
      )}
      <div className="absolute md:hidden block top-3 right-2">
        <button
          onClick={() => router.push(`${access_token ? "/profile" : "/login"}`)}
          className="backdrop-blur-md  bg-white text-black font-semibold text-sm px-5 py-2 rounded-lg shadow-md hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-orange-500 transition duration-300 ease-in-out"
        >
          Skip
        </button>
      </div>
      <PricingPage onClick={onClick} />
      <Toaster />
      {business && (
        <BusinessSelectionModal
          onSelect={onSelect}
          isOpen={isModalOpen}
          businesses={business}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {loading && <LoadingSpinner />}
    </div>
  );
}
