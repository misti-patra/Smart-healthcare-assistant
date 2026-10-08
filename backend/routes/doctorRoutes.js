const express = require("express");

const {
  createOrUpdateDoctorProfile,
  getMyDoctorProfile,
  getAllDoctors
} = require("../controllers/doctorController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// Create or update doctor profile
router.post(
  "/profile",
  protect,
  authorize("doctor"),
  createOrUpdateDoctorProfile
);

// Get logged-in doctor's profile
router.get(
  "/profile",
  protect,
  authorize("doctor"),
  getMyDoctorProfile
);

// Get all available doctors
router.get(
  "/",
  protect,
  getAllDoctors
);

module.exports = router;