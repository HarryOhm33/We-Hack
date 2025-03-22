const Job = require("../models/job");
const Application = require("../models/application");

exports.postJob = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Only recruiters can post jobs" });
    }

    const {
      title,
      description,
      skillsRequired,
      location,
      salaryRange,
      assessmentRequired,
      assessmentQuestions,
      minimumScore,
    } = req.body;

    // Basic validation
    if (
      !title ||
      !description ||
      !skillsRequired ||
      !location ||
      !salaryRange
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    // Validate assessment questions if assessmentRequired is true
    if (assessmentRequired) {
      if (!assessmentQuestions || assessmentQuestions.length === 0) {
        return res.status(400).json({
          message:
            "Assessment questions are required if assessment is enabled.",
        });
      }

      for (const question of assessmentQuestions) {
        if (
          !question.question ||
          !question.options ||
          question.options.length < 2 ||
          !question.correctAnswer
        ) {
          return res.status(400).json({
            message:
              "Each assessment question must have a question, at least two options, and a correct answer.",
          });
        }
      }
    }

    const newJob = new Job({
      title,
      description,
      skillsRequired,
      location,
      salaryRange,
      assessmentRequired,
      assessmentQuestions: assessmentRequired ? assessmentQuestions : [],
      minimumScore: assessmentRequired ? minimumScore : 0,
      postedBy: req.user.id,
    });

    await newJob.save();
    res.status(200).json({ message: "Job posted successfully!", job: newJob });
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
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
