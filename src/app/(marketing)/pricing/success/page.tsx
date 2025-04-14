"use client";
import { motion } from "framer-motion";
import { FiDownload, FiCheckCircle, FiArrowRight, FiPrinter } from "react-icons/fi";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/Common/LoadingSpinner";

interface InvoiceData {
  packageName: string;
  businessName: string;
  invoiceId: string;
  purchaseDate: string;
  amount: string;
  validity: string;
  features: string[];
}

export default function PurchaseSuccess() {
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInvoice({
        packageName: "Premium Business Package",
        businessName: "Acme Corporation",
        invoiceId: `INV-${Math.floor(Math.random() * 1000000)}`,
        purchaseDate: new Date().toLocaleDateString(),
        amount: "₹12,999",
        validity: "365 days",
        features: [
          "Priority Listing",
          "Advanced Analytics",
          "24/7 Support",
          "Social Media Promotion",
          "Video Gallery"
        ]
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
  
    console.log("Downloading invoice...");
  };

  const handlePrint = () => {
    window.print();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(invoice?.invoiceId || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 print:bg-white">
      <div className="max-w-4xl mx-auto">
      
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12"
        >
          <div className="p-8 sm:p-10 text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
            >
              <FiCheckCircle className="w-10 h-10 text-green-500" />
            </motion.div>

            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Purchase Successful!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for choosing our service. Your package is now active.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 transition-colors"
              >
                <FiDownload className="mr-2" />
                Download Invoice
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrint}
                className="flex items-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                <FiPrinter className="mr-2" />
                Print Receipt
              </motion.button>
            </div>
          </div>
        </motion.div>

      
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8"
        >
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Purchase Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Package Information
                </h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <span className="font-medium">Package:</span> {invoice?.packageName}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Business:</span> {invoice?.businessName}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Validity:</span> {invoice?.validity}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Payment Information
                </h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <span className="font-medium">Amount Paid:</span> {invoice?.amount}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Date:</span> {invoice?.purchaseDate}
                  </p>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Invoice ID:</span>
                    <span className="text-gray-700 mr-2">{invoice?.invoiceId}</span>
                    <button
                      onClick={copyToClipboard}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                Included Features
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {invoice?.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <span className="text-green-500 mt-0.5 mr-2 flex-shrink-0">
                      <FiCheckCircle />
                    </span>
                    <span className="text-gray-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

      
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-white mb-4">
              What&apos;s Next?
            </h2>
            <p className="text-blue-100 mb-6">
              Your package is now active. Here are some things you can do next:
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-white bg-opacity-20 rounded-full p-1 mr-4">
                  <span className="text-white text-lg font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">
                    Set up your business profile
                  </h3>
                  <p className="text-blue-100">
                    Complete your profile to maximize your package benefits.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-white bg-opacity-20 rounded-full p-1 mr-4">
                  <span className="text-white text-lg font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">
                    Upload your content
                  </h3>
                  <p className="text-blue-100">
                    Add images, videos, and descriptions to showcase your business.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-white bg-opacity-20 rounded-full p-1 mr-4">
                  <span className="text-white text-lg font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">
                    Explore premium features
                  </h3>
                  <p className="text-blue-100">
                    Make the most of your new package with advanced tools.
                  </p>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 w-full sm:w-auto flex items-center justify-center px-8 py-3 bg-white text-blue-600 rounded-lg font-bold shadow-lg hover:bg-gray-100 transition-colors"
            >
              Go to Dashboard <FiArrowRight className="ml-2" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}