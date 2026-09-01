import { Pencil, X } from "lucide-react";

export default function HeaderProductE({ onClose }) {
  return (
    <div className="flex items-center justify-between border-b border-base-300 px-4 py-4 sm:px-6 sm:py-5">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-warning/10 p-2 text-warning">
          <Pencil size={20} />
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-800">
            Edit Product
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Update product details
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="btn btn-sm btn-circle btn-ghost"
      >
        <X size={18} />
      </button>
    </div>
  );
}
