"use client";
import { MdLocationOn } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { baseurl } from "@/lib/api";
import { useEffect, useState } from "react";
import CategoryCardSkelton from "../Skeltons/CategoryCardSkelton";
import EnquiryModal from "./EnquiryModal";
import FilterOptions from "./FilterOptions";

interface Offer {
  buisness: number;
  id: number;
  is_flat: boolean;
  is_percent: boolean;
  minimum_bill_amount: number;
  offer: number;
  valid_upto: string;
}

interface results {
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bid, setBid] = useState(0);
  const handleCloseModal = () => setIsModalOpen(false);
  const [BusinessList, setBusinessList] = useState<BusinessCard>(BusinessLists);

  useEffect(() => {
    setBrowser(true);
  }, []);

  function filteredData(data: BusinessCard) {
    setBusinessList(data);
  }
  console.log("BusinessLists", BusinessList);

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

  function handleEnquiry(id: number, e: React.MouseEvent) {
    e.stopPropagation();
    setBid(id);
    setIsModalOpen(true);
  }

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const offerHandle = (offers: Offer[]) => {
    const offer = offers[0];
    if (offer) {
      if (offer.is_percent) {
        return `${offer.offer}% off on purchases over ₹${offer.minimum_bill_amount}`;
      } else {
        return `₹${offer.offer} flat off on purchases over ₹${offer.minimum_bill_amount}`;
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

  return (
    <div className="min-h-screen">
      <FilterOptions
        filteredData={filteredData}
        city={city}
        category={category}
      />
      <div className="flex flex-wrap justify-center gap-8 py-5 px-2">
        {BusinessList?.results?.length !== 0 && Array.isArray(BusinessList.results) ? (
          BusinessList?.results?.map((card, index) => (
            <div
              onClick={() => {
                handleOnclick(card.redirect_link.link);
              }}
              key={index}
              className="md:w-80 cursor-pointer md:h-full h-full w-full font-ubuntu bg-white backdrop-blur-lg rounded-lg shadow-2xl flex md:flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-3xl border border-white/10"
            >
              <div className="relative w-4/12 md:w-full">
                <img
                  src={baseurl + card.image}
                  alt={card.name}
                  className="md:w-full w-36 md:h-48 h-full object-cover rounded-t-lg"
                />
                <div className="flex w-full gap-1 rounded-tl-lg rounded-tr-lg bg-gray-800 bg-opacity-30 text-sm justify-end text-white rounded-bl-md absolute top-0 right-0">
                  {card.assured && (
                    <div className="rounded-tl-lg rounded-tr-lg px-3 w-full bg-opacity-30">
                      <img
                        className="w-16 mt-2"
                        src="/Brandsinfo-assured.png"
                        alt=""
                      />
                    </div>
                  )}
                  {card.rating !== 0 && (
                    <div className="flex items-center px-2 rounded-tr-lg rounded-bl-md gap-1 bg-gradient-to-r from-green-600 to-green-700">
                      <CiStar className="text-yellow-400" />
                      <span>{card.rating}</span>
                    </div>
                  )}
                </div>
                <div className="absolute hidden md:block inset-0 bg-gradient-to-b from-transparent to-black opacity-40 rounded-t-lg"></div>
                <h2 className="text-[20px] hidden md:block absolute top-[155px] right-0 left-2 font-ubuntuMedium font-bold text-gray-100 truncate z-10">
                  {card.name}
                </h2>
                <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg"></div>
              </div>

              <div className="p-4 flex flex-col gap-2 w-8/12 md:w-full">
                <h2 className="text-[20px] md:hidden block font-ubuntuMedium font-bold text-gray-800 truncate z-10">
                  {card.name}
                </h2>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <MdLocationOn className="text-gray-600" size={18} />
                    <p className="text-sm text-gray-600 truncate">{`${card.locality}, ${card.city}`}</p>
                  </div>
                  {card.verified && (
                    <div>
                      <img
                        className="w-16 md:block hidden mt-2"
                        src="/Brandsinfo-verified.png"
                        alt=""
                      />
                    </div>
                  )}
                  {card.verified && (
                    <div>
                      <img
                        className="w-16 block md:hidden absolute top-0 right-2 mt-2"
                        src="/Brandsinfo-verified.png"
                        alt=""
                      />
                    </div>
                  )}
                  <div
                    onClick={(e) => handleEnquiry(card.id, e)}
                    className="flex gap-1 z-10 items-center cursor-pointer"
                  >
                    <img src="/chat.png" alt="" />
                  </div>
                </div>

                {card.offers.length !== 0 ? (
                  <div className="px-2 py-1 mb-2 bg-yellow-100 rounded-md text-sm text-yellow-800 flex items-center justify-between">
                    <span className="truncate">{offerHandle(card.offers)}</span>
                  </div>
                ) : (
                  <div className="rounded-md mb-2 text-sm text-gray-800 flex items-center gap-2 overflow-hidden max-w-full">
                    {card?.redirect_link?.meta_keywords && (
                      <div className="flex flex-nowrap overflow-hidden w-full">
                        {keywordHandle(card?.redirect_link?.meta_keywords)?.map(
                          (keyword, index) => (
                            <p
                              key={index}
                              className="px-2 py-1 rounded-md shadow-sm bg-gray-100 whitespace-nowrap overflow-hidden text-ellipsis"
                            >
                              {keyword}
                            </p>
                          )
                        )}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-2 z-10 mt-auto">
                  <a
                    href={`tel:${card.whatsapp_number}`}
                    onClick={handleLinkClick}
                    className="flex-1 text-center bg-green-500 text-white text-sm px-4 py-2 rounded-md hover:from-green-700 hover:to-green-800 transition-all"
                  >
                    Call Now
                  </a>
                  <a
                    href={`https://wa.me/${card.whatsapp_number}`}
                    onClick={handleLinkClick}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-green-100 text-green-600 px-4 py-2 text-sm rounded-md hover:bg-green-200 transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
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

        <EnquiryModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          bid={bid}
        />
      </div>
    </div>
  );
};

export default CategoryCard;
