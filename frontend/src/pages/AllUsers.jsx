import React, { useEffect } from "react";
import { useApi } from "../context/ApiContext";

const AllUsers = () => {
  const { users , getAllUsers, deleteUser } = useApi();
  // const safeUsers = Array.isArray(users) ? users : [];

  useEffect(() => {
    getAllUsers();
    
  }, []);

  return (
    <div className="">
      <div className="mb-6">
          <h1 className="text-3xl font-bold text-(--primary)">Manage All Users</h1>
        </div>
      <div className="mx-auto max-w-6xl rounded-2xl border border-(--primary)/20 bg-white p-6 ">
        
          <p className="mt-2 text-sm text-gray-600">View, manage, and remove users from the system.</p>

        <div className="overflow-hidden rounded-xl border border-(--primary)/20">
          <table className="min-w-full border-collapse">
            <thead className="bg-(--primary) text-white">
              <tr>
                <th className="border-b border-(--primary) px-4 py-3 text-left">ID</th>
                <th className="border-b border-(--primary) px-4 py-3 text-left">Name</th>
                <th className="border-b border-(--primary) px-4 py-3 text-left">Email</th>
                <th className="border-b border-(--primary) px-4 py-3 text-left">Role</th>
                <th className="border-b border-(--primary) px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index} className="even:bg-gray-50 hover:bg-gray-100">
                    <td className="border-b border-(--primary)/10 px-4 py-3">{user?.id ?? "-"}</td>
                    <td className="border-b border-(--primary)/10 px-4 py-3">{user?.firstName} {user?.lastName ?? "Unknown"}</td>
                    <td className="border-b border-(--primary)/10 px-4 py-3">{user?.email ?? "No email"}</td>
                    <td className="border-b border-(--primary)/10 px-4 py-3">{user?.role ?? "User"}</td>
                    <td className="border-b border-(--primary)/10 px-4 py-3">
                      <button
                        onClick={() => user?.id && deleteUser(user.id)}
                        className="rounded-lg bg-(--red-500) px-3 py-2 text-white transition hover:opacity-90"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
