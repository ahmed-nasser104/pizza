import { Plus } from "lucide-react";

export default function ProductHeader({ onAddProduct }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="text-slate-500">Manage your restaurant menu</p>
      </div>

      <button
        onClick={onAddProduct}
        className="btn btn-error rounded-xl text-white"
      >
        <Plus size={18} />
        Add Product
      </button>
    </div>
  );
}
