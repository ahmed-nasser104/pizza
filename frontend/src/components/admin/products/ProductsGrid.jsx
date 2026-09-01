import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../../../service/productApi.js";

export default function ProductsGrid() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getApi = async () => {
      const responce = await getProducts();
      setProducts(responce.data.data);
    };
    getApi();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 2xl:grid-cols-4">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-base-300 py-14 sm:py-20 px-4 text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-700">
            No product added yet
          </h1>
        </div>
      )}
    </div>
  );
}
