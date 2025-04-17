// import { useWebSocket } from "@/lib/WebSocketContext";
import { motion } from "framer-motion";

export default function SuccessPage() {
  // const { notificationCount } = useWebSocket();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12 min-h-screen flex justify-center items-center"
    >
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

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
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
    </motion.div>
  );
}
