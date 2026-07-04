const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    service: {
      type: String,
      required: true,
    },

    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    link: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    creditsUsed: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Processing",
        "Completed",
        "Partial",
        "Canceled",
        "Failed",
      ],
      default: "Processing",
    },

    panel: {
      type: String,
      default: "SMMSOC",
    },

    serviceId: {
      type: Number,
      default: 3071,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
