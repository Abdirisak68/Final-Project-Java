import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import api from "../utils/api";

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const [destinations, setDestinations] = useState([]);
  const [destination, setDestination] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const getDestinations = async () => {
    try {
      setLoading(true);

      const res = await api.get("/destinations");

      setDestinations(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //   // GET DESTINATION BY ID
  //   // ===========================
  //   const getDestinationById = async (id) => {
  //     try {
  //       setLoading(true);

  //       const res = await api.get(`/destinations/${id}`);

  //       setDestination(res.data.data);

  //       return res.data.data;
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  // ===========================
  // CREATE DESTINATION
  // ===========================
  const createDestination = async (formData) => {
    try {
      setLoading(true);

      const res = await api.post("/destinations", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message);

      await getDestinations();

      return true;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateDestination = async (id, formData) => {
    try {
      setLoading(true);

      const res = await api.put(`/destinations/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message);

      await getDestinations();

      return true;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };


  const deleteDestination = async (id) => {
    try {
      setLoading(true);

      const res = await api.delete(`/destinations/${id}`);

      toast.success(res.data.message);

      setDestinations((prev) => prev.filter((item) => item.destId !== id));

      return true;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUser = async () => {
  try {
    setLoading(true);

    const res = await api.get("/users/me");

    setCurrentUser(res.data.data);

    return res.data.data;
  } catch (error) {
    return null;
  } finally {
    setLoading(false);
  }
};

const getAllUsers = async () => {
  try {
    setLoading(true);

    const res = await api.get("/users/all-users");

    setUsers(res.data.data);
    toast.success("Users fetched successfully!");
    return res.data.data;

  } catch (error) {
    return [];
  } finally {
    setLoading(false);
  }
};
const deleteUser = async (id) => {
  try {
    setLoading(true);

    const res = await api.delete(`/users/${id}`);

    toast.success(res.data.message);

    setUsers((prev) => prev.filter((user) => user.id !== id));

    return true;
  } catch (error) {
    return false;
  } finally {
    setLoading(false);
  }
};

  const value = {
    loading,

    destinations,
    destination,
    users,


    getDestinations,
    createDestination,
    updateDestination,
    deleteDestination,
    getCurrentUser,
    getAllUsers,
    deleteUser,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export const useApi = () => useContext(ApiContext);
