import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const verifyAccount = async (data) => {
  return await axios.post(`${API_URL}/auth/verify`, data);
};

export const resendOtp = async (identifier) => {
  return await axios.post(`${API_URL}/auth/resend-otp`, identifier);
};
