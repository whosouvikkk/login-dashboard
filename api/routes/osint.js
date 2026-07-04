const express = require("express");
const axios = require("axios");
const User = require("../models/User");
const connectDB = require("../config/db");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

const LOOKUPS = {
  number: process.env.OSINT_NUMBER_URL,
  aadhar: process.env.OSINT_AADHAR_URL,
  vehicle: process.env.OSINT_VEHICLE_URL,
  upi: process.env.OSINT_UPI_URL,
  bomber: process.env.OSINT_BOMBER_URL,
};

router.post("/search", async (req, res) => {
  try {
    await connectDB();

    const { type, query } = req.body;

    if (!type || !query) {
      return res.status(400).json({
        success: false,
        message: "Missing lookup type or query.",
      });
    }

    const baseURL = LOOKUPS[type];

    if (!baseURL) {
      return res.status(400).json({
        success: false,
        message: "Invalid lookup type.",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.credits < 1) {
      return res.status(400).json({
        success: false,
        message: "Insufficient credits.",
      });
    }

    const response = await axios.get(
      baseURL + encodeURIComponent(query)
    );

    if (!response.data) {
      return res.status(400).json({
        success: false,
        message: "No data received.",
      });
    }

    user.credits -= 1;
    await user.save();

    res.json({
      success: true,
      credits: user.credits,
      data: response.data,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Lookup failed.",
    });
  }
});

module.exports = router;
