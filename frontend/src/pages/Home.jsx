import React from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaSearch,
} from "react-icons/fa";

function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto  py-16">
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
              <button className="bg-[var(--primary)] text-white px-8 py-4 rounded-xl hover:opacity-90 transition">
                Explore Now
              </button>

              <button className="border-2 border-[var(--primary)] text-[var(--primary)] px-8 py-4 rounded-xl hover:bg-[var(--primary)] hover:text-white transition">
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

        {/* Search Card */}
        <div className="bg-white rounded-3xl shadow-2xl mt-16 p-6">
          <div className="grid lg:grid-cols-4 gap-6">
            <div>
              <label className="font-semibold text-gray-700">Location</label>

              <div className="flex items-center gap-3 mt-3 border rounded-xl px-4 py-3">
                <FaMapMarkerAlt className="text-[var(--secondary)]" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="outline-none w-full"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Date</label>

              <div className="flex items-center gap-3 mt-3 border rounded-xl px-4 py-3">
                <FaCalendarAlt className="text-[var(--secondary)]" />
                <input type="date" className="outline-none w-full" />
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Guests</label>

              <div className="flex items-center gap-3 mt-3 border rounded-xl px-4 py-3">
                <FaUsers className="text-[var(--secondary)]" />
                <select className="outline-none w-full">
                  <option>1 Person</option>
                  <option>2 Persons</option>
                  <option>3 Persons</option>
                  <option>4 Persons</option>
                </select>
              </div>
            </div>

            <div className="flex items-end">
              <button className="w-full bg-[var(--primary)] hover:bg-blue-900 text-white rounded-xl py-4 flex justify-center items-center gap-3 text-lg font-semibold transition">
                <FaSearch />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
