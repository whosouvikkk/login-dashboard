const express = require("express");
const axios = require("axios");
const User = require("../models/User");
const connectDB = require("../config/db");
const { protect } = require("../middleware/auth");
const logs = require("../utils/logs");

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

   // if (user.credits < 1) {
   //   return res.status(400).json({
     //   success: false,
       // message: "Insufficient credits.",
    //  });
  //  }

    const response = await axios.get(
  baseURL + encodeURIComponent(query)
);

if (!response.data) {
  return res.status(400).json({
    success: false,
    message: "No data received.",
  });
}

// Remove unwanted fields recursively
const cleanObject = (obj) => {
  if (!obj || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map(cleanObject);
  }

  const blocked = new Set([
    "credit",
    "developer",
    "query_time_ms",
    "status",
    "username",
    "expiry",
    "expiration",
    "expires",
    "uses_left",
    "remaining",
    "dailyRemaining",
    "limit",
    "requests_left",
    "powered_by",
    "api_info",
    "used",
    "created",
  ]);

  const cleaned = {};

  for (const [key, value] of Object.entries(obj)) {
    const lower = key.toLowerCase();

    if (blocked.has(lower)) continue;

    if (lower === "key_owner") {
      cleaned[key] = "MoonWitch";
      continue;
    }

    cleaned[key] = cleanObject(value);
  }

  return cleaned;
};

const cleanedData = cleanObject(response.data);

// user.credits -= 1;
// await user.save();

await logs.service(
    req,
    user,
    `OSINT ${type}`,
    query,
    "SUCCESS"
);
    
res.json({
  success: true,
  credits: user.credits,
  data: cleanedData,
});

  } catch (err) {

    console.error(err);

    await logs.error(
        "/osint/search",
        err.message
    );

    res.status(500).json({
        success: false,
        message: "Lookup failed.",
    });
}
});

module.exports = router;
