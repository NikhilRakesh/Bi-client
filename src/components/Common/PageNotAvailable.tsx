import React from "react";
import Link from "next/link";

const PageNotAvailable: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-centerbg-gradient-to-r from-indigo-50 to-sky-50">
      <h1 className="text-4xl font-bold font-ubuntuMedium text-orange-400 mb-4">
        Page Not Available
      </h1>
      <p className="text-lg text-gray-700 mb-6 font-ubuntu">
        The page you are looking for is currently unavailable.
      </p>
      <Link href={"/login"}>
        <button className="bg-orange-400 px-3 py-1 font-ubuntuMedium rounded-md">
          Login
        </button>
      </Link>
    </div>
  );
};

export default PageNotAvailable;
