import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    type: "",
    pricePerDay: "",
    transmission: "",
    fuelType: "",
    seats: "",
    location: "",
    image: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchVehicles();
    fetchBookings();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data } = await axios.get(
        (`${import.meta.env.VITE_API_URL}/api/vehicles`)
      );

      setVehicles(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/vehicles/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setVehicles((prev) =>
        prev.filter((vehicle) => vehicle._id !== id)
      );

      toast.success("Vehicle deleted successfully!");
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to delete vehicle.");
    }
  };

  const handleStatusChange = async (bookingId, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchBookings();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update booking status.");
    }
  };

  const handleEdit = (vehicle) => {
    setEditingId(vehicle._id);

    setFormData({
      name: vehicle.name,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      type: vehicle.type,
      pricePerDay: vehicle.pricePerDay,
      transmission: vehicle.transmission,
      fuelType: vehicle.fuelType,
      seats: vehicle.seats,
      location: vehicle.location,
      image: vehicle.image,
      description: vehicle.description,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      let data;

      if (editingId) {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/vehicles/${editingId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        data = response.data;

        setVehicles((prev) =>
          prev.map((vehicle) =>
            vehicle._id === editingId ? data : vehicle
          )
        );

        setEditingId(null);

      } else {

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/vehicles`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        data = response.data;

        setVehicles((prev) => [...prev, data]);
      }

      setFormData({
        name: "",
        brand: "",
        model: "",
        year: "",
        type: "",
        pricePerDay: "",
        transmission: "",
        fuelType: "",
        seats: "",
        location: "",
        image: "",
        description: "",
      });
      setEditingId(null);

      toast.success("Vehicle added successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add vehicle.");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold">
            Admin Dashboard
          </h1>


          <Link
            to="/admin/rental-history"
            className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Rental History
          </Link>

        </div>

        <form
          onSubmit={handleAddVehicle}
          className="bg-white shadow-lg rounded-xl p-6 mb-10"
        >
          <h2 className="text-2xl font-bold mb-6">
            Add New Vehicle
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              name="name"
              placeholder="Vehicle Name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />

            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={formData.brand}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />

            <input
              type="text"
              name="model"
              placeholder="Model"
              value={formData.model}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />

            <input
              type="number"
              name="year"
              placeholder="Year"
              value={formData.year}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />

            <input
              type="text"
              name="type"
              placeholder="Type (SUV, Car, Bike)"
              value={formData.type}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />

            <input
              type="number"
              name="pricePerDay"
              placeholder="Price Per Day"
              value={formData.pricePerDay}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />

            <input
              type="text"
              name="transmission"
              placeholder="Transmission"
              value={formData.transmission}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />

            <input
              type="text"
              name="fuelType"
              placeholder="Fuel Type"
              value={formData.fuelType}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />

            <input
              type="number"
              name="seats"
              placeholder="Seats"
              value={formData.seats}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="border rounded-lg p-3 md:col-span-2"
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border rounded-lg p-3 md:col-span-2"
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            {editingId ? "Update Vehicle" : "Add Vehicle"}
          </button>
        </form>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">
            All Vehicles
          </h2>

          <span className="bg-black text-white px-4 py-2 rounded-full">
            {vehicles.length} Vehicles
          </span>
        </div>

        {vehicles.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl shadow">
            No vehicles available.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle._id}
                className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 hover:shadow-xl transition"
              >
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-48 object-cover rounded-lg"
                />

                <h3 className="text-xl font-bold mt-4">
                  {vehicle.name}
                </h3>

                <p className="text-gray-600">
                  {vehicle.brand}
                </p>

                <p className="text-gray-600">
                  {vehicle.location}
                </p>

                <p className="font-semibold mt-2">
                  ₹{vehicle.pricePerDay}/day
                </p>

                <button
                  onClick={() => handleEdit(vehicle)}
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                  Edit Vehicle
                </button>

                <button
                  onClick={() => handleDelete(vehicle._id)}
                  className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                >
                  Delete Vehicle
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">
              All Bookings
            </h2>

            <span className="bg-black text-white px-4 py-2 rounded-full">
              {bookings.length} Bookings
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {bookings.map((booking) => {
              console.log(booking);

              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition duration-300"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {booking.vehicle.name}
                  </h3>
                  <hr className="my-3" />

                  <p className="mb-2 text-gray-700">
                    <strong>User:</strong>{" "}
                    {booking.user.name}
                  </p>

                  <p className="mb-2 text-gray-700">
                    <strong>Email:</strong>{" "}
                    {booking.user.email}
                  </p>

                  <p className="mb-2 text-gray-700">
                    <strong>Pickup:</strong>{" "}
                    {new Date(
                      booking.pickupDate
                    ).toLocaleDateString()}
                  </p>

                  <p className="mb-2 text-gray-700">
                    <strong>Return:</strong>{" "}
                    {new Date(
                      booking.returnDate
                    ).toLocaleDateString()}
                  </p>

                  <p className="mb-2 text-gray-700">
                    <strong>Total:</strong> ₹
                    {booking.totalPrice}
                  </p>

                  <div className="mt-3">
                    <label className="font-semibold">
                      Status
                    </label>

                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(
                          booking._id,
                          e.target.value
                        )
                      }
                      className="mt-1 w-full border rounded-lg p-2"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;