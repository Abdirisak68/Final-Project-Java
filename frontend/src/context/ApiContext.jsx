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
  const [packages, setPackages] = useState([]);
  const [travelPackage, setTravelPackage] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [booking, setBooking] = useState(null);

  const executeRequest = async (callback) => {
    try {
      setLoading(true);
      return await callback();
    } finally {
      setLoading(false);
    }
  };

  // DESTINATIONS
  const getDestinations = () =>
    executeRequest(async () => {
      const r = await api.get("/destinations");
      setDestinations(r.data.data);
      return r.data.data;
    });
  const createDestination = (formData) =>
    executeRequest(async () => {
      const r = await api.post("/destinations", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(r.data.message);
      await getDestinations();
      return true;
    });
  const updateDestination = (id, formData) =>
    executeRequest(async () => {
      const r = await api.put(`/destinations/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(r.data.message);
      await getDestinations();
      return true;
    });
  const deleteDestination = (id) =>
    executeRequest(async () => {
      const r = await api.delete(`/destinations/${id}`);
      toast.success(r.data.message);
      setDestinations((p) => p.filter((x) => x.destId !== id));
      return true;
    });

  // USERS
  const getCurrentUser = () =>
    executeRequest(async () => {
      const r = await api.get("/users/me");
      setCurrentUser(r.data.data);
      return r.data.data;
    });
  const getAllUsers = () =>
    executeRequest(async () => {
      const r = await api.get("/users/all-users");
      setUsers(r.data.data);
      return r.data.data;
    });
  const deleteUser = (id) =>
    executeRequest(async () => {
      const r = await api.delete(`/users/${id}`);
      toast.success(r.data.message);
      setUsers((p) => p.filter((u) => (u.id ?? u.userId) !== id));
      return true;
    });
  const updatePassword = (passwordData) =>
    executeRequest(async () => {
      await api.put("/auth/password", passwordData);
      toast.success("Password updated successfully.");
      return true;
    });

  // PACKAGES
  const getPackages = () =>
    executeRequest(async () => {
      const r = await api.get("/packages");
      setPackages(r.data.data);
      return r.data.data;
    });
  const createPackage = (packageData) =>
    executeRequest(async () => {
      const r = await api.post("/packages", packageData);
      toast.success(r.data.message);
      await getPackages();
      return true;
    });
  const updatePackage = (id, packageData) =>
    executeRequest(async () => {
      const r = await api.put(`/packages/${id}`, packageData);
      toast.success(r.data.message);
      await getPackages();
      return true;
    });
  const deletePackage = (id) =>
    executeRequest(async () => {
      const r = await api.delete(`/packages/${id}`);
      toast.success(r.data.message);
      setPackages((p) => p.filter((x) => x.travelPackageId !== id));
      return true;
    });

  // BOOKINGS
  const getBookings = () =>
    executeRequest(async () => {
      const r = await api.get("/bookings");
      setBookings(r.data.data);
      return r.data.data;
    });
  const getMyBookings = () =>
    executeRequest(async () => {
      const r = await api.get("/bookings/my");
      setBookings(r.data.data);
      return r.data.data;
    });
  const getBookingById = (id) =>
    executeRequest(async () => {
      const r = await api.get(`/bookings/${id}`);
      setBooking(r.data.data);
      return r.data.data;
    });
  const createBooking = (bookingData) =>
    executeRequest(async () => {
      const r = await api.post("/bookings", bookingData);
      toast.success(r.data.message);
      await getMyBookings();
      return true;
    });
  const cancelBooking = (id) =>
    executeRequest(async () => {
      const r = await api.put(`/bookings/cancel/${id}`);
      toast.success(r.data.message);
      await getMyBookings();
      return true;
    });
  const updateBookingStatus = (id, status) =>
    executeRequest(async () => {
      const r = await api.put(`/bookings/status/${id}`, { status });
      toast.success(r.data.message);
      await getBookings();
      return true;
    });
  const approveCancellation = (id) =>
    executeRequest(async () => {
      const r = await api.put(`/bookings/cancel/${id}/approve`);
      toast.success(r.data.message);
      await getBookings();
      return true;
    });
  const rejectCancellation = (id) =>
    executeRequest(async () => {
      const r = await api.put(`/bookings/cancel/${id}/reject`);
      toast.success(r.data.message);
      await getBookings();
      return true;
    });

  const value = {
    loading,
    destinations,
    destination,
    users,
    currentUser,
    packages,
    travelPackage,
    bookings,
    booking,
    getDestinations,
    createDestination,
    updateDestination,
    deleteDestination,
    getCurrentUser,
    getAllUsers,
    deleteUser,
    updatePassword,
    getPackages,
    createPackage,
    updatePackage,
    deletePackage,
    getBookings,
    getMyBookings,
    getBookingById,
    createBooking,
    cancelBooking,
    updateBookingStatus,
    approveCancellation,
    rejectCancellation,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export const useApi = () => useContext(ApiContext);
