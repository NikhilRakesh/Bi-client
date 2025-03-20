import BookMarkComponent from "@/components/BusinessProfilePage/BookMarkComponent";
import BusinessProfileImageGallery from "@/components/BusinessProfilePage/BusinessProfileImageGallery";
import EnquiryTab from "@/components/BusinessProfilePage/EnquiryTab";
import OpenStatus from "@/components/BusinessProfilePage/OpenStatus";
import ProductServiceCard from "@/components/BusinessProfilePage/ProductServiceCard";
import RatingShareSection from "@/components/BusinessProfilePage/RatingShareSection";
import ServiceCard from "@/components/BusinessProfilePage/ServiceCard";
import CategoryHeader from "@/components/Header/CategoryHeader";
import api, { baseurl } from "@/lib/api";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import ReviewList from "@/components/BusinessProfilePage/ReviewList";
import OfferBiProfile from "@/components/BusinessProfilePage/OfferBiProfile";

export default async function BusinessProfilePage({
  params,
}: {
  params: Promise<{ category: string; city: string; bid: string }>;
}) {
  const { category, city, bid } = await params;

  const BusinessProfileData = await api
    .get(`users/buisnesses_na/?maping_id=${bid}`)
    .then((res) => res.data);

  console.log(BusinessProfileData);

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-sky-50 h-full  md:mt-[87px] mt-[100px] font-ubuntu relative">
      <CategoryHeader city={city} category={category} />

      <div className="md:px-20 px-3 py-5 w-full">
        <div className="md:flex gap-10 mb-28">
          <div className="w-full md:w-6/12 flex flex-col gap-y-7">
            <div className="w-full bg-white rounded-xl px-5 space-y-3 py-5 shadow-lg  overflow-hidden">
              <div className="flex justify-between items-center ">
                <div className="flex flex-col relative ">
                  <h1 className="text-4xl font-semibold text-gray-900 leading-tight font-ubuntuMedium">
                    {BusinessProfileData?.buisness.name}
                  </h1>
                  <div>
                    <p className="text-xs text-black">
                      <span className="font-semibold text-sm">
                        Business Type
                      </span>{" "}
                      - {BusinessProfileData?.buisness.buisness_type}
                    </p>
                    {BusinessProfileData?.buisness.since && (
                      <p className="text-gray-500 text-sm italic">
                        Since{" "}
                        {new Date(
                          BusinessProfileData?.buisness.since
                        ).getFullYear()}
                      </p>
                    )}
                  </div>
                  <span className="text-gray-500 font-semibold font-ubuntuMedium text-xs absolute top-[-10px] left-[-10px]">
                    MEET
                  </span>
                </div>
                <img
                  src={baseurl + BusinessProfileData?.buisness.image}
                  alt={BusinessProfileData?.buisness.name}
                  className="object-cover w-24 h-24 rounded-full border-4 border-orange-400 shadow-xl transform group-hover:scale-110 transition duration-300"
                />
              </div>

              <div className="flex justify-between items-center px-2">
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-gray-600" size={15} />
                  <p className="text-gray-700">
                    {BusinessProfileData?.buisness.locality},{" "}
                    {BusinessProfileData?.buisness.city}
                  </p>
                </div>

                <div>
                  {BusinessProfileData?.buisness?.id && (
                    <BookMarkComponent
                      bid={BusinessProfileData?.buisness?.id}
                    />
                  )}
                </div>
              </div>

              {BusinessProfileData?.buisness.opens_at &&
                BusinessProfileData?.buisness.closes_at && (
                  <OpenStatus
                    opensAt={BusinessProfileData?.buisness.opens_at}
                    closesAt={BusinessProfileData?.buisness.closes_at}
                  />
                )}

              {BusinessProfileData?.buisness?.site_data?.share_link && (
                <RatingShareSection
                  share_link={
                    BusinessProfileData?.buisness?.site_data?.share_link
                  }
                  rating={BusinessProfileData?.buisness?.rating}
                />
              )}

              <div className="mt-6 flex justify-between items-center gap-2 ">
                <button className="flex items-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300">
                  <FaPhoneAlt className="mr-2" size={20} />
                  <span className="text-sm">Call Enquiry</span>
                </button>

                <button className="flex items-center bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">
                  <FaWhatsapp className="mr-2" size={20} />
                  <span className="text-sm">WhatsApp</span>
                </button>
              </div>
            </div>

            <div className=" w-full md:block hidden ">
              <ReviewList bid={BusinessProfileData?.buisness?.id} />
            </div>
          </div>

          <div className="w-full md:6/12 overflow-hidden mt-5 md:mt-0">
            <div className="w-full space-y-6 border px-5 py-2 bg-white rounded-xl shadow-lg ">
              {BusinessProfileData?.buisness.image_gallery.length !== 0 && (
                <BusinessProfileImageGallery
                  imageGallery={
                    BusinessProfileData?.buisness.image_gallery || []
                  }
                />
              )}

              {BusinessProfileData?.offers.length !== 0 && (
                <OfferBiProfile Offers={BusinessProfileData?.offers} />
              )}

              <div>
                <h1 className="font-ubuntuMedium text-gray-700 md:text-xl">
                  About
                </h1>
                <p className="text-gray-600 font-ubuntu md:text-base text-sm">
                  {BusinessProfileData?.buisness.description}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-gray-600" size={20} />
                <p className="md:text-lg text-gray-700">
                  {BusinessProfileData?.buisness.building_name},{" "}
                  {BusinessProfileData?.buisness.locality},{" "}
                  {BusinessProfileData?.buisness.city},{" "}
                  {BusinessProfileData?.buisness.state} -{" "}
                  {BusinessProfileData?.buisness.pincode}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {BusinessProfileData?.buisness?.email && (
                  <div className="flex items-center space-x-2">
                    <FaEnvelope className="text-gray-600" size={20} />
                    <p className="md:text-lg text-gray-700">
                      {BusinessProfileData?.buisness?.email}
                    </p>
                  </div>
                )}
                {BusinessProfileData?.buisness?.web_link && (
                  <div className="flex items-center space-x-2">
                    <FaGlobe className="text-gray-600" size={20} />
                    <a
                      href={BusinessProfileData?.buisness?.web_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="md:text-lg text-blue-600 hover:text-blue-700"
                    >
                      {BusinessProfileData?.buisness?.web_link}
                    </a>
                  </div>
                )}
                <div className="flex items-center space-x-4">
                  {BusinessProfileData?.buisness?.facebook_link && (
                    <a
                      href={BusinessProfileData?.buisness?.facebook_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook
                        className="text-blue-600 hover:text-blue-700"
                        size={24}
                      />
                    </a>
                  )}
                  {BusinessProfileData?.buisness?.instagram_link && (
                    <a
                      href={BusinessProfileData?.buisness?.instagram_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram
                        className="text-pink-600 hover:text-pink-700"
                        size={24}
                      />
                    </a>
                  )}
                  {BusinessProfileData?.buisness?.x_link && (
                    <a
                      href={BusinessProfileData?.buisness?.x_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaSquareXTwitter className="text-black" size={24} />
                    </a>
                  )}
                  {BusinessProfileData?.buisness?.youtube_link && (
                    <a
                      href={BusinessProfileData?.buisness?.youtube_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaYoutube
                        className="text-red-600 hover:text-red-700"
                        size={24}
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
            {(BusinessProfileData?.products.length !== 0 ||
              BusinessProfileData?.services.length !== 0) && (
              <div className="bg-white px-5 py-2 rounded-xl shadow-lg w-full mt-5">
                {BusinessProfileData?.products.length !== 0 && (
                  <ProductServiceCard
                    productData={BusinessProfileData?.products}
                  />
                )}

                {BusinessProfileData?.services.length !== 0 && (
                  <ServiceCard serviceData={BusinessProfileData?.services} />
                )}
              </div>
            )}
             <div className=" w-full md:hidden block mt-5 ">
              <ReviewList bid={BusinessProfileData?.buisness?.id} />
            </div>
          </div>
        </div>
      </div>
      <EnquiryTab
        name={BusinessProfileData?.buisness.name}
        bid={BusinessProfileData?.buisness?.id}
      />
    </div>
  );
}
