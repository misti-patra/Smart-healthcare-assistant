const express = require("express");

const {
  createAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  cancelAppointment,
  getDoctorAppointmentStats,
  getPatientAppointmentStats
} = require("../controllers/appointmentController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// Patient: book appointment
router.post(
  "/",
  protect,
  authorize("patient"),
  createAppointment
);

// Patient: view own appointments
router.get(
  "/patient",
  protect,
  authorize("patient"),
  getPatientAppointments
);

// Doctor: appointment statistics
router.get(
  "/doctor/stats",
  protect,
  authorize("doctor"),
  getDoctorAppointmentStats
);

router.get(
  "/patient/stats",
  protect,
  authorize("patient"),
  getPatientAppointmentStats
);

// Patient: cancel own appointment
router.patch(
  "/:id/cancel",
  protect,
  authorize("patient"),
  cancelAppointment
);

// Doctor: view assigned appointments
router.get(
  "/doctor",
  protect,
  authorize("doctor"),
  getDoctorAppointments
);

// Doctor: update appointment status
router.patch(
  "/:id/status",
  protect,
  authorize("doctor"),
  updateAppointmentStatus
);

module.exports = router;