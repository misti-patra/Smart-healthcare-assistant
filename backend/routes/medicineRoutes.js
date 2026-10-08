const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:medicineName", async (req, res) => {
  try {
    const medicineName = req.params.medicineName;

    const response = await axios.get(
      "https://api.fda.gov/drug/label.json",
      {
        params: {
          search: `openfda.generic_name:"${medicineName}"`,
          limit: 1
        }
      }
    );

    const result = response.data.results[0];

    res.json({
      success: true,
      medicine: medicineName,
      information: {
        brandName:
          result.openfda?.brand_name?.[0] || "Not available",

        genericName:
          result.openfda?.generic_name?.[0] || "Not available",

        purpose:
          result.purpose?.[0] ||
          result.indications_and_usage?.[0] ||
          "Information not available",

        warnings:
          result.warnings?.[0] ||
          "Warning information not available"
      }
    });
  } catch (error) {
    console.error(
      "Medicine API error:",
      error.response?.data || error.message
    );

    res.status(404).json({
      success: false,
      message:
        "Medicine information not found. Please check the medicine name and try again."
    });
  }
});

module.exports = router;