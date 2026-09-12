const express = require("express");
const cors = require("cors");

const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "SkillBridge AI Backend is running",
  });
});

app.listen(PORT, () => {
  console.log(
    `Server running at http://localhost:${PORT}`
  );
});