import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, ImagePlus, Map, MapPin, Plus, Trash2, X } from "lucide-react";
import { useApi } from "../context/ApiContext";
import DeleteConfirmation from "../components/DeleteConfirmation";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const emptyForm = {
  destCountry: "",
  destCities: "",
  destDescription: "",
  destImageUrl: null,
};

const AllDestinations = () => {
  const { destinations, loading, getDestinations, updateDestination, deleteDestination } =
    useApi();
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [preview, setPreview] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  useEffect(() => {
    getDestinations();
  }, []);

  const closeModal = () => {
    setOpenModal(false);
    setEditId(null);
    setFormData(emptyForm);
    setPreview("");
  };

  const handleEditClick = (item) => {
    setEditId(item.destId);
    setFormData({
      destCountry: item.destCountry || "",
      destCities: item.destCities?.join(", ") || "",
      destDescription: item.destDescription || "",
      destImageUrl: null,
    });
    setPreview(item.destImageUrl ? `${backendUrl}${item.destImageUrl}` : "");
    setOpenModal(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "destImageUrl" && files?.[0]) {
      setFormData((prev) => ({ ...prev, destImageUrl: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = new FormData();
    sendData.append("destCountry", formData.destCountry);
    sendData.append("destDescription", formData.destDescription);

    formData.destCities
      .split(",")
      .map((city) => city.trim())
      .filter(Boolean)
      .forEach((city) => sendData.append("destCities", city));

    if (formData.destImageUrl) {
      sendData.append("destImageUrl", formData.destImageUrl);
    }

    const success = await updateDestination(editId, sendData);

    if (success) {
      closeModal();
    }
  };

  const handleDeleteClick = (item) => {
    setDeleteItem(item);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (deleteItem) {
      await deleteDestination(deleteItem.destId);
      setDeleteModal(false);
      setDeleteItem(null);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-(--primary)">All Destinations</h1>
          <p className="mt-1 text-gray-500">Simple list of your destinations</p>
        </div>

        <Link
          to="/add-destination"
          className="flex items-center gap-2 rounded-lg bg-(--secondary) px-4 py-2 text-(--white) transition-all hover:bg-(--secondary-hover)"
        >
          <Plus size={18} />
          Add Destination
        </Link>
      </div>

      {loading ? (
        <div className="rounded-xl border border-(--gray-200) bg-(--white) p-10 text-center text-gray-500">
          Loading destinations...
        </div>
      ) : destinations.length === 0 ? (
        <div className="rounded-xl border border-(--gray-200) bg-(--white) p-10 text-center">
          <MapPin size={44} className="mx-auto mb-3 text-gray-300" />
          <h2 className="text-lg font-semibold text-(--primary)">No destinations found</h2>
          <p className="mt-1 text-sm text-gray-500">Add your first destination to start.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {destinations.map((item) => (
            <div
              key={item.destId}
              className="overflow-hidden rounded-xl border border-(--gray-200) bg-(--white)"
            >
              <div className="h-44 bg-gray-100">
                {item.destImageUrl ? (
                  <img
                    src={`${backendUrl}${item.destImageUrl}`}
                    alt={item.destCountry}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Map className="text-gray-300" size={42} />
                  </div>
                )}
              </div>

              <div className="space-y-4 p-4">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-(--secondary)" />
                  <h2 className="text-lg font-semibold text-(--primary)">
                    {item.destCountry}
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.destCities?.map((city, index) => (
                    <span
                      key={`${city}-${index}`}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                    >
                      {city}
                    </span>
                  ))}
                </div>

                <p className="line-clamp-3 text-sm text-gray-600">{item.destDescription}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-(--primary) px-3 py-2 text-(--white)"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item)}
                    className="rounded-lg bg-red-50 px-3 py-2 text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-(--white) p-6 shadow-lg">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-(--primary)">Edit Destination</h2>
              <button onClick={closeModal} className="rounded-lg p-2 text-gray-500 hover:cursor-pointer hover:bg-(--gray-100)">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="destCountry"
                value={formData.destCountry}
                onChange={handleChange}
                placeholder="Country"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
                required
              />

              <input
                type="text"
                name="destCities"
                value={formData.destCities}
                onChange={handleChange}
                placeholder="Cities separated by comma"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
                required
              />

              <textarea
                name="destDescription"
                value={formData.destDescription}
                onChange={handleChange}
                rows={4}
                placeholder="Description"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
                required
              />

              <label className="block rounded-lg border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500">
                <input
                  type="file"
                  name="destImageUrl"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
                <div className="flex items-center justify-center gap-2">
                  <ImagePlus size={16} />
                  Change image
                </div>
              </label>

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-40 w-full rounded-lg object-cover"
                />
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-(--secondary) px-4 py-2 text-(--white)"
                >
                  {loading ? "Saving..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmation
        isOpen={deleteModal}
        onClose={() => { setDeleteModal(false); setDeleteItem(null); }}
        onConfirm={confirmDelete}
        itemName={deleteItem?.destCountry || "this destination"}
      />
    </div>
  );
};

export default AllDestinations;
