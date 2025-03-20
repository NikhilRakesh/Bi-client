export default function ReviewListSkelton(){
    return(
        <div className="px-6 py-3 border-b border-gray-300 animate-pulse w-full">
        <div className="flex gap-2 pb-2">
          <div className="bg-gray-300 h-6 w-16 rounded-md"></div>
          <div className="bg-gray-300 h-6 w-32 rounded-md"></div>
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex space-x-1">
            <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
            <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
            <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
            <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
            <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
          </div>
        </div>
        <div className="bg-gray-300 h-4 w-full mb-3 rounded-md"></div>
        <div className="flex space-x-2">
          <div className="bg-gray-300 h-16 w-16 rounded-md"></div>
          <div className="bg-gray-300 h-16 w-16 rounded-md"></div>
          <div className="bg-gray-300 h-16 w-16 rounded-md"></div>
        </div>
      </div>
    )
    
}