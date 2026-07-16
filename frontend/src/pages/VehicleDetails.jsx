import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const VehicleDetails = () => {
  const { id } = useParams();

  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/vehicles/${id}`
        );

        setVehicle(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVehicle();
  }, [id]);

  if (!vehicle) {
    return (
      <h1 className="text-center text-2xl mt-20">
        Loading...
      </h1>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      <img
        src={vehicle.image}
        alt={vehicle.name}
        className="w-full h-[450px] object-cover rounded-xl"
      />

      <h1 className="text-4xl font-bold mt-8">
        {vehicle.name}
      </h1>

      <p className="text-gray-500 mt-3">
        Location: {vehicle.location}
      </p>

      <h2 className="text-2xl font-semibold mt-6">
        ₹{vehicle.pricePerDay}/day
      </h2>

      <p className="mt-6 text-gray-700 leading-8">
        {vehicle.description}
      </p>

      <Link
        to={`/booking/${vehicle._id}`}
        className="inline-block mt-8 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Book Now
      </Link>

    </div>
  );
};

export default VehicleDetails;