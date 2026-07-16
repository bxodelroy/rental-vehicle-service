import SearchBar from "../components/SearchBar";
import VehicleCard from "../components/VehicleCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";


const Home = () => {

    const [vehicles, setVehicles] = useState([]);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [sort, setSort] = useState("");
    const [filteredVehicles, setFilteredVehicles] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/vehicles/${id}`
                );

                setVehicles(data);
                setFilteredVehicles(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

    useEffect(() => {
        const filtered = vehicles.filter((vehicle) => {

            const matchesSearch =
                vehicle.name.toLowerCase().includes(search.toLowerCase()) ||
                vehicle.brand.toLowerCase().includes(search.toLowerCase()) ||
                vehicle.location.toLowerCase().includes(search.toLowerCase());

            const matchesType =
                type === "" || vehicle.type === type;

            let matchesPrice = true;

            if (price === "1000") {
                matchesPrice = vehicle.pricePerDay < 1000;
            } else if (price === "3000") {
                matchesPrice =
                    vehicle.pricePerDay >= 1000 &&
                    vehicle.pricePerDay <= 3000;
            } else if (price === "3001") {
                matchesPrice = vehicle.pricePerDay > 3000;
            }

            return matchesSearch && matchesType && matchesPrice;
        });

        if (sort === "lowToHigh") {
            filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
        } else if (sort === "highToLow") {
            filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);
        }

        setFilteredVehicles(filtered);

    }, [search, type, price, sort, vehicles]);
    if (loading) {
        return <Loader />;
    }

    return (
        <div>

            <section
                className="h-[80vh] bg-cover bg-center flex items-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600')",
                }}
            >
                <div className="bg-black/60 w-full h-full flex items-center">
                    <div className="max-w-7xl mx-auto px-6 text-white">

                        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                            Find Your Perfect Ride
                        </h1>

                        <p className="mt-6 text-lg max-w-xl">
                            Rent cars, bikes, and SUVs at affordable prices from trusted owners.
                        </p>

                        <button
                            onClick={() => {
                                document
                                    .getElementById("vehicles")
                                    .scrollIntoView({ behavior: "smooth" });
                            }}
                            className="mt-8 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
                        >
                            Explore Vehicles
                        </button>

                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
                <SearchBar
                    search={search}
                    setSearch={setSearch}
                    type={type}
                    setType={setType}
                    price={price}
                    setPrice={setPrice}
                    sort={sort}
                    setSort={setSort}
                />
            </div>

            <section
                id="vehicles"
                className="max-w-7xl mx-auto px-6 py-20"
            >
                <h2 className="text-3xl font-bold mb-8">
                    Featured Vehicles
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {filteredVehicles.map((vehicle) => (
                        <VehicleCard
                            key={vehicle._id}
                            vehicle={vehicle}
                        />
                    ))}

                </div>

            </section>

        </div>
    );
};

export default Home;