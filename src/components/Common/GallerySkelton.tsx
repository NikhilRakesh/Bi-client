'use client'

export default function GallerySkelton() {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 h-screen w-full">
      <div className="bg-white p-6 rounded-lg w-8/12">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            <div className="w-24 h-6 bg-gray-300 animate-pulse rounded-md"></div>
          </h2>
          <button className="text-red-600">
            <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-full"></div>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4 overflow-y-scroll custom-scrollbar h-[600px]">
          {Array(9)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="relative w-full h-40 bg-gray-200 rounded-md animate-pulse"
              >
                <div className="w-full h-full bg-gray-300 rounded-md"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
