import axios from "axios";
const token = localStorage.getItem("token") || sessionStorage.getItem("token");
export const getUsersApi = async () => {
  return await axios.get("http://localhost:3000/admin/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserProfileApi = async () => {
  return await axios.get("http://localhost:3000/user/userId", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUser = async (userId) => {
  return axios.delete(`http://localhost:3000/admin/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
