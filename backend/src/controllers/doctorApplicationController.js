import DoctorApplication from '../models/DoctorApplication.js';

export const applyForDoctor = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const existingApplication = await DoctorApplication.findOne({ userId });
    if (existingApplication) {
      return res.status(400).json({
        message: `You have already applied. Current status: ${existingApplication.status}`,
      });
    }

    const application = new DoctorApplication({ userId, status: 'pending' });
    await application.save();

    res.status(201).json({
      message: 'Application submitted successfully',
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error submitting application',
      error: error.message,
    });
  }
};

export const getApplicationStatus = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const application = await DoctorApplication.findOne({ userId });
    if (!application) {
      return res.status(404).json({ message: 'No application found' });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching application status',
      error: error.message,
    });
  }
};
