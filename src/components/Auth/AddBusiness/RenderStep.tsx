"use client";
import { useSearchParams } from "next/navigation";
import AddProduct from "./AddProduct";
import AddService from "./AddService";
import BusinessInformation from "./BusinessInformation";
import Categories from "./Categories";
import BPlan from "./BPlan";
interface BusinessData {
  name: string;
  description: string;
  manager_name: string;
  building_name: string;
  pincode: string;
  locality: string;
  district: string;
  city: string;
  state: string;
  latitude: string;
  longitude: string;
  opens_at: string | null;
  closes_at: string | null;
  since: string | null;
  profile_pic: string | null;
  instagram_link: string;
  facebook_link: string;
  web_link: string;
  whatsapp_number: string;
  incharge_number: string;
  buisness_type: string;
}
export function RenderStep({
  businessData,
  updateBusinessData,
}: {
  businessData: BusinessData;
  updateBusinessData: (newData: Partial<BusinessData>) => void;
}) {
  const searchParams = useSearchParams();
  const step = searchParams?.get("step");
  switch (step) {
    case "1":
      return (
        <BusinessInformation
          businessData={businessData}
          updateBusinessData={updateBusinessData}
        />
      );
    case "2":
      return <AddProduct />;
    case "3":
      return <AddService />;
    case "4":
      return <Categories />;
    case "5":
      return <BPlan  />;
    default:
      return (
        <div className="w-full text-center">
          <h1 className="text-gray-700 font-ubuntu text-3xl">page not found</h1>
        </div>
      );
  }
}
