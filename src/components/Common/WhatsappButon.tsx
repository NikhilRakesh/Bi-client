"use client";
import { parseCookies } from "@/lib/cookies";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButon({ number }: { number: string }) {
  const [browser, setBrowser] = useState(false);
  useEffect(() => {
    setBrowser(true);
  }, []);

  if (!browser)
    return (
      <Link className="flex text-center  px-4 py-2" href={"/login"}>
        <FaWhatsapp className="mr-2 text-green-600" size={15} />
        <span className="text-xs">WhatsApp</span>
      </Link>
    );
  const cookies = parseCookies();
  const access_token = cookies?.access_token;
  return (
    <div className="w-4/12 bg-green-100  text-green-600 text-sm rounded-md hover:bg-green-200 transition-colors">
      {access_token ? (
        <a
          href={`https://wa.me/${number}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex text-center  px-4 py-2"
        >
          <FaWhatsapp className="mr-2 text-green-600" size={15} />
          <span className="text-xs">WhatsApp</span>
        </a>
      ) : (
        <Link className="flex text-center  px-4 py-2" href={"/login"}>
          <FaWhatsapp className="mr-2 text-green-600" size={15} />
          <span className="text-xs">WhatsApp</span>
        </Link>
      )}
    </div>
  );
}
