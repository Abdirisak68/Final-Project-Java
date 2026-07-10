import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPaperPlane,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="mt-28">
      {/* Newsletter */}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div
          className="rounded-3xl px-10 py-12 shadow-2xl"
          style={{
            background: "linear-gradient(135deg,var(--primary),#1e40af)",
          }}
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left */}

            <div className="flex items-center gap-8">
              <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center text-6xl">
                ✈️
              </div>

              <div>
                <h2 className="text-4xl font-bold text-white">
                  Ready For Your Next Adventure?
                </h2>

                <p className="text-blue-100 mt-3">
                  Subscribe to receive exclusive travel offers, destination
                  guides and holiday deals.
                </p>
              </div>
            </div>

            {/* Right */}

            <div>
              <div className="bg-white rounded-full p-2 flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 outline-none"
                />

                <button className="bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-white px-8 py-3 rounded-full font-semibold transition">
                  Subscribe
                </button>
              </div>

              <p className="text-blue-100 text-sm mt-3">
                We never share your email with anyone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}

      <div className="bg-white -mt-12 pt-24 pb-8 shadow-inner">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Logo */}

            <div>
              <h2 className="text-3xl font-bold text-[var(--primary)]">
                ✈ TravelGo
              </h2>

              <p className="text-gray-500 mt-5 leading-7">
                Explore the world's most beautiful destinations with affordable
                packages, experienced guides and unforgettable adventures.
              </p>

              <div className="flex gap-4 mt-6">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[var(--primary)] hover:text-white flex items-center justify-center transition"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[var(--primary)] hover:text-white flex items-center justify-center transition"
                >
                  <FaInstagram />
                </a>

                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[var(--primary)] hover:text-white flex items-center justify-center transition"
                >
                  <FaTwitter />
                </a>

                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[var(--primary)] hover:text-white flex items-center justify-center transition"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>

            {/* Company */}

            <div>
              <h3 className="text-xl font-bold mb-5">Company</h3>

              <ul className="space-y-3 text-gray-500">
                <li>About Us</li>
                <li>Our Tours</li>
                <li>Travel Blog</li>
                <li>Testimonials</li>
                <li>Careers</li>
              </ul>
            </div>

            {/* Destinations */}

            <div>
              <h3 className="text-xl font-bold mb-5">Popular Destinations</h3>

              <ul className="space-y-3 text-gray-500">
                <li>Dubai</li>
                <li>Turkey</li>
                <li>Maldives</li>
                <li>Bali</li>
                <li>Switzerland</li>
              </ul>
            </div>

            {/* Contact */}

            <div>
              <h3 className="text-xl font-bold mb-5">Contact Us</h3>

              <div className="space-y-4 text-gray-500">
                <div className="flex gap-3">
                  <FaPhoneAlt className="text-[var(--secondary)] mt-1" />
                  +252 61 234 5678
                </div>

                <div className="flex gap-3">
                  <FaEnvelope className="text-[var(--secondary)] mt-1" />
                  info@travelgo.com
                </div>

                <div className="flex gap-3">
                  <FaMapMarkerAlt className="text-[var(--secondary)] mt-1" />
                  Mogadishu, Somalia
                </div>
              </div>
            </div>
          </div>

          <hr className="my-8 border-gray-200" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500">
              © 2026 TravelGo. All Rights Reserved.
            </p>

            <div className="flex gap-6 text-gray-500">
              <a href="#">Privacy Policy</a>

              <a href="#">Terms of Service</a>

              <a href="#">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
