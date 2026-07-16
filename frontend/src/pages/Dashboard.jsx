import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/bookings/my`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBookings(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handleCancel = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "Cancelled" }
            : booking
        )
      );

      toast.success("Booking Cancelled successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to cancel booking.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-8">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center text-gray-500 text-xl mt-10">
          You haven't made any bookings yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <img
                src={booking.vehicle.image}
                alt={booking.vehicle.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <h2 className="text-2xl font-bold">
                {booking.vehicle.name}
              </h2>

              <p className="text-gray-500">
                {booking.vehicle.location}
              </p>

              <div className="mt-4 space-y-2">

                <p>
                  <strong>Pickup:</strong>{" "}
                  {new Date(booking.pickupDate).toLocaleDateString()}
                </p>

                <p>
                  <strong>Return:</strong>{" "}
                  {new Date(booking.returnDate).toLocaleDateString()}
                </p>

                <p>
                  <strong>Pickup Location:</strong>{" "}
                  {booking.pickupLocation}
                </p>

                <p>
                  <strong>Total Price:</strong>{" "}
                  ₹{booking.totalPrice}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`font-semibold ${booking.status === "Cancelled"
                    ? "text-red-600"
                    : "text-green-600"
                    }`}>
                    {booking.status}
                  </span>
                </p>

                <p>
                  <strong>Payment Method:</strong> {booking.paymentMethod}
                </p>

                <p>
                  <strong>Transaction ID:</strong> {booking.transactionId}
                </p>

                <p>
                  <strong>Payment Status:</strong>
                  <span className="text-green-600 font-semibold">
                    {booking.paymentStatus}
                  </span>
                </p>
                {booking.status !== "Cancelled" && (
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Cancel Booking
                  </button>
                )}

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;