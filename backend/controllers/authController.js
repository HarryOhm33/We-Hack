const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Session = require("../models/session");
const otpGenerator = require("otp-generator");
const sendEmail = require("../utils/sendEmail");
const OTP = require("../models/otp");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, organization } = req.body;
    // console.log(req.body);

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // ✅ Validate role (default to 'candidate' if not provided)
    const userRole = role || "candidate";
    if (!["candidate", "recruiter"].includes(userRole)) {
      return res.status(400).json({ message: "Invalid role selected" });
    }

    // ✅ If recruiter, ensure organization is provided
    if (userRole === "recruiter" && !organization) {
      return res
        .status(400)
        .json({ message: "Organization name is required for recruiters." });
    }

    // ✅ Generate OTP (6-digit numeric)
    const otp = otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // ✅ Remove any existing OTP for this email
    await OTP.deleteOne({ email });

    // ✅ Send OTP via email
    await sendEmail(email, "Verify Your Account", `Your OTP is ${otp}`);

    // ✅ Temporarily store user details (hash password)
    const hashedPassword = await bcrypt.hash(password, 10);
    await OTP.create({
      email,
      otp,
      name,
      password: hashedPassword,
      role: userRole,
      organization: userRole === "recruiter" ? organization : null,
    });

    res
      .status(200)
      .json({ message: "OTP sent to email. Verify to complete signup." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found, SignUp First!!" });
    }

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your account first." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // ✅ Store session in MongoDB
    await Session.create({ userId: user._id, token });

    // ✅ Set token in HTTP-only cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // ✅ Return token in response along with user details
    res.status(200).json({
      message: "Login successful",
      token, // Sending token in response
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization || null, // Include only if recruiter
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports.logout = async (req, res) => {
  // ✅ Delete the session from MongoDB
  await Session.deleteOne({ userId: req.user.id });

  // ✅ Clear the authentication cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "Logged out successfully" });
};

module.exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // ✅ Find OTP record
    const storedOTP = await OTP.findOne({ email, otp });
    if (!storedOTP) {
      return res.status(400).json({ message: "Invalid OTP or expired" });
    }

    // ✅ Create User with the ALREADY hashed password
    const newUser = new User({
      name: storedOTP.name,
      email,
      password: storedOTP.password, // ✅ Hashed password stored previously
      role: storedOTP.role, // ✅ Preserve user role
      isVerified: true,
    });

    // ✅ If recruiter, add organization field
    if (storedOTP.role === "recruiter") {
      newUser.organization = storedOTP.organization;
    }

    await newUser.save(); // ✅ Save user to DB

    // ✅ Delete OTP after successful verification
    await OTP.deleteOne({ email });

    res.status(200).json({ message: "Signup successful. You can now log in." });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.resendOTP = async (req, res) => {
  const { email } = req.body;

  const existingUser = await OTP.findOne({ email });
  if (!existingUser)
    return res.status(400).json({ message: "No pending verification found." });

  // ✅ Generate new OTP
  const otp = otpGenerator.generate(6, {
    digits: true,
    upperCaseAlphabets: false, // ❌ Disable uppercase letters
    lowerCaseAlphabets: false, // ❌ Disable lowercase letters
    specialChars: false, // ❌ Disable special characters
  });

  // ✅ Update OTP in DB
  await OTP.updateOne({ email }, { otp });

  // ✅ Send OTP via email
  await sendEmail(email, "Resend OTP", `Your new OTP is ${otp}`);

  res.status(200).json({ message: "New OTP sent successfully." });
};

exports.verifyAuth = async (req, res) => {
  if (req.user) {
    return res.status(200).json({ user: req.user });
  }
  return res.status(401).json({ message: "Unauthorized" });
};
