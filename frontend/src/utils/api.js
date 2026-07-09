import axios from "axios";
import { toast } from "react-toastify";

const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const api = axios.create({
  baseURL: `${backendUrl}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add to the Token to request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    toast.error("Failed to send request.");
    return Promise.reject(error);
  }
);

// Handle API Responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error("Network error. Please check your internet connection.");
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    switch (status) {
      case 400:
        toast.error(data?.message || "Bad Request.");
        break;

      case 401:
        toast.error("Session expired. Please login again.");

        localStorage.removeItem("token");
        localStorage.removeItem("firstName");
        localStorage.removeItem("role");

        window.dispatchEvent(new Event("authChange"));

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        break;

      case 403:
        toast.error("You are not authorized to perform this action.");
        break;

      case 404:
        toast.error(data?.message || "Resource not found.");
        break;

      case 409:
        toast.error(data?.message || "Conflict occurred.");
        break;

      case 500:
        toast.error("Internal Server Error.");
        break;

      default:
        toast.error(data?.message || "Something went wrong.");
    }

    return Promise.reject(error);
  }
);

export default api;