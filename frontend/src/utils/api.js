import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL || "http://localhost:5001"}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle all API responses
api.interceptors.response.use(
  (response) => response,

  (error) => {
    // No internet or server is down
    if (!error.response) {
      toast.error("Network error. Please check your internet.");
      return Promise.reject(error);
    }

    const status = error.response.status;
    const message = error.response.data?.message;

    if (status === 400) {
      toast.error(message || "Bad Request");
    } else if (status === 401) {
      toast.error("Session expired. Please login again.");

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("firstName");

      window.dispatchEvent(new Event("authChange"));
      window.location.href = "/login";
    } else if (status === 403) {
      toast.error("Access denied.");
    } else if (status === 404) {
      toast.error(message || "Not Found.");
    } else if (status === 409) {
      toast.error(message || "Conflict.");
    } else if (status === 500) {
      toast.error("Server Error.");
    } else {
      toast.error(message || "Something went wrong.");
    }

    return Promise.reject(error);
  }
);

export default api;