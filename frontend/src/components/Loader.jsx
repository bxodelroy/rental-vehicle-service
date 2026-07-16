const Loader = () => {
    return (

        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
            <div className="w-14 h-14 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            <h1 className="text-3xl font-bold mb-8">
                RentRide
            </h1>

            <h2 className="mt-6 text-xl font-semibold text-gray-700">
                Loading...
            </h2>

            <p className="text-gray-500 mt-2">
                Please wait a moment
            </p>
        </div>
    );
};

export default Loader;