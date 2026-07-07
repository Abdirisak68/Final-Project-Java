import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  // Waxaan ka dhex akhrinaynaa localStorage magaca
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName"));
  const navigate = useNavigate();

  useEffect(() => {
    // Shaqo cusboonaysiinaysa magaca marka event-ku dhaco
    const handleAuthChange = () => {
      setFirstName(localStorage.getItem("firstName"));
    };

    // Dhagayso event-ka "authChange"
    window.addEventListener("authChange", handleAuthChange);

    // Nadiifi event-ka marka component-ku xirmo
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    setFirstName(null); // Isla markiiba ka saar Navbar-ka
    window.dispatchEvent(new Event("authChange")); // Wargeli qaybaha kale
    navigate("/LoginPage");
  };
  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-white tracking-wider">
            MyLogo
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8 text-gray-300 font-medium">
          <Link to="/" className="hover:text-white transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-white transition">
            About us
          </Link>
          <Link to="/Services" className="hover:text-white transition">
            Services
          </Link>
          <Link to="/Contact" className="hover:text-white transition">
            Contact
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {firstName ? (
            <div className="flex items-center space-x-4">
              <span className="text-blue-400 font-bold flex items-center">
                Hi, {firstName}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/LoginPage"
                className="px-5 py-2 text-gray-300 hover:text-white transition"
              >
                Log in
              </Link>
              <Link
                to="/RegisterPage"
                className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-md hover:opacity-90 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
