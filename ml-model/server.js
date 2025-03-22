const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PythonShell } = require("python-shell");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/predict", async (req, res) => {
  const { score, coverLetter } = req.body;

  // Ensure input is valid
  if (!score || !coverLetter) {
    return res
      .status(400)
      .json({ message: "Score and cover letter are required." });
  }

  // Run Python script
  let options = {
    mode: "text",
    pythonOptions: ["-u"],
    scriptPath: "./ml_model",
    pythonPath: "./ml_model/venv/bin/python", // Linux/macOS
    // pythonPath: "./ml_model/venv/Scripts/python.exe", // Windows
    args: [score, coverLetter],
  };

  PythonShell.run("model.py", options, function (err, results) {
    if (err)
      return res
        .status(500)
        .json({ message: "Error running ML model", error: err.message });

    // Results from Python
    const prediction = results[0];
    res.json({ prediction });
  });
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 ML API running on http://localhost:${PORT}`)
);
