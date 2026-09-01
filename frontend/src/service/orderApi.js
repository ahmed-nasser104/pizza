import axios from "axios";
import api from "../api/Api.js";
const token = localStorage.getItem("token") || sessionStorage.getItem("token");
export const addOrder = async (data) => {
  return await axios.post("http://localhost:3000/user/order", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllOrders = async () => {
  const { data } = await api.get("/orders");
  return data.data;
};

export const updateOrderStatus = async (orderId, orderStatus) => {
  const { data } = await api.patch(`/orders/${orderId}/status`, {
    orderStatus,
  });
  return data.data;
};
