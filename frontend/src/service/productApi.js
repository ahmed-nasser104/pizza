import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token") || sessionStorage.getItem("token");

export const addProduct = async (data, categoryId) => {
  return await axios.post(`${API_URL}/admin/products/${categoryId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProducts = async () => {
  return await axios.get(`${API_URL}/admin/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserProducts = async () => {
  return await axios.get(`${API_URL}/user/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProductById = async (productId) => {
  return await axios.get(`${API_URL}/user/product/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProductApi = async (productId, data) => {
  return await axios.patch(`${API_URL}/admin/products/${productId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProductApi = async (productId) => {
  return await axios.delete(`${API_URL}/admin/product/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
