import Service from '../models/Service.js';

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching services', error: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const { name, description, icon, isActive } = req.body;
    const newService = new Service({ name, description, icon, isActive });
    await newService.save();
    res
      .status(201)
      .json({ message: 'Service created successfully', service: newService });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating service', error: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const { name, description, icon, isActive } = req.body;
    const id = req.params.id;
    const updatedService = await Service.findByIdAndUpdate(
      id,
      { name, description, icon, isActive },
      { new: true }
    );
    if (!updatedService)
      return res.status(404).json({ message: 'Service not found' });
    res.status(200).json({
      message: 'service updated successfully',
      service: updatedService,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating service', error: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedService = await Service.findByIdAndDelete(id, { new: true });
    if (!deletedService)
      return res.status(404).json({ message: 'Service not found' });
    res.status(200).json({
      message: 'service deleted successfully',
      service: deletedService,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting service', error: error.message });
  }
};
