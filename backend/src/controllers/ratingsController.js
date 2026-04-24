import Rating from '../models/Rating.js';
import Doctor from '../models/Doctor.js';

/**
 * POST /api/ratings/:doctorId
 * Create or update the authenticated user's rating for a doctor.
 */
export const rateDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const userId = req.userId;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: 'Rating must be between 1 and 5' });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Upsert: create or update the user's rating
    await Rating.findOneAndUpdate(
      { doctorId, userId },
      { rating },
      { upsert: true, new: true, runValidators: true }
    );

    // Recalculate averages
    const stats = await Rating.aggregate([
      { $match: { doctorId: doctor._id } },
      {
        $group: {
          _id: '$doctorId',
          averageRating: { $avg: '$rating' },
          totalRatings: { $sum: 1 },
        },
      },
    ]);

    const avg = stats.length > 0 ? Math.round(stats[0].averageRating * 10) / 10 : 0;
    const total = stats.length > 0 ? stats[0].totalRatings : 0;

    await Doctor.findByIdAndUpdate(doctorId, {
      averageRating: avg,
      totalRatings: total,
    });

    res.status(200).json({
      averageRating: avg,
      totalRatings: total,
      userRating: rating,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: 'You have already rated this doctor' });
    }
    res
      .status(500)
      .json({ message: 'Error submitting rating', error: error.message });
  }
};

/**
 * GET /api/ratings/:doctorId
 * Get rating summary for a doctor.
 * If the user is authenticated, also returns their own rating.
 */
export const getDoctorRatings = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const userId = req.userId; // may be undefined for unauthenticated users

    const doctor = await Doctor.findById(doctorId).select(
      'averageRating totalRatings'
    );
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    let userRating = null;
    if (userId) {
      const existing = await Rating.findOne({ doctorId, userId });
      userRating = existing ? existing.rating : null;
    }

    res.status(200).json({
      averageRating: doctor.averageRating,
      totalRatings: doctor.totalRatings,
      userRating,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching ratings', error: error.message });
  }
};
