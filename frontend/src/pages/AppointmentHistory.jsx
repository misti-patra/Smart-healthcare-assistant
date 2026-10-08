import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          "http://localhost:5000/api/appointments/patient",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setAppointments(response.data.appointments);
      } catch (error) {
        console.error(
          "Error fetching appointment history:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const filteredAppointments =
    filter === "all"
      ? appointments
      : appointments.filter(
          (appointment) => appointment.status === filter
        );

  const getStatusColor = (status) => {
    if (status === "confirmed") return "#2e7d32";
    if (status === "completed") return "#7b1fa2";
    if (status === "cancelled") return "#c62828";
    return "#ef6c00";
  };

  const getStatusBackground = (status) => {
    if (status === "confirmed") return "#e8f5e9";
    if (status === "completed") return "#f3e5f5";
    if (status === "cancelled") return "#ffebee";
    return "#fff3e0";
  };

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
          maxWidth: "1000px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          padding: "35px",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
        }}
      >
        {/* Page Header */}
        <h1
          style={{
            textAlign: "center",
            color: "#123b5d",
            fontSize: "32px",
            marginBottom: "10px"
          }}
        >
          📅 My Appointment History
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#5f7180",
            fontSize: "17px",
            marginBottom: "30px"
          }}
        >
          View and track all your past and upcoming appointments
        </p>

        {/* Filter Section */}
        <div
          style={{
            backgroundColor: "#f4f9fc",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #d9e6ef",
            marginBottom: "30px"
          }}
        >
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#34495e"
            }}
          >
            🔎 Filter by Appointment Status
          </label>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              boxSizing: "border-box",
              border: "1px solid #9bb7cc",
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              color: "#123b5d",
              fontSize: "15px",
              fontWeight: "500",
              cursor: "pointer"
            }}
          >
            <option value="all">All Appointments</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Loading */}
        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "30px",
              color: "#1769aa",
              fontSize: "17px"
            }}
          >
            Loading appointments...
          </div>
        ) : filteredAppointments.length === 0 ? (
          /* Empty State */
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              backgroundColor: "#f8fafc",
              borderRadius: "12px",
              border: "1px solid #d9e2ec"
            }}
          >
            <div style={{ fontSize: "45px", marginBottom: "15px" }}>
              📭
            </div>

            <h2 style={{ color: "#123b5d" }}>
              No Appointments Found
            </h2>

            <p style={{ color: "#5f7180" }}>
              There are no appointments matching the selected filter.
            </p>
          </div>
        ) : (
          /* Appointment Cards */
          <div>
            {filteredAppointments.map((appointment) => (
              <div
                key={appointment._id}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #d9e2ec",
                  borderRadius: "12px",
                  padding: "22px",
                  marginBottom: "18px",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.07)"
                }}
              >
                {/* Doctor Name */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "15px",
                    flexWrap: "wrap",
                    marginBottom: "18px"
                  }}
                >
                  <h2
                    style={{
                      color: "#123b5d",
                      fontSize: "21px",
                      margin: 0
                    }}
                  >
                    👨‍⚕️ {appointment.doctor.name}
                  </h2>

                  {/* Status Badge */}
                  <span
                    style={{
                      backgroundColor: getStatusBackground(
                        appointment.status
                      ),
                      color: getStatusColor(
                        appointment.status
                      ),
                      padding: "7px 13px",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      textTransform: "capitalize"
                    }}
                  >
                    {appointment.status}
                  </span>
                </div>

                {/* Appointment Details */}
                <div
                  style={{
                    backgroundColor: "#f8fbfd",
                    padding: "15px",
                    borderRadius: "9px"
                  }}
                >
                  <p
                    style={{
                      color: "#444",
                      margin: "8px 0"
                    }}
                  >
                    📅 <strong>Date & Time:</strong>{" "}
                    {new Date(
                      appointment.appointmentDate
                    ).toLocaleString()}
                  </p>

                  <p
                    style={{
                      color: "#444",
                      margin: "8px 0"
                    }}
                  >
                    📝 <strong>Reason:</strong>{" "}
                    {appointment.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back Button */}
        <Link
          to="/patient-dashboard"
          style={{
            textDecoration: "none"
          }}
        >
          <button
            style={{
              width: "100%",
              padding: "13px",
              marginTop: "15px",
              backgroundColor: "#1769aa",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            ← Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}

export default AppointmentHistory;