import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/about";
import Servace from "./pages/servace";
import Contact from "./pages/contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PublicLayouts from "./layouts/PublicLayouts";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllDestinations from "./pages/AllDestinations";
import AddDestination from "./pages/AddDestination";
import AllPackages from "./pages/AllPackages";
import AddPackage from "./pages/AddPackage";
import AllBookings from "./pages/AllBookings";
import AddBooking from "./pages/AddBooking";
import AllUsers from "./pages/AllUsers";
import Profile from "./pages/Profile";

function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayouts />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/servace" element={<Servace />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/all-destinations" element={<AllDestinations />} />
          <Route path="/add-destination" element={<AddDestination />} />
          <Route path="/all-packages" element={<AllPackages />} />
          <Route path="/add-package" element={<AddPackage />} />
          <Route path="/all-bookings" element={<AllBookings />} />
          <Route path="/add-booking" element={<AddBooking />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
