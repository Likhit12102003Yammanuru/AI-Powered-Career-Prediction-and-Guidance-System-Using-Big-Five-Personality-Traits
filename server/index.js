const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");
const jobDetails = require("./jobDetails");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // To parse JSON bodies

// POST /predict route
app.post("/predict", (req, res) => {
  let { O, C, E, A, N } = req.body; // Changed const to let for reassignment
  console.log("✅ Received /predict request with body:", req.body);

  // Validate input
  if (
    typeof O !== "number" ||
    typeof C !== "number" ||
    typeof E !== "number" ||
    typeof A !== "number" ||
    typeof N !== "number"
  ) {
    return res.status(400).json({ error: "Invalid or missing Big5 scores" });
  }

  // 🚨 CRITICAL FIX: Normalize 0-50 scale to 0-1 scale to match training data
  // Your model was trained on normalized data (0.0 - 0.75 range)
  // Frontend sends raw scores (0-50 range), so we must convert
  O = O / 50;
  C = C / 50;
  E = E / 50;
  A = A / 50;
  N = N / 50;

  console.log("📊 Normalized scores (0-1 scale):", { O, C, E, A, N });

  // Optional: Clamp values to ensure they stay within 0-1 range (safety check)
  O = Math.max(0, Math.min(1, O));
  C = Math.max(0, Math.min(1, C));
  E = Math.max(0, Math.min(1, E));
  A = Math.max(0, Math.min(1, A));
  N = Math.max(0, Math.min(1, N));

  const inputData = JSON.stringify({ O, C, E, A, N });
  console.log("▶️ Sending input to Python via spawn:", inputData);

  const python = spawn("python", ["predictor.py", inputData]);

  let result = "";
  let error = "";

  python.stdout.on("data", (data) => {
    result += data.toString();
  });

  python.stderr.on("data", (data) => {
    console.warn("⚠️ Python stderr:", data.toString());
  });

  python.on("close", (code) => {
    console.log("📦 Python process exited with code", code);

    // Split result string by newlines and filter out empty lines
    const lines = result.split(/\r?\n/).filter((line) => line.trim() !== "");

    // Find the line that looks like JSON
    const jsonLine = lines.find(line => line.trim().startsWith("{") && line.trim().endsWith("}"));

    if (!jsonLine) {
      console.error("❌ Failed to parse Python output:", result);
      return res.status(500).json({ error: "Invalid JSON from Python script" });
    }

    try {
      const parsed = JSON.parse(jsonLine);
      const prediction = parsed.prediction;

      const details = jobDetails[prediction];

      if (!details) {
        console.warn("⚠️ No job details found for:", prediction);
        return res.status(200).json({ prediction, message: "No details available for this job." });
      }

      const response = {
        prediction,
        ...details,
      };

      console.log("✅ Full prediction response:", response);
      return res.json(response);
    } catch (parseErr) {
      console.error("❌ JSON parse error:", parseErr);
      return res.status(500).json({ error: "Invalid JSON format from Python" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});