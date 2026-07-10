import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, Plus, MapPin, Plane, Hotel, Calendar, Clock, DollarSign, CheckCircle2, XCircle } from "lucide-react";
import { useApi } from "../context/ApiContext";

const AllPackages = () => {
  const { packages, loading, getPackages, updatePackage, deletePackage } = useApi();

  useEffect(() => {
    getPackages();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this package?");

    if (confirmed) {
      await deletePackage(id);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-(--primary)">All Packages</h1>
          <p className="mt-1 text-gray-500">Manage your travel packages</p>
        </div>

        <Link
          to="/add-package"
          className="flex items-center gap-2 rounded-lg bg-(--secondary) px-4 py-2 text-(--white) transition-all hover:opacity-90"
        >
          <Plus size={18} />
          Add Package
        </Link>
      </div>

      {loading ? (
        <div className="rounded-xl border border-(--gray-200) bg-(--white) p-10 text-center text-gray-500">
          Loading packages...
        </div>
      ) : packages.length === 0 ? (
        <div className="rounded-xl border border-(--gray-200) bg-(--white) p-10 text-center">
          <Plane size={44} className="mx-auto mb-3 text-gray-300" />
          <h2 className="text-lg font-semibold text-(--primary)">No packages found</h2>
          <p className="mt-1 text-sm text-gray-500">Add your first travel package to start.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.travelPackageId}
              className="overflow-hidden rounded-xl border border-(--gray-200) bg-(--white) shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-(--primary) mb-1">{pkg.packageName}</h2>
                    <p className="text-sm text-gray-600 line-clamp-2">{pkg.packageDescription}</p>
                  </div>
                  <div className={`flex items-center gap-1 rounded-full px-2.5 py-1 ${pkg.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {pkg.available ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      <XCircle size={14} />
                    )}
                    <span className="text-xs font-semibold">
                      {pkg.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-5">
                  {pkg.destination && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <MapPin size={16} className="text-(--secondary)" />
                      <span>{pkg.destination.destCountry}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <DollarSign size={16} className="text-(--secondary)" />
                    <span className="font-bold text-(--primary) text-lg">${pkg.price?.toFixed(2)}</span>
                    <span className="text-gray-500">• {pkg.durationDays} days</span>
                  </div>

                  <div className="border-t border-(--gray-200) pt-3 space-y-2">
                    {pkg.airline && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Plane size={14} className="text-(--primary)" />
                        <span>{pkg.airline}</span>
                      </div>
                    )}
                    {pkg.departureLocation && pkg.arrivalLocation && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Plane size={14} className="text-(--primary)" />
                        <span>{pkg.departureLocation} → {pkg.arrivalLocation}</span>
                      </div>
                    )}
                    {pkg.departureDate && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Calendar size={14} className="text-(--primary)" />
                        <span>{new Date(pkg.departureDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    {pkg.departureTime && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Clock size={14} className="text-(--primary)" />
                        <span>{pkg.departureTime}</span>
                      </div>
                    )}
                    {pkg.hotelName && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Hotel size={14} className="text-(--primary)" />
                        <span>{pkg.hotelName} • {pkg.roomType} • {pkg.numberOfNights} nights</span>
                      </div>

                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    to="/add-package"
                    state={{ editPackage: pkg }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-(--primary) px-3 py-2 text-sm font-medium text-(--white) hover:opacity-90 transition-all"
                  >
                    <Edit size={16} />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(pkg.travelPackageId)}
                    className="rounded-lg bg-red-50 px-3 py-2 text-red-600 hover:bg-red-100 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPackages;


