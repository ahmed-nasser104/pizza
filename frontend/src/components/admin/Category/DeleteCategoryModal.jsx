import { Trash2, X } from "lucide-react";
import toastError from "../../../utils/toast.error.js";
import { deleteCategory } from "../../../service/categoryApi.js";
import toast from "react-hot-toast";

export default function DeleteCategoryModal({
  isOpen,
  onClose,
  category,
  onDelete,
}) {
  if (!isOpen || !category) return null;
  const deleteApi = async () => {
    try {
      await deleteCategory(category._id);
      toast.success("category deleted successfully");
      onDelete(category._id);
      onClose();
    } catch (error) {
      toastError(error);
    }
  };
  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-3xl bg-base-100 p-8 shadow-2xl">
          {/* Close */}

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="btn btn-circle btn-ghost btn-sm"
            >
              <X size={18} />
            </button>
          </div>

          {/* Icon */}

          <div className="flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-error/10">
              <Trash2 className="text-error" size={45} />
            </div>
          </div>

          {/* Title */}

          <h2 className="mt-6 text-center text-3xl font-bold">
            Delete Category
          </h2>

          {/* Message */}

          <p className="mt-4 text-center text-gray-500">
            Are you sure you want to permanently delete
          </p>

          <h3 className="mt-2 text-center text-xl font-bold text-error">
            "{category.name}"
          </h3>

          <p className="mt-4 text-center text-sm text-error">
            ⚠ This action cannot be undone.
          </p>

          {/* Buttons */}

          <div className="mt-8 flex gap-4">
            <button onClick={onClose} className="btn btn-outline flex-1">
              Cancel
            </button>

            <button onClick={deleteApi} className="btn btn-error flex-1">
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
