import React, { useState, useEffect } from "react";
import axios from "axios";
<<<<<<< HEAD
import { toast } from "react-toastify";
import { useApi } from "../context/ApiContext";

=======
>>>>>>> 422d3c1f08a016cd50c01a00d1d4f09d686a8cbd

const api = axios.create({
  baseURL: "http://localhost:8080",
});

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);
  const [error, setError] = useState(null);
  const [passwords, setPasswords] = useState({
<<<<<<< HEAD
    currentPassword: "",
=======
>>>>>>> 422d3c1f08a016cd50c01a00d1d4f09d686a8cbd
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await api.get("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.data);
      } catch (err) {
        setError("Failed to load profile. Please log in again.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handlePasswordChange = async () => {
    if (passwords.newPassword.length < 6) {
<<<<<<< HEAD
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("Passwords do not match!");
=======
      alert("Password must be at least 6 characters long.");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match!");
>>>>>>> 422d3c1f08a016cd50c01a00d1d4f09d686a8cbd
      return;
    }

    try {
      setLoadingAction(true);
      const token = localStorage.getItem("token");
      await api.post(
        "/api/users/change-password",
        {
          newPassword: passwords.newPassword,
          confirmPassword: passwords.confirmPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert("Password updated successfully!");
      setPasswords({ newPassword: "", confirmPassword: "" });
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Server Error"));
    } finally {
      setLoadingAction(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen font-outfit">
        Loading profile...
      </div>
    );
  if (error)
    return (
<<<<<<< HEAD
      <div className="text-center mt-10 text-(--red-500) font-outfit">
=======
      <div className="text-center mt-10 text-[var(--red-500)] font-outfit">
>>>>>>> 422d3c1f08a016cd50c01a00d1d4f09d686a8cbd
        {error}
      </div>
    );

  return (
<<<<<<< HEAD
    <div className="max-w-3xl p-5 bg-(--white) shadow-xl rounded-2xl border border-(--gray-200)">
      <h2 className="text-3xl font-bold mb-8 text-(--primary) border-b pb-4">
=======
    <div className="max-w-3xl p-5 bg-[var(--white)] shadow-xl rounded-2xl border border-[var(--gray-200)]">
      <h2 className="text-3xl font-bold mb-8 text-[var(--primary)] border-b pb-4">
>>>>>>> 422d3c1f08a016cd50c01a00d1d4f09d686a8cbd
        Profile Settings
      </h2>

      {/* Profile Info Section */}
      <section className="mb-10">
<<<<<<< HEAD
        <h3 className="text-xl font-semibold mb-6 text-(--gray-700)">
=======
        <h3 className="text-xl font-semibold mb-6 text-[var(--gray-700)]">
>>>>>>> 422d3c1f08a016cd50c01a00d1d4f09d686a8cbd
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "First Name", value: user?.firstName },
            { label: "Last Name", value: user?.lastName },
            { label: "Role", value: user?.role },
            { label: "Email Address", value: user?.email, full: true },
          ].map((field, idx) => (
            <div key={idx} className={field.full ? "md:col-span-2" : ""}>
<<<<<<< HEAD
              <label className="block text-sm font-medium text-(--gray) mb-1">
=======
              <label className="block text-sm font-medium text-[var(--gray)] mb-1">
>>>>>>> 422d3c1f08a016cd50c01a00d1d4f09d686a8cbd
                {field.label}
              </label>
              <input
                disabled
                value={field.value || ""}
<<<<<<< HEAD
                className="w-full p-3 bg-(--gray-50) border border-(--gray-200) rounded-lg text-(--text)"
=======
                className="w-full p-3 bg-[var(--gray-50)] border border-[var(--gray-200)] rounded-lg text-[var(--text)]"
>>>>>>> 422d3c1f08a016cd50c01a00d1d4f09d686a8cbd
              />
            </div>
          ))}
        </div>
      </section>

      {/* Security Section */}
      <section>
<<<<<<< HEAD
        <h3 className="text-xl font-semibold mb-6 text-(--gray-700)]">
          Security Settings
        </h3>
        <div className="bg-(--gray-50)] p-6 rounded-xl border border-(--gray-200) space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            value={passwords.currentPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, currentPassword: e.target.value })
            }
            className="w-full p-3 border border-(--gray-200) rounded-lg focus:ring-2 focus:ring-(--primary) outline-none"
          />
=======
        <h3 className="text-xl font-semibold mb-6 text-[var(--gray-700)]">
          Security Settings
        </h3>
        <div className="bg-[var(--gray-50)] p-6 rounded-xl border border-[var(--gray-200)] space-y-4">
>>>>>>> 422d3c1f08a016cd50c01a00d1d4f09d686a8cbd
          <input
            type="password"
            placeholder="New Password"
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, newPassword: e.target.value })
            }
<<<<<<< HEAD
            className="w-full p-3 border border-(--gray-200) rounded-lg focus:ring-2 focus:ring-(--primary) outline-none"
=======
            className="w-full p-3 border border-[var(--gray-200)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"
>>>>>>> 422d3c1f08a016cd50c01a00d1d4f09d686a8cbd
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={passwords.confirmPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, confirmPassword: e.target.value })
            }
<<<<<<< HEAD
            className="w-full p-3 border border-(--gray-200) rounded-lg focus:ring-2 focus:ring-(--primary) outline-none"
=======
            className="w-full p-3 border border-[var(--gray-200)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"
>>>>>>> 422d3c1f08a016cd50c01a00d1d4f09d686a8cbd
          />
          <button
            onClick={handlePasswordChange}
            disabled={loadingAction}
            className={`w-full py-3 rounded-lg text-white font-bold transition-all ${
              loadingAction
<<<<<<< HEAD
                ? "bg-(--gray-400) cursor-not-allowed"
                : "bg-(--primary) hover:bg-[#001040]"
=======
                ? "bg-[var(--gray-400)] cursor-not-allowed"
                : "bg-[var(--primary)] hover:bg-[#001040]"
>>>>>>> 422d3c1f08a016cd50c01a00d1d4f09d686a8cbd
            }`}
          >
            {loadingAction ? "Updating..." : "Update Password"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
