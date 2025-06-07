import HomePage from "@/components/Home/HomePage";
import api from "@/lib/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hybrid Local Business & Service Marketplace - BrandsInfo",
  description:
    "BrandsInfo – Your Hybrid Local Business & Service Marketplace connecting local businesses and skilled pros with customers for trusted services and seamless growth.",
};

export default async function Home({ city }: { city: string }) {
  const HomeData = await api.get(`users/home/`).then((res) => res?.data);

  return (
    <div>
      <HomePage city={city} HomeData={HomeData} />
    </div>
  );
}
