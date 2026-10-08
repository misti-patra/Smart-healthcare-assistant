import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      if (response.data.user.role === "doctor") {
        navigate("/doctor-dashboard");
      } else if (response.data.user.role === "patient") {
        navigate("/patient-dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        setErrorMessage(
          error.response.data?.message ||
            "Invalid email or password."
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
        padding: "20px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
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
            marginBottom: "30px"
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
              fontSize: "28px"
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
            Assistant
          </p>
        </div>

        {/* Login Heading */}
        <h2
          style={{
            textAlign: "center",
            color: "#1769aa",
            marginBottom: "25px"
          }}
        >
          Login
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

        <form onSubmit={handleLogin}>
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
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
              marginBottom: "25px"
            }}
          >
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
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

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: loading
                ? "#90caf9"
                : "#1769aa",
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
            {loading ? "Logging in..." : "🔐 Login"}
          </button>
        </form>

        {/* Register Link */}
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
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#1769aa",
                fontWeight: "bold",
                textDecoration: "none"
              }}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;