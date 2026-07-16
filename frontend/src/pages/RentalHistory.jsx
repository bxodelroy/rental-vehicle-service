import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

const RentalHistory = () => {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchRentalHistory();
    }, []);


    const fetchRentalHistory = async () => {
        try {
            const token = localStorage.getItem("token");

            const { data } = await axios.get(
                "http://localhost:5000/api/bookings/history",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setHistory(data);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return <Loader />;
    }


    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-4xl font-bold mb-8">
                    Rental History
                </h1>


                {history.length === 0 ? (

                    <div className="bg-white p-8 rounded-xl shadow text-center">
                        No rental history found.
                    </div>

                ) : (

                    <div className="overflow-x-auto bg-white rounded-xl shadow">

                        <table className="w-full">

                            <thead className="bg-black text-white">

                                <tr>
                                    <th className="p-4 text-left">
                                        Vehicle
                                    </th>

                                    <th className="p-4 text-left">
                                        User
                                    </th>

                                    <th className="p-4 text-left">
                                        Email
                                    </th>

                                    <th className="p-4 text-left">
                                        Pickup
                                    </th>

                                    <th className="p-4 text-left">
                                        Return
                                    </th>

                                    <th className="p-4 text-left">
                                        Duration
                                    </th>

                                    <th className="p-4 text-left">
                                        Amount
                                    </th>

                                    <th className="p-4 text-left">
                                        Status
                                    </th>
                                </tr>

                            </thead>


                            <tbody>

                                {history.map((item) => (

                                    <tr
                                        key={item.bookingId}
                                        className="border-b"
                                    >

                                        <td className="p-4">
                                            {item.vehicle}
                                        </td>

                                        <td className="p-4">
                                            {item.user}
                                        </td>

                                        <td className="p-4">
                                            {item.email}
                                        </td>

                                        <td className="p-4">
                                            {new Date(item.pickupDate)
                                                .toLocaleDateString()}
                                        </td>

                                        <td className="p-4">
                                            {new Date(item.returnDate)
                                                .toLocaleDateString()}
                                        </td>

                                        <td className="p-4">
                                            {item.duration}
                                        </td>

                                        <td className="p-4">
                                            ₹{item.totalPrice}
                                        </td>

                                        <td className="p-4">
                                            {item.status}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
};


export default RentalHistory;