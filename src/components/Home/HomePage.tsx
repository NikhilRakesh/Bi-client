"use client";
import BusinessListing from "@/components/BusinessListingIcon/BusinessListingIcon";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import HilightedBusiness from "@/components/HilightedBusiness/HilightedBusiness";
import BestDealers from "@/components/Products/BestDealers";
import RandomCategories from "@/components/RandomCategories/RandomCategories";
import TopCities from "@/components/TopCities/TopCities";
import { parseCookies, setcityCookie } from "@/lib/cookies";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Position {
  coords: {
    latitude: number;
    longitude: number;
  };
}

interface HomeData {
  meta_data: {
    meta_author: string;
    meta_description: string;
    meta_keywords: string;
    meta_title: string;
    meta_og_description: string | null;
    meta_og_image: string | null;
    meta_og_image_alt: string | null;
    meta_og_image_height: number | null;
    meta_og_image_width: number | null;
    meta_og_site_name: string | null;
    meta_og_title: string | null;
    meta_og_type: string | null;
    meta_og_url: string | null;
  };
  sections: Section[];
}

interface Section {
  title: string;
  data: SectionData[];
}

interface SectionData {
  image: string;
  banner: string;
  name: string;
  title: string;
}

export default function HomePage({
  HomeData,
  city,
}: {
  HomeData: HomeData;
  city: string;
}) {
  const apiKey = process.env.NEXT_PUBLIC_Geocoding_api;
  const cookies = parseCookies();
  const city_cookie = cookies?.city_cookie;
  const [cityName, setCityName] = useState<string>(
    city_cookie ? city_cookie : city || "Tiruppur"
  );
  const [browser, setBrowser] = useState(false);

  async function getDeviceLocation() {
    if (city_cookie) return;
    try {
      console.log("here");

      const position = await new Promise<Position>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude, longitude } = position.coords;

      const searchUrl2 = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${apiKey}`;
      const response = await fetch(searchUrl2);
      const data2 = await response.json();

      const district =
        data2.results[0]?.components.city ||
        data2.results[0]?.components.state_district;
      if (district) {
        setCityName(district);
        setcityCookie(district);
      } else {
        setCityName("chennai");
      }
    } catch (error) {
      console.error("Error retrieving device location:", error);
      return null;
    }
  }

  function changeCity(data: string) {
    setCityName(data);
  }

  useEffect(() => {
    getDeviceLocation();
    setBrowser(true);
  }, [city_cookie,cityName]);

  const adsData = HomeData.sections[4]?.data.map((item) => ({
    banner: item.banner,
    name: item.name,
  }));

  const gencatData = HomeData.sections[0]?.data.map((item) => ({
    image: item.image,
    name: item.name,
    tittle: item.title,
  }));

  const subcatData = HomeData.sections[1]?.data.map((item) => ({
    name: item.name,
    tittle: item.title,
  }));

  const cityData = HomeData.sections[3]?.data.map((item) => ({
    image: item.image,
    name: item.name,
    tittle: item.title,
  }));

  const productData = HomeData.sections[2]?.data.map((item) => ({
    name: item.name,
    image: item.image,
    tittle: item.title,
  }));

  

  if (!browser) return null;

  return (
    <div className="px-2 h-screen ">
      <Header city={cityName} changeCity={changeCity} />
      <div className="relative mt-[120px]">
        <div className="text-gray-600 font-ubuntuMedium md:text-3xl absolute w-full text-center md:top-[25px] top-[15px] ">
          <h1>
            <span className="md:text-4xl text-2xl font-extrabold ">
              Explore the Best Businesses Close to You
            </span>
            -{" "}
            <span className="text-[#f28b21] text-2xl md:text-3xl">
              Search Now!
            </span>
          </h1>
        </div>
        <div>
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
      </div>
      <HilightedBusiness images={adsData} Gencat={gencatData} city={cityName} />
      <RandomCategories SubCat={subcatData} city={cityName} />
      <TopCities Cities={cityData} />
      <BestDealers Products={productData} city={cityName} />
      <Footer />
      <BusinessListing />
    </div>
  );
}
