"use client";
import { useEffect, useState } from "react";
import { IoIosShareAlt } from "react-icons/io";

export default function ShareButton({ share_link }: { share_link: string }) {
  const [browser, setBrowser] = useState(false);

  useEffect(() => {
    setBrowser(true);
  }, []);

  if (!browser) return null;

  const handleShare = async () => {
    const shareText = "Check out this profile!";

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Share this content",
          text: shareText,
          url: share_link,
        });
      } catch (error) {
        console.error("Sharing failed", error);
      }
    } else {
      navigator.clipboard
        .writeText(shareText)
        .then(() => {
          console.log("Content copied to clipboard!");
        })
        .catch((err) => {
          console.error("Clipboard copy failed", err);
        });
    }
  };

  return (
    <button
      className="flex items-center bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition duration-300"
      onClick={handleShare}
    >
      <IoIosShareAlt className="mr-2" size={20} />
      <span className="text-sm">Share</span>
    </button>
  );
}
