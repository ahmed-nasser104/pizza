import {
  ShoppingCart,
  DollarSign,
  Users,
  Pizza,
  TrendingUp,
  Clock,
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Today's Orders",
      value: "124",
      icon: ShoppingCart,
      color: "text-blue-500",
    },
    {
      title: "Total Revenue",
      value: "$2,450",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Customers",
      value: "860",
      icon: Users,
      color: "text-purple-500",
    },
    {
      title: "Products",
      value: "48",
      icon: Pizza,
      color: "text-red-500",
    },
  ];

  const orders = [
    {
      id: "#1024",
      customer: "Ahmed",
      items: "2 Pepperoni Pizza",
      status: "Preparing",
      price: "$35",
    },
    {
      id: "#1025",
      customer: "Mohamed",
      items: "1 Chicken Pizza",
      status: "Delivered",
      price: "$20",
    },
    {
      id: "#1026",
      customer: "Sara",
      items: "3 Margherita Pizza",
      status: "Pending",
      price: "$55",
    },
  ];

  return (
    <div className="space-y-6 text-black">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>

        <p className="text-slate-500 mt-1">
          Welcome back, manage your pizza restaurant easily
        </p>
      </div>

      {/* Stats */}

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-slate-500">{stat.title}</p>

                <h2 className="text-3xl font-bold mt-2">{stat.value}</h2>
              </div>

              <div className={`p-4 rounded-2xl bg-slate-100 ${stat.color}`}>
                <Icon size={28} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Section */}

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Sales */}

        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-xl">Sales Overview</h2>

            <TrendingUp className="text-green-500" />
          </div>

          <div className="h-48 flex items-end gap-4">
            {[40, 70, 50, 90, 60, 80, 100].map((height, index) => (
              <div
                key={index}
                className="flex-1 bg-red-500 rounded-t-xl transition-all hover:bg-red-600"
                style={{
                  height: `${height}%`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Order Status */}

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <h2 className="font-bold text-xl mb-5">Order Status</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Pending</span>

              <span className="badge badge-warning">12</span>
            </div>

            <div className="flex justify-between">
              <span>Preparing</span>

              <span className="badge badge-info">25</span>
            </div>

            <div className="flex justify-between">
              <span>Delivered</span>

              <span className="badge badge-success">87</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}

      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-5">
          <Clock size={22} />

          <h2 className="text-xl font-bold">Recent Orders</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Status</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>

                  <td>{order.customer}</td>

                  <td>{order.items}</td>

                  <td>
                    <span className="badge badge-outline">{order.status}</span>
                  </td>

                  <td>{order.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
