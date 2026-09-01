import { useCallback, useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../service/orderApi.js";

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      setError(err.response?.data?.message || "حصل خطأ أثناء تحميل الأوردرات");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Optimistic update: بيغيّر الحالة في الشاشة فورًا، ولو الـ request فشل بيرجعها زي ما كانت
  const changeOrderStatus = async (orderId, newStatus) => {
    const previousOrders = orders;
    setOrders((prev) =>
      prev.map((o) =>
        o._id === orderId ? { ...o, orderStatus: newStatus } : o,
      ),
    );
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (err) {
      setOrders(previousOrders); // rollback
      throw err;
    }
  };

  return { orders, loading, error, refetch: fetchOrders, changeOrderStatus };
}
