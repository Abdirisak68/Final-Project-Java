import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

// Create the context
const AuthContext = createContext();

// Create the provider component to wrap our app
export function AuthProvider({ children }) {
  // State to track if user is logged in and their name
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName") || null);
  const [loading, setLoading] = useState(false); // To show loading state

  // Get the backend URL from environment variables or use default
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/auth/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // Save the token and first name from response
      const data = response.data;
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("firstName", data.firstName || "User");
      setToken(data.accessToken);
      setFirstName(data.firstName || "User");

      window.dispatchEvent(new Event("authChange")); // Update navbar
      toast.success("Logged in successfully!");
    } catch (error) {
      // Show error message
      toast.error(error.response?.data?.message || "Error logging in");
      throw error; // Re-throw to handle in component
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Register function
  const register = async (firstName, lastName, email, password) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/auth/register`,
        { firstName, lastName, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // Save the token and first name from response
      const data = response.data;
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("firstName", data.firstName || firstName);
      setToken(data.accessToken);
      setFirstName(data.firstName || firstName);

      window.dispatchEvent(new Event("authChange")); // Update navbar
      toast.success("Registered successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error registering");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Remove token and first name from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    setToken(null);
    setFirstName(null);
    window.dispatchEvent(new Event("authChange")); // Update navbar
    toast.info("Logged out!");
  };

  // The value that will be available to all child components
  const value = {
    token,
    firstName,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

// Custom hook to easily access the auth context
export const useAuth = () => useContext(AuthContext);
