import { useMemo, useState } from "react";
import { useOrders } from "../../hooks/useOrders";
const STATUS_META = {
  pending: { label: "قيد الانتظار", badge: "badge-warning w-full" },
  preparing: { label: "بيتحضّر", badge: "badge-info w-full" },
  on_the_way: { label: "في الطريق", badge: "badge-primary w-full" },
  delivered: { label: "تم التسليم", badge: "badge-success w-full" },
  cancelled: { label: "ملغي", badge: "badge-error w-full" },
};

const formatAddress = (address) =>
  `${address.building}, ${address.street}, ${address.city}`;

const formatTime = (isoString) =>
  new Date(isoString).toLocaleTimeString("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
  });

const PAGE_SIZE = 4;

export default function OrdersPage() {
  const { orders, loading, error, refetch, changeOrderStatus } = useOrders();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updating, setUpdating] = useState(false);

  // ---------- Filtering ----------
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const customerName = o.user?.fullName || "";
      const matchesSearch =
        o._id.toLowerCase().includes(search.toLowerCase()) ||
        customerName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || o.orderStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  // ---------- Pagination ----------
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE));
  const pageOrders = filteredOrders.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  // ---------- Stats ----------
  const stats = useMemo(() => {
    const revenue = orders
      .filter((o) => o.orderStatus === "delivered")
      .reduce((sum, o) => sum + o.totalPrice, 0);
    return {
      total: orders.length,
      pending: orders.filter((o) => o.orderStatus === "pending").length,
      preparing: orders.filter((o) => o.orderStatus === "preparing").length,
      revenue,
    };
  }, [orders]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdating(true);
    try {
      await changeOrderStatus(orderId, newStatus);
      setSelectedOrder((prev) =>
        prev && prev._id === orderId
          ? { ...prev, orderStatus: newStatus }
          : prev,
      );
    } catch (err) {
      alert("فشل تحديث حالة الأوردر، حاول تاني");
    } finally {
      setUpdating(false);
    }
  };

  // ---------- Loading / Error states ----------
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-base-200 p-4">
        <div role="alert" className="alert alert-error max-w-md">
          <span>{error}</span>
        </div>
        <button className="btn btn-primary" onClick={refetch}>
          حاول تاني
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-3 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">الأوردرات</h1>
            <p className="text-sm text-base-content/60">
              متابعة وإدارة أوردرات المطعم أول بأول
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="stats stats-vertical w-full shadow sm:stats-horizontal">
          <div className="stat">
            <div className="stat-title">إجمالي الأوردرات</div>
            <div className="stat-value text-primary">{stats.total}</div>
          </div>
          <div className="stat">
            <div className="stat-title">قيد الانتظار</div>
            <div className="stat-value text-warning">{stats.pending}</div>
          </div>
          <div className="stat">
            <div className="stat-title">بيتحضّر دلوقتي</div>
            <div className="stat-value text-info">{stats.preparing}</div>
          </div>
          <div className="stat">
            <div className="stat-title">الإيرادات (المُسلَّم)</div>
            <div className="stat-value">{stats.revenue} EGP</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 rounded-box bg-base-100 p-4 shadow sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="دور برقم الأوردر أو اسم العميل..."
            className="input input-bordered w-full sm:max-w-xs"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <select
            className="select select-bordered w-full sm:w-56"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="all">كل الحالات</option>
            {Object.entries(STATUS_META).map(([key, meta]) => (
              <option key={key} value={key}>
                {meta.label}
              </option>
            ))}
          </select>
        </div>

        {/* Orders — Table (md+) */}
        <div className="hidden overflow-x-auto rounded-box bg-base-100 shadow md:block">
          <table className="table">
            <thead>
              <tr>
                <th>رقم الأوردر</th>
                <th>العميل</th>
                <th>الإجمالي</th>
                <th>الحالة</th>
                <th>الوقت</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pageOrders.map((order) => (
                <tr key={order._id} className="hover">
                  <td className="font-medium">#{order._id.slice(-6)}</td>
                  <td>{order.user?.fullName || "—"}</td>
                  <td>{order.totalPrice} EGP</td>
                  <td>
                    <span
                      className={`badge ${STATUS_META[order.orderStatus].badge}`}
                    >
                      {STATUS_META[order.orderStatus].label}
                    </span>
                  </td>
                  <td className="text-sm text-base-content/60">
                    {formatTime(order.createdAt)}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => setSelectedOrder(order)}
                    >
                      التفاصيل
                    </button>
                  </td>
                </tr>
              ))}
              {pageOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-base-content/50"
                  >
                    مفيش أوردرات مطابقة للفلتر ده
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Orders — Cards (mobile) */}
        <div className="grid grid-cols-1 gap-3 md:hidden">
          {pageOrders.map((order) => (
            <div key={order._id} className="card bg-base-100 shadow">
              <div className="card-body gap-2 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">#{order._id.slice(-6)}</p>
                    <p className="text-sm text-base-content/60">
                      {order.user?.fullName || "—"}
                    </p>
                  </div>
                  <span
                    className={`badge ${STATUS_META[order.orderStatus].badge}`}
                  >
                    {STATUS_META[order.orderStatus].label}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>{order.totalPrice} EGP</span>
                  <span className="text-base-content/50">
                    {formatTime(order.createdAt)}
                  </span>
                </div>
                <button
                  className="btn btn-sm btn-outline mt-1"
                  onClick={() => setSelectedOrder(order)}
                >
                  التفاصيل
                </button>
              </div>
            </div>
          ))}
          {pageOrders.length === 0 && (
            <p className="py-8 text-center text-base-content/50">
              مفيش أوردرات مطابقة للفلتر ده
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="join flex justify-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`join-item btn btn-sm ${
                  p === page ? "btn-active" : ""
                }`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal modal-open">
          <div className="modal-box max-w-md">
            <h3 className="text-lg font-bold">
              أوردر #{selectedOrder._id.slice(-6)}
            </h3>
            <p className="text-sm text-base-content/60">
              {selectedOrder.user?.fullName} — {selectedOrder.phone}
            </p>
            <p className="mt-1 text-sm text-base-content/60">
              العنوان: {formatAddress(selectedOrder.address)}
            </p>
            {selectedOrder.notes && (
              <p className="mt-1 text-sm text-base-content/60">
                ملاحظات: {selectedOrder.notes}
              </p>
            )}

            <div className="divider my-2" />

            <ul className="space-y-2">
              {selectedOrder.items.map((item) => (
                <li
                  key={item.product}
                  className="flex items-center gap-2 text-sm"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-10 w-10 rounded-box object-cover"
                  />
                  <span className="flex-1">
                    {item.quantity}x {item.title}
                  </span>
                  <span>{item.quantity * item.price} EGP</span>
                </li>
              ))}
            </ul>

            <div className="divider my-2" />

            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-base-content/60">
                <span>التوصيل</span>
                <span>{selectedOrder.deliveryValue} EGP</span>
              </div>
              <div className="flex justify-between text-base-content/60">
                <span>الدفع</span>
                <span>
                  {selectedOrder.paymentMethod === "cash" ? "كاش" : "بطاقة"} ·{" "}
                  {selectedOrder.paymentStatus === "paid" ? "مدفوع" : "لسه"}
                </span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>الإجمالي</span>
                <span>{selectedOrder.totalPrice} EGP</span>
              </div>
            </div>

            <div className="mt-4">
              <label className="label">
                <span className="label-text">تحديث الحالة</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={selectedOrder.orderStatus}
                disabled={updating}
                onChange={(e) =>
                  handleStatusChange(selectedOrder._id, e.target.value)
                }
              >
                {Object.entries(STATUS_META).map(([key, meta]) => (
                  <option key={key} value={key}>
                    {meta.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedOrder(null)}>
                إغلاق
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setSelectedOrder(null)}
          />
        </div>
      )}
    </div>
  );
}
