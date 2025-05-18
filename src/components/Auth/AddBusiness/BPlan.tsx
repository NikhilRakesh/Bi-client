"use client";
import BackButton from "@/components/Common/BackButton";
import LoadingSpinner from "@/components/Common/LoadingSpinner";
import { BusinessSelectionModal } from "@/components/package/BusinessSelectionModal";
import PricingPage from "@/components/package/PricingPage";
import { baseurl, token_api } from "@/lib/api";
import { parseCookies } from "@/lib/cookies";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Business {
  name: string;
  id: number;
}

export default function BPlan() {
  const searchParams = useSearchParams();
  const [browser, setbrowser] = useState(false);
  const id = searchParams.get("bid");
  const [business, setbusiness] = useState<Business[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pvid, setpvid] = useState<number | null>(null);
  const cookies = parseCookies();
  const access_token = cookies?.access_token;

  useEffect(() => {
    trackIP();
    setbrowser(true);
  }, []);

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
      {!access_token && (
        <div className="absolute md:top-12 top-3 left-5">
          <BackButton />
        </div>
      )}

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
