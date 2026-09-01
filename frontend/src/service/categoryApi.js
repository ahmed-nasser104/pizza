import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token") || sessionStorage.getItem("token");

export const categoryApi = async (data) => {
  return await axios.post(`${API_URL}/admin/Category`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCategories = async () => {
  return await axios.get(`${API_URL}/admin/Categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editCategory = async (data, categoryId) => {
  return await axios.patch(`${API_URL}/admin/categories/${categoryId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCategory = async (categoryId) => {
  return await axios.delete(`${API_URL}/admin/catrgory/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
