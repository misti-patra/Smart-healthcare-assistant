const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");

const doctorRoutes = require("./routes/doctorRoutes");

const appointmentRoutes = require("./routes/appointmentRoutes");
const medicineRoutes = require("./routes/medicineRoutes");

const protect = require("./middleware/authMiddleware");
const authorize = require("./middleware/roleMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://smart-healthcare-assistant.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);

// Patient routes
app.use("/api/patient", patientRoutes);

// Doctor routes
app.use("/api/doctor", doctorRoutes);

// Appointment routes
app.use("/api/appointments", appointmentRoutes);

app.use("/api/medicine", medicineRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Smart Healthcare Assistant API is running!"
  });
});

// Protected test route
app.get("/api/protected", protect, (req, res) => {
  res.json({
    success: true,
    message: "You accessed a protected route!",
    user: req.user
  });
});

// Patient-only test route
app.get("/api/patient-test", protect, authorize("patient"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the patient area!",
    user: req.user
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});