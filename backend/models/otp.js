const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  name: { type: String, required: true }, // User's name
  password: { type: String, required: true }, // Hashed password
  role: {
    type: String,
    enum: ["candidate", "recruiter"],
    default: "candidate",
    required: true,
  }, // User role
  organization: {
    type: String,
    required: function () {
      return this.role === "recruiter";
    },
  }, // Only required for recruiters
  createdAt: { type: Date, default: Date.now },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 600 * 1000), // 5 min expiry
    index: { expires: 600 }, // TTL index for automatic deletion after 5 min
  },
});

module.exports = mongoose.model("OTP", otpSchema);
