import axios from "axios";
const token = localStorage.getItem("token") || sessionStorage.getItem("token");

export const categoryApi = async (data) => {
  return await axios.post("http://localhost:3000/admin/Category", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getCategories = async () => {
  return await axios.get("http://localhost:3000/admin/Categories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editCategory = async (data, categoryId) => {
  return await axios.patch(
    `http://localhost:3000/admin/categories/${categoryId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const deleteCategory = async (categoryId) => {
  return await axios.delete(
    `http://localhost:3000/admin/catrgory/${categoryId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
