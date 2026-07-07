import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Plane } from "lucide-react";

const Login = () => {
  // State to store form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); 

  const { login } = useAuth();
  const navigate = useNavigate();

 
  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    }
    else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    }
    else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!validateForm()) return;

    try {
      setLoading(true);
      await login(email, password);
      navigate("/dashboard"); 
    } catch (error) {
      setLoading(false);
      
      setErrors({
        password: error.response?.data?.message || "Login failed",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-6">
      <div className="bg-[var(--white)] px-8 py-10 md:px-10 md:py-12 rounded-xl shadow-lg w-full max-w-md border border-[var(--gray-200)]">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Plane className="text-[var(--secondary)]" size={32} />
            <span className="text-2xl font-bold text-[var(--primary)]">Warfaa</span>
          </div>
          <h1 className="text-3xl font-bold text-[var(--primary)] mb-2">
            Welcome Back
          </h1>
          <p className="text-[var(--gray)]">
            Enter your details to access your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-5 py-3.5 rounded-lg bg-[var(--gray-50)] border-2 outline-none transition-all duration-200 text-gray-800 placeholder-[var(--gray-400)] ${
                errors.email
                  ? "border-[var(--red-500)] focus:border-[var(--red-600)]"
                  : "border-[var(--gray-200)] focus:border-[var(--primary)]"
              }`}
            />
            {errors.email && (
              <p className="text-[var(--red-500)] text-sm mt-1 ml-1">
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-5 py-3.5 rounded-lg bg-[var(--gray-50)] border-2 outline-none transition-all duration-200 text-gray-800 placeholder-[var(--gray-400)] ${
                errors.password
                  ? "border-[var(--red-500)] focus:border-[var(--red-600)]"
                  : "border-[var(--gray-200)] focus:border-[var(--primary)]"
              }`}
            />
            {errors.password && (
              <p className="text-[var(--red-500)] text-sm mt-1 ml-1">
                {errors.password}
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[var(--secondary)] text-[var(--white)] rounded-lg font-semibold hover:bg-[var(--secondary-hover)] transition-all duration-200 disabled:bg-[var(--gray-400)] disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>
        <div className="text-center mt-8 pt-6 border-t border-[var(--gray-200)]">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[var(--primary)] font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
