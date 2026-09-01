import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getStoredAccessToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token") || null;

const clearAuthState = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
};

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
      return;
    }

    promise.resolve(token);
  });

  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const token = getStoredAccessToken();
  if (token && !config.url?.includes("/auth/refresh-token")) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    const isAuthRequest =
      originalRequest.url?.includes("/auth/refresh-token") ||
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/login-with-google") ||
      originalRequest.url?.includes("/auth/sign") ||
      originalRequest.url?.includes("/auth/verify");

    if (error.response?.status === 401 && !isAuthRequest) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((queueError) => Promise.reject(queueError));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `${API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true },
        );

        const newAccessToken = data?.data?.accessToken || data?.accessToken;
        if (!newAccessToken) {
          throw new Error("No access token returned from refresh endpoint");
        }

        if (localStorage.getItem("token")) {
          localStorage.setItem("token", newAccessToken);
        } else {
          sessionStorage.setItem("token", newAccessToken);
        }

        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearAuthState();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
