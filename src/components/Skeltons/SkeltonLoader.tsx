import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="md:px-7 px-4  w-full overflow-y-auto custom-scrollbar flex flex-col justify-center items-center">
      <div className="md:w-4/12">
        <div className="mt-7">
          <div className="relative w-full animate-pulse">
            <div className="my-4">
              <div className="flex gap-5 py-4 px-2 w-full overflow-x-auto">
                <div className="flex-shrink-0 w-96 border border-gray-300 bg-white p-3 rounded-lg flex items-center gap-3 shadow-lg">
                  <div className="w-6/12 h-32 bg-gray-300 rounded-lg"></div>
                  <div className="w-6/12 h-full flex flex-col justify-center text-left">
                    <div className="h-6 bg-gray-300 rounded-md mb-2"></div>
                    <div className="h-6 bg-gray-300 rounded-md mb-2"></div>
                    <div className="h-6 bg-gray-300 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skeleton for Continue Button */}

        {/* Skeleton for Title */}
        <div className="animate-pulse mb-4">
          {/* Skeleton for Input Field */}
          <div className="border border-gray-300 rounded-md flex py-1 px-1 mb-4">
            <div className="w-full h-10 bg-gray-300 rounded-md"></div>
          </div>

          {/* Skeleton for Action Button */}

          {/* Skeleton for Description */}
          <div className="mt-4">
            <div className="h-12 bg-gray-300 rounded-md mb-2"></div>
            <div className="h-12 bg-gray-300 rounded-md mb-2"></div>
          </div>
        </div>

        {/* Skeleton for Service Name & Price Input */}
        <form className="space-y-3 font-ubuntu mt-4 animate-pulse">
          <div className="flex gap-2">
            <div className="w-1/2">
              <div className="h-10 bg-gray-300 rounded-md"></div>
            </div>
            <div className="w-1/2 ">
              <div className="h-10 bg-gray-300 rounded-md"></div>
            </div>
          </div>

          {/* Skeleton for Description Textarea */}
          <div className="flex w-full gap-2 justify-between h-12">
            <div className="w-8/12">
              <div className="h-12 bg-gray-300 rounded-md"></div>
            </div>

            {/* Skeleton for Upload Button */}
            <div className="relative w-4/12">
              <div className="w-full py-2 px-2 h-12 bg-gray-300 rounded-md"></div>
            </div>
          </div>

          {/* Skeleton for Add Service Button */}
          <div className="w-full h-10 bg-gray-300 rounded-md mt-4"></div>
        </form>
      </div>
    </div>
  );
};

export default SkeletonLoader;
