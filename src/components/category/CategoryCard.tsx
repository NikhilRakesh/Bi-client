"use client";
import { MdLocationOn } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { baseurl } from "@/lib/api";
import { useEffect, useState } from "react";
import CategoryCardSkelton from "../Skeltons/CategoryCardSkelton";
import FilterOptions from "./FilterOptions";
import { parseCookies } from "@/lib/cookies";
import Link from "next/link";

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

interface Metadata {
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
  metadata: Metadata;
  count: number;
  next: string | null;
  previous: string | null;
  results: results[];
}

interface CardProps {
  BusinessLists: BusinessCard;
  city: string;
  category: string;
}

const CategoryCard: React.FC<CardProps> = ({
  BusinessLists,
  city,
  category,
}) => {
  const [browser, setBrowser] = useState(false);
  const [BusinessList, setBusinessList] = useState<BusinessCard>(BusinessLists);
  const cookies = parseCookies();
  const access_token = cookies?.access_token;

  useEffect(() => {
    setBrowser(true);
  }, []);

  function filteredData(data: BusinessCard) {
    setBusinessList(data);
  }

  if (!browser)
    return (
      <div className="flex flex-wrap justify-center gap-8 py-5 px-4 ">
        {Array.from({ length: 8 }).map((_, index) => (
          <CategoryCardSkelton key={index} />
        ))}
      </div>
    );

  const handleOnclick = (link: string) => {
    const urlWithDashes = link.replace(/ /g, "-");
    const truncatedUrl = urlWithDashes.split(",")[0];
    window.open(truncatedUrl, "_blank");
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const offerHandle = (offers: Offer[]) => {
    const offer = offers[0];
    if (offer) {
      if (offer.is_percent) {
        return `${offer.offer}% off above ₹${offer.minimum_bill_amount}`;
      } else {
        return `₹${offer.offer} flat off above ₹${offer.minimum_bill_amount}`;
      }
    }
    return "Visit the profile for more details and services";
  };

  const keywordHandle = (meta_keywords: string) => {
    const keywords = meta_keywords
      ?.split(",")
      ?.map((keyword) => keyword.trim());
    const maxKeywords = keywords
      .slice(0, 2)
      .every((keyword) => keyword.length > 5)
      ? 2
      : 3;
    const displayedKeywords = keywords.slice(0, maxKeywords);
    return displayedKeywords;
  };

  function formattedNumber(number: number) {
    const Number = number.toFixed(1);
    return Number;
  }

  return (
    <div className="min-h-screen bg-white md:bg-gray-100">
      <FilterOptions
        filteredData={filteredData}
        city={city}
        category={category}
      />
      <div className="flex flex-col justify-center md:gap-8 gap-3 py-5 px-4 md:mx-56 md:bg-white">
        {BusinessList?.results?.length !== 0 &&
        Array.isArray(BusinessList.results) ? (
          BusinessList?.results?.map((card, index) => (
            <div
              onClick={() => {
                handleOnclick(card.redirect_link.link);
              }}
              key={index}
              className=" cursor-pointer bg-white overflow-hidden border-b border-gray-300 pb-5"
            >
              <div className="flex">
                <div className="relative w-4/12   md:w-full  lg:w-60 xl:w-72 md:h-56">
                  <img
                    src={baseurl + card.image}
                    alt={card.name}
                    className=" w-36 md:w-full h-full object-cover rounded-t-lg"
                  />
                  {/* <div className="absolute top-0 w-full right-0 p-2 bg-gray-800 bg-opacity-30 rounded-tl-lg rounded-tr-lg flex gap-2 items-center">
                  {card.assured && (
                    <img
                      className="w-16 mt-2"
                      src="/Brandsinfo-assured.png"
                      alt="Assured"
                    />
                  )}
                  {card.rating !== 0 && (
                    <div className="flex items-center  px-2 bg-gradient-to-r from-green-600 to-green-700 rounded-tr-lg rounded-bl-md text-white text-sm">
                      <CiStar className="text-yellow-400" />
                      <span>{formattedNumber(card.rating)}</span>
                    </div>
                  )}
                </div> */}
                  <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg"></div>
                </div>

                <div className="p-4 flex flex-col gap-2">
                  <h2 className="text-lg font-medium font-ubuntuMedium text-gray-800 truncate">
                    {card.name}
                  </h2>

                  <div className=" flex gap-3">
                    {card.rating !== 0 && (
                      <div className="flex items-center w-fit h-fit  px-2 bg-gradient-to-r from-green-600 to-green-700 rounded-tr-lg rounded-bl-md text-white text-sm">
                        <CiStar className="text-yellow-400" />
                        <span>{formattedNumber(card.rating)}</span>
                      </div>
                    )}
                    {card.assured && card?.plan?.bi_assured && (
                      <img
                        className="w-16 mt-2"
                        src="/Brandsinfo-assured.png"
                        alt="Assured"
                      />
                    )}
                    {card.verified && card?.plan?.bi_verification && (
                      <img
                        className="w-16 mt-2 "
                        src="/Brandsinfo-verified.png"
                        alt="Verified"
                      />
                    )}
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <MdLocationOn className="text-gray-600" size={18} />
                      <p className="text-gray-600 text-xs md:text-sm break-words">{`${card.locality}, ${card.city}, ${card.state}`}</p>
                      </div>
                  </div>

                  {card.offers.length > 0 ? (
                    <div className="px-2 py-1 mb-2 bg-yellow-100 rounded-md text-sm text-yellow-800 flex items-center justify-between">
                      <span>{offerHandle(card.offers)}</span>
                    </div>
                  ) : (
                    <div className="rounded-md mb-2 text-xs md:text-sm text-gray-800 flex items-center gap-2 overflow-hidden max-w-full">
                      {card?.redirect_link?.meta_keywords && (
                        <div className="flex flex-nowrap overflow-hidden w-full">
                          {keywordHandle(
                            card?.redirect_link?.meta_keywords
                          )?.map((keyword, index) => (
                            <p
                              key={index}
                              className="px-2 py-1 rounded-md shadow-sm bg-gray-100 whitespace-nowrap overflow-hidden text-ellipsis"
                            >
                              {keyword}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="md:flex hidden gap-2 mt-auto">
                    <div className="w-full">
                      <a
                        href={`tel:${card.whatsapp_number}`}
                        onClick={handleLinkClick}
                        className="flex justify-center items-center text-center w-full bg-green-500 text-white text-sm px-4 py-2 rounded-md hover:bg-green-700 transition-all"
                      >
                        Call Now
                      </a>
                    </div>
                    {card?.plan?.whatsapp_chat && (
                      <div className="w-full">
                        {access_token ? (
                          <a
                            href={`https://wa.me/${card.whatsapp_number}`}
                            onClick={handleLinkClick}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex justify-center items-center text-center w-full bg-green-100 text-green-600 px-4 py-2 text-sm rounded-md hover:bg-green-200 transition-colors"
                          >
                            WhatsApp
                          </a>
                        ) : (
                          <Link
                            onClick={handleLinkClick}
                            href={"/login"}
                            className="flex justify-center items-center text-center bg-green-100 text-green-600 px-4 py-2 text-sm rounded-md hover:bg-green-200 transition-colors"
                          >
                            WhatsApp
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="md:hidden flex gap-2 mt-2 w-full">
                <div className="w-full">
                  <a
                    href={`tel:${card.whatsapp_number}`}
                    onClick={handleLinkClick}
                    className="flex justify-center items-center text-center w-full bg-green-500 text-white text-sm px-4 py-2 rounded-md hover:bg-green-700 transition-all"
                  >
                    Call Now
                  </a>
                </div>
                {card?.plan?.whatsapp_chat && (
                  <div className="w-full">
                    {access_token ? (
                      <a
                        href={`https://wa.me/${card.whatsapp_number}`}
                        onClick={handleLinkClick}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center text-center w-full bg-green-100 text-green-600 px-4 py-2 text-sm rounded-md hover:bg-green-200 transition-colors"
                      >
                        WhatsApp
                      </a>
                    ) : (
                      <Link
                        onClick={handleLinkClick}
                        href={"/login"}
                        className="flex justify-center items-center text-center bg-green-100 text-green-600 px-4 py-2 text-sm rounded-md hover:bg-green-200 transition-colors"
                      >
                        WhatsApp
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-700 h-full w-full flex justify-center items-center mt-32">
            <p className="font-ubuntuMedium md:text-3xl text-xl ">
              No Result For {category} in {city}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
