const Job = require("../models/job");
const Application = require("../models/application");

exports.postJob = async (req, res) => {
  if (req.user.role !== "recruiter") {
    return res.status(403).json({ message: "Only recruiters can post jobs" });
  }

  const job = new Job({ ...req.body, postedBy: req.user.id });
  await job.save();

  res.status(201).json({ message: "Job posted successfully!" });
};

exports.getAllJobs = async (req, res) => {
  const jobs = await Job.find().populate("postedBy", "organization");
  res.json(jobs);
};

exports.applyForJob = async (req, res) => {
  if (req.user.role !== "candidate") {
    return res
      .status(403)
      .json({ message: "Only candidates can apply for jobs" });
  }

  const application = new Application({
    job: req.params.jobId,
    candidate: req.user.id,
    coverLetter: req.body.coverLetter,
  });

  await application.save();
  res.status(201).json({ message: "Application submitted successfully!" });
};

exports.getJobApplications = async (req, res) => {
  // ✅ Ensure only recruiters can access this route
  if (req.user.role !== "recruiter") {
    return res
      .status(403)
      .json({ message: "Only recruiters can view job applications" });
  }

  const job = await Job.findById(req.params.jobId);
  if (!job) return res.status(404).json({ message: "Job not found" });

  // ✅ Ensure recruiter can only view applications for their own jobs
  if (job.postedBy.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ message: "You can only view applications for your jobs" });
  }

  const applications = await Application.find({
    job: req.params.jobId,
  }).populate("candidate", "name email");
  res.json(applications);
};
