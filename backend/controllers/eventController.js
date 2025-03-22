const Event = require("../models/event");

// Create Event (Only Organizers)
const createEvent = async (req, res) => {
  const { title, description, date, time, location } = req.body;
  const event = await Event.create({
    title,
    description,
    date,
    time,
    location,
    organizer: req.user._id,
  });
  res.status(201).json(event);
};

// Get All Events
const getAllEvents = async (req, res) => {
  const events = await Event.find().populate("organizer", "name email");
  res.status(200).json(events);
};

// Get Single Event
const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id).populate(
    "organizer",
    "name email"
  );
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.status(200).json(event);
};

// Update Event (Only Organizers)
const updateEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  if (event.organizer.toString() !== req.user._id)
    return res.status(403).json({ message: "Unauthorized" });

  Object.assign(event, req.body);
  await event.save();
  res.status(200).json(event);
};

// Delete Event (Only Organizers)
const deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  if (event.organizer.toString() !== req.user._id)
    return res.status(403).json({ message: "Unauthorized" });

  await event.deleteOne();
  res.status(200).json({ message: "Event deleted" });
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
