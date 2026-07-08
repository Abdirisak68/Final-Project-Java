import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaGlobe,
  FaMapMarkerAlt,
  FaImage,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
} from "react-icons/fa";

const API = "http://localhost:8080/api/destinations";
const inputClass =
  "mt-2 w-full p-3 rounded-xl border border-orange-200 focus:ring-2 focus:ring-orange-500 outline-none transition";

export default function Destination() {
  const [destinations, setDestinations] = useState([]);
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState("");
  const [form, setForm] = useState({
    destCountry: "",
    destDescription: "",
    destCities: "",
    destImageUrl: null,
  });
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = async () => {
    try {
      const res = await axios.get(API);
      setDestinations(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "destImageUrl") {
      setForm({ ...form, destImageUrl: e.target.files[0] });
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("destCountry", form.destCountry);
    fd.append("destDescription", form.destDescription);
    form.destCities
      .split(",")
      .map((c) => c.trim())
      .forEach((c) => fd.append("destCities", c));
    if (form.destImageUrl) fd.append("destImageUrl", form.destImageUrl);

    try {
      editId
        ? await axios.put(`${API}/${editId}`, fd, {
            headers: {
              ...config.headers,
              "Content-Type": "multipart/form-data",
            },
          })
        : await axios.post(API, fd, {
            headers: {
              ...config.headers,
              "Content-Type": "multipart/form-data",
            },
          });
      alert("Success");
      resetForm();
      loadDestinations();
    } catch (err) {
      console.log(err);
    }
  };

  const resetForm = () => {
    setEditId(null);
    setForm({
      destCountry: "",
      destDescription: "",
      destCities: "",
      destImageUrl: null,
    });
    setPreview("");
  };
  const handleEdit = (item) => {
    setEditId(item.destId);
    setForm({ ...item, destCities: item.destCities.join(", ") });
    setPreview("http://localhost:8080" + item.destImageUrl);
  };
  const handleDelete = async (id) => {
    if (window.confirm("Delete?")) {
      await axios.delete(`${API}/${id}`, config);
      loadDestinations();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 bg-gradient-to-r from-orange-500 to-orange-700 rounded-3xl p-8 text-white shadow-xl">
          <h1 className="text-4xl font-extrabold flex items-center gap-3">
            <FaGlobe /> Destination Management
          </h1>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-10 border border-orange-100">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            {editId ? (
              <FaEdit className="text-orange-600" />
            ) : (
              <FaPlus className="text-orange-600" />
            )}{" "}
            {editId ? "Update" : "Add"} Destination
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                name="destCountry"
                placeholder="Country"
                value={form.destCountry}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                type="text"
                name="destCities"
                placeholder="Cities (comma separated)"
                value={form.destCities}
                onChange={handleChange}
                className={inputClass}
              />
              <textarea
                name="destDescription"
                placeholder="Description"
                value={form.destDescription}
                onChange={handleChange}
                className={`${inputClass} md:col-span-2`}
              />
              <input
                type="file"
                name="destImageUrl"
                onChange={handleChange}
                className={`${inputClass} bg-orange-50`}
              />
            </div>
            {preview && (
              <img
                src={preview}
                className="mt-6 w-56 h-40 object-cover rounded-2xl border-4 border-orange-200"
                alt="Preview"
              />
            )}
            <div className="flex gap-4 mt-8">
              <button className="px-8 py-3 rounded-xl bg-orange-600 text-white font-bold flex items-center gap-2 shadow-lg">
                <FaSave /> {editId ? "Update" : "Save"}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-3 rounded-xl bg-gray-600 text-white flex items-center gap-2"
                >
                  <FaTimes /> Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden border border-orange-100">
          <div className="bg-orange-600 p-5 text-white">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaGlobe /> All Destinations
            </h2>
          </div>
          <table className="w-full">
            <thead className="bg-orange-50">
              <tr>
                <th className="p-4">Image</th>
                <th>Country</th>
                <th>Cities</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((item) => (
                <tr
                  key={item.destId}
                  className="border-b hover:bg-orange-50 text-center"
                >
                  <td className="p-4">
                    <img
                      src={`http://localhost:8080${item.destImageUrl}`}
                      className="w-24 h-16 object-cover rounded-xl mx-auto"
                      alt=""
                    />
                  </td>
                  <td className="font-bold text-gray-700">
                    {item.destCountry}
                  </td>
                  <td>
                    <div className="flex flex-wrap justify-center gap-2">
                      {item.destCities.map((c, i) => (
                        <span
                          key={i}
                          className="bg-orange-100 text-orange-700 px-3 rounded-full text-sm"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="text-gray-600 max-w-xs">
                    {item.destDescription}
                  </td>
                  <td>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-orange-500 text-white px-4 py-2 rounded-xl"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(item.destId)}
                        className="bg-red-500 text-white px-4 py-2 rounded-xl"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
