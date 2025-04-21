"use client";

import { useWebSocket } from "@/lib/WebSocketContext";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const { PaymentMessage } = useWebSocket();

  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-3xl min-h-screen flex justify-center items-center font-ubuntu"
    >
      <div className="absolute top-5 right-5">
        {PaymentMessage && (
          <button
            onClick={() => router.push("/profile")}
            className="text-gray-300 font-ubuntuMedium text-sm px-3 py-1 rounded-md bg-black"
          >
            Skip
          </button>
        )}
      </div>
      {PaymentMessage ? (
        <div className=" rounded-2xl shadow-xl border ">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <h1 className="text-2xl font-ubuntuMedium font-bold text-white mb-1">
              {PaymentMessage.title}
            </h1>
            <p className="text-white/90">{PaymentMessage.message}</p>
          </div>

          <div className="p-6 sm:p-8">
            <div className="space-y-5">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Business
                  </h3>
                  <p className="text-lg font-ubuntuMedium font-semibold text-gray-900">
                    {PaymentMessage.business}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Plan</h3>
                  <p className="text-lg font-semibold font-ubuntuMedium text-gray-900">
                    {PaymentMessage.message.match(/plan (.*?) has/)?.[1] ||
                      "Tier 2"}
                  </p>
                </div>
              </div>

              {/* Payment timestamp */}
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Processed On
                  </h3>
                  <p className="text-lg font-ubuntuMedium font-semibold text-gray-900">
                    {new Date(PaymentMessage.timestamp).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(PaymentMessage.timestamp).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
              </div>
            </div>

            {PaymentMessage.extras && (
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  Payment Receipt
                </h3>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    window.open(
                      "https://api.brandsinfo.in" + PaymentMessage.extras,
                      "_blank"
                    )
                  }
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download Invoice
                </motion.button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-8 sm:p-10 text-center">
          <motion.div
            className="relative mx-auto w-24 h-24 mb-8"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute bg-gradient-to-r from-blue-500 to-blue-600 w-20 h-12 rounded-lg shadow-md z-10"
              initial={{ y: 0, rotate: 0 }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="absolute top-2 left-3 w-8 h-1 bg-white/30 rounded-full"></div>
              <div className="absolute top-5 left-3 w-12 h-1 bg-white/30 rounded-full"></div>
              <div className="absolute bottom-3 right-3 w-4 h-4 bg-yellow-400 rounded-full"></div>
            </motion.div>

            <motion.div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-10 bg-gray-200 rounded-md">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-1 bg-gray-400 rounded-full">
                <motion.div
                  className="h-full bg-green-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    repeatDelay: 0.2,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-orange-400/50"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: [0.5, 1, 1.5],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-orange-400/50"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: [0.5, 1, 1.5],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.5,
              }}
            />
          </motion.div>

          <h1 className="text-2xl font-ubuntuMedium font-bold text-gray-800 mb-2">
            Processing Your Payment
          </h1>
          <p className="text-gray-600 mb-6">
            Please wait while we verify your transaction
          </p>

          <div className="flex justify-center space-x-2 mb-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-blue-500 rounded-full"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          <p className="text-sm text-gray-500">
            Do not refresh or close this window
          </p>
        </div>
      )}
    </motion.div>
  );
}
