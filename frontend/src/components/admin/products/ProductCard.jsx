import { useState } from "react";
import {
  Pencil,
  Trash2,
  Star,
  PackageCheck,
  PackageX,
  Tag,
} from "lucide-react";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";

export default function ProductCard({ product }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const outOfStock = product.Quantity == 0;

  return (
    <>
      <div className="group relative flex w-full flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-200">
        {/* Image */}
        <div className="relative h-44 sm:h-52 md:h-56 overflow-hidden bg-slate-100">
          <img
            src={product.image}
            alt={product.ProductName}
            className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
              outOfStock ? "grayscale" : ""
            }`}
          />

          {/* Gradient for legibility */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/0 to-black/10" />

          {/* Category tag */}
          <span className="absolute left-3 top-3 sm:left-4 sm:top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur-md shadow-sm">
            <Tag size={12} className="text-red-500" />
            {product.name}
          </span>

          {/* Rating */}
          <span className="absolute right-3 top-3 sm:right-4 sm:top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-slate-700 backdrop-blur-md shadow-sm">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            {product.rating}
          </span>

          {/* Out of stock ribbon */}
          {outOfStock && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="rotate-[-8deg] rounded-lg border-2 border-white bg-slate-900/80 px-4 py-1 text-sm font-bold uppercase tracking-wider text-white shadow-lg">
                Out of Stock
              </span>
            </div>
          )}

          {/* Floating title */}
          <h2 className="absolute bottom-3 left-4 right-4 truncate text-lg sm:text-xl font-bold text-white drop-shadow-sm">
            {product.ProductName}
          </h2>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 p-4 sm:p-5">
          <p className="line-clamp-2 min-h-10 text-sm text-slate-500">
            {product.description}
          </p>

          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>{product.orders} Orders</span>

            {product.isAvailable ? (
              <span className="badge badge-success gap-1.5 border-none bg-success/15 text-success">
                <PackageCheck size={14} />
                Available
              </span>
            ) : (
              <span className="badge badge-error gap-1.5 border-none bg-error/15 text-error">
                <PackageX size={14} />
                Unavailable
              </span>
            )}
          </div>

          <div className="divider my-0"></div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-xs text-slate-400">Price</p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-red-500">
                ${product.price}
              </h3>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditOpen(true)}
                className="btn btn-outline btn-warning btn-sm rounded-xl"
                aria-label="Edit product"
              >
                <Pencil size={15} />
                <span className="hidden sm:inline">Edit</span>
              </button>

              <button
                onClick={() => setIsDeleteOpen(true)}
                className="btn btn-outline btn-error btn-sm rounded-xl"
                aria-label="Delete product"
              >
                <Trash2 size={15} />
                <span className="hidden sm:inline">Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <EditProductModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        product={product}
      />

      <DeleteProductModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        product={product}
      />
    </>
  );
}
