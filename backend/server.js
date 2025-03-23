if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const connectDB = require("./config/db");
connectDB();
require("./utils/cronJobs");

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const port = process.env.PORT || 9001;
const ExpressError = require("./utils/ExpressError");

const authRoute = require("./routes/authRoute");
const jobRoute = require("./routes/jobRoute");

// ✅ CORS Middleware (Fixes Cookies Not Storing Issue)
app.use(
  cors({
    origin: ["http://localhost:5173", "https://easy-hire-seekers.netlify.app"], // Allow both local and deployed frontend
    credentials: true, // ✅ Important for sending cookies
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); // ✅ Middleware for handling cookies

app.use("/api/auth", authRoute);
app.use("/api/jobs", jobRoute);

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!!"));
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Something Went Wrong!!" } = err;
  res.status(status).json({ error: message });
});

app.listen(port, () => {
  console.log(`App Listening To Port ${port}`);
});
