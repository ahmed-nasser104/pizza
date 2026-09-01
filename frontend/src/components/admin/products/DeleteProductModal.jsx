import toast from "react-hot-toast";
import { TriangleAlert } from "lucide-react";
import toastError from "../../../utils/toast.error.js";
import { deleteProductApi } from "../../../service/productApi.js";
import { useCartStore } from "../../../store/store.js";

export default function DeleteProductModal({ isOpen, onClose, product }) {
  if (!isOpen) return null;

  const { removeFromCart } = useCartStore();
  const deleteHandler = async () => {
    try {
      await deleteProductApi(product._id);
      onClose();
      removeFromCart(product._id);
      toast.success("Product deleted successfully");
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-4">
      <div className="flex min-h-full items-center justify-center">
        <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-base-100 p-6 text-center shadow-2xl sm:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-error/10 text-error">
            <TriangleAlert size={28} />
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-800">
            Delete Product?
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-slate-700">
              {product?.ProductName}
            </span>
            ? This action cannot be undone.
          </p>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline flex-1 rounded-xl"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={deleteHandler}
              className="btn btn-error flex-1 rounded-xl"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
