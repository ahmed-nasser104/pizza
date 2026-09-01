import axios from "axios";

// عدّل الـ baseURL على env الحقيقي بتاعك
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/admin",
});

// بيحقن الـ token تلقائيًا في كل request (JWT مخزّن في localStorage بعد اللوجين)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
