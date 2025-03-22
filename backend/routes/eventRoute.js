const express = require("express");
const { authenticate, isOrganizer } = require("../middleware/authenticate");
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router();

// Event Routes
router.post("/", authenticate, isOrganizer, wrapAsync(createEvent));
router.get("/", wrapAsync(getAllEvents));
router.get("/:id", wrapAsync(getEventById));
router.put("/:id", authenticate, isOrganizer, wrapAsync(updateEvent));
router.delete("/:id", authenticate, isOrganizer, wrapAsync(deleteEvent));

module.exports = router;
