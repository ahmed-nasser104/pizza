import { ShoppingCart, Plus, Filter } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import StatusBadge from "../../components/ui/StatusBadge";

const orders = [
  {
    id: "#1042",
    customer: "Ahmed Ali",
    item: "2 Pepperoni Pizzas",
    total: "$36",
    status: "Preparing",
    variant: "warning",
  },
  {
    id: "#1043",
    customer: "Mona Saleh",
    item: "1 Veggie Pizza",
    total: "$18",
    status: "Delivered",
    variant: "success",
  },
  {
    id: "#1044",
    customer: "Omar Khaled",
    item: "3 Margherita",
    total: "$45",
    status: "Pending",
    variant: "info",
  },
];

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description="Track customer orders and fulfillment status"
        icon={ShoppingCart}
        action={
          <div className="flex gap-2">
            <button className="btn btn-outline btn-sm">
              <Filter size={16} />
              Filter
            </button>
            <button className="btn btn-primary btn-sm">
              <Plus size={16} />
              New Order
            </button>
          </div>
        }
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="font-semibold text-slate-700">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.item}</td>
                  <td>{order.total}</td>
                  <td>
                    <StatusBadge
                      status={order.status}
                      variant={order.variant}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
