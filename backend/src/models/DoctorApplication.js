import mongoose from 'mongoose';

const doctorApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    reason: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const DoctorApplication = mongoose.model(
  'DoctorApplication',
  doctorApplicationSchema
);

export default DoctorApplication;
