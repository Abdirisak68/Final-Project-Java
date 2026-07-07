import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName"));
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = () => {
      setFirstName(localStorage.getItem("firstName"));
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    setFirstName(null);
    window.dispatchEvent(new Event("authChange"));
    navigate("/LoginPage");
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white tracking-wide">
            MyLogo
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-gray-300 font-medium">
            <Link to="/" className="hover:text-white">
              Home
            </Link>

            <Link to="/about" className="hover:text-white">
              About
            </Link>

            <Link to="/Services" className="hover:text-white">
              Services
            </Link>

            <Link to="/Contact" className="hover:text-white">
              Contact
            </Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {firstName ? (
              <>
                <span className="text-blue-400 font-semibold">
                  Hi, {firstName}
                </span>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/LoginPage"
                  className="text-gray-300 hover:text-white"
                >
                  Login
                </Link>

                <Link
                  to="/RegisterPage"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-4 text-gray-300">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="hover:text-white"
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="hover:text-white"
            >
              About
            </Link>

            <Link
              to="/Services"
              onClick={() => setIsOpen(false)}
              className="hover:text-white"
            >
              Services
            </Link>

            <Link
              to="/Contact"
              onClick={() => setIsOpen(false)}
              className="hover:text-white"
            >
              Contact
            </Link>

            <hr className="border-gray-700" />

            {firstName ? (
              <>
                <span className="text-blue-400 font-semibold">
                  Hi, {firstName}
                </span>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="bg-red-600 hover:bg-red-700 py-2 rounded-lg text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/LoginPage"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-white"
                >
                  Login
                </Link>

                <Link
                  to="/RegisterPage"
                  onClick={() => setIsOpen(false)}
                  className="bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-center text-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
