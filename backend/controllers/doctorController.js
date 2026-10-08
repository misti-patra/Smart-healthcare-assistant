const DoctorProfile = require("../models/DoctorProfile");

// Create or update doctor profile
const createOrUpdateDoctorProfile = async (req, res) => {
  try {
    const {
      specialization,
      qualification,
      experience,
      hospital,
      consultationFee,
      available
    } = req.body;

    // Check required fields
    if (!specialization || !qualification || experience === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide specialization, qualification and experience"
      });
    }

    const profile = await DoctorProfile.findOneAndUpdate(
      { user: req.user.id },
      {
        user: req.user.id,
        specialization,
        qualification,
        experience,
        hospital,
        consultationFee,
        available
      },
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: "Doctor profile saved successfully",
      profile
    });

  } catch (error) {
    console.error("Doctor profile error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// Get logged-in doctor's profile
const getMyDoctorProfile = async (req, res) => {
  try {
    const profile = await DoctorProfile.findOne({
      user: req.user.id
    }).populate("user", "name email phone role");

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found"
      });
    }

    res.status(200).json({
      success: true,
      profile
    });

  } catch (error) {
    console.error("Get doctor profile error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// Get all available doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await DoctorProfile.find({ available: true })
      .populate("user", "name email phone");

    res.status(200).json({
      success: true,
      doctors
    });

  } catch (error) {
    console.error("Get doctors error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


module.exports = {
  createOrUpdateDoctorProfile,
  getMyDoctorProfile,
  getAllDoctors
};