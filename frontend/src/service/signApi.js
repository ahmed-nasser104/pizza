import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const signapi = async (values) => {
  return await axios.post(`${API_URL}/auth/sign`, values);
};
