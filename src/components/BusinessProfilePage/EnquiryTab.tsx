"use client";

import { useEffect, useState } from "react";
import EnquiryModal from "../category/EnquiryModal";

export default function EnquiryTab({
  name,
  bid,
}: {
  name: string;
  bid: number;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [browser, setBrowser] = useState(false);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    setBrowser(true);
  }, []);

  if (!browser) return;

  return (
    <div className=" w-full md:px-5 px-3 fixed bottom-2 shadow-2xl">
      <div className="bg-white/90 rounded-lg shadow-lg p-5 flex justify-between">
        <div className="font-ubuntu text-gray-700">
          <p className="font-ubuntuMedium md:text-lg">
            {" "}
            Have a question for {name}?
          </p>
          <p className=" md:block md:text-sm sm:text-xs">Get in touch for quotes, bookings, or inquiries.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-white text-sm md:text-lg font-ubuntuMedium bg-blue-500 rounded-md px-2"
        >
          Enquiry Now
        </button>
      </div>
      <EnquiryModal isOpen={isModalOpen} onClose={handleCloseModal} bid={bid} />
    </div>
  );
}
