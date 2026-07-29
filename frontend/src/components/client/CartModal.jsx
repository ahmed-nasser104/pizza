import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useCartModalStore, useCartStore } from "../../store/store.js";
import CartItem from "./CartItem.jsx";

export default function CartModal() {
  const { isOpen, closeCart } = useCartModalStore();
  const { cart } = useCartStore();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.3,
            }}
            className="fixed right-0 top-0 z-50 h-screen w-full max-w-md bg-base-100 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b p-5">
              <h2 className="text-2xl font-bold">Your Cart 🍕</h2>

              <button onClick={closeCart} className="btn btn-circle btn-sm">
                <IoClose />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5">
              <div className="text-center opacity-60 mt-20">
                {cart.length != 0 ? (
                  <CartItem products={cart} />
                ) : (
                  "Cart is Empty"
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t p-5 space-y-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>

                <span>$0.00</span>
              </div>

              <button className="btn btn-primary w-full">Checkout</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
