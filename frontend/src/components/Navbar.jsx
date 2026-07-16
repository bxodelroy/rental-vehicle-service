import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {

    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow">

            <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">

                <Link
                    to="/"
                    className="text-2xl font-bold"
                >
                    RentRide
                </Link>

                <div className="hidden md:flex gap-8 items-center">

                    <Link to="/">Home</Link>

                    <Link to="/">Vehicles</Link>

                    <Link to="/dashboard">Dashboard</Link>
                    {user?.role === "admin" && (
                        <Link
                            to="/admin"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Admin Panel
                        </Link>
                    )}

                    {user ? (
                        <>
                            <span className="font-medium">
                                Hi, {user.name}
                            </span>

                            <button
                                onClick={handleLogout}
                                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>

                            <Link
                                to="/register"
                                className="bg-white text-black px-4 py-2 rounded-lg"
                            >
                                Register
                            </Link>
                        </>
                    )}

                </div>

            </div>

        </nav>
    );
};

export default Navbar;