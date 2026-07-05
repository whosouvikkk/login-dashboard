const express = require("express");
const axios = require("axios");
const connectDB = require("../config/db");
const User = require("../models/User");
const Order = require("../models/Order");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

/*
|--------------------------------------------------------------------------
| TikTok Views Service
|--------------------------------------------------------------------------
*/

router.post("/tiktok", async (req, res) => {
  console.log("BODY:", req.body);
  try {
    await connectDB();

  const body = req.body || {};

const { link, quantity } = body;

    if (!req.body) {
  return res.status(400).json({
    success: false,
    message: "Request body is missing."
  });
}

    if (!link || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Missing fields."
      });
    }

    const qty = Number(quantity);

    if (qty < 1000) {
      return res.status(400).json({
        success: false,
        message: "Minimum quantity is 1000."
      });
    }

    const creditsRequired = Math.ceil(qty / 1000);

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    if (user.credits < creditsRequired) {
      return res.status(400).json({
        success: false,
        message: "Insufficient credits."
      });
    }

    const params = new URLSearchParams();

    params.append("key", process.env.SMM_API_KEY);

    params.append("action", "add");

    params.append("service", "3207");

    params.append("link", link);

    params.append("quantity", qty);

    const panel = await axios.post(
      "https://smmsoc.com/api/v2",
      params,
      {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
      }
    );

    if (!panel.data.order) {
      return res.status(400).json({
        success: false,
        message:
          panel.data.error ||
          "Panel rejected the order.",
      });
    }

    user.credits -= creditsRequired;

    await user.save();

    await Order.create({
      user: user._id,
      service: "TikTok Views",
      quantity: qty,
      creditsUsed: creditsRequired,
      orderId: panel.data.order,
      status: "Processing",
      link,
    });

    res.json({
      success: true,
      order: panel.data.order,
      remainingCredits: user.credits,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

module.exports = router;
