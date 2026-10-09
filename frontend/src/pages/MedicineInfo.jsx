import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_URL from "../api";

function MedicineInfo() {
  const [medicineName, setMedicineName] = useState("");
  const [medicineInfo, setMedicineInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const searchMedicine = async (event) => {
    event.preventDefault();

    if (!medicineName.trim()) {
      setErrorMessage("Please enter a medicine name.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setMedicineInfo(null);

    try {
      const response = await axios.get(
        `${API_URL}/api/medicine/${encodeURIComponent(
          medicineName.trim()
        )}`
      );

      setMedicineInfo(response.data.information);
    } catch (error) {
      console.error("Medicine search error:", error);

      setErrorMessage(
        error.response?.data?.message ||
            "Medicine information could not be found. Please try another medicine name."
      );
    } finally {
      setLoading(false);
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
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "white",
          padding: "35px",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#1769aa",
            marginBottom: "10px"
          }}
        >
          💊 Medicine Information
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#607d8b",
            marginBottom: "30px"
          }}
        >
          Search for general information from an external healthcare
          database.
        </p>

        <form onSubmit={searchMedicine}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#123b5d",
              fontWeight: "bold"
            }}
          >
            Medicine Name
          </label>

          <input
            type="text"
            placeholder="Example: aspirin"
            value={medicineName}
            onChange={(event) => setMedicineName(event.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px",
              border: "1px solid #9bb7cc",
              borderRadius: "8px",
              fontSize: "15px",
              marginBottom: "15px",
              outline: "none",
              backgroundColor: "#f7fbff",
              color: "#123b5d"
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: loading ? "#90caf9" : "#1769aa",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Searching..." : "🔍 Search Medicine"}
          </button>
        </form>

        <div
            style={{
                marginTop: "15px",
                textAlign: "center"
            }}
            >
            <p
                style={{
                marginBottom: "10px",
                color: "#607d8b",
                fontSize: "14px"
                }}
            >
                Try an example:
            </p>

            <div
                style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                flexWrap: "wrap"
                }}
            >
                {["aspirin", "ibuprofen", "acetaminophen"].map((medicine) => (
                <button
                    key={medicine}
                    type="button"
                    onClick={() => {
                        setMedicineName(medicine);

                        setTimeout(() => {
                            searchMedicine({ preventDefault: () => {} });
                        }, 0);
                    }}
                    style={{
                    padding: "8px 14px",
                    border: "1px solid #90caf9",
                    borderRadius: "20px",
                    backgroundColor: "#e3f2fd",
                    color: "#1769aa",
                    cursor: "pointer"
                    }}
                >
                    {medicine}
                </button>
                ))}
            </div>
        </div>

        {errorMessage && (
          <div
            style={{
              marginTop: "25px",
              padding: "15px",
              backgroundColor: "#ffebee",
              border: "1px solid #ef9a9a",
              borderRadius: "8px",
              color: "#c62828"
            }}
          >
            ⚠️ {errorMessage}
          </div>
        )}

        {medicineInfo && (
          <div
            style={{
              marginTop: "30px",
              padding: "25px",
              backgroundColor: "#f7fbff",
              border: "1px solid #c5dbea",
              borderRadius: "10px"
            }}
          >
            <h2
              style={{
                color: "#123b5d",
                marginTop: 0
              }}
            >
              Medicine Details
            </h2>

            <p>
              <strong>Brand Name:</strong>{" "}
              {medicineInfo.brandName}
            </p>

            <p>
              <strong>Generic Name:</strong>{" "}
              {medicineInfo.genericName}
            </p>

            <div style={{ marginTop: "20px" }}>
              <h3 style={{ color: "#1769aa" }}>
                Purpose / Usage
              </h3>

              <p
                style={{
                  color: "#444",
                  lineHeight: "1.7",
                  whiteSpace: "pre-line"
                }}
              >
                {medicineInfo.purpose}
              </p>
            </div>

            <div style={{ marginTop: "20px" }}>
              <h3 style={{ color: "#c62828" }}>
                Warnings
              </h3>

              <p
                style={{
                  color: "#444",
                  lineHeight: "1.7",
                  whiteSpace: "pre-line"
                }}
              >
                {medicineInfo.warnings}
              </p>
            </div>
          </div>
        )}

        <div
          style={{
            marginTop: "30px",
            padding: "15px",
            backgroundColor: "#fff8e1",
            border: "1px solid #ffcc80",
            borderRadius: "8px",
            textAlign: "center"
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              lineHeight: "1.6",
              color: "#795548"
            }}
          >
            ⚠️ <strong>Healthcare Disclaimer:</strong> This feature
            provides general medicine information only. It is not a
            medical diagnosis and does not replace advice from a
            qualified healthcare professional. Do not start, stop,
            or change medication based only on this information.
          </p>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "20px"
          }}
        >
          <Link to="/patient-dashboard">
            ← Back to Patient Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MedicineInfo;