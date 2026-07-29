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
