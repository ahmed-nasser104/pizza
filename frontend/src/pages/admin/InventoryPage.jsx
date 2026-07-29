import { Boxes, Plus, AlertTriangle } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import StatusBadge from "../../components/ui/StatusBadge";

const inventory = [
  {
    name: "Mozzarella",
    stock: "24 kg",
    status: "In Stock",
    variant: "success",
  },
  {
    name: "Pepperoni",
    stock: "6 kg",
    status: "Low Stock",
    variant: "warning",
  },
  {
    name: "Olives",
    stock: "0 kg",
    status: "Out of Stock",
    variant: "danger",
  },
];

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Inventory"
        description="Monitor ingredient levels and restocking needs"
        icon={Boxes}
        action={
          <button className="btn btn-primary btn-sm">
            <Plus size={16} />
            Add Item
          </button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {inventory.map((item) => (
          <div
            key={item.name}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">
                {item.name}
              </h2>
              <StatusBadge status={item.status} variant={item.variant} />
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
              <AlertTriangle size={16} className="text-amber-500" />
              <span>Current stock: {item.stock}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
