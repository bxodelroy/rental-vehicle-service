import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Booking = () => {
  const { id } = useParams();

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [vehicle, setVehicle] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {

    const fetchVehicle = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/vehicles/${id}`
        );

        setVehicle(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVehicle();
  }, [id]);

  if (!vehicle) {
    return <h1 className="text-center mt-20">Loading...</h1>;
  }

  let totalDays = 0;
  if (pickupDate && returnDate) {
    const start = new Date(pickupDate);
    const end = new Date(returnDate);

    totalDays = Math.ceil(
      (end - start) / (1000 * 60 * 60 * 24)
    );
  }

  const totalPrice =
    totalDays > 0
      ? totalDays * vehicle.pricePerDay
      : 0;



  const handleBooking = async () => {
    try {
      const bookingData = {
        vehicle: vehicle._id,
        pickupDate,
        returnDate,
        pickupLocation,
        totalPrice,
        paymentMethod,
        paymentMethod: "UPI",
        paymentStatus: "Paid",
        transactionId: `TXN-${Date.now()}`,
      };

      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/bookings`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookingSuccess(true);
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Booking Failed.");
    }
  };
  //console.log(new Date().toISOString().split("T")[0]);
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">

      <h1 className="text-4xl font-bold mb-8">
        Book {vehicle.name}
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-8 space-y-6">

        <div>
          <label className="block mb-2 font-medium">
            Pickup Date
          </label>

          <input
            type="date"
            value={pickupDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setPickupDate(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Return Date
          </label>

          <input
            type="date"
            value={returnDate}
            min={pickupDate || new Date().toISOString().split("T")[0]}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Pickup Location
          </label>

          <input
            type="text"
            placeholder="Enter pickup location"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Payment Method
          </label>

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Payment Method</option>
            <option value="UPI">UPI</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Net Banking">Net Banking</option>
          </select>
        </div>

        <div className="bg-gray-100 rounded-lg p-5 space-y-3">

          <h2 className="text-xl font-semibold">
            Booking Summary
          </h2>

          <p>
            Vehicle:
            <span className="font-semibold">
              {" "}{vehicle.name}
            </span>
          </p>

          <p>
            Pickup:
            <span className="font-semibold">
              {" "}{pickupDate || "-"}
            </span>
          </p>

          <p>
            Return:
            <span className="font-semibold">
              {" "}{returnDate || "-"}
            </span>
          </p>

          <p>
            Rental Days:
            <span className="font-semibold">
              {" "}{totalDays}
            </span>
          </p>

          <p>
            Price Per Day:
            <span className="font-semibold">
              {" "}₹{vehicle.pricePerDay}
            </span>
          </p>

          <p className="text-xl font-bold">
            Total:
            <span className="text-green-600">
              {" "}₹{totalPrice}
            </span>
          </p>


        </div>

        <button
          onClick={handleBooking}
          disabled={
            !pickupDate ||
            !returnDate ||
            !pickupLocation ||
            !paymentMethod ||
            totalDays <= 0
          }
          className={`w-full py-3 rounded-lg transition ${!pickupDate ||
            !returnDate ||
            !pickupLocation ||
            !paymentMethod ||
            totalDays <= 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-800"
            }`}
        >
          Confirm Booking
        </button>

        {bookingSuccess && (
          <div className="mt-6 rounded-lg bg-green-100 border border-green-300 p-4 text-green-700">
            Booking confirmed successfully!
          </div>
        )}

      </div>

    </div>
  );
};

export default Booking;