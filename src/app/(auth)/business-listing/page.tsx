import BLHeader from "@/components/Auth/BLHeader";
import BusinessListingOtp from "@/components/Auth/BusinessListingOtp";
import LoginButton from "@/components/Common/LoginButton";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BusinessListing() {
  return (
    <div className="p-3">
      <BLHeader />

      <div className="relative">
        <div className="absolute left-0 md:top-14 top-5 z-10 right-0 flex justify-between">
          <div className="md:block hidden  ">
            <Link href="/">
              <Image
                src="/Brandsinfo-logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="object-contain cursor-pointer"
              />
            </Link>
          </div>

          <div>
            <h1 className="text-gray-700 md:text-6xl text-3xl font-ubuntuMedium text-center ">
              List Your <span className="text-[#f28b21]">Business</span> for
              FREE
            </h1>
            <p className="text-gray-500 text-center font-openSans text-xs md:text-xl">
              # Unlock Local Success with Our Premium Business Platform
            </p>
          </div>

          <div className="md:block hidden cursor-pointer">
            <LoginButton />
          </div>
        </div>
        <Image
          src="/IndiaSkyline.jpg"
          alt="A beautiful landscape showing a sunset"
          className="object-contain w-full hidden md:block opacity-15 h-full"
          width={1200}
          height={800}
          loading="eager"
          priority
        />
        <Image
          src="/IndiaSkyline mobile.jpg"
          alt="A beautiful landscape showing a sunset"
          className="object-contain w-full md:hidden opacity-15 h-full"
          width={1200}
          height={800}
          loading="eager"
          priority
        />
      </div>

      <BusinessListingOtp />
      <Footer />
    </div>
  );
}
