import { X } from "lucide-react";
import React from "react";

export default function HeaderProduct({ onClose }) {
  return (
    <>
      {" "}
      <div className="flex items-center justify-between border-b border-base-300 p-6">
        <div>
          <h2 className="text-2xl font-bold">Add New Product</h2>

          <p className="text-sm text-gray-500 mt-1">
            Fill the information below to create a new menu item.
          </p>
        </div>

        <button onClick={onClose} className="btn btn-circle btn-ghost">
          <X size={20} />
        </button>
      </div>
    </>
  );
}
