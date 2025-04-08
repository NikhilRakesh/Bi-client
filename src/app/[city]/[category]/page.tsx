// import CategoryBanner from "@/components/category/CategoryBanner";
import CategoryCard from "@/components/category/CategoryCard";
import Footer from "@/components/Footer/Footer";
import CategoryHeader from "@/components/Header/CategoryHeader";
import api from "@/lib/api";
import { Metadata } from "next";

interface Offer {
  buisness: number;
  id: number;
  is_flat: boolean;
  is_percent: boolean;
  minimum_bill_amount: number;
  offer: number;
  valid_upto: string;
}
interface Plan {
  bi_assured: boolean;
  bi_certification: boolean;
  bi_verification: boolean;
  google_map: boolean;
  image_gallery: boolean;
  plan_name: string;
  products_and_service_visibility: boolean;
  profile_view_count: boolean;
  profile_visit: boolean;
  video_gallery: boolean;
  whatsapp_chat: boolean;
}

interface results {
  id: number;
  image: string;
  name: string;
  whatsapp_number: string;
  locality: string;
  city: string;
  building_name: string;
  state: string;
  rating: number;
  redirect_link: {
    id: number;
    link: string;
    meta_keywords: string;
  };
  offers: Offer[];
  assured: boolean;
  plan: Plan;
  verified: boolean;
}

interface metadata {
  buisness: string | null;
  cc_combination: boolean;
  change_freq: string | null;
  city: number;
  dcat: number;
  id: number;
  last_mod: string;
  link: string;
  meta_author: string | null;
  meta_description: string;
  meta_keywords: string;
  meta_og_description: string | null;
  meta_og_image: string | null;
  meta_og_site_name: string | null;
  meta_og_title: string | null;
  meta_og_url: string | null;
  meta_title: string;
  page_title: string | null;
  priority: number;
  share_link: string;
  single_buisness: boolean;
}

interface BusinessCard {
  metadata: metadata;
  count: number;
  next: string | null;
  previous: string | null;
  results: results[];
}

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; city: string }>;
}): Promise<Metadata> {
  const { category, city } = await params;

  const BusinessList: BusinessCard = await api
    .get(`users/esearch/?q=${category}&location=${city}`)
    .then((res) => res.data);

  const metadata = BusinessList?.metadata || {};

  return {
    title: metadata.meta_title || `Popular ${category} in ${city}`,
    description:
      metadata.meta_description ||
      `Find popular ${category} in ${city}. Explore top businesses and offers.`,
    keywords: metadata.meta_keywords,
    openGraph: {
      title:
        metadata.meta_og_title ||
        metadata.meta_title ||
        `Popular ${category} in ${city}`,
      description:
        metadata.meta_og_description ||
        metadata.meta_description ||
        `Find popular ${category} in ${city}. Explore top businesses and offers.`,
      url: metadata.meta_og_url || "",
      images: metadata.meta_og_image
        ? [{ url: metadata.meta_og_image }]
        : undefined,
      siteName: metadata.meta_og_site_name || "",
    },
    alternates: {
      canonical: metadata.link,
    },
  };
}

export default async function CategoryList({
  params,
}: {
  params: Promise<{ category: string; city: string }>;
}) {
  const { category, city } = await params;

  const BusinessList: BusinessCard = await api
    .get(`users/esearch/?q=${category}&location=${city}`)
    .then((res) => res.data);

  console.log(BusinessList);

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-sky-50 ">
      <CategoryHeader city={city} category={category} />
      <div className="md:mt-[90px] mt-[100px] min-h-screen">
        {/* <CategoryBanner /> */}
        <div className=" bg-white font-ubuntuMedium md:text-3xl  text-gray-600 pt-2 md:py-4 md:px-10 px-5 text-left">
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
