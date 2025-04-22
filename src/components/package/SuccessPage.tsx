"use client";

import { useWebSocket } from "@/lib/WebSocketContext";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2,
  Receipt,
  CalendarDays,
  Box,
} from "lucide-react";

export default function PaymentStatusPage() {
  const { PaymentMessage } = useWebSocket();

  if (!PaymentMessage) {
    return <PaymentProcessing />;
  }

  return PaymentMessage.extras?.status === "FAILED" ? (
    <PaymentFailed payment={PaymentMessage} />
  ) : (
    <PaymentSuccess payment={PaymentMessage} />
  );
}

function PaymentProcessing() {
  return (
    <div className="p-8 sm:p-10 text-center min-h-screen flex flex-col items-center justify-center">
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
  );
}

function PaymentSuccess({ payment }: { payment: PaymentNotification }) {
  const router = useRouter();
  const planName = payment.message.match(/plan (.*?) has/)?.[1] || "Tier 2";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4"
    >
      <div className="absolute top-5 right-5">
        <button
          onClick={() => router.push("/profile")}
          className="text-sm text-gray-600 hover:text-gray-700 ml-auto block"
        >
          Back to Profile
        </button>
      </div>

      <div className="max-w-lg w-full bg-white rounded-xl shadow-sm overflow-hidden mt-4">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4"
          >
            <CheckCircle2 className="h-8 w-8 text-white" strokeWidth={2} />
          </motion.div>
          <h1 className="text-2xl font-bold text-white mb-1">
            {payment.title}
          </h1>
          <p className="text-white/90">{payment.message}</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <DetailItem
              icon={<Building2 className="h-5 w-5 text-emerald-600" />}
              title="Business"
              value={payment.business}
            />

            <DetailItem
              icon={<Box className="h-5 w-5 text-blue-600" />}
              title="Plan"
              value={planName}
            />

            <DetailItem
              icon={<CalendarDays className="h-5 w-5 text-purple-600" />}
              title="Processed On"
              value={new Date(payment.timestamp).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              subValue={new Date(payment.timestamp).toLocaleTimeString(
                "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            />
          </div>

          {payment.extras?.invoice && (
            <div className="pt-4 border-t border-gray-100">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  window.open(
                    "https://api.brandsinfo.in" + payment.extras.invoice,
                    "_blank"
                  )
                }
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                <Receipt className="h-5 w-5" />
                Download Invoice
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function PaymentFailed({ payment }: { payment: PaymentNotification }) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 flex flex-col items-center p-4"
    >
      <div className="absolute top-5 right-5">
        <button
          onClick={() => router.push("/profile")}
          className="text-sm text-gray-600 hover:text-gray-700 ml-auto block"
        >
          Back to Profile
        </button>
      </div>

      <div className="max-w-lg w-full bg-white rounded-xl shadow-sm overflow-hidden mt-4">
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4"
          >
            <AlertCircle className="h-8 w-8 text-white" strokeWidth={2} />
          </motion.div>
          <h1 className="text-2xl font-bold text-white mb-1">Payment Failed</h1>
          <p className="text-white/90">
            {payment.message || "We couldn't process your payment"}
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <DetailItem
              icon={<Building2 className="h-5 w-5 text-rose-600" />}
              title="Business"
              value={payment.business}
            />

            <DetailItem
              icon={<Box className="h-5 w-5 text-blue-600" />}
              title="Plan"
              value={payment.message.match(/plan (.*?) has/)?.[1] || "Tier 2"}
            />

            <DetailItem
              icon={<Clock className="h-5 w-5 text-amber-600" />}
              title="Attempted On"
              value={new Date(payment.timestamp).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              subValue={new Date(payment.timestamp).toLocaleTimeString(
                "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            />
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-4">
            <p className="text-sm text-gray-600 text-center">
              Please check your payment details and try again
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => router.push("/pricing")}
                className="flex-1 py-2.5 px-4 rounded-lg border text-gray-700 border-gray-300 text-sm font-medium hover:bg-gray-50"
              >
                Choose Plan
              </button>
              <button
                onClick={() => router.push("/support")}
                className="flex-1 py-2.5 px-4 rounded-lg bg-gradient-to-r from-rose-500 to-pink-600 text-sm font-medium text-white hover:from-rose-600 hover:to-pink-700"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DetailItem({
  icon,
  title,
  value,
  subValue,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subValue?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-lg font-semibold text-gray-900">{value}</p>
        {subValue && <p className="text-sm text-gray-500 mt-1">{subValue}</p>}
      </div>
    </div>
  );
}

interface PaymentNotification {
  business: string;
  business_id: number;
  extras: { invoice: string; status: string };
  message: string;
  ntype: string;
  timestamp: string;
  title: string;
  type: string;
}
