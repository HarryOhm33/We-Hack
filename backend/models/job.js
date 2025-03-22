const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    skillsRequired: { type: [String], default: [] },
    location: { type: String, default: "Remote", trim: true }, // Optional location field
    salaryRange: { type: String, default: "Negotiable", trim: true }, // Optional salary range
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of applicants
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

module.exports = mongoose.model("Job", jobSchema);
