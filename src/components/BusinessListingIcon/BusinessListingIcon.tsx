import styles from "./BusinessListingIcon.module.css";
import Link from "next/link";

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 1000,
  };
}

export default function BusinessListing() {
  return (
    <div className="z-20 rounded-tl-lg rounded-tr-xl fixed -rotate-90 bottom-0 right-[-50px] transform -translate-y-[100px] bg-gray-800 ">
      <div className="relative md:hidden block top-[10px] cursor-pointer  p-1">
        <div
          className={`${styles.myshine_bg} bg-green-400 absolute top-[-14px] text-xs italic px-4 left-10`}
        >
          <p className={` text-white font-ubuntu`}>Free</p>
        </div>
        <Link href="/business-listing">
          <div className="flex items-center gap-1 pb-4 ">
            <h1 className="text-gray-100 font-ubuntuMedium text-sm px-2">
              List Your Business
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
}
