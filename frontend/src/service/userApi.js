import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token") || sessionStorage.getItem("token");

export const getUsersApi = async () => {
  return await axios.get(`${API_URL}/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserProfileApi = async () => {
  return await axios.get(`${API_URL}/user/userId`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUser = async (userId) => {
  return axios.delete(`${API_URL}/admin/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
