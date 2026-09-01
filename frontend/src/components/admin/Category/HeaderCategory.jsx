import { X } from "lucide-react";
import React from "react";

export default function HeaderCategory({ onClose }) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-base-300 p-5">
        <div>
          <h2 className="text-xl font-bold md:text-2xl">Add New Category</h2>

          <p className="mt-1 text-sm text-gray-500">
            Create a new category for your restaurant menu.
          </p>
        </div>

        <button onClick={onClose} className="btn btn-circle btn-ghost">
          <X size={20} />
        </button>
      </div>
    </>
  );
}
