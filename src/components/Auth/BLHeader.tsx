import { parseCookies } from "@/lib/cookies";
import Image from "next/image";
import Link from "next/link";
import { IoPersonCircle } from "react-icons/io5";
export default function BLHeader() {
  const cookies = parseCookies();
  const access_token = cookies?.access_token;

  return (
    <div className="p-3 md:hidden border-b-2 text-3xl text-black font-ubuntuMedium text-center sm:flex justify-between items-center">
      <div>
        <Link href="/">
          <Image
            src="/Brandsinfo-logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </Link>
      </div>
      <div>
        {access_token ? (
          <Link
            href={"/login"}
            className="bg-[#f28b21] hover:bg-[#f8ac5f] px-6 py-3 font-ubuntuMedium rounded-md text-white text-center inline-block"
          >
            <p className="text-sm">Login / Sign Up</p>
          </Link>
        ) : (
          <Link href={"/profile"}>
            <IoPersonCircle className="text-[#f28b21] w-10 h-10 " />
          </Link>
        )}
      </div>
    </div>
  );
}
