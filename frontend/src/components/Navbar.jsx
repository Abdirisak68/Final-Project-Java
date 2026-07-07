import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Plane } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { firstName, logout, token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-(--primary) border-b border-(--gray-700)">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-(--text-color) tracking-wide">
            <Plane className="text-(--secondary)" size={28} />
            Warfaa
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-gray-300 font-medium">
            <Link to="/" className="hover:text-(--white) transition-colors">
              Home
            </Link>

            <Link to="/about" className="hover:text-(--white) transition-colors">
              About
            </Link>

            <Link to="/servace" className="hover:text-(--white) transition-colors">
              Services
            </Link>

            <Link to="/contact" className="hover:text-(--white) transition-colors">
              Contact
            </Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {token ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/dashboard"
                  className="px-4 py-2 bg-(--secondary) rounded-lg hover:bg-(--secondary-hover) text-(--white) transition-colors"
                >
                  Back to Dashboard
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-(--white) transition-colors"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-(--secondary) hover:bg-(--secondary-hover) px-4 py-2 rounded-lg text-(--white) transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-(--white)"
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
              className="hover:text-(--white) transition-colors"
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="hover:text-(--white) transition-colors"
            >
              About
            </Link>

            <Link
              to="/servace"
              onClick={() => setIsOpen(false)}
              className="hover:text-(--white) transition-colors"
            >
              Services
            </Link>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="hover:text-(--white) transition-colors"
            >
              Contact
            </Link>

            <hr className="border-(--gray-700)" />

            {token ? (
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="bg-(--secondary) hover:bg-(--secondary-hover) py-2 rounded-lg text-center text-(--white) transition-colors"
              >
                Back to Dashboard
              </Link>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-(--white) transition-colors"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="bg-(--secondary) hover:bg-(--secondary-hover) py-2 rounded-lg text-center text-(--white) transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
