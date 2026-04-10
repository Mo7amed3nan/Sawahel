import { Link } from 'react-router';
import { Stethoscope, Bus, Wrench, UtensilsCrossed } from 'lucide-react';

export default function Home() {
  const upcomingServices = [
    {
      name: 'Transportation',
      icon: Bus,
      desc: 'Bus routes, taxis, and car rentals.',
    },
    {
      name: 'Maintenance',
      icon: Wrench,
      desc: 'Find local plumbers, electricians, and handymen.',
    },
    {
      name: 'Restaurants',
      icon: UtensilsCrossed,
      desc: 'Discover the best places to eat in the city.',
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* 🌟 1. CITY HERO SECTION */}
      <section className="w-full bg-blue-50 py-20 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Everything You Need in Sawahel
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Your all-in-one city guide. From top-rated doctors to reliable
            transportation and local professionals, discover the best services
            our city has to offer.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* Primary Button */}
            <Link
              to="/doctors"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all hover:-translate-y-1"
            >
              Find a Doctor
            </Link>
            {/* Secondary Button */}
            <Link
              to="/doctors/new"
              className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-200 font-semibold py-3 px-8 rounded-lg shadow-sm transition-all hover:-translate-y-1"
            >
              Join as a Professional
            </Link>
          </div>
        </div>
      </section>

      {/* 🌟 2. CITY SERVICES GRID */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Explore City Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Active Card: Doctors (The First MVP Service) */}
          <Link
            to="/doctors"
            className="group relative bg-white border border-blue-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 block"
          >
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Stethoscope className="text-blue-600 size-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Doctors & Clinics
            </h3>
            <p className="text-gray-600">
              Find specialized doctors and manage medical appointments.
            </p>

            <div className="mt-4 text-blue-600 font-medium text-sm flex items-center gap-1">
              Browse Doctors →
            </div>
          </Link>

          {/* Inactive Cards: The Future City Services */}
          {upcomingServices.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="relative bg-gray-50 border border-gray-200 rounded-xl p-6 opacity-75 cursor-not-allowed"
              >
                <span className="absolute top-4 right-4 bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1 rounded-full">
                  Coming Soon
                </span>

                <div className="bg-gray-200 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Icon className="text-gray-500 w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-500">{service.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
