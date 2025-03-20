export default function BookMarkSkelton() {
  return (
    <div className="flex flex-wrap gap-6 px-10 mt-5">
      {[...Array(12)].map((_, index) => (
        <div
          key={index}
          className="w-64 border bg-white border-gray-300 rounded-lg overflow-hidden shadow-lg animate-pulse"
        >
          <div className="w-full h-48 bg-gray-300"></div>{" "}
          <div className="p-4">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>{" "}
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>{" "}
          </div>
        </div>
      ))}
    </div>
  );
}
