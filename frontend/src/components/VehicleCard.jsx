import { Link } from "react-router-dom";

const VehicleCard = ({ vehicle }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">

            <img
                src={vehicle.image}
                alt={vehicle.name}
                className="h-52 w-full object-cover"
            />

            <div className="p-5">

                <h2 className="text-xl font-semibold">
                    {vehicle.name}
                </h2>

                <p className="text-gray-500 mt-2">
                    {vehicle.location}
                </p>

                <p className="font-bold text-lg mt-3">
                    ₹{vehicle.pricePerDay}/day
                </p>

                <Link
                    to={`/vehicle/${vehicle._id}`}
                    className="block mt-5 w-full bg-black text-white py-2 rounded-lg text-center hover:bg-gray-800 transition"
                >
                    View Details
                </Link>

            </div>

        </div>
    );
};

export default VehicleCard;