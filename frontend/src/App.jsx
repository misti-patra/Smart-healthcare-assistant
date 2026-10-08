import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorAppointments from "./pages/DoctorAppointments";
import PatientDashboard from "./pages/PatientDashboard";
import PatientProfile from "./pages/PatientProfile";
import Register from "./pages/Register";
import BookAppointment from "./pages/BookAppointment";
import DoctorProfile from "./pages/DoctorProfile.jsx";
import AppointmentHistory from "./pages/AppointmentHistory.jsx";
import SymptomChecker from "./pages/SymptomChecker.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import MedicineInfo from "./pages/MedicineInfo.jsx";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
        path="/login"
        element={<Login />}
      />
      <Route path="/" element={<Home />} />
      <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute role="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor-appointments"
          element={
            <ProtectedRoute role="doctor">
              <DoctorAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute role="patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
      <Route
        path="/patient-profile"
        element={
          <ProtectedRoute role="patient">
            <PatientProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/book-appointment"
        element={
          <ProtectedRoute role="patient">
            <BookAppointment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor-profile"
        element={
          <ProtectedRoute role="doctor">
            <DoctorProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/appointment-history"
        element={
          <ProtectedRoute role="patient">
            <AppointmentHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/symptom-checker"
        element={
          <ProtectedRoute role="patient">
            <SymptomChecker />
          </ProtectedRoute>
        }
      />
      <Route
        path="/medicine-info"
        element={
          <ProtectedRoute role="patient">
            <MedicineInfo />
          </ProtectedRoute>
        }
      />
      </Routes>
    </BrowserRouter>
  );
}

export default App;