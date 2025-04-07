"use client";
import { baseurl } from "@/lib/api";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import ProductDetailPage from "../Ecommerce/ProductDetailPage";

interface Product {
  id: number;
  name: string;
  description: string;
  product_images: { image: string }[];
  price: string;
  sub_cat: string;
  searched: number;
}

interface CardProps {
  data: Product;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ data, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white cursor-pointer border w-52 md:w-52 border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform flex-shrink-0"
    >
      <div className="relative">
        <img
          src={baseurl + data?.product_images[0]?.image}
          alt={data.name}
          className="w-full h-48 object-cover rounded-t-xl transition-transform duration-500 ease-in-out transform hover:scale-105"
        />
        <div className="text-sm text-gray-200 py-1 px-2 absolute bg-gray-800 top-0 bg-opacity-50 w-full">
          <span> ₹{data.price}</span>
        </div>
      </div>

      <div className="px-2 py-2">
        <h3 className="text-xl font-semibold text-gray-800 truncate">
          {data.name}
        </h3>
        <p className="text-sm text-gray-600 mt-2 truncate">
          {data.description}
        </p>
      </div>
    </div>
  );
};

interface ProductCardProfileProps {
  productData: Product[];
}

export default function ProductServiceCard({
  productData,
}: ProductCardProfileProps) {
  const [Product, setProduct] = useState<Product | null>(null);
  const [openModal, setOpenModal] = useState(false);

  function viewProduct(product: Product) {
    setProduct(product);
    setOpenModal(true);
  }

  function closeModal() {
    setOpenModal(false);
    setProduct(null);
  }

  return (
    <div className="w-full h-full">
      <h2 className="text-2xl font-semibold text-gray-800 font-ubuntuMedium">
        Products
      </h2>
      <div className="flex gap-8 mt-4 p-2 overflow-x-auto custom-scrollbar whitespace-nowrap">
        {productData.map((product) => (
          <Card
            key={product.id}
            data={product}
            onClick={() => viewProduct(product)}
          />
        ))}
      </div>
      <Toaster />
      {openModal && Product && <ProductDetailPage onClose={closeModal} itemdata={Product} />}
    </div>
  );
}
