import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_URL from "../api";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API_URL}/api/appointments/doctor`, {
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

  const updateStatus = (appointmentId, status) => {
    const token = localStorage.getItem("token");

    axios
      .patch(
        `${API_URL}/api/appointments/${appointmentId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((response) => {
        setAppointments((currentAppointments) =>
          currentAppointments.map((appointment) =>
            appointment._id === appointmentId
              ? response.data.appointment
              : appointment
          )
        );
      })
      .catch((error) => {
        console.error("Error updating appointment:", error);
      });
  };

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
        {/* Header */}
        <h1
          style={{
            textAlign: "center",
            color: "#123b5d",
            fontSize: "32px",
            marginBottom: "10px"
          }}
        >
          📅 Doctor Appointments
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#5f7180",
            fontSize: "17px",
            marginBottom: "30px"
          }}
        >
          Manage your patient appointments and consultation status
        </p>

        {/* Empty State */}
        {appointments.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "45px 20px",
              backgroundColor: "#f8fafc",
              borderRadius: "12px",
              border: "1px solid #d9e2ec"
            }}
          >
            <div style={{ fontSize: "50px", marginBottom: "15px" }}>
              📭
            </div>

            <h2 style={{ color: "#123b5d" }}>
              No Appointments Found
            </h2>

            <p style={{ color: "#5f7180" }}>
              You currently have no patient appointments.
            </p>
          </div>
        ) : (
          appointments.map((appointment) => (
            <div
              key={appointment._id}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #d9e2ec",
                borderRadius: "12px",
                padding: "22px",
                marginBottom: "20px",
                boxShadow: "0 3px 10px rgba(0,0,0,0.07)"
              }}
            >
              {/* Patient + Status */}
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
                  👤 {appointment.patient.name}
                </h2>

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

              {/* Patient Details */}
              <div
                style={{
                  backgroundColor: "#f8fbfd",
                  padding: "15px",
                  borderRadius: "9px",
                  marginBottom: "18px"
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

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap"
                }}
              >
                <button
                  onClick={() =>
                    updateStatus(
                      appointment._id,
                      "confirmed"
                    )
                  }
                  style={{
                    flex: "1",
                    minWidth: "120px",
                    padding: "11px",
                    backgroundColor: "#2e7d32",
                    color: "white",
                    border: "none",
                    borderRadius: "7px",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                >
                  ✅ Confirm
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      appointment._id,
                      "completed"
                    )
                  }
                  style={{
                    flex: "1",
                    minWidth: "120px",
                    padding: "11px",
                    backgroundColor: "#7b1fa2",
                    color: "white",
                    border: "none",
                    borderRadius: "7px",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                >
                  ✔️ Complete
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      appointment._id,
                      "cancelled"
                    )
                  }
                  style={{
                    flex: "1",
                    minWidth: "120px",
                    padding: "11px",
                    backgroundColor: "#c62828",
                    color: "white",
                    border: "none",
                    borderRadius: "7px",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          ))
        )}

        {/* Back Button */}
        <Link
          to="/doctor-dashboard"
          style={{
            textDecoration: "none"
          }}
        >
          <button
            style={{
              width: "100%",
              padding: "13px",
              marginTop: "10px",
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

export default DoctorAppointments;
