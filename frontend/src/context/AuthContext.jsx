import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

// Create the context
const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [loading, setLoading] = useState(false); 

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/auth/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = response.data;
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("firstName", data.firstName || "User");
      localStorage.setItem("role", data.role || "CUSTOMER");
      setToken(data.accessToken);
      setFirstName(data.firstName || "User");
      setRole(data.role || "CUSTOMER");

      window.dispatchEvent(new Event("authChange")); 
      toast.success("Logged in successfully!");
    } catch (error) {
      
      toast.error(error.response?.data?.message || "Error logging in");
      throw error; 
    } finally {
      setLoading(false); 
    }
  };


  const register = async (firstName, lastName, email, password) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/auth/register`,
        { firstName, lastName, email, password },
        { headers: { "Content-Type": "application/json" } }
      );


      const data = response.data;
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("firstName", data.firstName || firstName);
      localStorage.setItem("role", data.role || "CUSTOMER");
      setToken(data.accessToken);
      setFirstName(data.firstName || firstName);
      setRole(data.role || "CUSTOMER");

      window.dispatchEvent(new Event("authChange")); 
      toast.success("Registered successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error registering");
      throw error;
    } finally {
      setLoading(false);
    }
  };


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("role");
    setRole(null);
    setToken(null);
    setFirstName(null);
    window.dispatchEvent(new Event("authChange")); 
    toast.info("Logged out!");
  };

  const isAdmin = () => role === "ADMIN";
  const isCustomer = () => role === "CUSTOMER";

  const value = {
    token,
    firstName,
    loading,
    login,
    register,
    logout,
    isAdmin,
    isCustomer,
    role,
  };

 

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
