import { baseurl } from "@/lib/api";

interface city {
  image: string;
  name: string;
  tittle: string;
}

interface TopCitiesProps {
  Cities: city[];
}

const TopCities: React.FC<TopCitiesProps> = ({ Cities }) => {
  return (
    <div className="py-3">
      <h2 className="text-3xl font-ubuntuMedium text-gray-800 mb-3">
        Explore Top Cities
      </h2>
      <div className="flex gap-4 px-3 overflow-x-auto md:flex-wrap md:justify-center  scrollbar-hidden">
        {Cities?.map((city, index) => (
          <div
            key={index}
            className={`relative group flex-shrink-0 w-48 h-60 rounded-lg overflow-hidden cursor-pointer shadow-lg transform transition-all duration-300 ${
              city.name === "Tiruppur"
                ? "bg-[#f28b21] text-white"
                : "bg-[#f28b21] text-gray-700"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
            <img
              src={baseurl + city.image}
              alt={city.name}
              className="object-cover w-full h-full group-hover:opacity-80  group-hover:scale-110 transition-transform  duration-300"
            />
            {city.name === "Tiruppur" && (
              <div className="absolute top-0 text-sm font-ubuntu text-center w-full">
                <p className="text-gray-300 py-2 italic shine-text-home">We Are Here Offically</p>
              </div>
            )}  
            <div
              className={`absolute bottom-0 w-full p-4 bg-gradient-to-t ${
                city.name === "Tiruppur" ? "from-[#e19951]" : "from-gray-800"
              } text-white transition-opacity duration-300`}
            >
              <span className="font-ubuntu">{city.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCities;
