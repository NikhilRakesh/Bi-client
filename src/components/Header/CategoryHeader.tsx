import HeaderSearchBar from "./HeaderSearchBar";
import styles from "./Header.module.css";
import { MdLocationOn } from "react-icons/md";
import Link from "next/link";
import SmSearchBar from "./smSearchBar";
import LoginProfileButon from "../Common/LoginProfileButon";

interface data {
  city: string;
  category: string;
}

export default function CategoryHeader({ city, category }: data) {
  return (
    <div className="fixed top-0 left-0 right-0 px-2  bg-white z-10 md:pb-0 pb-8 md:border-b-2">
      <div className="flex  items-center sm:relative md:static justify-between py-4 font-ubuntu  w-full  ">
        <Link href={"/"}>
          <div className="cursor-pointer ">
            <img
              className="md:w-8 w-7 h-7 "
              src="/Brandsinfo-logo.png"
              alt="brandsinfo-logo"
            />
          </div>
        </Link>
        <div className="sm:absolute hidden  md:static sm:right-0.5 md:right-0 w-full top-[60px]  md:top-0 gap-2 border px-7 md:flex items-center justify-between rounded-3xl sm:py-1 md:py-2 shadow-xl text-sm md:w-fit ">
          <div className="relative hidden w-full md:block cursor-pointer hover:bg-gray-100 p-1">
            <div
              className={`${styles.myshine_bg} bg-green-400 absolute top-[-14px] text-xs italic px-4 left-6`}
            >
              <p className={` text-white`}>Free</p>
            </div>
            <Link href="/business-listing">
              <div className="flex items-center gap-1">
                <img
                  className="w-4"
                  src="/stats.png"
                  alt="list your business"
                />
                <h1 className="text-black">List Your Business</h1>
              </div>
            </Link>
          </div>
          <HeaderSearchBar category={category} city={city} />
        </div>
        <div className="sm:absolute  md:static sm:right-0.5 flex md:right-0 w-full  top-[55px] py-1 px-1 h-9 md:top-0  border border-[#f28b21] rounded-md md:hidden  shadow-md text-sm md:w-6/12">
          <SmSearchBar category={category} city={city} />
        </div>
        <div className="flex md:gap-1 gap-3 sm:mb-2 md:mb-0">
          <div className="flex gap-5 md:hidden">
            <div className="flex gap-1 items-center cursor-pointer  hover:bg-gray-100 p-1 rounded-lg">
              <MdLocationOn className="text-black" />
              <h1 className="text-black font-ubuntu text-sm">{city}</h1>
            </div>
          </div>
          <LoginProfileButon />
        </div>
      </div>
    </div>
  );
}
