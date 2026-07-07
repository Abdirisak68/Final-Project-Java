import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ProtectedRoutes from "../components/ProtectedRoutes";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <ProtectedRoutes>
        <div className="ml-64 flex-1 p-8">
          <Outlet />
        </div>
      </ProtectedRoutes>
    </div>
  );
};

export default DashboardLayout;
