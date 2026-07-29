import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../../../service/productApi.js";

export default function ProductsGrid() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getApi = async () => {
      const responce = await getProducts();
      setProducts(responce.data.data);
      console.log(responce);
    };
    getApi();
  }, []);

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
