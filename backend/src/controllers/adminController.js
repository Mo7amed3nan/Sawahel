import DoctorApplication from '../models/DoctorApplication.js';
import User from '../models/User.js';

export const getAllApplications = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin access only' });
    }

    const applications = await DoctorApplication.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching applications',
      error: error.message,
    });
  }
};

export const approveApplication = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin access only' });
    }

    const { applicationId } = req.params;

    const application = await DoctorApplication.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const user = await User.findById(application.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    application.status = 'approved';
    await application.save();

    user.role = 'doctor';
    await user.save();

    res.status(200).json({
      message: 'Application approved',
      application,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error approving application',
      error: error.message,
    });
  }
};

export const rejectApplication = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin access only' });
    }

    const { applicationId } = req.params;
    const { reason } = req.body;

    const application = await DoctorApplication.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = 'rejected';
    application.reason = reason || 'Application rejected by admin';
    await application.save();

    res.status(200).json({
      message: 'Application rejected',
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error rejecting application',
      error: error.message,
    });
  }
};
