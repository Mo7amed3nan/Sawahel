import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

// One rating per user per doctor
ratingSchema.index({ doctorId: 1, userId: 1 }, { unique: true });

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
