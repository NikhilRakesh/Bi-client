export default function ProfileSkeleton() {
    return (
      <div className="min-h-screen bg-gray-100 p-8 font-ubuntu">
        <div className="flex justify-between items-center mb-8 animate-pulse">
          <div className="w-32 h-12 bg-gray-300 rounded-lg"></div> 
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
  
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-pulse">
          <div className="w-48 h-8 bg-gray-300 rounded mb-4"></div> 
          <div className="w-32 h-6 bg-gray-300 rounded"></div> 
        </div>
  
        <div className="flex justify-end mb-8 animate-pulse">
          <div className="w-48 h-12 bg-gray-300 rounded-lg"></div>
        </div>
  
        <div className="space-y-6">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md p-6 animate-pulse"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="w-48 h-6 bg-gray-300 rounded mb-2"></div> 
                  <div className="w-32 h-4 bg-gray-300 rounded"></div> 
                </div>
                <div>
                  <div className="w-32 h-4 bg-gray-300 rounded mb-2"></div> 
                  <div className="w-48 h-4 bg-gray-300 rounded"></div> 
                </div>
              </div>
              <div className="w-40 h-6 bg-gray-300 rounded"></div> 
            </div>
          ))}
        </div>
      </div>
    );
  }