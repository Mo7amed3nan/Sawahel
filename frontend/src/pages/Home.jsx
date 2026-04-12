import { Link } from 'react-router'; // Use react-router-dom for web apps
import { Stethoscope, Bus, Wrench, UtensilsCrossed } from 'lucide-react';

// We map the actual imported component to the 'icon' property, not a string.
const services = [
  {
    id: 1,
    name: 'Doctors & Clinics',
    description: 'Find specialized doctors and manage medical appointments.',
    icon: Stethoscope,
    isActive: true,
    path: '/doctors', // The link path for active services
  },
  {
    id: 2,
    name: 'Transportation',
    description: 'Bus routes, taxis, and car rentals around the city.',
    icon: Bus,
    isActive: false,
  },
  {
    id: 3,
    name: 'Maintenance',
    description: 'Plumbers, electricians, and trusted local handymen.',
    icon: Wrench,
    isActive: false,
  },
  {
    id: 4,
    name: 'Food & Dining',
    description: 'Restaurants, cafes, and local delivery services.',
    icon: UtensilsCrossed,
    isActive: false,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* 🌟 1. CITY HERO SECTION */}
      <section className="w-full bg-blue-50 py-20 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Everything You Need in Sawahel
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Your all-in-one guide to <strong>Ras Sedr</strong>. From top-rated
            doctors to reliable transportation and local professionals, discover
            the best services our city has to offer.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/doctors"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all hover:-translate-y-1"
            >
              Find a Doctor
            </Link>
            <Link
              to="/doctors/create"
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
          {services.map((service) => {
            // Extract the component reference so we can render it as <Icon />
            const Icon = service.icon;

            // If the service is active, return the clickable Link card
            if (service.isActive) {
              return (
                <Link
                  key={service.id}
                  to={service.path}
                  className="group relative bg-white border border-blue-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 block"
                >
                  <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="text-blue-600 size-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>

                  <div className="mt-4 text-blue-600 font-medium text-sm flex items-center gap-1">
                    Browse Directory &rarr;
                  </div>
                </Link>
              );
            }

            // If the service is NOT active, return the disabled "Coming Soon" card
            return (
              <div
                key={service.id}
                className="relative bg-gray-50 border border-gray-200 rounded-xl p-6 opacity-75 cursor-not-allowed"
              >
                <span className="absolute top-4 right-4 bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  Coming Soon
                </span>

                <div className="bg-gray-200 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Icon className="text-gray-500 w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-500">{service.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
