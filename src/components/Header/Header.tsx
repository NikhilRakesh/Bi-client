import HeaderSearchBar from "./HeaderSearchBar";
import styles from "./Header.module.css";
import LoginProfileButon from "../Common/LoginProfileButon";
import Link from "next/link";

export default function Header({
  city,
  changeCity,
}: {
  city: string;
  changeCity: (data: string) => void;
}) {
  return (
    <div className="fixed top-0 left-0 right-0 px-2 border bg-white z-20 md:pb-0 pb-14  ">
      <div className="flex  items-center sm:relative md:static justify-between py-4 font-ubuntu  w-full  ">
        <div className="cursor-pointer">
          <img
            className="md:w-8 w-7 h-7 "
            src="/Brandsinfo-logo.png"
            alt="brandsinfo-logo"
          />
        </div>
        <div className="sm:absolute  md:static sm:right-0.5 md:right-0 md:w-fit w-full top-[60px] md:top-0 gap-2 border px-5 flex items-center justify-between rounded-3xl sm:py-1 md:py-2 shadow-xl text-sm ">
          <div className="relative w-full hidden md:block cursor-pointer hover:bg-gray-100  p-1">
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
                <h1 className="text-black ">List</h1>
                <h1 className="text-black "> Your</h1>
                <h1 className="text-black "> Business</h1>
              </div>
            </Link>
          </div>
          <HeaderSearchBar category="" city={city} changeCity={changeCity} />
        </div>
        <div className="flex gap-1">
          <LoginProfileButon />
        </div>
      </div>
    </div>
  );
}
