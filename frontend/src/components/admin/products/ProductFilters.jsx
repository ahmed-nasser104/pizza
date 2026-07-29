import { Search } from "lucide-react";

export default function ProductFilters() {
  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-4">
        <label className="input input-bordered flex items-center gap-2 rounded-xl">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="grow"
          />
        </label>

        <select className="select select-bordered rounded-xl">
          <option>All Categories</option>
          <option>Pizza</option>
          <option>Burger</option>
          <option>Drinks</option>
          <option>Desserts</option>
        </select>

        <select className="select select-bordered rounded-xl">
          <option>All Status</option>
          <option>Available</option>
          <option>Out of Stock</option>
        </select>

        <select className="select select-bordered rounded-xl">
          <option>Newest</option>
          <option>Oldest</option>
          <option>Price ↑</option>
          <option>Price ↓</option>
        </select>
      </div>
    </div>
  );
}
