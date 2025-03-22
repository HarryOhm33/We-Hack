const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  name: { type: String, required: true }, // User's name
  password: { type: String, required: true }, // Hashed password
  createdAt: { type: Date, default: Date.now },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 600 * 1000), // 5 min
    index: { expires: 600 }, // 5 minutes in seconds
  },
});

module.exports = mongoose.model("OTP", otpSchema);
