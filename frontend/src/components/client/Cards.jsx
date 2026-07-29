import { motion } from "framer-motion";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { useCartStore } from "../../store/store.js";
import { toast } from "react-hot-toast";
export default function PizzaCard({ product, index, showCards }) {
  const row = Math.floor(index / 3);
  const { addToCart } = useCartStore();
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 60,
      }}
      whileInView={
        showCards
          ? {
              opacity: 1,
              y: 0,
            }
          : {}
      }
      viewport={{
        once: true,
        amount: 0.3,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.6,
        delay: row * 0.2,
      }}
    >
      <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group">
        <figure className="relative h-60 overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <button className="btn btn-circle btn-sm absolute top-4 right-4 bg-white/90 border-none hover:bg-error hover:text-white">
            <FaHeart />
          </button>

          <div className="badge badge-error absolute top-4 left-4 px-3 py-4">
            {product.discountPercentage}% OFF
          </div>
        </figure>

        <div className="card-body">
          <div className="flex justify-between">
            <h2 className="card-title">{product.title}</h2>

            <div className="flex gap-1 items-center text-warning">
              <FaStar />
              <span>{product.rating}</span>
            </div>
          </div>

          <p className="text-base-content/70">
            {product.description.slice(0, 80)}...
          </p>

          <div className="flex gap-3 items-center mt-3">
            <span className="text-2xl font-bold text-primary">
              ${product.price}
            </span>

            <span className="line-through opacity-40">
              ${(product.price + 5).toFixed(2)}
            </span>
          </div>

          <div className="card-actions justify-between mt-4">
            <button className="btn btn-outline btn-primary">Details</button>

            <button
              onClick={() => {
                addToCart(product);
                toast.success("🍕 Item added to your cart!");
              }}
              className="btn btn-primary"
            >
              <FaShoppingCart />
              Add
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
