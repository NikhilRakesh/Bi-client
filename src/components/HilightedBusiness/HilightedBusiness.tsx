import { NextPage } from "next";
import BannerCarousel from "./BannerCarousel";
import PriorityBusiness from "./PriorityBusiness";

interface gencat {
  image: string;
  name: string;
  tittle: string;
}

interface ads {
  banner: string;
  name: string;
}

interface HilightedBusinessProps {
  images: ads[];
  Gencat: gencat[];
  city: string;
}

const HilightedBusiness: NextPage<HilightedBusinessProps> = ({
  images,
  Gencat,
  city,
}) => {
  return (
    <div className="flex flex-col md:flex-row w-full justify-between py-5 gap-3">
      <div className="w-full md:w-7/12 rounded-lg overflow-hidden">
        <BannerCarousel images={images} />
      </div>
      <div className="w-full">
        <PriorityBusiness Gencat={Gencat} city={city} />
      </div>
    </div>
  );
};

export default HilightedBusiness;
