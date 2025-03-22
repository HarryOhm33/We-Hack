const express = require("express");
const { PythonShell } = require("python-shell");
const router = express.Router();

router.post("/predict", async (req, res) => {
  try {
    let { score, coverLetter } = req.body;

    // Validate input
    if (!score || !coverLetter) {
      return res
        .status(400)
        .json({ message: "Score and cover letter are required." });
    }

    score = score.trim();
    coverLetter = coverLetter.trim();

    if (!score.match(/^\d+%$/)) {
      return res
        .status(400)
        .json({ message: "Score must be a percentage (e.g., '85%')." });
    }

    // Set up PythonShell options
    const options = {
      mode: "text",
      pythonPath:
        "C:/Users/hari3/OneDrive/Desktop/Projects/We-Hack/ml-model/venv/Scripts/python.exe",
      pythonOptions: ["-u"], // Unbuffered output
      scriptPath: "./ml_model",
      args: [score, coverLetter],
    };

    console.log("📤 Sending to Python:", score, coverLetter);

    // Convert PythonShell to a Promise-based function
    const runPythonScript = () =>
      new Promise((resolve, reject) => {
        const shell = new PythonShell("predict.py", options);

        let isResolved = false; // Track if process has responded

        shell.on("message", (message) => {
          if (!isResolved) {
            console.log("📥 Prediction Received:", message);
            isResolved = true;
            resolve(message);
          }
        });

        shell.on("error", (err) => {
          if (!isResolved) {
            console.error("🚨 Python Error:", err);
            isResolved = true;
            reject(new Error(`ML model execution failed: ${err.message}`));
          }
        });

        // Handle timeout (terminate process properly)
        const timeout = setTimeout(() => {
          if (!isResolved) {
            console.error("⏳ Timeout: Python script took too long!");
            shell.childProcess.kill("SIGTERM"); // Properly kill the process
            isResolved = true;
            reject(new Error("ML model execution timed out."));
          }
        }, 10000); // 10 seconds timeout

        shell.on("close", () => clearTimeout(timeout)); // Clear timeout if script exits normally
      });

    // Await Python execution
    const prediction = await runPythonScript();

    res.json({ prediction });
  } catch (error) {
    console.error("🔥 Server Error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
