import { Pencil, Trash2, Star, PackageCheck, PackageX } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}

      <div className="relative h-56 overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.ProductName}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <span className="badge badge-error absolute left-4 top-4 rounded-lg">
          {product.category.name}
        </span>
      </div>

      {/* Body */}

      <div className="space-y-4 p-5">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            {product.ProductName}
          </h2>

          <p className="mt-1 line-clamp-2 text-sm text-slate-500">
            {product.description}
          </p>
        </div>

        {/* Rating */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star size={17} className="fill-yellow-400 text-yellow-400" />

            <span className="font-semibold">{product.rating}</span>
          </div>

          <span className="text-sm text-slate-500">
            {product.orders} Orders
          </span>
        </div>

        {/* Price */}

        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-red-500">${product.price}</h3>

          {product.available ? (
            <span className="badge badge-success gap-2">
              <PackageCheck size={15} />
              Available
            </span>
          ) : (
            <span className="badge badge-error gap-2">
              <PackageX size={15} />
              Out of Stock
            </span>
          )}
        </div>

        {/* Actions */}

        <div className="flex gap-3 pt-2">
          <button className="btn btn-outline btn-warning flex-1 rounded-xl">
            <Pencil size={18} />
            Edit
          </button>

          <button className="btn btn-outline btn-error flex-1 rounded-xl">
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
