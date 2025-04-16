import HomePage from "@/components/Home/HomePage";
import api from "@/lib/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hybrid Local Business & Service Marketplace - BrandsInfo",
  description:
    "At Brands Info, we are redefining the way businesses and professionals connect with customers. Our platform serves as a one-stop solution for businesses to list, promote, and grow, while also enabling skilled professionals to find work opportunities effortlessly",
};

export default async function Home({ city }: { city: string }) {
  const HomeData = await api.get(`users/home/`).then((res) => res?.data);


  return (
    <div>
      <HomePage city={city} HomeData={HomeData} />
    </div>
  );
}
