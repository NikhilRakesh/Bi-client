export default function EnquiresListSkelton() {
  return (
    <div className="flex flex-col gap-5 px-2 md:px-10">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-pulse w-full"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="bg-gray-300 h-6 w-1/3 rounded-md"></div>
          </div>

          <div className="flex justify-between items-center text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="bg-gray-300 w-8 h-8 rounded-full"></div>
              <div className="bg-gray-300 w-24 h-4 rounded-md"></div>
            </div>
            <div className="md:flex items-center space-x-2 hidden">
              <div className="bg-gray-300 w-16 h-4 rounded-md"></div>
              <div className="bg-gray-300 w-16 h-4 rounded-md"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-gray-300 w-16 h-4 rounded-md"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
