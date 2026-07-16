import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-lg w-full">

        <h1 className="text-8xl font-extrabold text-red-500">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-4 text-gray-800">
          Page Not Found
        </h2>

        <p className="text-gray-600 mt-3">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          ← Back to Home
        </Link>

      </div>
    </div>
  );
};

export default NotFound;