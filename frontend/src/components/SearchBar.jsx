const SearchBar = ({
    search,
    setSearch,
    type,
    setType,
    price,
    setPrice,
    sort,
    setSort,
}) => {
    return (
        <div className="bg-white shadow-lg rounded-xl p-6 mt-10">

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                <input
                    type="text"
                    placeholder="Search by name, brand or location"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded-lg p-3 outline-none"
                />

                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="border rounded-lg p-3"
                >
                    <option value="">All Vehicles</option>
                    <option>Car</option>
                    <option>Bike</option>
                    <option>SUV</option>
                </select>

                <select
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border rounded-lg p-3"
                >
                    <option value="">All Prices</option>
                    <option value="1000">Below ₹1000</option>
                    <option value="3000">₹1000 - ₹3000</option>
                    <option value="3001">Above ₹3000</option>
                </select>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border rounded-lg p-3"
                >
                    <option value="">Sort By</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                </select>

                <button className="bg-black text-white rounded-lg hover:bg-gray-800">
                    Search
                </button>

            </div>

        </div>
    );
};

export default SearchBar;