import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const loginApi = async (data) => {
  return await axios.post(`${API_URL}/auth/login`, data);
};

export const loginWithGoogle = async (tokenId) => {
  return await axios.post(`${API_URL}/auth/login-with-google`, {
    idToken: tokenId,
  });
};
