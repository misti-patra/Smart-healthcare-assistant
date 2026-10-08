const express = require("express");

const {
  createOrUpdateProfile,
  getMyProfile
} = require("../controllers/patientController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// Create or update patient profile
router.post(
  "/profile",
  protect,
  authorize("patient"),
  createOrUpdateProfile
);

// Get logged-in patient's profile
router.get(
  "/profile",
  protect,
  authorize("patient"),
  getMyProfile
);

module.exports = router;