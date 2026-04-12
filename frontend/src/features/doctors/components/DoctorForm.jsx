import { useState } from 'react';

const DoctorForm = ({ initialData = {}, onSubmit, error, saving, loading }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    specialty: initialData?.specialty || '',
    phone: initialData?.phone || '',
    clinicAddress: initialData?.clinicAddress || '',
    available: initialData?.available || false,
    workingDays: Array.isArray(initialData?.workingDays)
      ? initialData.workingDays.join(', ')
      : initialData?.workingDays || '',
    workingHours: initialData?.workingHours || '',
    price: initialData?.price || '',
    images: initialData?.images || [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500 py-12 animate-pulse">
        Loading form data...
      </p>
    );
  }

  return (
    <div className="w-full">
      {' '}
      {/* Removed max-width here so it fills the parent container */}
      <form
        className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden"
        onSubmit={(e) => {
          e.preventDefault();
          const workingDays =
            typeof formData.workingDays === 'string'
              ? formData.workingDays
                  .split(',')
                  .map((day) => day.trim())
                  .filter(Boolean)
              : formData.workingDays;
          onSubmit(e, { ...formData, workingDays });
        }}
      >
        <div className="bg-gray-50 px-6 sm:px-8 py-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            Contact & Service Information
          </h2>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="text-black w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                placeholder="e.g. Dr. Ahmed Hassan"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Specialty / Profession <span className="text-red-500">*</span>
              </label>
              <input
                name="specialty"
                type="text"
                required
                value={formData.specialty}
                onChange={handleChange}
                className="text-black w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                placeholder="e.g. Cardiologist, Electrician"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {/* Added * and required to Phone */}
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                name="phone"
                type="text"
                required
                value={formData.phone}
                onChange={handleChange}
                className="text-black w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                placeholder="01xxxxxxxxx"
              />
            </div>

            <div>
              {/* Added * and required to Address */}
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location / Address <span className="text-red-500">*</span>
              </label>
              <input
                name="clinicAddress"
                type="text"
                required
                value={formData.clinicAddress}
                onChange={handleChange}
                className="text-black w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                placeholder="e.g. Main Street, Ras Sedr"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Working Days{' '}
                <span className="text-gray-400 font-normal">
                  (Comma separated)
                </span>
              </label>
              <input
                name="workingDays"
                type="text"
                value={formData.workingDays}
                onChange={handleChange}
                className="text-black w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                placeholder="Sunday, Monday, Tuesday..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Working Hours
              </label>
              <input
                name="workingHours"
                type="text"
                value={formData.workingHours}
                onChange={handleChange}
                className="text-black w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                placeholder="9 AM - 5 PM"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Fee (EGP)
              </label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="text-black w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                placeholder="e.g. 200"
              />
            </div>

            <div className="flex items-center h-[50px] px-4 bg-gray-50 border border-gray-200 rounded-lg transition-colors hover:bg-gray-100">
              <input
                id="availability-toggle"
                name="available"
                type="checkbox"
                checked={formData.available}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
              />
              <label
                htmlFor="availability-toggle"
                className="ml-3 text-sm font-bold text-gray-700 cursor-pointer select-none w-full"
              >
                Currently Available / Accepting Clients
              </label>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 sm:px-8 py-5 border-t border-gray-100 flex flex-col items-center">
          {error && (
            <div className="w-full mb-4 bg-red-100 text-red-700 border border-red-200 rounded-lg p-3 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto sm:min-w-[200px] bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {saving ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save Profile'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorForm;
