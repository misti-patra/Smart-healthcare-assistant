const mongoose = require("mongoose");

const doctorProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    specialization: {
      type: String,
      required: true,
      trim: true
    },

    qualification: {
      type: String,
      required: true,
      trim: true
    },

    experience: {
      type: Number,
      min: 0,
      required: true
    },

    hospital: {
      type: String,
      trim: true
    },

    consultationFee: {
      type: Number,
      min: 0
    },

    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const DoctorProfile = mongoose.model(
  "DoctorProfile",
  doctorProfileSchema
);

module.exports = DoctorProfile;