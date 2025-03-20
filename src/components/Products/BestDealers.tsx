import ClientScrollNavigation from "./ClientScrollNavigation";

interface Product {
  name: string;
  image: string;
  tittle: string;
}

interface BestDealersProbs {
  Products:Product[]
  city:string;
}



const BestDealers : React.FC<BestDealersProbs> = ({Products,city})=> {
  return (
    <div className="py-3">
      <h2 className="text-3xl font-ubuntuMedium text-gray-800 mb-3 ">
        Best Dealers
      </h2>
      <ClientScrollNavigation Products={Products} city={city} />
    </div>
  );
}
export default  BestDealers