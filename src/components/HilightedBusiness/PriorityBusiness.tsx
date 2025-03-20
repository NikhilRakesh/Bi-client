import { baseurl } from "@/lib/api";
import Link from "next/link";
import React from "react";

interface gencat {
  image: string;
  name: string;
  tittle: string;
}
interface PriorityBusinessProps {
  Gencat: gencat[];
  city: string;
}

const PriorityBusiness: React.FC<PriorityBusinessProps> = ({
  Gencat,
  city,
}) => {
  return (
    <div className="h-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-1 h-full">
        {Gencat?.map((category, index) => (
          <div
            key={index}
            className="bg-white cursor-pointer shadow-lg relative rounded-lg overflow-hidden group transition duration-300"
          >
            <Link href={`/${city}/${category.name.replace(/\s+/g, '-')}`}>
              <img
                src={baseurl + category.image}
                alt={category.name}
                className="object-cover h-full w-full transform group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition duration-500"></div>

              <div className="absolute bottom-0 z-10 w-full p-1 text-center bg-white bg-opacity-90 group-hover:bg-opacity-90 transition duration-300">
                <h3 className="font-ubuntuMedium text-xs text-gray-700 group-hover:text-gray-900 transform group-hover:translate-y-[-5px] transition duration-300">
                  {category.name}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PriorityBusiness;
