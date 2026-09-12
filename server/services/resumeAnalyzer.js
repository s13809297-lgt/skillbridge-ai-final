

const fs = require("fs");
const { PDFParse } = require("pdf-parse");

const {
  analyzeSkills
} = require("./skillExtractor");

async function analyzeResume(filePath, originalName) {
  const pdfBuffer = fs.readFileSync(filePath);

  const parser = new PDFParse({
    data: pdfBuffer,
  });

  try {
    const data = await parser.getText();

    const text = data.text || "";
    const normalizedText = text.toLowerCase();
    const skillAnalysis =
  analyzeSkills(text);

    // Detect important resume sections
    const sections = {
      education: normalizedText.includes("education"),

      skills:
        normalizedText.includes("skills") ||
        normalizedText.includes("technical skills"),

      projects:
        normalizedText.includes("projects") ||
        normalizedText.includes("project"),

      experience:
        normalizedText.includes("experience") ||
        normalizedText.includes("internship"),

      certifications:
        normalizedText.includes("certification") ||
        normalizedText.includes("certifications"),
    };

    const issues = [];

    // Check sections
    if (!sections.education) {
      issues.push("Education section not detected.");
    }

    if (!sections.skills) {
      issues.push("Skills section not detected.");
    }

    if (!sections.projects) {
      issues.push("Projects section not detected.");
    }

    if (!sections.experience) {
      issues.push(
        "Experience or internship section not detected."
      );
    }

    if (!sections.certifications) {
      issues.push(
        "Certifications section not detected."
      );
    }

    // Check email
    const hasEmail =
      /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(text);

    if (!hasEmail) {
      issues.push("Email address not detected.");
    }

    // Check Indian phone number
    const hasPhone =
      /(?:\+91[\s-]?)?[6-9]\d{9}/.test(text);

    if (!hasPhone) {
      issues.push("Phone number not detected.");
    }

    // Check amount of extracted text
    if (text.trim().length < 500) {
      issues.push(
        "Very little readable text was extracted from the resume."
      );
    }

    const detectedSectionCount =
      Object.values(sections).filter(Boolean).length;

    let status = "Needs Improvement";

    if (
      detectedSectionCount >= 4 &&
      issues.length <= 2
    ) {
      status = "Good";
    }

    if (
      detectedSectionCount === 5 &&
      issues.length === 0
    ) {
      status = "Strong";
    }

    return {
      success: true,

      filename: originalName,

      status,

      sections,

      issues,

      textLength: text.length,
      skillAnalysis,
      message:
        status === "Strong"
          ? "Your resume contains the expected sections and basic contact information."
          : "Your resume can be improved before skill extraction.",
    };
  } finally {
    await parser.destroy();
  }
}

module.exports = {
  analyzeResume,
};