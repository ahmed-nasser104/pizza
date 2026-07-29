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
