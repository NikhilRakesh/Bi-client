import PricingPage from "@/components/package/PricingPage";
import { useRouter } from "next/navigation";

export default function BPlan() {
  const router = useRouter()
  return (
    <div className="absolute w-full h-screen">
      <div className="absolute md:block hidden top-6 right-10">
        <button
        onClick={()=>router.push('/profile')}
         className="backdrop-blur-md  bg-white text-black font-semibold text-lg px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-orange-500 transition duration-300 ease-in-out">
          Skip
        </button>
      </div>
      <div className="absolute md:hidden block top-3 right-2">
        <button
        onClick={()=>router.push('/profile')}
         className="backdrop-blur-md  bg-white text-black font-semibold text-sm px-5 py-2 rounded-lg shadow-md hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-orange-500 transition duration-300 ease-in-out">
          Skip
        </button>
      </div>
      <PricingPage />
    </div>
  );
}
