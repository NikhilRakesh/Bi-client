import { MdLocationOn } from "react-icons/md";

export default function CategoryCardSkelton() {
  return (
    <div className="md:w-80 w-full h-full font-ubuntu bg-white/10 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden flex md:flex-col relative transform transition-transform duration-300 animate-pulse">
      <div className="relative flex-1">
        {/* Image Skeleton */}
        <div className="md:w-full w-36 md:h-48 h-full bg-gray-300 rounded-t-lg" />
        
      </div>

      <div className="p-4 flex-1 flex flex-col gap-3">
        {/* Title Skeleton */}
        <h2 className="text-[20px] font-ubuntuMedium font-bold text-gray-800 truncate z-10 bg-gray-400 w-32 h-5 rounded" />

        <div className="flex justify-between items-center">
          {/* Location Skeleton */}
          <div className="flex items-center gap-2">
            <MdLocationOn className="text-gray-600" size={18} />
            <div className="bg-gray-400 w-24 h-4 rounded" />
          </div>

          {/* Enquiry Icon Skeleton */}
          <div className="flex gap-1 items-center cursor-pointer">
            <div className="bg-gray-300 w-8 h-8 rounded-full" />
          </div>
        </div>

        {/* Category Tags Skeleton */}
        <div className="mb-2 mt-2 flex gap-2">
          <div className="bg-gray-300 w-16 h-5 rounded" />
          <div className="bg-gray-300 w-16 h-5 rounded" />
          <div className="bg-gray-300 w-16 h-5 rounded" />
        </div>

        {/* Button Skeleton */}
        <div className="flex gap-2 z-10 mt-auto">
          <div className="bg-gray-500 w-full h-10 rounded-md" />
          <div className="bg-gray-100 w-full h-10 rounded-md" />
        </div>
      </div>
    </div>
  );
}
