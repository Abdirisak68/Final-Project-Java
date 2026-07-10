import React from "react";
import {
  FaMapMarkedAlt,
  FaUserTie,
  FaCreditCard,
  FaStar,
} from "react-icons/fa";

function About() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top */}

        <div className="grid lg:grid-cols-4 gap-6 mb-24">
          <div>
            <p className="text-[var(--secondary)] font-semibold uppercase">
              What We Give
            </p>

            <h2 className="text-5xl font-bold mt-3 text-[var(--primary)]">
              Best Features
              <br />
              For You
            </h2>

            <p className="text-gray-500 mt-5">
              Discover amazing destinations with trusted guides, secure booking
              and unforgettable travel experiences.
            </p>
          </div>

          {/* Card */}

          <div className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-[var(--primary)] text-2xl">
              <FaMapMarkedAlt />
            </div>

            <h3 className="font-bold text-xl mt-5">Best Destinations</h3>

            <p className="text-gray-500 mt-3">
              Explore beautiful places around the world at affordable prices.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition">
            <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-[var(--secondary)] text-2xl">
              <FaUserTie />
            </div>

            <h3 className="font-bold text-xl mt-5">Tour Guides</h3>

            <p className="text-gray-500 mt-3">
              Friendly and experienced guides to make every trip memorable.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl">
              <FaCreditCard />
            </div>

            <h3 className="font-bold text-xl mt-5">Easy Booking</h3>

            <p className="text-gray-500 mt-3">
              Secure payments and quick online booking in just a few clicks.
            </p>
          </div>
        </div>

        {/* Bottom */}

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Images */}

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800"
              className="rounded-[60px] w-80 h-[420px] object-cover shadow-xl"
              alt=""
            />

            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
              className="absolute bottom-0 right-0 w-56 h-72 rounded-[50px] object-cover shadow-xl border-8 border-white"
              alt=""
            />
          </div>

          {/* Text */}

          <div>
            <p className="text-[var(--secondary)] font-semibold uppercase">
              Why Choose Us
            </p>

            <h2 className="text-5xl font-bold mt-3 text-[var(--primary)] leading-tight">
              What Our Customers
              <br />
              Say About Us
            </h2>

            <div className="bg-gray-50 rounded-3xl p-8 mt-10 shadow-lg">
              <div className="flex items-center gap-4">
                <img
                  src="https://i.pravatar.cc/100"
                  className="w-16 h-16 rounded-full"
                  alt=""
                />

                <div>
                  <h3 className="font-bold text-xl">Ahmed Hassan</h3>

                  <p className="text-gray-500">Travel Enthusiast</p>
                </div>
              </div>

              <p className="text-gray-600 mt-6 leading-8">
                "Amazing experience! The booking process was simple, the
                destinations were beautiful and the guides were very
                professional. I highly recommend TravelGo."
              </p>

              <div className="flex gap-2 mt-5 text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
