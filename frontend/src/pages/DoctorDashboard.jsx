import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../api";

function DoctorDashboard() {
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
    const fetchStats = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `${API_URL}/api/appointments/doctor/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setStats(response.data.stats);
      } catch (error) {
        console.error("Error fetching doctor stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#e8f1f8",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          padding: "35px",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
        }}
      >
        {/* Header */}
        <h1
          style={{
            color: "#123b5d",
            fontSize: "32px",
            marginBottom: "10px"
          }}
        >
          👨‍⚕️ Doctor Dashboard
        </h1>

        <p
          style={{
            color: "#34566f",
            fontSize: "18px",
            fontWeight: "500",
            marginBottom: "30px"
          }}
        >
          Welcome to your Doctor Dashboard
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
            marginBottom: "25px"
          }}
        >
          🚪 Logout
        </button>

        {/* Quick Actions */}
        <h2
          style={{
            color: "#123b5d",
            fontSize: "24px",
            marginBottom: "20px"
          }}
        >
          Quick Actions
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
            marginBottom: "35px"
          }}
        >
          <Link
            to="/doctor-appointments"
            style={{ textDecoration: "none" }}
          >
            <button
              style={{
                width: "100%",
                padding: "15px",
                border: "none",
                borderRadius: "10px",
                backgroundColor: "#1769aa",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              📅 View Appointments
            </button>
          </Link>

          <Link
            to="/doctor-profile"
            style={{ textDecoration: "none" }}
          >
            <button
              style={{
                width: "100%",
                padding: "15px",
                border: "none",
                borderRadius: "10px",
                backgroundColor: "#2e7d32",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              👤 My Profile
            </button>
          </Link>
        </div>

        {/* Statistics Heading */}
        <h2
          style={{
            color: "#123b5d",
            fontSize: "24px",
            marginBottom: "20px"
          }}
        >
          Appointment Statistics
        </h2>

        {/* Statistics Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "15px",
            marginBottom: "20px"
          }}
        >
          {/* Total */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "#e3f2fd",
              borderRadius: "10px",
              textAlign: "center"
            }}
          >
            <h3 style={{ color: "#34495e" }}>
              Total
            </h3>

            <h2
              style={{
                color: "#1565c0",
                fontSize: "32px",
                margin: "10px 0"
              }}
            >
              {stats.total}
            </h2>

            <p style={{ color: "#5f7180" }}>
              All Appointments
            </p>
          </div>

          {/* Pending */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "#fff3e0",
              borderRadius: "10px",
              textAlign: "center"
            }}
          >
            <h3 style={{ color: "#34495e" }}>
              Pending
            </h3>

            <h2
              style={{
                color: "#ef6c00",
                fontSize: "32px",
                margin: "10px 0"
              }}
            >
              {stats.pending}
            </h2>

            <p style={{ color: "#5f7180" }}>
              Awaiting Action
            </p>
          </div>

          {/* Confirmed */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "#e8f5e9",
              borderRadius: "10px",
              textAlign: "center"
            }}
          >
            <h3 style={{ color: "#34495e" }}>
              Confirmed
            </h3>

            <h2
              style={{
                color: "#2e7d32",
                fontSize: "32px",
                margin: "10px 0"
              }}
            >
              {stats.confirmed}
            </h2>

            <p style={{ color: "#5f7180" }}>
              Upcoming
            </p>
          </div>

          {/* Completed */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f3e5f5",
              borderRadius: "10px",
              textAlign: "center"
            }}
          >
            <h3 style={{ color: "#34495e" }}>
              Completed
            </h3>

            <h2
              style={{
                color: "#7b1fa2",
                fontSize: "32px",
                margin: "10px 0"
              }}
            >
              {stats.completed}
            </h2>

            <p style={{ color: "#5f7180" }}>
              Finished
            </p>
          </div>

          {/* Cancelled */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "#ffebee",
              borderRadius: "10px",
              textAlign: "center"
            }}
          >
            <h3 style={{ color: "#34495e" }}>
              Cancelled
            </h3>

            <h2
              style={{
                color: "#c62828",
                fontSize: "32px",
                margin: "10px 0"
              }}
            >
              {stats.cancelled}
            </h2>

            <p style={{ color: "#5f7180" }}>
              Cancelled
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;