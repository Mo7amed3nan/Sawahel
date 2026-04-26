import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      enum: ['doctors_and_clinics', 'pharmacies', 'nurses'],
      default: 'doctors_and_clinics',
    },
    phone: {
      type: String,
      required: true,
    },
    clinicAddress: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: '',
    },
    whatsappNumber: {
      type: String,
      default: '',
    },
    googleMapsUrl: {
      type: String,
      default: '',
    },
    additionalInfo: {
      type: String,
      default: '',
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
    averageRating: {
      type: Number,
      default: 0,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
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
