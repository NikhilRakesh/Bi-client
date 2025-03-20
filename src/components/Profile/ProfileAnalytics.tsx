// "use client";
// import { FaClock, FaSearch } from "react-icons/fa";
// import ProfileGraph from "./ProfileGraph";
// import { BsQuestionCircleFill } from "react-icons/bs";
// import ProfileScore from "./ProfileScore";

// export interface ProfileAnalyticsProps {
//   business: {
//     name: string;
//     type: string;
//     logo: string;
//     address: string;
//     phone: string;
//     email: string;
//     website: string;
//     viewCount: number;
//     profileScore: number;
//     profileVisitsData: { name: string; visits: number }[];
//     products: {
//       id: string;
//       name: string;
//       price: string;
//       searchCount: number;
//     }[];
//     enquiries: number;
//     video: string;
//   };
// }

// export default function ProfileAnalytics({ Business }: ProfileAnalyticsProps) {
//   return (
//     <div className="bg-gradient-to-r from-indigo-50 to-sky-50 bg-white shadow-2xl rounded-2xl p-8 mt-8 font-ubuntu">
//       <div className="flex gap-5">
//         <div className="flex-1">
//           <h2 className="text-xl font-semibold font-ubuntuMedium text-gray-700">
//             Profile Visits Over Time
//           </h2>

//           <div className="mt-2 text-lg font-medium text-gray-500">
//             <span>Total Visits: </span>
//             <span className="text-orange-500">{business.viewCount}</span>{" "}
//           </div>

//           <ProfileGraph business={business} />
//         </div>

//         <div className="flex-1">
//           <h2 className="text-xl font-semibold font-ubuntuMedium text-gray-700 mb-4">
//             Most Searched Products
//           </h2>
//           <div className="flex flex-col space-y-4 h-[250px] overflow-y-auto custom-scrollbar">
//             {business.products
//               .sort((a, b) => b.searchCount - a.searchCount)
//               .map((product) => (
//                 <div
//                   key={product.id}
//                   className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102"
//                 >
//                   <div className="p-4">
//                     <div className="flex items-center justify-between">
//                       <h3 className="text-md font-semibold text-gray-800">
//                         {product.name}
//                       </h3>
//                       <span className="text-xs text-gray-500">
//                         {product.price}
//                       </span>
//                     </div>
//                     <div className="mt-2 flex items-center text-gray-500 text-xs">
//                       <FaSearch className="mr-2 text-yellow-500" />
//                       <span>{product.searchCount} Searches</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>

//       <div className="bg-gradient-to-r from-indigo-100 to-sky-100 bg-white shadow-md rounded-lg px-6 font-ubuntu mt-8">
//         <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-8">
//           <div className="flex items-center space-x-4">
//             <FaSearch className="text-indigo-600 text-3xl" />
//             <div>
//               <p className="text-xl font-semibold text-gray-800">12</p>
//               <p className="text-sm text-gray-500">
//                 Rate of Appearing in Search Results
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <FaClock className="text-indigo-600 text-3xl" />
//             <div>
//               <p className="text-xl font-semibold text-gray-800">1 min</p>
//               <p className="text-sm text-gray-500">
//                 Average Time Spent on Profile
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <BsQuestionCircleFill className="text-indigo-600 text-3xl" />
//             <div>
//               <p className="text-xl font-semibold text-gray-800">35</p>
//               <p className="text-sm text-gray-500">Number of Enquiries</p>
//             </div>
//           </div>

//           <div className="flex items-center space-x-6 md:space-x-4">
//             <ProfileScore score={business.profileScore} />
//             <div>
//               <h1 className="text-xl font-semibold font-ubuntuMedium text-gray-800">
//                 Increase score for visibility
//               </h1>
//               <p className="text-gray-500">
//                 Boost your visibility by increasing your profile score.
//               </p>
//             </div>
//             <div>
//               <button className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300">
//                 Increase Score
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
