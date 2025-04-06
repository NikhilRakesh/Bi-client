import Image from "next/image";
import Link from "next/link";

import LoginButton from "../Common/LoginButton";
export default function BLHeader() {
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
        <LoginButton />
      </div>
    </div>
  );
}
