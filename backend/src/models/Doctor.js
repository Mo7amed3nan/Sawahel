import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    clinicAddress: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: false,
    },
    workingDays: [
      {
        type: String,
        enum: [
          'Saturday',
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
        ],
      },
    ],
    workingHours: {
      type: String,
    },
    price: {
      type: Number,
    },
    images: [
      {
        type: String,
      },
    ],
    extra: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },

  { timestamps: true }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
