import Doctor from '../models/Doctor.js';

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.status(200).json(doctors);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching doctors', error: error.message });
  }
};

export const createDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating doctor', error: error.message });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const doctor = req.body;
    const id = req.params.id;
    const doctorExists = await Doctor.findById(id);
    if (!doctorExists)
      return res.status(404).json({ message: 'Doctor not found' });

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, doctor, {
      new: true,
    });
    res.status(200).json(updatedDoctor);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating doctor', error: error.message });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    const id = req.params.id;
    const doctorExists = await Doctor.findById(id);
    if (!doctorExists)
      return res.status(404).json({ message: 'Doctor not found' });
    const deletedDoctor = await Doctor.findByIdAndDelete(id, { new: true });
    res.status(200).json(deletedDoctor);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting doctor', error: error.message });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const id = req.params.id;
    const doctor = await Doctor.findById(id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.status(200).json(doctor);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching doctor', error: error.message });
  }
};
