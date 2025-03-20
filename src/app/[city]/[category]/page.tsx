// import CategoryBanner from "@/components/category/CategoryBanner";
import CategoryCard from "@/components/category/CategoryCard";
import Footer from "@/components/Footer/Footer";
import CategoryHeader from "@/components/Header/CategoryHeader";
import api from "@/lib/api";

interface Offer {
  buisness: number;
  id: number;
  is_flat: boolean;
  is_percent: boolean;
  minimum_bill_amount: number;
  offer: number;
  valid_upto: string;
}

interface BusinessCard {
  id: number;
  image: string;
  name: string;
  whatsapp_number: string;
  locality: string;
  city: string;
  rating: number;
  redirect_link: {
    id: number;
    link: string;
    meta_keywords: string;
  };
  offers: Offer[];
  assured: boolean;
  verified: boolean;
}

export const revalidate = 3600;
export const dynamicParams = true;

export default async function CategoryList({
  params,
}: {
  params: Promise<{ category: string; city: string }>;
}) {
  const { category, city } = await params;

  const BusinessList: BusinessCard[] = await api
    .get(`users/esearch/?q=${category}&location=${city}`)
    .then((res) => res.data.results);
  console.log(BusinessList, category);

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-sky-50 ">
      <CategoryHeader city={city} category={category} />
      <div className="md:mt-[90px] mt-[100px]">
        {/* <CategoryBanner /> */}
        <div className=" bg-white font-ubuntuMedium md:text-3xl text-gray-600 pt-2 md:py-4 md:px-10 px-5 text-left">
          <h1>
            Popular {category} in {city}
          </h1>
        </div>
        <CategoryCard
          BusinessLists={BusinessList}
          city={city}
          category={category}
        />
      </div>
      <Footer />
    </div>
  );
}
