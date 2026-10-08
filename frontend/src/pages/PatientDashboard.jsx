
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function PatientDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({
  total: 0,
  pending: 0,
  confirmed: 0,
  completed: 0,
  cancelled: 0
});

  const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    };

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/appointments/patient", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setAppointments(response.data.appointments);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, []);
  useEffect(() => {
  const fetchStats = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments/patient/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setStats(response.data.stats);
    } catch (error) {
      console.error("Error fetching patient stats:", error);
    }
  };

  fetchStats();
}, []);

  const cancelAppointment = async (appointmentId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.patch(
      `http://localhost:5000/api/appointments/${appointmentId}/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert(response.data.message || "Appointment cancelled successfully!");

    setAppointments((currentAppointments) =>
      currentAppointments.map((appointment) =>
        appointment._id === appointmentId
          ? { ...appointment, status: "cancelled" }
          : appointment
      )
    );

  } catch (error) {
    console.error("Cancellation error:", error);

    alert(
      error.response?.data?.message ||
      "Could not cancel appointment"
    );
  }
};

  return (
  <div
    style={{
      minHeight: "100vh",
      backgroundColor: "#f4f8fb",
      padding: "40px 20px",
      fontFamily: "Arial, sans-serif"
    }}
  >
    <div
  style={{
    maxWidth: "1100px",
    margin: "0 auto",
    backgroundColor: "white",
    padding: "35px",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
  }}
>
      <h1
  style={{
    color: "#123b5d",
    fontSize: "32px",
    marginBottom: "10px"
  }}
>
  Patient Dashboard
</h1>
      <p
  style={{
    color: "#34566f",
    fontSize: "18px",
    fontWeight: "500",
    marginBottom: "30px"
  }}
>
  Welcome to Patient Dashboard
</p>

<button
  onClick={handleLogout}
  style={{
    padding: "11px 22px",
    backgroundColor: "#c62828",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "10px"
  }}
>
  🚪 Logout
</button>

      <h2
        style={{
          marginTop: "30px",
          marginBottom: "20px",
          color: "#123b5d",
          fontSize: "24px"
        }}
      >
        Quick Actions
      </h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "15px",
    marginBottom: "30px"
  }}
>
  <Link to="/patient-profile" style={{ textDecoration: "none" }}>
    <button
      style={{
        width: "100%",
        padding: "15px",
        border: "none",
        borderRadius: "10px",
        backgroundColor: "#1769aa",
        color: "white",
        fontSize: "16px",
        cursor: "pointer"
      }}
    >
      👤 My Profile
    </button>
  </Link>

  <Link to="/book-appointment" style={{ textDecoration: "none" }}>
    <button
      style={{
        width: "100%",
        padding: "15px",
        border: "none",
        borderRadius: "10px",
        backgroundColor: "#2e7d32",
        color: "white",
        fontSize: "16px",
        cursor: "pointer"
      }}
    >
      👨‍⚕️ Book Appointment
    </button>
  </Link>

  <Link to="/appointment-history" style={{ textDecoration: "none" }}>
    <button
      style={{
        width: "100%",
        padding: "15px",
        border: "none",
        borderRadius: "10px",
        backgroundColor: "#7b1fa2",
        color: "white",
        fontSize: "16px",
        cursor: "pointer"
      }}
    >
      📅 Appointment History
    </button>
  </Link>

  <Link to="/symptom-checker" style={{ textDecoration: "none" }}>
    <button
      style={{
        width: "100%",
        padding: "15px",
        border: "none",
        borderRadius: "10px",
        backgroundColor: "#ef6c00",
        color: "white",
        fontSize: "16px",
        cursor: "pointer"
      }}
    >
      🩺 Symptom Checker
    </button>
  </Link>

  <Link
    to="/medicine-info"
    style={{
      textDecoration: "none",
      padding: "15px",
      borderRadius: "10px",
      backgroundColor: "#e3f2fd",
      color: "#1769aa",
      fontWeight: "bold",
      textAlign: "center",
      border: "1px solid #90caf9"
    }}
  >
    💊 Medicine Information
  </Link>

</div>

      <h2
        style={{
          color: "#123b5d",
          fontSize: "24px",
          marginTop: "30px",
          marginBottom: "20px"
        }}
      >
        Appointment Statistics
      </h2>

          <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "15px",
                margin: "25px 0"
              }}
          >
  <div
    style={{
      padding: "20px",
      backgroundColor: "#e3f2fd",
      borderRadius: "10px",
      textAlign: "center"
    }}
  >
    <h3>Total</h3>
    <h2 style={{ color: "#1565c0", fontSize: "32px" }}>
      {stats.total}
    </h2>
  </div>

  <div
    style={{
      padding: "20px",
      backgroundColor: "#fff3e0",
      borderRadius: "10px",
      textAlign: "center"
    }}
  >
    <h3>Pending</h3>
    <h2 style={{ color: "#ef6c00", fontSize: "32px" }}>
      {stats.pending}
    </h2>
  </div>

  <div
    style={{
      padding: "20px",
      backgroundColor: "#e8f5e9",
      borderRadius: "10px",
      textAlign: "center"
    }}
  >
    <h3>Confirmed</h3>
    <h2 style={{ color: "#2e7d32", fontSize: "32px" }}>
      {stats.confirmed}
    </h2>
  </div>

  <div
    style={{
      padding: "20px",
      backgroundColor: "#f3e5f5",
      borderRadius: "10px",
      textAlign: "center"
    }}
  >
    <h3>Completed</h3>
    <h2 style={{ color: "#7b1fa2", fontSize: "32px" }}>
      {stats.completed}
    </h2>
  </div>

  <div
    style={{
      padding: "20px",
      backgroundColor: "#ffebee",
      borderRadius: "10px",
      textAlign: "center"
    }}
  >
    <h3>Cancelled</h3>
    <h2 style={{ color: "#c62828", fontSize: "32px" }}>
      {stats.cancelled}
    </h2>
  </div>
</div>

      <h2
        style={{
          color: "#123b5d",
          fontSize: "24px",
          marginTop: "30px",
          marginBottom: "20px"
        }}
      >
        My Appointments
      </h2>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((appointment) => (
  <div
    key={appointment._id}
    style={{
      backgroundColor: "#ffffff",
      border: "1px solid #d9e2ec",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "18px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.08)"
    }}
  >
    <h3
      style={{
        color: "#123b5d",
        marginBottom: "15px"
      }}
    >
      👨‍⚕️ Doctor: {appointment.doctor.name}
    </h3>

    <p style={{ color: "#444", margin: "8px 0" }}>
      📅 <strong>Date:</strong>{" "}
      {new Date(appointment.appointmentDate).toLocaleString()}
    </p>

    <p style={{ color: "#444", margin: "8px 0" }}>
      📝 <strong>Reason:</strong> {appointment.reason}
    </p>

    <p style={{ margin: "12px 0" }}>
      <strong>Status:</strong>{" "}
      <span
        style={{
          color:
            appointment.status === "confirmed"
              ? "#2e7d32"
              : appointment.status === "cancelled"
              ? "#c62828"
              : appointment.status === "completed"
              ? "#7b1fa2"
              : "#ef6c00",
          fontWeight: "bold",
          textTransform: "capitalize"
        }}
      >
        {appointment.status}
      </span>
    </p>

    {appointment.status === "pending" ||
    appointment.status === "confirmed" ? (
      <button
        onClick={() => cancelAppointment(appointment._id)}
        style={{
          padding: "10px 16px",
          backgroundColor: "#c62828",
          color: "white",
          border: "none",
          borderRadius: "7px",
          cursor: "pointer",
          marginTop: "8px"
        }}
      >
        Cancel Appointment
      </button>
    ) : null}
  </div>
))
      )}
        </div>
  </div>
);
}

export default PatientDashboard;