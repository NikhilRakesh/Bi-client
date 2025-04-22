"use client";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { FiChevronRight, FiX } from "react-icons/fi";

interface Business {
  name: string;
  id: number;
}

interface BusinessModalProps {
  businesses: Business[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (id: number) => void;
}

export function BusinessSelectionModal({
  businesses,
  isOpen,
  onClose,
  onSelect,
}: BusinessModalProps) {
  const router = useRouter();

  if (businesses.length === 0) {
    router.push("/business-listing/add-business?step=1");
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold text-gray-900"
                  >
                    Select a Business
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <FiX className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-4">
                    Choose which business you want to purchase the package for:
                  </p>

                  <div className="space-y-2">
                    {businesses.map((business) => (
                      <button
                        key={business.id}
                        onClick={() => {
                          onSelect(business.id);
                          onClose();
                        }}
                        className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900">
                          {business.name}
                        </span>
                        <FiChevronRight className="text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
