import { useEffect, useState } from "react";
import Navbar from "../../components/client/Navbar";
import SplitText from "../../components/client/SplitText";
import PizzaCard from "../../components/client/Cards";
import { getUserProducts } from "../../service/productApi.js";

export default function ClientPage() {
  const [products, setProducts] = useState([]);
  const [showCards, setShowCards] = useState(false);
  useEffect(() => {
    const dataApi = async () => {
      try {
        const response = await getUserProducts();
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    dataApi();
  }, []);

  return (
    <div className="flex flex-col gap-8 px-5 py-3">
      <Navbar />

      <SplitText
        text="Welcome to PizzaHub 🍕"
        className="text-2xl md:text-4xl lg:text-6xl pt-14 font-black text-center"
        onLetterAnimationComplete={() => setShowCards(true)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 lg:gap-9 p-10">
        {products.length != 0 ? (
          products.map((product, index) => (
            <PizzaCard
              key={product._id}
              product={product}
              index={index}
              showCards={showCards}
            />
          ))
        ) : (
          <p className="text-center text-red-800 text-2xl font-bold col-span-full">
            No Products Found
          </p>
        )}
      </div>
    </div>
  );
}
