import { CiSearch } from "react-icons/ci";


export default function Header() {
  return (
    <div className="flex justify-between items-center mb-5">
      <div className="flex items-center gap-6 text-sm font-medium text-gray-600 w-6/12">
        <span className="font-bold text-xl text-gray-800">Logo</span>
        <button className="hover:text-black">All</button>
        <button className="hover:text-black">News</button>
        <button className="hover:text-black">Exclusives</button>
        <button className="hover:text-black">Guides</button>
        <button className="hover:text-black">Recommended</button>
      </div>
      <div className="flex gap-4 items-center justify-end w-6/12 ">
        <span className="text-sm text-gray-600">En ▾</span>
        <div className=" flex w-6/12 items-center relative ">
          <input
            type="text"
            placeholder="Article name, tag, category... "
            className="px-3 py-2 rounded-xl border text-sm w-full bg-[#e5ebf2]"
          />
          <CiSearch className="absolute right-3" />
        </div>
      </div>
    </div>
  );
}
