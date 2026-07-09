import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ImagePlus, MapPin, Save } from "lucide-react";
import { useApi } from "../context/ApiContext";

const AddDestination = () => {
  const navigate = useNavigate();
  const { createDestination, loading } = useApi();
  const [destCountry, setDestCountry] = useState("");
  const [destCities, setDestCities] = useState("");
  const [destDescription, setDestDescription] = useState("");
  const [destImageUrl, setDestImageUrl] = useState(null);
  const [preview, setPreview] = useState("");
 
  

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = new FormData();
    sendData.append("destCountry", destCountry);
    sendData.append("destDescription", destDescription);

    destCities
      .split(",")
      .map((city) => city.trim())
      .filter(Boolean)
      .forEach((city) => sendData.append("destCities", city));

    if (destImageUrl) {
      sendData.append("destImageUrl", destImageUrl);
    }

    const success = await createDestination(sendData);

    if (success) {
      navigate("/all-destinations");
    }
  };

  return (
  <div className="mx-auto min-w-3xl">
    <div className="">
      <Link
        to="/all-destinations"
        className="mb-4 flex items-center gap-2 text-sm text-gray-500"
      >
        <ArrowLeft size={18} />
        Back to destinations
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-(--primary)">Add Destination</h1>
        <p className="mt-1 text-gray-500">Fill the form and save your new destination.</p>
      </div>

      <div className="rounded-xl border border-(--gray-200) bg-(--white) p-6">
        <form onSubmit={handleSubmit} className="space-y-4 grow">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
              <MapPin size={16} />
              Country
            </label>
            <input
              type="text"
              name="destCountry"
              value={destCountry}
              onChange={(e) => setDestCountry(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
              placeholder="Country name"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Cities</label>
            <input
              type="text"
              name="destCities"
              value={destCities}
              onChange={(e) => setDestCities(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
              placeholder="Mogadishu, Hargeisa"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="destDescription"
              value={destDescription}
              onChange={(e) => setDestDescription(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
              placeholder="Write small description"
              required
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
              <ImagePlus size={16} />
              Image
            </label>
            <input
              type="file"
              name="destImageUrl"
              accept="image/*"
              onChange={(e) => {
                setDestImageUrl(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="h-48 w-full rounded-lg object-cover"
            />
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-(--secondary) px-4 py-2 text-(--white)"
            >
              <Save size={16} />
              {loading ? "Saving..." : "Save"}
            </button>

            <Link
              to="/all-destinations"
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

export default AddDestination;
