const Appointment = require("../models/Appointment");

// Patient: Create appointment
const createAppointment = async (req, res) => {
  try {
    const {
      doctor,
      appointmentDate,
      reason
    } = req.body;

    if (!doctor || !appointmentDate || !reason) {
      return res.status(400).json({
        success: false,
        message: "Please provide doctor, appointment date and reason"
      });
    }

    const appointment = await Appointment.create({
      patient: req.user.id,
      doctor,
      appointmentDate,
      reason
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment
    });

  } catch (error) {
    console.error("Create appointment error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


// Patient: Get my appointments
const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user.id
    })
      .populate("doctor", "name email phone")
      .sort({ appointmentDate: 1 });

    res.status(200).json({
      success: true,
      appointments
    });

  } catch (error) {
    console.error("Patient appointments error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


// Doctor: Get my appointments
const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctor: req.user.id
    })
      .populate("patient", "name email phone")
      .sort({ appointmentDate: 1 });

    res.status(200).json({
      success: true,
      appointments
    });

  } catch (error) {
    console.error("Doctor appointments error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


// Doctor: Update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "confirmed",
      "completed",
      "cancelled"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment status"
      });
    }

    const appointment = await Appointment.findOneAndUpdate(
      {
        _id: req.params.id,
        doctor: req.user.id
      },
      {
        status
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment status updated",
      appointment
    });

  } catch (error) {
    console.error("Update appointment error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// Patient: Cancel own appointment
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      patient: req.user.id
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }

    if (appointment.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Completed appointments cannot be cancelled"
      });
    }

    if (appointment.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Appointment is already cancelled"
      });
    }

    appointment.status = "cancelled";

    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
      appointment
    });

  } catch (error) {
    console.error("Cancel appointment error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


// Doctor: Get appointment statistics
const getDoctorAppointmentStats = async (req, res) => {
  try {
    const total = await Appointment.countDocuments({
      doctor: req.user.id
    });

    const pending = await Appointment.countDocuments({
      doctor: req.user.id,
      status: "pending"
    });

    const confirmed = await Appointment.countDocuments({
      doctor: req.user.id,
      status: "confirmed"
    });

    const completed = await Appointment.countDocuments({
      doctor: req.user.id,
      status: "completed"
    });

    const cancelled = await Appointment.countDocuments({
      doctor: req.user.id,
      status: "cancelled"
    });

    res.status(200).json({
      success: true,
      stats: {
        total,
        pending,
        confirmed,
        completed,
        cancelled
      }
    });

  } catch (error) {
    console.error("Doctor stats error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

const getPatientAppointmentStats = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user.id
    });

    const stats = {
      total: appointments.length,
      pending: appointments.filter(
        (appointment) => appointment.status === "pending"
      ).length,
      confirmed: appointments.filter(
        (appointment) => appointment.status === "confirmed"
      ).length,
      completed: appointments.filter(
        (appointment) => appointment.status === "completed"
      ).length,
      cancelled: appointments.filter(
        (appointment) => appointment.status === "cancelled"
      ).length
    };

    res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    console.error("Patient stats error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


module.exports = {
  createAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  cancelAppointment,
  getDoctorAppointmentStats,
  getPatientAppointmentStats
};