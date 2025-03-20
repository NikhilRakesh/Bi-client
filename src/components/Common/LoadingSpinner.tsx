import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center bg-transparent backdrop-blur-[1.5px] z-50 absolute  inset-0 ">
      <div className=" relative">
        <div className="w-10 h-10 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin border-t-orange-500"></div>
        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-orange-500 text-lg font-semibold">
          Loading...
        </div> */}
      </div>
    </div>
  );
};

export default LoadingSpinner;
