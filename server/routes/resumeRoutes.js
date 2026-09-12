const express = require("express");
const multer = require("multer");

const {
  analyzeResume,
} = require("../services/resumeAnalyzer");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post(
  "/analyze",
  upload.single("resume"),
  async (req, res) => {
    console.log("================================");
    console.log("Resume analyze request received");

    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No resume file received.",
        });
      }

      console.log(
        "Uploaded file:",
        req.file.originalname
      );

      const result = await analyzeResume(
        req.file.path,
        req.file.originalname
      );

      console.log("Resume analysis completed.");

      res.json(result);
    } catch (error) {
      console.error("ACTUAL RESUME ERROR:");
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Resume analysis failed: " +
          error.message,
      });
    }
  }
);

module.exports = router;