import { useState, useEffect, React } from 'react';
const DoctorForm = ({ initialData = {}, onSubmit, error, saving, loading }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    specialty: initialData?.specialty || '',
    phone: initialData?.phone || '',
    clinicAddress: initialData?.clinicAddress || '',
    available: initialData?.available || false,
    workingDays: initialData?.workingDays?.join(',') || '',
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
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const workingDays = formData.workingDays
            .split(',')
            .map((day) => day.trim());
          onSubmit(e, { ...formData, workingDays });
        }}
      >
        <label>Name:</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
        <label>Specialty:</label>
        <input
          name="specialty"
          type="text"
          value={formData.specialty}
          onChange={handleChange}
        />
        <label>Phone:</label>
        <input
          name="phone"
          type="text"
          value={formData.phone}
          onChange={handleChange}
        />
        <label>Clinic Address:</label>
        <input
          name="clinicAddress"
          type="text"
          value={formData.clinicAddress}
          onChange={handleChange}
        />
        <label>Available:</label>
        <input
          name="available"
          type="checkbox"
          checked={formData.available}
          onChange={handleChange}
        />
        <label>Working Days:</label>
        <input
          name="workingDays"
          type="text"
          value={formData.workingDays}
          onChange={handleChange}
        />
        <label>Working Hours:</label>
        <input
          name="workingHours"
          type="text"
          value={formData.workingHours}
          onChange={handleChange}
        />
        <label>Price:</label>
        <input
          name="price"
          type="text"
          value={formData.price}
          onChange={handleChange}
        />
        <input
          type="submit"
          value={saving ? 'Saving...' : 'Save'}
          disabled={saving}
        />
      </form>
    </div>
  );
};

export default DoctorForm;
