import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#e8f1f8",
        fontFamily: "Arial, sans-serif"
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#ffffff",
          padding: "18px 50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          position: "sticky",
          top: 0,
          zIndex: 1000
        }}
      >
        {/* Logo */}
        <div
          style={{
            color: "#123b5d",
            fontSize: "22px",
            fontWeight: "bold"
          }}
        >
          🏥 Smart Healthcare
        </div>

        {/* Navigation */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px"
          }}
        >
          <a
            href="#home"
            style={{
              textDecoration: "none",
              color: "#123b5d",
              fontWeight: "bold"
            }}
          >
            🏠 Home
          </a>

          <a
            href="#about"
            style={{
              textDecoration: "none",
              color: "#123b5d",
              fontWeight: "bold"
            }}
          >
            ℹ️ About
          </a>

          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "#1769aa",
              fontWeight: "bold",
              padding: "10px 18px"
            }}
          >
            Login
          </Link>

          <Link
            to="/register"
            style={{
              textDecoration: "none",
              color: "white",
              backgroundColor: "#1769aa",
              padding: "10px 18px",
              borderRadius: "7px",
              fontWeight: "bold"
            }}
          >
            Register
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "80px 25px 60px",
          textAlign: "center"
        }}
      >
        <div
          style={{
            fontSize: "70px",
            marginBottom: "20px"
          }}
        >
          🏥
        </div>

        <h1
          style={{
            color: "#123b5d",
            fontSize: "42px",
            marginBottom: "18px"
          }}
        >
          Smart Healthcare Assistant
        </h1>

        <p
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            color: "#526979",
            fontSize: "18px",
            lineHeight: "1.7"
          }}
        >
          A smart healthcare platform that helps patients manage
          appointments, check common symptoms, connect with doctors,
          and manage their healthcare information in one place.
        </p>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap"
          }}
        >
          <Link
            to="/register"
            style={{
              textDecoration: "none",
              backgroundColor: "#2e7d32",
              color: "white",
              padding: "14px 28px",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "16px"
            }}
          >
            📝 Get Started
          </Link>

          <Link
            to="/login"
            style={{
              textDecoration: "none",
              backgroundColor: "#1769aa",
              color: "white",
              padding: "14px 28px",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "16px"
            }}
          >
            🔐 Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "20px 25px 70px"
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#123b5d",
            marginBottom: "35px"
          }}
        >
          What Our Platform Offers
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "20px"
          }}
        >
          {/* Find Doctors */}
          <div
            style={{
              backgroundColor: "white",
              padding: "28px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 3px 12px rgba(0,0,0,0.08)"
            }}
          >
            <div style={{ fontSize: "40px" }}>👨‍⚕️</div>

            <h3 style={{ color: "#1769aa" }}>
              Find Doctors
            </h3>

            <p
              style={{
                color: "#607d8b",
                lineHeight: "1.6"
              }}
            >
              Search for doctors by name and specialization
              and book appointments easily.
            </p>
          </div>

          {/* Appointments */}
          <div
            style={{
              backgroundColor: "white",
              padding: "28px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 3px 12px rgba(0,0,0,0.08)"
            }}
          >
            <div style={{ fontSize: "40px" }}>📅</div>

            <h3 style={{ color: "#1769aa" }}>
              Manage Appointments
            </h3>

            <p
              style={{
                color: "#607d8b",
                lineHeight: "1.6"
              }}
            >
              Book, track, cancel, and view your appointment
              history from one dashboard.
            </p>
          </div>

          {/* Symptom Checker */}
          <div
            style={{
              backgroundColor: "white",
              padding: "28px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 3px 12px rgba(0,0,0,0.08)"
            }}
          >
            <div style={{ fontSize: "40px" }}>🩺</div>

            <h3 style={{ color: "#1769aa" }}>
              Symptom Checker
            </h3>

            <p
              style={{
                color: "#607d8b",
                lineHeight: "1.6"
              }}
            >
              Select common symptoms and receive general
              healthcare guidance.
            </p>
          </div>

          {/* Security */}
          <div
            style={{
              backgroundColor: "white",
              padding: "28px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 3px 12px rgba(0,0,0,0.08)"
            }}
          >
            <div style={{ fontSize: "40px" }}>🔒</div>

            <h3 style={{ color: "#1769aa" }}>
              Secure Access
            </h3>

            <p
              style={{
                color: "#607d8b",
                lineHeight: "1.6"
              }}
            >
              Role-based access helps keep patient and doctor
              information protected.
            </p>
          </div>
        </div>
      </section>

        {/* How It Works */}
    <section
    style={{
        backgroundColor: "#f4f8fb",
        padding: "70px 25px"
    }}
    >
    <div
        style={{
        maxWidth: "1100px",
        margin: "0 auto"
        }}
    >
        <h2
        style={{
            textAlign: "center",
            color: "#123b5d",
            marginBottom: "15px",
            fontSize: "30px"
        }}
        >
        How It Works
        </h2>

        <p
        style={{
            textAlign: "center",
            color: "#607d8b",
            marginBottom: "40px",
            fontSize: "16px"
        }}
        >
        Get started with Smart Healthcare Assistant in three simple steps.
        </p>

        <div
        style={{
            display: "grid",
            gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "25px"
        }}
        >
        {/* Step 1 */}
        <div
            style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 3px 12px rgba(0,0,0,0.08)"
            }}
        >
            <div style={{ fontSize: "45px", marginBottom: "15px" }}>
            👤
            </div>

            <h3 style={{ color: "#1769aa" }}>
            1. Create an Account
            </h3>

            <p
            style={{
                color: "#607d8b",
                lineHeight: "1.6"
            }}
            >
            Register as a patient and securely access your healthcare
            dashboard.
            </p>
        </div>

        {/* Step 2 */}
        <div
            style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 3px 12px rgba(0,0,0,0.08)"
            }}
        >
            <div style={{ fontSize: "45px", marginBottom: "15px" }}>
            🩺
            </div>

            <h3 style={{ color: "#1769aa" }}>
            2. Check & Find
            </h3>

            <p
            style={{
                color: "#607d8b",
                lineHeight: "1.6"
            }}
            >
            Use the symptom checker for general guidance or search for
            doctors by specialization.
            </p>
        </div>

        {/* Step 3 */}
        <div
            style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 3px 12px rgba(0,0,0,0.08)"
            }}
        >
            <div style={{ fontSize: "45px", marginBottom: "15px" }}>
            📅
            </div>

            <h3 style={{ color: "#1769aa" }}>
            3. Book an Appointment
            </h3>

            <p
            style={{
                color: "#607d8b",
                lineHeight: "1.6"
            }}
            >
            Book appointments, track their status, and manage your
            appointment history from your dashboard.
            </p>
        </div>
        </div>
    </div>
    </section>

      {/* About Section */}
      <section
        id="about"
        style={{
          backgroundColor: "#ffffff",
          padding: "70px 25px"
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <h2
            style={{
              color: "#123b5d",
              fontSize: "30px",
              marginBottom: "20px"
            }}
          >
            About Smart Healthcare Assistant
          </h2>

          <p
            style={{
              color: "#526979",
              fontSize: "17px",
              lineHeight: "1.8",
              marginBottom: "20px"
            }}
          >
            Smart Healthcare Assistant is a web-based healthcare
            platform designed to make basic healthcare management
            easier for patients and doctors.
          </p>

          <p
            style={{
              color: "#526979",
              fontSize: "17px",
              lineHeight: "1.8"
            }}
          >
            Patients can manage their profiles, find doctors,
            book appointments, view appointment history, and
            use a symptom checker for general healthcare guidance.
            Doctors can manage their professional information and
            handle patient appointments through their dashboard.
          </p>
        </div>
      </section>

      {/* Call To Action */}
      <section
        style={{
          backgroundColor: "#e3f2fd",
          textAlign: "center",
          padding: "60px 25px"
        }}
      >
        <h2
          style={{
            color: "#123b5d",
            marginBottom: "15px"
          }}
        >
          Ready to Get Started?
        </h2>

        <p
          style={{
            color: "#526979",
            marginBottom: "25px"
          }}
        >
          Create your account and start using Smart Healthcare
          Assistant.
        </p>

        <Link
          to="/register"
          style={{
            display: "inline-block",
            textDecoration: "none",
            backgroundColor: "#2e7d32",
            color: "white",
            padding: "14px 30px",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "16px"
          }}
        >
          📝 Create Account
        </Link>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#123b5d",
          color: "white",
          textAlign: "center",
          padding: "20px"
        }}
      >
        <p style={{ margin: 0 }}>
          © 2026 Smart Healthcare Assistant
        </p>
      </footer>
    </div>
  );
}

export default Home;