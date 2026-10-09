import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api";

function PatientProfile() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    bloodGroup: "",
    address: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: ""
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const loadProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${API_URL}/api/patient/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const profile = response.data.profile;

      setFormData({
        age: profile.age || "",
        gender: profile.gender || "",
        bloodGroup: profile.bloodGroup || "",
        address: profile.address || "",
        emergencyName: profile.emergencyContact?.name || "",
        emergencyPhone: profile.emergencyContact?.phone || "",
        emergencyRelation: profile.emergencyContact?.relation || ""
      });
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${API_URL}/api/patient/profile`,
        {
          age: formData.age,
          gender: formData.gender,
          bloodGroup: formData.bloodGroup,
          address: formData.address,

          emergencyContact: {
            name: formData.emergencyName,
            phone: formData.emergencyPhone,
            relation: formData.emergencyRelation
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(response.data.message);
    } catch (error) {
      console.error("Error saving profile:", error);

      alert(
        error.response?.data?.message ||
        "Could not save profile"
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
          maxWidth: "750px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          padding: "35px",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#123b5d",
            marginBottom: "20px"
          }}
        >
          👤 Patient Profile
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#5f7180",
            marginBottom: "30px"
          }}
        >
          Manage your personal and emergency contact information
        </p>

        <form onSubmit={handleSubmit}>
          <h2
            style={{
              color: "#1769aa",
              fontSize: "21px",
              borderBottom: "2px solid #e0eaf2",
              paddingBottom: "10px"
            }}
          >
            Personal Information
          </h2>

          <label
            style={{
              display: "block",
              marginTop: "20px",
              marginBottom: "7px",
              fontWeight: "bold",
              color: "#34495e"
            }}
          >
            Age
          </label>

          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            value={formData.age}
            onChange={handleChange}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px",
              border: "1px solid #ccd6df",
              borderRadius: "7px",
              fontSize: "15px"
            }}
          />

          <label
            style={{
              display: "block",
              marginTop: "20px",
              marginBottom: "7px",
              fontWeight: "bold",
              color: "#34495e"
            }}
          >
            Gender
          </label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px",
              border: "1px solid #9bb7cc",
              borderRadius: "7px",
              fontSize: "15px",
              backgroundColor: "#f7fbff",
              color: "#123b5d",
              fontWeight: "500",
              cursor: "pointer"
            }}
          >
            <option value="" style={{ color: "#777" }}>
              Select Gender
            </option>
            <option value="male" style={{ color: "#123b5d" }}>
              Male
            </option>
            <option value="female" style={{ color: "#123b5d" }}>
              Female
            </option>
            <option value="other" style={{ color: "#123b5d" }}>
              Other
            </option>
          </select>

          <label
            style={{
              display: "block",
              marginTop: "20px",
              marginBottom: "7px",
              fontWeight: "bold",
              color: "#34495e"
            }}
          >
            Blood Group
          </label>

          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px",
              border: "1px solid #9bb7cc",
              borderRadius: "7px",
              fontSize: "15px",
              backgroundColor: "#f7fbff",
              color: "#123b5d",
              fontWeight: "500",
              cursor: "pointer"
            }}
          >
            <option value="" style={{ color: "#777" }}>
              Select Blood Group
            </option>
            <option value="A+" style={{ color: "#123b5d" }}>A+</option>
            <option value="A-" style={{ color: "#123b5d" }}>A-</option>
            <option value="B+" style={{ color: "#123b5d" }}>B+</option>
            <option value="B-" style={{ color: "#123b5d" }}>B-</option>
            <option value="AB+" style={{ color: "#123b5d" }}>AB+</option>
            <option value="AB-" style={{ color: "#123b5d" }}>AB-</option>
            <option value="O+" style={{ color: "#123b5d" }}>O+</option>
            <option value="O-" style={{ color: "#123b5d" }}>O-</option>
          </select>

          <label
            style={{
              display: "block",
              marginTop: "20px",
              marginBottom: "7px",
              fontWeight: "bold",
              color: "#34495e"
            }}
          >
            Address
          </label>

          <input
            type="text"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px",
              border: "1px solid #ccd6df",
              borderRadius: "7px",
              fontSize: "15px"
            }}
          />

          <h2
            style={{
              color: "#c62828",
              fontSize: "21px",
              marginTop: "35px",
              borderBottom: "2px solid #f2dddd",
              paddingBottom: "10px"
            }}
          >
            🚨 Emergency Contact
          </h2>

          <label
            style={{
              display: "block",
              marginTop: "20px",
              marginBottom: "7px",
              fontWeight: "bold",
              color: "#34495e"
            }}
          >
            Contact Name
          </label>

          <input
            type="text"
            name="emergencyName"
            placeholder="Emergency contact name"
            value={formData.emergencyName}
            onChange={handleChange}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px",
              border: "1px solid #ccd6df",
              borderRadius: "7px",
              fontSize: "15px"
            }}
          />

          <label
            style={{
              display: "block",
              marginTop: "20px",
              marginBottom: "7px",
              fontWeight: "bold",
              color: "#34495e"
            }}
          >
            Contact Phone
          </label>

          <input
            type="text"
            name="emergencyPhone"
            placeholder="Emergency contact phone"
            value={formData.emergencyPhone}
            onChange={handleChange}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px",
              border: "1px solid #ccd6df",
              borderRadius: "7px",
              fontSize: "15px"
            }}
          />

          <label
            style={{
              display: "block",
              marginTop: "20px",
              marginBottom: "7px",
              fontWeight: "bold",
              color: "#34495e"
            }}
          >
            Relation
          </label>

          <input
            type="text"
            name="emergencyRelation"
            placeholder="Example: Father, Mother, Brother"
            value={formData.emergencyRelation}
            onChange={handleChange}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px",
              border: "1px solid #ccd6df",
              borderRadius: "7px",
              fontSize: "15px"
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "30px",
              backgroundColor: "#1769aa",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            💾 Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default PatientProfile;