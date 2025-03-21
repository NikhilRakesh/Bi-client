import BusinessListing from "@/components/BusinessListingIcon/BusinessListingIcon";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import HilightedBusiness from "@/components/HilightedBusiness/HilightedBusiness";
import BestDealers from "@/components/Products/BestDealers";
import RandomCategories from "@/components/RandomCategories/RandomCategories";
import TopCities from "@/components/TopCities/TopCities";
import api from "@/lib/api";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Hybrid Local Business & Service Marketplace - BrandsInfo",
  description:
    "At Brands Info, we are redefining the way businesses and professionals connect with customers. Our platform serves as a one-stop solution for businesses to list, promote, and grow, while also enabling skilled professionals to find work opportunities effortlessly",
};

export default async function Home({ city }: { city: string }) {
  const HomeData = await api.get(`users/home/`).then((res) => res.data);

  const City: string = city ? city : "tirupur";

  return (
    <div className="px-2 h-screen ">
      <Header city={City} />
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
      <HilightedBusiness
        images={HomeData.sections[4]?.data}
        Gencat={HomeData.sections[0]?.data}
        city={City}
      />
      <RandomCategories SubCat={HomeData.sections[1]?.data} city={City} />
      <TopCities Cities={HomeData.sections[3]?.data} />
      <BestDealers Products={HomeData.sections[2]?.data} city={City} />
      <Footer />
      <BusinessListing />
    </div>
  );
}
