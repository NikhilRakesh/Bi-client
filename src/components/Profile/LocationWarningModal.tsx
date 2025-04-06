import { FaExclamationTriangle } from "react-icons/fa";

export default function LocationWarningModal({
  onClose,
  proceed,
}: {
  onClose: () => void;
  proceed: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 text-center">
        <FaExclamationTriangle className="text-red-500 text-4xl mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Accurate Location Required
        </h2>
        <p className="text-gray-600 mb-4">
          To ensure the best experience, please make sure you are physically
          present at your shop when adding the location. This helps us capture
          your shop’s accurate location for better service delivery.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              proceed();
            }}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}
