const ReviewSkeleton = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg">
      <div className="w-1/3 h-6 bg-gray-300 animate-pulse mb-4 mx-auto" />

      <div className="w-2/3 h-4 bg-gray-300 animate-pulse mb-4 mx-auto" />

      <div className="mb-4 flex justify-center items-center space-x-1">
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((_) => (
            <div key={_}>
              <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="w-full h-24 bg-gray-300 animate-pulse rounded-md" />
      </div>

      <div className="mb-4">
        <div className="w-full h-10 bg-gray-300 animate-pulse rounded-md mb-2" />
        <div className="w-2/3 h-4 bg-gray-300 animate-pulse" />
      </div>

      <div className="flex space-x-4 justify-center">
        <div className="w-28 h-10 bg-gray-300 animate-pulse rounded-lg" />
        <div className="w-28 h-10 bg-blue-300 animate-pulse rounded-lg" />
      </div>
    </div>
  );
};

export default ReviewSkeleton;
