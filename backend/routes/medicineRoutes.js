
const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:medicineName", async (req, res) => {
  try {
    const medicineName = req.params.medicineName.trim();

    if (!medicineName) {
      return res.status(400).json({
        success: false,
        message: "Please enter a medicine name."
      });
    }

    // Search generic name first, then brand name.
    const normalizedName = medicineName.toLowerCase();

    const searchNames =
      normalizedName === "paracetamol"
        ? ["paracetamol", "acetaminophen"]
        : [medicineName];

    const queries = searchNames.flatMap((name) => [
      `openfda.generic_name:"${name}"`,
      `openfda.brand_name:"${name}"`
    ]);

    let result = null;

    for (const searchQuery of queries) {
      try {
        const response = await axios.get(
          "https://api.fda.gov/drug/label.json",
          {
            params: {
              search: searchQuery,
              limit: 1
            },
            timeout: 10000
          }
        );

        if (response.data.results?.length) {
          result = response.data.results[0];
          break;
        }
      } catch (error) {
        // A 404 means this particular search had no matches.
        if (error.response?.status !== 404) {
          throw error;
        }
      }
    }

    if (!result) {
      return res.status(404).json({
        success: false,
        message:
          "Medicine information not found. Please check the medicine name and try again."
      });
    }

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

    res.status(502).json({
      success: false,
      message:
        "Unable to retrieve medicine information right now. Please try again later."
    });
  }
});

module.exports = router;