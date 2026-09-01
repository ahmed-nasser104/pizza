import { FaTrash } from "react-icons/fa";
import { useCartStore } from "../../store/store.js";
import { deleteCartItemApi } from "../../service/catApi.js";
import toastError from "../../utils/toast.error.js";
import toast from "react-hot-toast";

export default function CartItem({ products }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore();
  const trashHandler = async (productId) => {
    try {
      const responce = await deleteCartItemApi(productId);
      removeFromCart(productId);
      toast.success("🍕 Item removed from your cart!");
    } catch (error) {
      toastError(error);
    }
  };
  return (
    <>
      {products
        .filter((el) => el.product)
        .map((el) => {
          return (
            <div
              key={el._id}
              className="flex gap-4 bg-base-200 rounded-2xl p-3 shadow"
            >
              <img
                src={el.product.image}
                alt="pizza"
                className="w-24 h-24 rounded-xl object-cover"
              />

              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h2 className="font-bold text-lg">
                      {el.product.ProductName}
                    </h2>
                  </div>

                  <button
                    onClick={() => trashHandler(el.product._id)}
                    className="btn btn-circle btn-error btn-sm"
                  >
                    <FaTrash />
                  </button>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xl font-bold text-primary">
                    ${el.product.price * el.quantity}
                  </span>

                  <div className="join">
                    <button
                      onClick={() => decreaseQuantity(el.product._id)}
                      className="join-item btn"
                    >
                      -
                    </button>

                    <button className="join-item btn btn-disabled">
                      {el.quantity}
                    </button>

                    <button
                      onClick={() => increaseQuantity(el.product._id)}
                      className="join-item btn"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
