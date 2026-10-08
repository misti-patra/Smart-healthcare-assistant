import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

    setErrorMessage("");
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          ...formData,
          role: "patient"
        }
      );

      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response) {
        setErrorMessage(
          error.response.data?.message ||
            "Registration failed."
        );
      } else if (error.request) {
        setErrorMessage(
          "Unable to connect to the server. Please make sure the backend is running."
        );
      } else {
        setErrorMessage(
          "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#e8f1f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px 20px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          backgroundColor: "#ffffff",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)"
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "25px"
          }}
        >
          <div
            style={{
              width: "75px",
              height: "75px",
              borderRadius: "50%",
              backgroundColor: "#e3f2fd",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto 15px",
              fontSize: "38px"
            }}
          >
            🏥
          </div>

          <h1
            style={{
              margin: "0 0 8px",
              color: "#123b5d",
              fontSize: "27px"
            }}
          >
            Smart Healthcare
          </h1>

          <p
            style={{
              margin: 0,
              color: "#6b7c8c",
              fontSize: "15px"
            }}
          >
            Create your patient account
          </p>
        </div>

        {/* Registration Heading */}
        <h2
          style={{
            textAlign: "center",
            color: "#1769aa",
            marginBottom: "25px"
          }}
        >
          Patient Registration
        </h2>

        {/* Error Message */}
        {errorMessage && (
          <div
            style={{
              backgroundColor: "#ffebee",
              color: "#c62828",
              border: "1px solid #ef9a9a",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              textAlign: "center",
              fontSize: "14px"
            }}
          >
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleRegister}>
          {/* Full Name */}
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              color: "#123b5d",
              fontWeight: "bold"
            }}
          >
            Full Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px",
              border: "1px solid #9bb7cc",
              borderRadius: "8px",
              fontSize: "15px",
              marginBottom: "18px",
              outline: "none",
              backgroundColor: "#f7fbff",
              color: "#123b5d"
            }}
          />

          {/* Email */}
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              color: "#123b5d",
              fontWeight: "bold"
            }}
          >
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px",
              border: "1px solid #9bb7cc",
              borderRadius: "8px",
              fontSize: "15px",
              marginBottom: "18px",
              outline: "none",
              backgroundColor: "#f7fbff",
              color: "#123b5d"
            }}
          />

          {/* Password */}
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              color: "#123b5d",
              fontWeight: "bold"
            }}
          >
            Password
          </label>

          <div
            style={{
              position: "relative",
              marginBottom: "18px"
            }}
          >
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px",
                paddingRight: "75px",
                border: "1px solid #9bb7cc",
                borderRadius: "8px",
                fontSize: "15px",
                outline: "none",
                backgroundColor: "#f7fbff",
                color: "#123b5d"
              }}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "transparent",
                color: "#1769aa",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Phone */}
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              color: "#123b5d",
              fontWeight: "bold"
            }}
          >
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px",
              border: "1px solid #9bb7cc",
              borderRadius: "8px",
              fontSize: "15px",
              marginBottom: "25px",
              outline: "none",
              backgroundColor: "#f7fbff",
              color: "#123b5d"
            }}
          />

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: loading
                ? "#81c784"
                : "#2e7d32",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: loading
                ? "not-allowed"
                : "pointer"
            }}
          >
            {loading
              ? "Creating Account..."
              : "📝 Create Account"}
          </button>
        </form>

        {/* Login Link */}
        <div
          style={{
            textAlign: "center",
            marginTop: "25px",
            paddingTop: "20px",
            borderTop: "1px solid #e0eaf2"
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#6b7c8c"
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#1769aa",
                fontWeight: "bold",
                textDecoration: "none"
              }}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;