import { motion } from "framer-motion";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { useCartStore } from "../../store/store.js";
import { toast } from "react-hot-toast";
import { addToCartApi } from "../../service/catApi.js";
import toastError from "../../utils/toast.error.js";
import { Link } from "react-router-dom";

export default function PizzaCard({ product, index, showCards }) {
  const row = Math.floor(index / 3);
  const { addToCart } = useCartStore();

  const hasDiscount = product.discount > 0;
  const originalPrice =
    hasDiscount && (product.price / (1 - product.discount / 100)).toFixed(2);
  const addToCartHandler = async () => {
    try {
      await addToCartApi(product, product._id);
      addToCart(product);
      toast.success("🍕 Item added to your cart!");
    } catch (error) {
      toastError(error);
    }
  };

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
      transition={{
        duration: 0.6,
        delay: row * 0.2,
      }}
    >
      <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group">
        <figure className="relative h-44 sm:h-52 md:h-60 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <button className="btn btn-circle btn-xs sm:btn-sm absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 border-none hover:bg-error hover:text-white">
            <FaHeart />
          </button>

          {hasDiscount && (
            <div className="badge badge-error absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 sm:px-3 py-3 sm:py-4 text-xs sm:text-sm">
              {product.discount}% OFF
            </div>
          )}
        </figure>

        <div className="card-body p-4 sm:p-6 gap-2 sm:gap-3">
          <div className="flex justify-between items-start gap-2">
            <h2 className="card-title text-base sm:text-lg md:text-xl">
              {product.ProductName}
            </h2>

            <div className="flex gap-1 items-center text-warning shrink-0 text-sm sm:text-base">
              <FaStar />
              <span>{product.rating}</span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-base-content/70">
            {product.description.slice(0, 80)}...
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3 items-center mt-2 sm:mt-3">
            <span className="text-xl sm:text-2xl font-bold text-primary">
              ${product.price}
            </span>

            {hasDiscount && (
              <span className="text-sm sm:text-base line-through opacity-40">
                ${originalPrice}
              </span>
            )}
          </div>

          <div className="card-actions flex-col sm:flex-row justify-between gap-2 sm:gap-3 mt-3 sm:mt-4">
            <Link to={`/product-details/${product._id}`}>
              <button className="btn btn-outline btn-primary btn-sm sm:btn-md w-full sm:w-auto">
                Details
              </button>
            </Link>

            <button
              onClick={addToCartHandler}
              className="btn btn-primary btn-sm sm:btn-md w-full sm:w-auto"
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
