import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_URL from "../api";


function DoctorProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `${API_URL}/api/doctor/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setProfile(response.data.profile);
      } catch (error) {
        console.error(
          "Error fetching doctor profile:",
          error
        );
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#e8f1f8",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <p
          style={{
            color: "#1769aa",
            fontSize: "18px",
            fontWeight: "bold"
          }}
        >
          Loading doctor profile...
        </p>
      </div>
    );
  }

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
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          overflow: "hidden"
        }}
      >
        {/* Profile Header */}
        <div
          style={{
            backgroundColor: "#1769aa",
            padding: "30px",
            textAlign: "center",
            color: "white"
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "42px",
              margin: "0 auto 15px"
            }}
          >
            👨‍⚕️
          </div>

          <h1
            style={{
              margin: "0 0 8px",
              fontSize: "28px"
            }}
          >
            {profile.user.name}
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: "17px"
            }}
          >
            {profile.specialization}
          </p>
        </div>

        {/* Profile Information */}
        <div style={{ padding: "30px" }}>
          <h2
            style={{
              color: "#123b5d",
              fontSize: "22px",
              borderBottom: "2px solid #e0eaf2",
              paddingBottom: "10px",
              marginBottom: "20px"
            }}
          >
            👤 Personal Information
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "15px",
              marginBottom: "30px"
            }}
          >
            <div
              style={{
                backgroundColor: "#f4f9fc",
                padding: "15px",
                borderRadius: "9px"
              }}
            >
              <p
                style={{
                  margin: "0 0 5px",
                  color: "#6b7c8c",
                  fontSize: "14px"
                }}
              >
                Full Name
              </p>

              <p
                style={{
                  margin: 0,
                  color: "#123b5d",
                  fontWeight: "bold"
                }}
              >
                {profile.user.name}
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#f4f9fc",
                padding: "15px",
                borderRadius: "9px"
              }}
            >
              <p
                style={{
                  margin: "0 0 5px",
                  color: "#6b7c8c",
                  fontSize: "14px"
                }}
              >
                Email
              </p>

              <p
                style={{
                  margin: 0,
                  color: "#123b5d",
                  fontWeight: "bold"
                }}
              >
                {profile.user.email}
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#f4f9fc",
                padding: "15px",
                borderRadius: "9px"
              }}
            >
              <p
                style={{
                  margin: "0 0 5px",
                  color: "#6b7c8c",
                  fontSize: "14px"
                }}
              >
                Phone
              </p>

              <p
                style={{
                  margin: 0,
                  color: "#123b5d",
                  fontWeight: "bold"
                }}
              >
                {profile.user.phone}
              </p>
            </div>
          </div>

          {/* Professional Information */}
          <h2
            style={{
              color: "#123b5d",
              fontSize: "22px",
              borderBottom: "2px solid #e0eaf2",
              paddingBottom: "10px",
              marginBottom: "20px"
            }}
          >
            🩺 Professional Information
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "15px"
            }}
          >
            <div
              style={{
                backgroundColor: "#e8f5e9",
                padding: "15px",
                borderRadius: "9px"
              }}
            >
              <p
                style={{
                  margin: "0 0 5px",
                  color: "#5f7180",
                  fontSize: "14px"
                }}
              >
                Specialization
              </p>

              <p
                style={{
                  margin: 0,
                  color: "#2e7d32",
                  fontWeight: "bold"
                }}
              >
                {profile.specialization}
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#f4f9fc",
                padding: "15px",
                borderRadius: "9px"
              }}
            >
              <p
                style={{
                  margin: "0 0 5px",
                  color: "#6b7c8c",
                  fontSize: "14px"
                }}
              >
                Qualification
              </p>

              <p
                style={{
                  margin: 0,
                  color: "#123b5d",
                  fontWeight: "bold"
                }}
              >
                {profile.qualification}
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#f4f9fc",
                padding: "15px",
                borderRadius: "9px"
              }}
            >
              <p
                style={{
                  margin: "0 0 5px",
                  color: "#6b7c8c",
                  fontSize: "14px"
                }}
              >
                Experience
              </p>

              <p
                style={{
                  margin: 0,
                  color: "#123b5d",
                  fontWeight: "bold"
                }}
              >
                {profile.experience} years
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#f4f9fc",
                padding: "15px",
                borderRadius: "9px"
              }}
            >
              <p
                style={{
                  margin: "0 0 5px",
                  color: "#6b7c8c",
                  fontSize: "14px"
                }}
              >
                Hospital
              </p>

              <p
                style={{
                  margin: 0,
                  color: "#123b5d",
                  fontWeight: "bold"
                }}
              >
                {profile.hospital}
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#fff3e0",
                padding: "15px",
                borderRadius: "9px"
              }}
            >
              <p
                style={{
                  margin: "0 0 5px",
                  color: "#6b7c8c",
                  fontSize: "14px"
                }}
              >
                Consultation Fee
              </p>

              <p
                style={{
                  margin: 0,
                  color: "#ef6c00",
                  fontWeight: "bold",
                  fontSize: "18px"
                }}
              >
                ₹{profile.consultationFee}
              </p>
            </div>

            <div
              style={{
                backgroundColor: profile.available
                  ? "#e8f5e9"
                  : "#ffebee",
                padding: "15px",
                borderRadius: "9px"
              }}
            >
              <p
                style={{
                  margin: "0 0 5px",
                  color: "#6b7c8c",
                  fontSize: "14px"
                }}
              >
                Availability
              </p>

              <p
                style={{
                  margin: 0,
                  color: profile.available
                    ? "#2e7d32"
                    : "#c62828",
                  fontWeight: "bold"
                }}
              >
                {profile.available
                  ? "🟢 Available"
                  : "🔴 Not Available"}
              </p>
            </div>
          </div>

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
                marginTop: "30px",
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
    </div>
  );
}

export default DoctorProfile;
