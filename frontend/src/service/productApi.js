import axios from "axios";
const token = localStorage.getItem("token") || sessionStorage.getItem("token");
export const addProduct = async (data, categoryId) => {
  return await axios.post(
    `http://localhost:3000/admin/products/${categoryId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const getProducts = async () => {
  return await axios.get("http://localhost:3000/admin/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserProducts = async () => {
  return await axios.get("http://localhost:3000/user/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getProductById = async (productId) => {
  return await axios.get(`http://localhost:3000/user/product/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateProductApi = async (productId, data) => {
  return await axios.patch(
    `http://localhost:3000/admin/products/${productId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
export const deleteProductApi = async (productId) => {
  return await axios.delete(
    `http://localhost:3000/admin/product/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
