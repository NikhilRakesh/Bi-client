"use client";
import { useState } from "react";

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

export default function EditOfferModal({
  onClose,
  offer,
  onSave,
}: {
  onClose: () => void;
  offer: Offerwithid;
  onSave: (updatedOffer: Offerwithid) => void;
}) {
  const [updatedOffer, setUpdatedOffer] = useState<Offerwithid>(offer);
  const [offerError, setOfferError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (offer.is_percent && name === "offer") {
      if (Number(value) > 100) {
        setOfferError("Percentage value cannot exceed 100%");
      } else {
        setOfferError("");
      }
    }
    setUpdatedOffer((prev: Offerwithid) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (offerError) return;
    onSave(updatedOffer);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 className="text-xl font-semibold mb-4">Edit Offer</h3>
        <form onSubmit={handleSubmit} className="text-gray-700">
          <div className="mb-3">
            <label className="block text-gray-700">Offer Value</label>
            <input
              type="text"
              name="offer"
              value={updatedOffer.offer}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Minimum Bill Amount</label>
            <input
              type="text"
              name="minimum_bill_amount"
              value={updatedOffer.minimum_bill_amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
            <p className="text-red-500 text-xs">{offerError}</p>
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Expiry Date</label>
            <input
              type="date"
              name="valid_upto"
              value={updatedOffer.valid_upto}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
