import React from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaSearch,
  FaShieldAlt,
  FaTags,
  FaHeadset,
  FaQuoteRight,
  FaStar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto   py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div>
            <span className="bg-orange-100 text-[var(--secondary)] px-4 py-2 rounded-full font-semibold">
              ✈ Discover The World
            </span>

            <h1 className="text-6xl font-bold leading-tight mt-6 text-[var(--primary)]">
              Visit The Most
              <br />
              <span className="text-[var(--secondary)]">Beautiful Places</span>
              <br />
              In The World
            </h1>

            <p className="text-gray-600 mt-6 text-lg leading-8 max-w-xl">
              Plan and book your perfect trip with expert advice, travel tips,
              destination information and unforgettable experiences around the
              world.
            </p>

            <div className="flex gap-4 mt-10">
              <button
                onClick={() => navigate("/services")}
                className="bg-[var(--primary)] text-white px-8 py-4 rounded-xl hover:opacity-90 transition">
                Explore Now
              </button>

              <button
              onClick={()=> navigate("/about")}
              className="border-2 border-[var(--primary)] text-[var(--primary)] px-8 py-4 rounded-xl hover:bg-[var(--primary)] hover:text-white transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side Images */}
          <div className="grid grid-cols-3 gap-4">
            <img
              src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600"
              className="rounded-[35px] h-72 object-cover shadow-xl"
            />

            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600"
              className="rounded-[35px] h-48 mt-10 object-cover shadow-xl"
            />

            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600"
              className="rounded-[35px] h-64 object-cover shadow-xl"
            />

            <img
              src="https://i.pinimg.com/736x/f9/f2/bf/f9f2bf2f5557495a74a2651bf344fa7b.jpg"
              className="rounded-[35px] h-48 object-cover shadow-xl"
            />

            <img
              src="https://i.pinimg.com/1200x/ef/4a/24/ef4a243745b94b1b4da7e6b44726892a.jpg"
              className="rounded-[35px] h-60 object-cover shadow-xl"
            />

            <img
              src="https://i.pinimg.com/1200x/2b/54/a5/2b54a5994396f5da2090b3de377392c7.jpg"
              className="rounded-[35px] h-72 object-cover shadow-xl"
            />
          </div>
        </div>



        {/* Achievements Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[var(--primary)]">Our Track Record</h2>
            <p className="text-gray-600 mt-4 text-lg">A quick glance at our trusted legacy</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <h3 className="text-5xl font-bold text-[var(--secondary)] mb-2">10K+</h3>
              <p className="text-gray-600 text-lg font-medium">Happy Travelers</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <h3 className="text-5xl font-bold text-[var(--secondary)] mb-2">50+</h3>
              <p className="text-gray-600 text-lg font-medium">Global Destinations</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <h3 className="text-5xl font-bold text-[var(--secondary)] mb-2">5+</h3>
              <p className="text-gray-600 text-lg font-medium">Years of Excellence</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[var(--primary)]">Why Choose Us</h2>
            <p className="text-gray-600 mt-4 text-lg">Reliable, transparent, and unforgettable travel experiences.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-2xl text-[var(--primary)]">
                <FaShieldAlt />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Unmatched Security</h3>
              <p className="text-gray-600 leading-relaxed">
                Your safety is our top priority. We ensure 100% secure bookings and trusted travel partners.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-2xl text-[var(--secondary)]">
                <FaTags />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Best Value Guarantee</h3>
              <p className="text-gray-600 leading-relaxed">
                We offer highly competitive pricing without ever compromising on the quality of your trip.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-2xl text-green-600">
                <FaHeadset />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">24/7 Dedicated Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Our expert travel concierges are on standby around the clock to assist you anywhere, anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-24 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[var(--primary)]">What Our Clients Say</h2>
            <p className="text-gray-600 mt-4 text-lg">Real experiences from our global travelers</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl relative">
              <div className="text-5xl text-orange-200 absolute top-4 right-8">
                <FaQuoteRight />
              </div>
              <div className="flex gap-1 text-yellow-400 mb-6 text-sm">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p className="text-gray-600 italic text-lg mb-6 relative z-10">
                "My recent trip was absolutely incredible. The service was top-notch, and they took care of every detail from start to finish. Highly recommended!"
              </p>
              <div className="flex items-center gap-4 mt-6 border-t pt-6">
                <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400" className="w-full h-full object-cover" alt="Ahmed Jama" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">Ahmed Jama</h4>
                  <p className="text-gray-500 text-sm">Entrepreneur, Mogadishu</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl relative">
              <div className="text-5xl text-orange-200 absolute top-4 right-8">
                <FaQuoteRight />
              </div>
              <div className="flex gap-1 text-yellow-400 mb-6 text-sm">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p className="text-gray-600 italic text-lg mb-6 relative z-10">
                "A truly reliable company. The pricing is very reasonable, and the staff is incredibly polite and always ready to help. I will definitely travel with them again."
              </p>
              <div className="flex items-center gap-4 mt-6 border-t pt-6">
                <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" className="w-full h-full object-cover" alt="Fadumo Ali" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">Fadumo Ali</h4>
                  <p className="text-gray-500 text-sm">Student, Hargeisa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
