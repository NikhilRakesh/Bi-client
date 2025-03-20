"use client";
import api, { baseurl } from "@/lib/api";
import React, { useEffect, useState, useRef } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import ReviewRatingComponent from "./ReviewRatingComponent";
import ReviewListSkelton from "../Skeltons/ReviewListSkelton";

interface Review {
  id: number;
  rating: number;
  review: string;
  name: string;
  image: { image: string }[];
}

export default function ReviewList({ bid }: { bid: number }) {
  const [openModal, setOpenModal] = useState(false);
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchReviews();
  }, [bid, currentPage, render]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `users/reviews/?bid=${bid}&page=${currentPage}`
      );
      if (response.status === 200) {
        const fetchedReviews = response.data.results.data;
        setReviews(fetchedReviews);
        setTotalPages(response.data.results.total_pages);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <>
        {[
          ...Array(5),
        ].map((_, index) => (
          <React.Fragment key={index}>
            {index < rating ? (
              <AiFillStar className="text-yellow-500" size={20} />
            ) : (
              <AiOutlineStar className="text-gray-300" size={20} />
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) {
      return "bg-green-600";
    } else if (rating >= 2) {
      return "bg-yellow-500";
    } else {
      return "bg-red-600";
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  function RenderComponent() {

    setRender(!render);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <React.Fragment key={i}>
          <button
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1 border rounded-md mx-1 ${
              currentPage === i
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600"
            }`}
          >
            {i}
          </button>
        </React.Fragment>
      );
    }
    return pageNumbers;
  };
  

  return (
    <div className="py-6 bg-white rounded-xl shadow-lg font-ubuntu">
      <div className="flex justify-between px-6">
        <h1 className="font-ubuntuMedium text-gray-800 text-2xl">
          Reviews & Ratings
        </h1>
        <button
          onClick={() => setOpenModal(true)}
          className="border rounded-sm px-1 outline-none text-gray-700 font-ubuntuMedium text-sm bg-gray-200"
        >
          Write a review
        </button>
      </div>
      <hr className="text-gray-700 mt-2" />
      <div
        ref={containerRef}
        className="overflow-y-auto custom-scrollbar h-[355px] px-6 cursor-pointer"
      >
        {reviews.length > 0 && !loading ? (
          reviews.map((review) => (
            <React.Fragment key={review.id}>
              <div className="px-6 py-3 border-b border-gray-300">
                <div className="flex gap-2 pb-2">
                  <div
                    className={`${getRatingColor(
                      review.rating
                    )} flex items-center gap-1 px-2 h-fit w-fit rounded-md`}
                  >
                    <p className="text-white text-sm">{review.rating}</p>
                    <FaStar size={10} />
                  </div>
                  <h1 className="text-gray-700">{review.name}</h1>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex">{renderStars(review.rating)}</div>
                </div>
                <p className="text-gray-800 text-sm mb-3">{review.review}</p>
                {review.image.length > 0 && (
                  <div className="space-x-2 flex">
                    {review.image.map((img, idx) => (
                      <React.Fragment key={idx}>
                        <img
                          src={baseurl + img.image}
                          alt={`review-image-${idx}`}
                          className="w-16 h-16 object-cover rounded-md border-2 border-gray-300"
                        />
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            </React.Fragment>
          ))
        ) : (
          <div className="h-full">
            {loading ? (
              <div>
                <ReviewListSkelton />
                <ReviewListSkelton />
                <ReviewListSkelton />
              </div>
            ) : (
              <div className="h-full w-full flex justify-center items-center ">
                <p className="text-gray-700 font-ubuntu text-xl">No reviews</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-center items-center py-2">
        <div className="flex">{renderPageNumbers()}</div>
      </div>

      {openModal && (
        <ReviewRatingComponent
          bid={bid}
          onClose={handleCloseModal}
          render={RenderComponent}
        />
      )}
    </div>
  );
}
