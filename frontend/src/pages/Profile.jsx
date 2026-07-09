import React, { useState, useEffect } from "react";
import { useApi } from "../context/ApiContext";
import { toast } from "react-toastify";

const Profile = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { updatePassword, currentUser, getCurrentUser, loading } = useApi();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const info = [
    { label: "First Name", value: currentUser?.firstName },
    { label: "Last Name", value: currentUser?.lastName },
    { label: "Role", value: currentUser?.role },
    { label: "Email Address", value: currentUser?.email },
  ];

  const handlePasswordChange = async () => {
    if (passwords.currentPassword === "" || passwords.newPassword === "" || passwords.confirmPassword === "") {
      toast.error("Please fill in all password fields.");
      return;
    }
    if (passwords.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    const success = await updatePassword({
      currentPassword: passwords.currentPassword,
      newPassword: passwords.newPassword,
    });

    if (success) {
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      toast.success("Password updated successfully.");
    }
  };

  if (loading && !currentUser) {
    return (
      <div className="flex justify-center items-center h-screen font-outfit">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-3xl p-5 bg-(--white) shadow-xl rounded-2xl border border-(--gray-200)">
      <h2 className="text-3xl font-bold mb-8 text-(--primary) border-b pb-4">
        Profile Settings
      </h2>

      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-6 text-(--gray-700)">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {info.map((field, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium text-(--gray) mb-1">
                {field.label}
              </label>
              <input
                disabled
                value={field.value || ""}
                className="w-full p-3 bg-(--gray-50) border border-(--gray-200) rounded-lg text-(--text)"
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-6 text-(--gray-700)">
          Security Settings
        </h3>
        <div className="bg-(--gray-50) p-6 rounded-xl border border-(--gray-200) space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            value={passwords.currentPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, currentPassword: e.target.value })
            }
            className="w-full p-3 border border-(--gray-200) rounded-lg focus:ring-2 focus:ring-(--primary) outline-none"
          />
          <input
            type="password"
            placeholder="New Password"
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, newPassword: e.target.value })
            }
            className="w-full p-3 border border-(--gray-200) rounded-lg focus:ring-2 focus:ring-(--primary) outline-none"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={passwords.confirmPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, confirmPassword: e.target.value })
            }
            className="w-full p-3 border border-(--gray-200) rounded-lg focus:ring-2 focus:ring-(--primary) outline-none"
          />
          <button
            onClick={handlePasswordChange}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-bold transition-all ${
              loading
                ? "bg-(--gray-400) cursor-not-allowed"
                : "bg-(--primary) hover:bg-[#001040]"
            }`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
