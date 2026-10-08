import { useEffect, useState } from "react";
import axios from "axios";

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");

  // Fetch available doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          "http://localhost:5000/api/doctor/",
          {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        );

        setDoctors(response.data.doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setError("Could not load doctors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Search doctors by name or specialization
  const filteredDoctors = doctors.filter((doctor) => {
    const name = doctor.user?.name || "";
    const specialization = doctor.specialization || "";

    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      specialization.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Book appointment
  const handleBooking = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    const dateTime = new Date(
      `${appointmentDate}T${appointmentTime}`
    );

    try {
      const response = await axios.post(
        "http://localhost:5000/api/appointments",
        {
          doctor: selectedDoctor.user._id,
          appointmentDate: dateTime.toISOString(),
          reason: reason
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      alert(
        response.data.message ||
        "Appointment booked successfully!"
      );

      setSelectedDoctor(null);
      setAppointmentDate("");
      setAppointmentTime("");
      setReason("");

    } catch (error) {
      console.error("Booking error:", error);

      alert(
        error.response?.data?.message ||
        "Could not book appointment"
      );
    }
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
          maxWidth: "1100px",
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
          👨‍⚕️ Find a Doctor
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#5f7180",
            fontSize: "17px",
            marginBottom: "30px"
          }}
        >
          Search for a doctor and book your appointment
        </p>

        {/* Search Box */}
        <div
          style={{
            backgroundColor: "#f4f9fc",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "30px",
            border: "1px solid #d9e6ef"
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
            🔍 Search Doctor
          </label>

          <input
            type="text"
            placeholder="Search by doctor name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px",
              border: "1px solid #9bb7cc",
              borderRadius: "8px",
              fontSize: "15px",
              backgroundColor: "#ffffff",
              color: "#123b5d",
              outline: "none"
            }}
          />
        </div>

        {/* Loading */}
        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "30px",
              color: "#1769aa",
              fontSize: "17px"
            }}
          >
            Loading doctors...
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            style={{
              padding: "15px",
              backgroundColor: "#fff0f0",
              border: "1px solid #e57373",
              borderRadius: "8px",
              color: "#c62828",
              marginBottom: "20px"
            }}
          >
            {error}
          </div>
        )}

        {/* No Doctors */}
        {!loading &&
          !error &&
          filteredDoctors.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "30px",
                backgroundColor: "#f8fafc",
                borderRadius: "10px",
                color: "#5f7180"
              }}
            >
              No doctors found matching your search.
            </div>
          )}

        {/* Doctor Cards */}
        {!loading &&
          !error &&
          filteredDoctors.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px"
              }}
            >
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor._id}
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #d9e2ec",
                    borderRadius: "12px",
                    padding: "22px",
                    boxShadow:
                      "0 3px 10px rgba(0,0,0,0.08)"
                  }}
                >
                  <div
                    style={{
                      width: "55px",
                      height: "55px",
                      borderRadius: "50%",
                      backgroundColor: "#e3f2fd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "28px",
                      marginBottom: "15px"
                    }}
                  >
                    👨‍⚕️
                  </div>

                  <h2
                    style={{
                      color: "#123b5d",
                      fontSize: "21px",
                      marginBottom: "15px"
                    }}
                  >
                    {doctor.user?.name}
                  </h2>

                  <p style={{ color: "#444", margin: "8px 0" }}>
                    🩺 <strong>Specialization:</strong>{" "}
                    {doctor.specialization}
                  </p>

                  <p style={{ color: "#444", margin: "8px 0" }}>
                    🎓 <strong>Qualification:</strong>{" "}
                    {doctor.qualification}
                  </p>

                  <p style={{ color: "#444", margin: "8px 0" }}>
                    💼 <strong>Experience:</strong>{" "}
                    {doctor.experience} years
                  </p>

                  <p style={{ color: "#444", margin: "8px 0" }}>
                    🏥 <strong>Hospital:</strong>{" "}
                    {doctor.hospital}
                  </p>

                  <p
                    style={{
                      color: "#2e7d32",
                      fontWeight: "bold",
                      margin: "12px 0 18px"
                    }}
                  >
                    💰 Consultation Fee: ₹
                    {doctor.consultationFee}
                  </p>

                  <button
                    onClick={() => setSelectedDoctor(doctor)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      backgroundColor: "#1769aa",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "15px",
                      fontWeight: "bold",
                      cursor: "pointer"
                    }}
                  >
                    📅 Book Appointment
                  </button>
                </div>
              ))}
            </div>
          )}

        {/* Appointment Form */}
        {selectedDoctor && (
          <div
            style={{
              marginTop: "35px",
              padding: "30px",
              backgroundColor: "#f8fbfd",
              border: "2px solid #9bb7cc",
              borderRadius: "12px"
            }}
          >
            <h2
              style={{
                color: "#123b5d",
                marginBottom: "10px"
              }}
            >
              📅 Book Appointment
            </h2>

            <p
              style={{
                color: "#5f7180",
                marginBottom: "25px"
              }}
            >
              Booking with{" "}
              <strong style={{ color: "#123b5d" }}>
                {selectedDoctor.user?.name}
              </strong>
            </p>

            <div
              style={{
                backgroundColor: "#e8f5e9",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "25px"
              }}
            >
              <p
                style={{
                  margin: "5px 0",
                  color: "#2e7d32"
                }}
              >
                🩺 <strong>Specialization:</strong>{" "}
                {selectedDoctor.specialization}
              </p>

              <p
                style={{
                  margin: "5px 0",
                  color: "#2e7d32"
                }}
              >
                💰 <strong>Consultation Fee:</strong> ₹
                {selectedDoctor.consultationFee}
              </p>
            </div>

            <form onSubmit={handleBooking}>
              {/* Date */}
              <label
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontWeight: "bold",
                  color: "#34495e"
                }}
              >
                📅 Appointment Date
              </label>

              <input
                type="date"
                value={appointmentDate}
                onChange={(e) =>
                  setAppointmentDate(e.target.value)
                }
                min={new Date().toLocaleDateString("en-CA")}
                required
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "12px",
                  border: "1px solid #9bb7cc",
                  borderRadius: "7px",
                  fontSize: "15px",
                  backgroundColor: "#ffffff",
                  color: "#123b5d"
                }}
              />

              {/* Time */}
              <label
                style={{
                  display: "block",
                  marginTop: "20px",
                  marginBottom: "7px",
                  fontWeight: "bold",
                  color: "#34495e"
                }}
              >
                🕐 Appointment Time
              </label>

              <input
                type="time"
                value={appointmentTime}
                onChange={(e) =>
                  setAppointmentTime(e.target.value)
                }
                required
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "12px",
                  border: "1px solid #9bb7cc",
                  borderRadius: "7px",
                  fontSize: "15px",
                  backgroundColor: "#ffffff",
                  color: "#123b5d"
                }}
              />

              {/* Reason */}
              <label
                style={{
                  display: "block",
                  marginTop: "20px",
                  marginBottom: "7px",
                  fontWeight: "bold",
                  color: "#34495e"
                }}
              >
                📝 Reason for Consultation
              </label>

              <textarea
                value={reason}
                onChange={(e) =>
                  setReason(e.target.value)
                }
                placeholder="Enter your health concern..."
                required
                rows="4"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "12px",
                  border: "1px solid #9bb7cc",
                  borderRadius: "7px",
                  fontSize: "15px",
                  backgroundColor: "#ffffff",
                  color: "#123b5d",
                  resize: "vertical"
                }}
              />

              {/* Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "25px"
                }}
              >
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: "13px",
                    backgroundColor: "#2e7d32",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "15px",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                >
                  ✅ Confirm Booking
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDoctor(null)}
                  style={{
                    flex: 1,
                    padding: "13px",
                    backgroundColor: "#777",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "15px",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                >
                  ✖ Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookAppointment;