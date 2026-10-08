const mongoose = require("mongoose");

const patientProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    age: {
      type: Number,
      min: 0,
      max: 120
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"]
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    },

    address: {
      type: String,
      trim: true
    },

    emergencyContact: {
      name: {
        type: String,
        trim: true
      },
      phone: {
        type: String,
        trim: true
      },
      relation: {
        type: String,
        trim: true
      }
    },

    medicalHistory: {
      type: [String],
      default: []
    },

    allergies: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const PatientProfile = mongoose.model(
  "PatientProfile",
  patientProfileSchema
);

module.exports = PatientProfile;