import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
    
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        formData,
      );

    
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("firstName", response.data.firstName);

      
      window.dispatchEvent(new Event("authChange"));

      alert("Registration Successful! Welcome.");
      navigate("/");
    } catch (err) {
      alert("Registration failed. Email might already exist.");
    } finally {
      setLoading(false);
    }
  };    

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl bg-slate-100 border-2 outline-none transition ${
      errors[field]
        ? "border-red-500 focus:ring-red-200"
        : "border-transparent focus:ring-2 focus:ring-indigo-500"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-slate-100">
        <h1 className="text-2xl font-extrabold text-slate-800 text-center mb-2">
          Create Account
        </h1>
        <p className="text-slate-500 text-sm text-center mb-8">
          Sign up to get started
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="First Name"
                className={inputClass("firstName")}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
              {errors.firstName && (
                <p className="text-red-500 text-[10px] mt-1 ml-1">
                  {errors.firstName}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                className={inputClass("lastName")}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
              {errors.lastName && (
                <p className="text-red-500 text-[10px] mt-1 ml-1">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          <div>
            <input
              type="email"
              placeholder="Email Address"
              className={inputClass("email")}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-[10px] mt-1 ml-1">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className={inputClass("password")}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && (
              <p className="text-red-500 text-[10px] mt-1 ml-1">
                {errors.password}
              </p>
            )}
          </div>

          <button
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition disabled:bg-indigo-300"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-slate-500 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/LoginPage"
            className="text-indigo-600 font-bold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
