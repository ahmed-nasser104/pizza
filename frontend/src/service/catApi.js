import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token") || sessionStorage.getItem("token");

export const addToCartApi = async (data, productId) => {
  return await axios.post(`${API_URL}/user/product/${productId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCartApi = async () => {
  return await axios.get(`${API_URL}/user/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCartItemApi = async (cartId) => {
  return await axios.delete(`${API_URL}/user/cart/${cartId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
