import React from "react";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaSnapchat,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#f3f4f6] p-4 md:p-10 flex justify-center items-center font-['Outfit']">
      <div className="max-w-5xl w-full flex flex-col md:flex-row gap-8 bg-white p-6 md:p-12 rounded-3xl shadow-lg">
        {/* Left Side: Form */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-[#002060] mb-2">Contact Us</h2>
          <p className="text-gray-600 mb-8">
            Do you have a question? A complaint? Or need any help to choose the
            right product from Zalomi. Feel free to contact us
          </p>

          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Enter your first name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002060]"
              />
              <input
                type="text"
                placeholder="Enter your Last name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002060]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002060]"
              />
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <span className="bg-gray-100 p-3 text-gray-700 font-medium border-r border-gray-300">
                  +971
                </span>
                <input
                  type="tel"
                  placeholder="Enter your contact number"
                  className="w-full p-3 focus:outline-none"
                />
              </div>
            </div>
            <textarea
              placeholder="Enter your message"
              className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-[#002060]"
            ></textarea>
            <button className="bg-[#002060] text-white py-3 px-8 rounded-full hover:bg-blue-900 transition">
              Send a Message
            </button>
          </form>
        </div>

        {/* Right Side: Contact Info */}
        <div className="bg-[#002060] text-white p-8 rounded-3xl w-full md:w-80 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-6">
              Hi! We are always here to help you.
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-blue-950/50 p-4 rounded-xl">
                <FaPhoneAlt className="text-xl" />
                <div>
                  <p className="text-xs text-gray-300">Hotline:</p>
                  <p className="font-medium">+971 56 498 3456</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-blue-950/50 p-4 rounded-xl">
                <FaWhatsapp className="text-xl" />
                <div>
                  <p className="text-xs text-gray-300">SMS / Whatsapp</p>
                  <p className="font-medium">+971 55 343 6433</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-blue-950/50 p-4 rounded-xl">
                <FaEnvelope className="text-xl" />
                <div>
                  <p className="text-xs text-gray-300">Email:</p>
                  <p className="font-medium">support@zalomi.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-blue-800 pt-6">
            <p className="mb-4 text-sm">Connect with us</p>
            <div className="flex gap-4 text-xl">
              <FaFacebook /> <FaInstagram /> <FaSnapchat /> <FaTiktok />{" "}
              <FaTwitter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
