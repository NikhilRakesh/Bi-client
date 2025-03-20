"use client";
import React, { useState } from "react";
import { CiStar } from "react-icons/ci";
import { AiOutlineCamera } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import toast, { Toaster } from "react-hot-toast";
import { get_api_form } from "@/lib/api";
import { parseCookies } from "@/lib/cookies";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";

const StarsRating: React.FC<{
  star: number;
  rating: number;
  setRating: (rating: number) => void;
}> = ({ star, rating, setRating }) => {
  return (
    <div>
      <button onClick={() => setRating(star)} className="focus:outline-none">
        {rating >= star ? (
          <CiStar className="text-yellow-500" size={44} />
        ) : (
          <CiStar className="text-gray-300" size={44} />
        )}
      </button>
    </div>
  );
};

export default function ReviewRatingComponent({
  bid,
  onClose,
  render,
}: {
  bid: number;
  onClose: () => void;
  render: () => void;
}) {
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const cookies = parseCookies();
  const access_token = cookies?.access_token;
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      setImages([...images, ...Array.from(fileList)]);
    }
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please provide a rating and a message.");
      return;
    }
    if (!access_token) {
      router.push("/login");
      return;
    }
    try {
      const response = await get_api_form(access_token).post(
        "users/reviews/add/",
        { bid, review: message, rating, images }
      );
      if (response.status === 201) {
        toast.success("Review Posted Successfully");
        render();
        setImages([]);
        setMessage("");
        setRating(0);
        onClose();
      }
    } catch (error) {
      console.error("error Review submit:", error);
      toast.error("Error Posting Review. Try Again");
    }
  };

  const handleFileClick = () => {
    document.getElementById("file-input")?.click();
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <div className="fixed z-50 inset-0 flex justify-center items-center top-0 w-full bg-gray-700 bg-opacity-50">
      <div className="p-6 bg-white rounded-lg shadow-md font-ubuntu  md:w-6/12 relative">
        <h1 className="text-2xl text-gray-800 font-ubuntuMedium font-bold mb-4 text-center ">
          Write a Review
        </h1>
        <IoClose
          onClick={onClose}
          className="text-gray-700 absolute  top-3 right-3 cursor-pointer"
          size={25}
        />
        <p className="text-gray-700 mb-4 font-ubuntuMedium text-center">
          Help others by sharing your experience
        </p>

        <div className="mb-4 flex justify-center items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <React.Fragment key={star}>
              <StarsRating star={star} rating={rating} setRating={setRating} />
            </React.Fragment>
          ))}
        </div>

        <div className="mb-4">
          <textarea
            placeholder="Write your review here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border text-gray-700 border-orange-400 rounded-md focus:ring-2 outline-none focus:ring-orange-300"
            rows={4}
          />
        </div>

        <div className="mb-4">
          <input
            type="file"
            multiple
            accept="image/*"
            id="file-input"
            onChange={handleImageChange}
            className="hidden"
          />

          <button
            onClick={handleFileClick}
            className="flex items-center text-sm w-full justify-center text-gray-600 bg-gray-100 rounded-md p-2 hover:bg-gray-200"
          >
            <AiOutlineCamera className="mr-2" size={20} />
            Add photos
          </button>

          {images.length > 0 && (
            <div className="mt-2">
              <div className="overflow-x-auto custom-scrollbar mt-2">
                <ul className="flex space-x-2">
                  {images.map((file, index) => (
                    <li key={index} className="flex-shrink-0 relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`file-${index}`}
                        className="w-32 h-32 object-cover rounded-md border-2 border-gray-300"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0 right-0 p-1 bg-white rounded-full border-2 border-gray-300 text-gray-700 hover:bg-gray-100"
                      >
                        <CgClose size={20} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-4 justify-center">
          <button
            onClick={() => {
              setRating(0);
              setMessage("");
              setImages([]);
            }}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Post Review
          </button>
        </div>
        <Toaster />
      </div>
    </div>
  );
}
