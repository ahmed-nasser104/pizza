import { Users, Plus } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import StatusBadge from "../../components/ui/StatusBadge";

const customers = [
  {
    name: "Ahmed Ali",
    email: "ahmed@example.com",
    orders: 12,
    spend: "$240",
    status: "VIP",
    variant: "success",
  },
  {
    name: "Mona Saleh",
    email: "mona@example.com",
    orders: 7,
    spend: "$128",
    status: "Loyal",
    variant: "info",
  },
  {
    name: "Omar Khaled",
    email: "omar@example.com",
    orders: 3,
    spend: "$54",
    status: "New",
    variant: "warning",
  },
];

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        description="Manage loyalty and customer engagement"
        icon={Users}
        action={
          <button className="btn btn-primary btn-sm">
            <Plus size={16} />
            Add Customer
          </button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {customers.map((customer) => (
          <div
            key={customer.email}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  {customer.name}
                </h2>
                <p className="text-sm text-slate-500">{customer.email}</p>
              </div>
              <StatusBadge
                status={customer.status}
                variant={customer.variant}
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-slate-400">Orders</p>
                <p className="mt-1 font-semibold text-slate-800">
                  {customer.orders}
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-slate-400">Spend</p>
                <p className="mt-1 font-semibold text-slate-800">
                  {customer.spend}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
