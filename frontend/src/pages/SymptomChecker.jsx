import { useState } from "react";
import { Link } from "react-router-dom";

function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [guidance, setGuidance] = useState("");
  const [emergency, setEmergency] = useState(false);

  const symptoms = [
  "Fever",
  "Headache",
  "Cough",
  "Sore Throat",
  "Fatigue",
  "Body Pain",
  "Nausea",
  "Stomach Pain",
  "Severe Breathing Difficulty",
  "Chest Pain",
  "Loss of Consciousness"
];

  const handleSymptomChange = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(
        selectedSymptoms.filter((item) => item !== symptom)
      );
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }

    setGuidance("");
    setEmergency(false);
  };

  const checkSymptoms = () => {
    const emergencySymptoms = [
  "Severe Breathing Difficulty",
  "Chest Pain",
  "Loss of Consciousness"
];

const hasEmergencySymptom = selectedSymptoms.some(
  (symptom) => emergencySymptoms.includes(symptom)
);

if (hasEmergencySymptom) {
  setEmergency(true);
  setGuidance(
  "One or more selected symptoms may be serious and require immediate medical attention. Please seek emergency medical care or contact your local emergency service."
);
  return;
}

setEmergency(false);
    if (selectedSymptoms.length === 0) {
      setGuidance("Please select at least one symptom.");
      return;
    }

    const guidanceMessages = [];

    if (selectedSymptoms.includes("Fever")) {
      guidanceMessages.push(
        "For fever: stay hydrated, get adequate rest, and monitor your temperature."
      );
    }

    if (selectedSymptoms.includes("Cough")) {
      guidanceMessages.push(
        "For cough: drink adequate fluids, rest, and monitor whether breathing becomes difficult."
      );
    }

    if (selectedSymptoms.includes("Headache")) {
      guidanceMessages.push(
        "For headache: rest in a quiet environment, stay hydrated, and monitor whether the headache becomes severe or persistent."
      );
    }

    if (selectedSymptoms.includes("Sore Throat")) {
      guidanceMessages.push(
        "For sore throat: drink warm fluids and stay hydrated."
      );
    }

    if (selectedSymptoms.includes("Fatigue")) {
      guidanceMessages.push(
        "For fatigue: get adequate rest, maintain hydration, and monitor how long the fatigue continues."
      );
    }

    if (selectedSymptoms.includes("Body Pain")) {
      guidanceMessages.push(
        "For body pain: rest, stay hydrated, and monitor whether the pain becomes severe."
      );
    }

    if (selectedSymptoms.includes("Nausea")) {
      guidanceMessages.push(
        "For nausea: take fluids slowly and consider small, light meals if tolerated."
      );
    }

    if (selectedSymptoms.includes("Stomach Pain")) {
      guidanceMessages.push(
        "For stomach pain: stay hydrated and seek medical evaluation if the pain is severe, persistent, or worsening."
      );
    }

    setGuidance(guidanceMessages.join(" "));
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
            marginBottom: "25px"
          }}
        >
          🩺 Smart Symptom Checker
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#555",
            marginBottom: "30px"
          }}
        >
          Select the symptoms you are currently experiencing.
        </p>

        <h3 style={{ marginBottom: "18px" }}>Select Symptoms</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
            marginTop: "15px"
          }}
        >
          {symptoms.map((symptom) => (
            <label
              key={symptom}
              style={{
                border: "1px solid #d9e2ec",
                padding: "14px",
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor: selectedSymptoms.includes(symptom)
                  ? "#e8f4ff"
                  : "#fff"
              }}
            >
              <input
                type="checkbox"
                checked={selectedSymptoms.includes(symptom)}
                onChange={() => handleSymptomChange(symptom)}
                style={{ marginRight: "10px" }}
              />
              {symptom}
            </label>
          ))}
        </div>

        <div style={{ marginTop: "25px" }}>
          <h3>Selected Symptoms</h3>

          {selectedSymptoms.length === 0 ? (
            <p style={{ color: "#777" }}>No symptoms selected.</p>
          ) : (
            <ul>
              {selectedSymptoms.map((symptom) => (
                <li key={symptom}>{symptom}</li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={checkSymptoms}
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "15px",
            backgroundColor: "#1769aa",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Check Symptoms
        </button>

<button
  onClick={() => {
    setSelectedSymptoms([]);
    setGuidance("");
    setEmergency(false);
  }}
  style={{
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    backgroundColor: "#777",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    cursor: "pointer"
  }}
>
  Clear Symptoms
</button>

{guidance && (
          <div
            style={{
              marginTop: "25px",
              padding: "20px",
              backgroundColor: emergency ? "#fff0f0" : "#eef8ee",
              border: emergency
                ? "1px solid #e57373"
                : "1px solid #b7ddb7",
              borderRadius: "10px"
            }}
          >
            <h3 style={{ color: emergency ? "#c62828" : "#2e7d32" }}>
            {emergency ? "🚨 Emergency Warning" : "💡 General Health Guidance"}
            </h3>

            <p style={{ lineHeight: "1.7", color: "#333" }}>
              {guidance}
            </p>

            <Link to="/book-appointment">
              <button
                style={{
                  marginTop: "10px",
                  padding: "12px 20px",
                  backgroundColor: "#2e7d32",
                  color: "white",
                  border: "none",
                  borderRadius: "7px",
                  cursor: "pointer"
                }}
              >
                Find a Doctor
              </button>
            </Link>
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
            ⚠️ <strong>Healthcare Disclaimer:</strong> This symptom checker
            provides general health information only. It is not a medical
            diagnosis and does not replace advice from a qualified healthcare
            professional.
          </p>
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link to="/patient-dashboard">
            ← Back to Patient Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SymptomChecker;