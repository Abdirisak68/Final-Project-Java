
import React, { useEffect, useState } from "react";
import { MapPin, Plane, Hotel, DollarSign, Calendar, Clock, Map } from "lucide-react";
import { useApi } from "../context/ApiContext";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Services() {
  const { destinations, packages, loading, getDestinations, getPackages } = useApi();
  const [showAllDestinations, setShowAllDestinations] = useState(false);
  const [showAllPackages, setShowAllPackages] = useState(false);

  useEffect(() => {
    getDestinations();
    getPackages();
  }, []);

  const visibleDestinations = showAllDestinations ? destinations : destinations.slice(0, 3);
  const visiblePackages = showAllPackages ? packages : packages.slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <span className="bg-orange-100 text-[var(--secondary)] px-4 py-2 rounded-full font-semibold">
            Our Services
          </span>
          <h1 className="text-5xl font-bold mt-6 text-[var(--primary)]">
            Explore Amazing Destinations & Packages
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Discover beautiful destinations and incredible travel packages
          </p>
        </div>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-[var(--primary)] mb-8">Popular Destinations</h2>
          
          {loading ? (
            <div className="text-center py-10 text-gray-500">Loading destinations...</div>
          ) : destinations.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl border border-[var(--gray-200)]">
              <h3 className="text-lg font-semibold text-[var(--primary)]">No destinations found</h3>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleDestinations.map((dest) => (
                  <div
                    key={dest.destId}
                    className="bg-white rounded-xl overflow-hidden border border-[var(--gray-200)] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="h-48 overflow-hidden">
                      {dest.destImageUrl ? (
                        <img
                          src={`${backendUrl}${dest.destImageUrl}`}
                          alt={dest.destCountry}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gray-100">
                          <Map className="text-gray-300" size={42} />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="text-[var(--secondary)]" size={18} />
                        <h3 className="text-xl font-bold text-[var(--primary)]">{dest.destCountry}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {dest.destCities?.map((city, index) => (
                          <span
                            key={`${city}-${index}`}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                          >
                            {city}
                          </span>
                        ))}
                      </div>
                      {dest.destDescription && (
                        <p className="text-gray-500 text-sm line-clamp-2">{dest.destDescription}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {destinations.length > 3 && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setShowAllDestinations(!showAllDestinations)}
                    className="bg-[var(--primary)] text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition"
                  >
                    {showAllDestinations ? "Show Less" : "See More Destinations"}
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        <section>
          <h2 className="text-3xl font-bold text-[var(--primary)] mb-8">Featured Packages</h2>
          
          {loading ? (
            <div className="text-center py-10 text-gray-500">Loading packages...</div>
          ) : packages.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl border border-[var(--gray-200)]">
              <h3 className="text-lg font-semibold text-[var(--primary)]">No packages found</h3>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visiblePackages.map((pkg) => (
                  <div
                    key={pkg.travelPackageId}
                    className="bg-white rounded-xl overflow-hidden border border-[var(--gray-200)] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-[var(--primary)] mb-2">{pkg.packageName}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pkg.packageDescription}</p>
                      
                      <div className="space-y-3 mb-4">
                        {pkg.destination && (
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <MapPin size={16} className="text-[var(--secondary)]" />
                            <span>{pkg.destination.destCountry}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <DollarSign size={16} className="text-[var(--secondary)]" />
                          <span className="font-bold text-[var(--primary)] text-lg">${pkg.price?.toFixed(2)}</span>
                          <span className="text-gray-500">• {pkg.durationDays} days</span>
                        </div>
                        
                        <div className="border-t border-[var(--gray-200)] pt-3 space-y-2">
                          {pkg.airline && (
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Plane size={14} className="text-[var(--primary)]" />
                              <span>{pkg.airline}</span>
                            </div>
                          )}
                          {pkg.departureDate && (
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Calendar size={14} className="text-[var(--primary)]" />
                              <span>{new Date(pkg.departureDate).toLocaleDateString()}</span>
                            </div>
                          )}
                          {pkg.departureTime && (
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Clock size={14} className="text-[var(--primary)]" />
                              <span>{pkg.departureTime}</span>
                            </div>
                          )}
                          {pkg.hotelName && (
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Hotel size={14} className="text-[var(--primary)]" />
                              <span>{pkg.hotelName}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 ${pkg.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        <span className="text-xs font-semibold">
                          {pkg.available ? "Available" : "Unavailable"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {packages.length > 3 && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setShowAllPackages(!showAllPackages)}
                    className="bg-[var(--primary)] text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition"
                  >
                    {showAllPackages ? "Show Less" : "See More Packages"}
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default Services;
