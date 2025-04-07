import { token_api } from "@/lib/api";
import { parseCookies } from "@/lib/cookies";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditOfferModal from "./EditOfferModal";

interface Offerwithid {
  offer_type: string;
  minimum_bill_amount: number;
  valid_upto: string;
  is_percent: boolean;
  is_flat: boolean;
  buisness: string | null;
  offer: number;
  id: number;
}
interface Offer {
  offer_type: string;
  minimum_bill_amount: number;
  valid_upto: string;
  is_percent: boolean;
  is_flat: boolean;
  buisness: string | null;
  offer: number;
}

interface Offers {
  offer_type: string;
  minimum_bill_amount: number;
  valid_upto: string;
  is_percent: boolean;
  is_flat: boolean;
  offer: number;
  buisness: string | null;
  id: number;
}

interface OfferModalProps {
  render: () => void;
  bid: string | null;
  offerDatas: Offers[];
}

export default function OfferModal({
  render,
  bid,
  offerDatas,
}: OfferModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [offerType, setOfferType] = useState("");
  const [isPercent, setIsPercent] = useState(false);
  const [isFlat, setIsFlat] = useState(false);
  const [minimumBillAmount, setMinimumBillAmount] = useState<number | string>(
    ""
  );
  const [validUpto, setValidUpto] = useState("");
  const [offerValue, setOfferValue] = useState<number | string>("");
  const [selectedOffer, setSelectedOffer] = useState<Offerwithid | null>(null);
  const cookies = parseCookies();
  const access_token = cookies?.access_token;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newOffer: Offer = {
      offer_type: offerType,
      minimum_bill_amount: Number(minimumBillAmount),
      valid_upto: validUpto,
      is_percent: isPercent,
      is_flat: isFlat,
      offer: Number(offerValue),
      buisness: bid,
    };

    try {
      const response = await token_api(access_token).post(
        `users/offers/add/`,
        newOffer
      );

      if (response.status === 201) {
        render();
        toast.success("The offer has been added successfully.");
        setIsModalOpen(false);
        setOfferType("");
        setIsPercent(false);
        setIsFlat(false);
        setOfferValue("");
        setMinimumBillAmount("");
        setValidUpto("");
      }
    } catch (error) {
      console.error("Unknown error:", error);
      toast.error("Something went wrong, please try again.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOfferTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOfferType = e.target.value;
    setOfferType(selectedOfferType);

    if (selectedOfferType === "Percentage") {
      setIsPercent(true);
      setIsFlat(false);
    } else if (selectedOfferType === "Flat") {
      setIsPercent(false);
      setIsFlat(true);
    }
  };

  const getOfferPreview = () => {
    // if (!offerType || !offerValue || !minimumBillAmount) return "";

    const value = Number(offerValue);
    const minimumAmount = Number(minimumBillAmount);

    if (isPercent) {
      return `${value}% off above ₹${minimumAmount}`;
    } else if (isFlat) {
      return `₹${value} flat off above ₹${minimumAmount}`;
    }
    return "";
  };

  function handleEditClick(offer: Offerwithid) {
    setSelectedOffer(offer);
    setIsEditModalOpen(true);
  }

  async function handleSave(updatedOffer: Offerwithid) {
    try {
      const response = await token_api(access_token).patch(
        `users/offers/edit/${updatedOffer?.id}`,
        updatedOffer
      );

      if (response.status === 200) {
        render();
        toast.success("The offer has been successfully updated.");
      }
    } catch (error) {
      console.error("Unknown error:", error);
      toast.error("Something went wrong, please try again.");
    }
  }

  async function deleteOffer(id: number) {
    try {
      const response = await token_api(access_token).delete(
        `users/offers/delete/${id}/`
      );

      if (response.status === 200) {
        render();
        toast.success("The offer has been successfully deleted.");
      }
    } catch (error) {
      console.error("Unknown error:", error);
      toast.error("Something went wrong, please try again.");
    }
  }

  return (
    <div className="md:px-8 font-ubuntu">
      {offerDatas.length === 0 && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 text-white py-2 w-3/12 rounded font-ubuntuMedium"
        >
          Add Offer
        </button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg md:w-1/3 shadow-lg">
            <h2 className="md:text-xl mb-4 text-gray-800 font-ubuntuMedium text-center">
              Add Offer
            </h2>
            <form onSubmit={handleSubmit} className="text-gray-700 space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="offer_type"
                >
                  Offer Type
                </label>
                <select
                  id="offer_type"
                  value={offerType}
                  onChange={handleOfferTypeChange}
                  className="mt-1 p-2 border outline-orange-600 border-gray-300 rounded w-full"
                  required
                >
                  <option value="">Select Offer Type</option>
                  <option value="Percentage">Percentage</option>
                  <option value="Flat">Flat</option>
                </select>
              </div>

              {offerType && (
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="offer"
                  >
                    {offerType === "Percentage"
                      ? "Offer Percentage"
                      : "Flat Offer Value"}
                  </label>
                  <input
                    type="number"
                    id="offer"
                    value={offerValue}
                    onChange={(e) => setOfferValue(e.target.value)}
                    className="mt-1 p-2 border outline-orange-600 no-arrows border-gray-300 rounded w-full"
                    required
                  />
                </div>
              )}

              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="minimum_bill_amount"
                >
                  Minimum Bill Amount
                </label>
                <input
                  type="number"
                  id="minimum_bill_amount"
                  value={minimumBillAmount}
                  onChange={(e) => setMinimumBillAmount(e.target.value)}
                  className="mt-1 p-2 no-arrows border outline-orange-600 border-gray-300 rounded w-full"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="valid_upto"
                >
                  Valid Upto (Date)
                </label>
                <input
                  type="date"
                  id="valid_upto"
                  value={validUpto}
                  onChange={(e) => setValidUpto(e.target.value)}
                  className="mt-1 p-2 border outline-orange-600 border-gray-300 rounded w-full"
                  required
                />
              </div>

              <div className="mt-4 text-gray-600 flex gap-2 bg-gray-200 rounded-md px-2">
                <strong className="font-ubuntu">Offer Preview:</strong>
                <p className="text-sm">{getOfferPreview()}</p>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 text-white py-2 px-4 rounded"
                >
                  Save Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {offerDatas.length !== 0 && (
        <div className="mt-6 p-6 bg-gradient-to-r from-indigo-50 to-sky-50 bg-white rounded-lg font-ubuntuMedium shadow-lg">
          <div className="flex justify-between">
            <h3 className="md:text-3xl text-lg font-semibold mb-6 text-gray-800">
              Offers
            </h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-orange-500 text-white md:py-2 p-1 md:w-3/12 h-full rounded font-ubuntuMedium"
            >
              Add Offer
            </button>
          </div>

          {offerDatas.map((offer, index) => {
            let offerText = "";
            const offerValue = offer.offer;

            if (offer.is_percent) {
              offerText = `${offerValue}% off on purchases over ₹${offer.minimum_bill_amount} (Valid until ${offer.valid_upto})`;
            } else if (offer.is_flat) {
              offerText = `₹${offerValue} flat off on purchases over ₹${offer.minimum_bill_amount} (Valid until ${offer.valid_upto})`;
            }

            return (
              <div
                key={index}
                className="bg-gradient-to-r relative from-indigo-100 to-sky-100 bg-white rounded-lg shadow-md px-2 py-1 md:py-2 mb-6"
              >
                <div className="flex items-center space-x-4">
                  <div className="md:w-8 md:h-8 w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-indigo-700 shadow-md">
                    {offer.is_percent ? (
                      <span className="font-semibold text-white">%</span>
                    ) : (
                      <span className="font-semibold text-white">₹</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="md:text-xl text-sm text-gray-600 leading-relaxed">
                      {offerText}
                    </p>
                  </div>
                </div>
                <div className="mt-4 ">
                  <span className="md:text-sm text-xs text-gray-500">
                    Expiry Date: <strong>{offer.valid_upto}</strong>
                  </span>
                </div>
                <div className="flex flex-col gap-5 absolute top-7 md:top-5 right-6">
                  <button onClick={() => handleEditClick(offer)}>
                    <FaRegEdit className="text-gray-600" />
                  </button>
                  <button onClick={() => deleteOffer(offer.id)}>
                    <MdDelete className="text-red-500" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Toaster />
      {selectedOffer && isEditModalOpen && (
        <EditOfferModal
          onClose={() => setIsEditModalOpen(false)}
          offer={selectedOffer}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
