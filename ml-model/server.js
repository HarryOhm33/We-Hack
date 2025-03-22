const express = require("express");
const cors = require("cors");
const mlRoutes = require("./ml_model/api");

const app = express();
app.use(cors());
app.use(express.json()); // Use built-in JSON parser

// Debugging middleware to log requests
app.use((req, res, next) => {
  console.log(`📥 Incoming Request: ${req.method} ${req.url}`);
  next();
});

app.use("/ml", mlRoutes); // Load ML Routes

// Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
