import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BusinessProfileSkeleton() {
  return (
    <div className="bg-white p-8">
      <Skeleton height={40} width="50%" className="mb-8" />

      {/* Profile Header */}
      <div className="flex items-center space-x-6 mt-8 group">
        <Skeleton circle width={96} height={96} />
        <div>
          <Skeleton width="80%" height={30} className="bg-gray-300" />
          <Skeleton width="60%" height={20} />
        </div>
      </div>

      <div className="mt-6 text-lg flex text-gray-100 space-x-8">
        <Skeleton width={200} height={20} />
        <Skeleton width={200} height={20} />
        <Skeleton width={200} height={20} />
        <Skeleton width={200} height={20} />
      </div>

      {/* Profile Visits, Products, and Services */}
      <div className="bg-gray-300 shadow-2xl rounded-2xl p-8 mt-8 font-ubuntu">
        <div className="flex gap-5">
          {/* Profile Visits Over Time */}
          <div className="flex-1">
            <Skeleton height={30} width="60%" />
            <Skeleton height={20} width="80%" />
            <Skeleton height={200} />
          </div>

          {/* Most Searched Products */}
          <div className="flex-1">
            <Skeleton height={30} width="60%" />
            <div className="flex flex-col space-y-4 h-[250px] overflow-y-auto custom-scrollbar">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-white/70 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <Skeleton width="60%" height={20} />
                        <Skeleton width="30%" height={20} />
                      </div>
                      <div className="mt-2 flex items-center text-gray-500 text-xs">
                        <Skeleton circle width={15} height={15} />
                        <Skeleton width={40} height={10} />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Skeleton for Search, Time, and Profile Score */}
        <div className="bg-gray-100 shadow-md rounded-lg px-6 font-ubuntu mt-8">
          <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-8">
            <div className="flex items-center space-x-4">
              <Skeleton circle width={30} height={30} />
              <div>
                <Skeleton width="80%" height={20} />
                <Skeleton width="60%" height={15} />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Skeleton circle width={30} height={30} />
              <div>
                <Skeleton width="80%" height={20} />
                <Skeleton width="60%" height={15} />
              </div>
            </div>

            <div className="flex items-center space-x-6 md:space-x-4">
              <Skeleton width={80} height={30} />
              <div>
                <Skeleton width="80%" height={20} />
                <Skeleton width="60%" height={15} />
              </div>
              <div>
                <Skeleton width="60%" height={40} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products and Services Skeleton */}
      <div className="mt-8 w-full">
        <Skeleton width="60%" height={30} />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="border border-gray-300 bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300"
              >
                <Skeleton width="100%" height={120} />
                <Skeleton width="80%" height={20} className="mt-4" />
                <Skeleton width="60%" height={15} />
                <Skeleton width="60%" height={20} className="mt-4" />
              </div>
            ))}
        </div>
      </div>

      <div className="mt-8">
        <Skeleton width="60%" height={30} />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="border border-gray-300 bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300"
              >
                <Skeleton width="100%" height={120} />
                <Skeleton width="80%" height={20} className="mt-4" />
                <Skeleton width="60%" height={15} />
                <Skeleton width="60%" height={20} className="mt-4" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
