const PatientProfile = require("../models/PatientProfile");

// Create or update patient profile
const createOrUpdateProfile = async (req, res) => {
  try {
    const {
      age,
      gender,
      bloodGroup,
      address,
      emergencyContact,
      medicalHistory,
      allergies
    } = req.body;

    const profile = await PatientProfile.findOneAndUpdate(
      { user: req.user.id },
      {
        user: req.user.id,
        age,
        gender,
        bloodGroup,
        address,
        emergencyContact,
        medicalHistory,
        allergies
      },
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: "Patient profile saved successfully",
      profile
    });

  } catch (error) {
    console.error("Profile error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// Get logged-in patient's profile
const getMyProfile = async (req, res) => {
  try {
    const profile = await PatientProfile.findOne({
      user: req.user.id
    }).populate("user", "name email phone role");

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Patient profile not found"
      });
    }

    res.status(200).json({
      success: true,
      profile
    });

  } catch (error) {
    console.error("Get profile error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports = {
  createOrUpdateProfile,
  getMyProfile
};