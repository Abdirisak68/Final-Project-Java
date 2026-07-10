import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Save, Package } from "lucide-react";
import { useApi } from "../context/ApiContext";
import { toast } from "react-toastify";
import { is } from "zod/v4/locales";

const AddPackage = () => {
  const navigate = useNavigate();
    const location = useLocation();
  const editPackage = location.state?.editPackage;
  const isEditing = !!editPackage;
  const { createPackage, getDestinations, updatePackage, destinations, loading } = useApi();

  const [formData, setFormData] = useState({
    packageName: "",
    packageDescription: "",
    destinationId: "",
    price: "",
    durationDays: "",
    airline: "",
    departureLocation: "",
    arrivalLocation: "",
    departureDate: "",
    departureTime: "",
    hotelName: "",
    roomType: "",
    numberOfNights: "",
    available: true,
  });

  useEffect(() => {
    getDestinations();
    if (isEditing && editPackage) {
      setFormData({
        packageName: editPackage.packageName || "",
        packageDescription: editPackage.packageDescription || "",
        destinationId: editPackage.destination?.destId?.toString() || "",
        price: editPackage.price?.toString() || "",
        durationDays: editPackage.durationDays?.toString() || "",
        airline: editPackage.airline || "",
        departureLocation: editPackage.departureLocation || "",
        arrivalLocation: editPackage.arrivalLocation || "",
        departureDate: editPackage.departureDate || "",
        departureTime: editPackage.departureTime || "",
        hotelName: editPackage.hotelName || "",
        roomType: editPackage.roomType || "",
        numberOfNights: editPackage.numberOfNights?.toString() || "",
        available: editPackage.available,
      });
    }
  }, [isEditing, editPackage]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = {
      ...formData,
      price: parseFloat(formData.price),
      durationDays: parseInt(formData.durationDays),
      numberOfNights: parseInt(formData.numberOfNights),
      destinationId: parseInt(formData.destinationId),
    };

    let success;
    if (isEditing) {
      success = await updatePackage(editPackage.travelPackageId, sendData);
    } else {
      success = await createPackage(sendData);
    }

    if (success) {
      navigate("/all-packages");
    }
  };

  return (
    <div className="mx-auto min-w-3xl">
      <div>
        <Link
          to="/all-packages"
          className="mb-4 flex items-center gap-2 text-sm text-gray-500"
        >
          <ArrowLeft size={18} />
          Back to packages
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-(--primary)">
            {isEditing ? "Edit Package" : "Add New Package"}
          </h1>
          <p className="mt-1 text-gray-500">
            {isEditing ? "Update your package details below." : "Fill the form and save your new package."}
          </p>
        </div>

        <div className="rounded-xl border border-(--gray-200) bg-(--white) p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Package Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Package size={16} />
                  Package Name
                </label>
                <input
                  type="text"
                  name="packageName"
                  value={formData.packageName}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
                  placeholder="Enter package name"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Destination
                </label>
                <select
                  name="destinationId"
                  value={formData.destinationId}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
                  required
                >
                  <option value="">Select a destination</option>
                  {destinations.map((dest) => (
                    <option key={dest.destId} value={dest.destId}>
                      {dest.destCountry} - {dest.destCities.join(", ")}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="packageDescription"
                value={formData.packageDescription}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
                placeholder="Enter package description"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
                  placeholder="Enter price"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Duration (Days)
                </label>
                <input
                  type="number"
                  name="durationDays"
                  min="1"
                  value={formData.durationDays}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
                  placeholder="Enter duration in days"
                  required
                />
              </div>
            </div>

            {/* Flight Info */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Flight Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Airline
                  </label>
                  <input
                    type="text"
                    name="airline"
                    value={formData.airline}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
                    placeholder="Enter airline name"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Departure Location
                  </label>
                  <input
                    type="text"
                    name="departureLocation"
                    value={formData.departureLocation}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
                    placeholder="Enter departure location"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Arrival Location
                  </label>
                  <input
                    type="text"
                    name="arrivalLocation"
                    value={formData.arrivalLocation}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
                    placeholder="Enter arrival location"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Departure Date
                  </label>
                  <input
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Departure Time
                  </label>
                  <input
                    type="time"
                    name="departureTime"
                    value={formData.departureTime}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Hotel Info */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Hotel Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Hotel Name
                  </label>
                  <input
                    type="text"
                    name="hotelName"
                    value={formData.hotelName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
                    placeholder="Enter hotel name"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Room Type
                  </label>
                  <input
                    type="text"
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
                    placeholder="Enter room type"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Number of Nights
                  </label>
                  <input
                    type="number"
                    name="numberOfNights"
                    min="1"
                    value={formData.numberOfNights}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
                    placeholder="Enter number of nights"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="available"
                id="available"
                checked={formData.available}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <label
                htmlFor="available"
                className="text-sm font-medium text-gray-700"
              >
                Available
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-(--secondary) px-4 py-2 text-(--white)"
              >
                <Save size={16} />
                {loading ?(isEditing ? "Updating..." : "Saving...") : (isEditing ? "Update Package" : "Save Package")}
              </button>

              <Link
                to="/all-packages"
                className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPackage;
