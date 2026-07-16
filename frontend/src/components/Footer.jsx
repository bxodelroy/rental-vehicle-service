const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-8">

        <div>
          <h2 className="text-2xl font-bold">RentRide</h2>
          <p className="text-gray-400 mt-2">
            Rent vehicles easily and travel with confidence.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Home</li>
            <li>Vehicles</li>
            <li>Dashboard</li>
            <li>Contact</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-4 text-gray-400">
        © 2026 RentRide. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;