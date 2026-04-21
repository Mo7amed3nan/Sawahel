export const getProfile = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const user = await User.findById(req.userId);
    res.json({ ...user._doc, password: undefined });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const data = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.userId, data, {
      new: true,
      runValidators: true,
    });
    res.json({ ...updatedUser._doc, password: undefined });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
