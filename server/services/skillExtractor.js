const skillDatabase = {
  programming: [
    "c++",
    "java",
    "python",
    "javascript",
    "typescript",
    "sql",
    "rust"
  ],

  webDevelopment: [
    "html",
    "css",
    "react",
    "react.js",
    "node.js",
    "nodejs",
    "express",
    "express.js",
    "next.js",
    "nextjs",
    "bootstrap",
    "tailwind"
  ],

  dataScience: [
    "numpy",
    "pandas",
    "matplotlib",
    "seaborn",
    "scikit-learn",
    "machine learning",
    "data science",
    "data analysis",
    "statistics",
    "probability"
  ],

  artificialIntelligence: [
    "artificial intelligence",
    "ai",
    "deep learning",
    "neural networks",
    "nlp",
    "natural language processing",
    "computer vision",
    "generative ai",
    "genai",
    "llm",
    "large language models",
    "langchain",
    "rag"
  ],

  databases: [
    "mysql",
    "postgresql",
    "mongodb",
    "sql server",
    "oracle",
    "firebase"
  ],

  tools: [
    "git",
    "github",
    "docker",
    "kubernetes",
    "linux",
    "streamlit",
    "vs code"
  ],

  cloud: [
    "aws",
    "azure",
    "google cloud",
    "gcp"
  ]
};


// --------------------------------------
// NORMALIZE RESUME TEXT
// --------------------------------------

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s.+#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}


// --------------------------------------
// ESCAPE REGEX
// --------------------------------------

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}


// --------------------------------------
// CHECK WHETHER SKILL EXISTS
// --------------------------------------

function containsSkill(text, skill) {
  const escapedSkill = escapeRegex(
    skill.toLowerCase()
  );

  const pattern = new RegExp(
    `(^|\\s)${escapedSkill}(?=\\s|$|[,.;:])`,
    "i"
  );

  return pattern.test(text);
}


// --------------------------------------
// FIND EVIDENCE TYPE
// --------------------------------------

function findEvidence(text, skill) {

  const lowerText = text.toLowerCase();

  // -------------------------------
  // PROJECT EVIDENCE
  // -------------------------------

  const projectKeywords = [
    "projects",
    "project",
    "academic projects",
    "personal projects",
    "mini project"
  ];

  for (const keyword of projectKeywords) {

    const index =
      lowerText.indexOf(keyword);

    if (index !== -1) {

      const sectionText =
        lowerText.substring(
          index,
          index + 1500
        );

      if (
        containsSkill(
          sectionText,
          skill
        )
      ) {

        return {
          confidence: 0.95,
          evidence: "Project Evidence"
        };

      }
    }
  }


  // -------------------------------
  // CERTIFICATION EVIDENCE
  // -------------------------------

  const certificationKeywords = [
    "certifications",
    "certification",
    "certificates",
    "courses"
  ];

  for (const keyword of certificationKeywords) {

    const index =
      lowerText.indexOf(keyword);

    if (index !== -1) {

      const sectionText =
        lowerText.substring(
          index,
          index + 1000
        );

      if (
        containsSkill(
          sectionText,
          skill
        )
      ) {

        return {
          confidence: 0.90,
          evidence: "Certification Evidence"
        };

      }
    }
  }


  // -------------------------------
  // EDUCATION EVIDENCE
  // -------------------------------

  const educationKeywords = [
    "education",
    "academic",
    "coursework",
    "subjects"
  ];

  for (const keyword of educationKeywords) {

    const index =
      lowerText.indexOf(keyword);

    if (index !== -1) {

      const sectionText =
        lowerText.substring(
          index,
          index + 1000
        );

      if (
        containsSkill(
          sectionText,
          skill
        )
      ) {

        return {
          confidence: 0.80,
          evidence: "Education Evidence"
        };

      }
    }
  }


  // -------------------------------
  // SKILLS SECTION
  // -------------------------------

  const skillKeywords = [
    "skills",
    "technical skills",
    "technologies",
    "technical expertise"
  ];

  for (const keyword of skillKeywords) {

    const index =
      lowerText.indexOf(keyword);

    if (index !== -1) {

      const sectionText =
        lowerText.substring(
          index,
          index + 1000
        );

      if (
        containsSkill(
          sectionText,
          skill
        )
      ) {

        return {
          confidence: 0.75,
          evidence: "Resume Evidence"
        };

      }
    }
  }


  // -------------------------------
  // GENERAL RESUME EVIDENCE
  // -------------------------------

  return {
    confidence: 0.70,
    evidence: "Resume Evidence"
  };
}


// --------------------------------------
// EXTRACT SKILLS
// --------------------------------------

function extractSkills(text) {

  const normalizedText =
    normalizeText(text);

  const detectedSkills = [];

  for (const category in skillDatabase) {

    const skills =
      skillDatabase[category];

    for (const skill of skills) {

      if (
        containsSkill(
          normalizedText,
          skill
        )
      ) {

        const evidence =
          findEvidence(
            normalizedText,
            skill
          );

        detectedSkills.push({

          name: skill,

          category: category,

          confidence:
            evidence.confidence,

          evidence:
            evidence.evidence

        });

      }
    }
  }

  return detectedSkills;
}


// --------------------------------------
// REMOVE DUPLICATES
// --------------------------------------

function removeDuplicateSkills(skills) {

  const uniqueSkills = [];

  const normalizedNames =
    new Set();

  for (const skill of skills) {

    let name =
      skill.name.toLowerCase();


    // React variants
    if (
      name === "react.js"
    ) {
      name = "react";
    }


    // Node variants
    if (
      name === "nodejs"
    ) {
      name = "node.js";
    }


    // Skip duplicate
    if (
      normalizedNames.has(name)
    ) {
      continue;
    }

    normalizedNames.add(name);


    uniqueSkills.push({

      ...skill,

      name:
        name === "react"
          ? "React"
          : name === "node.js"
          ? "Node.js"
          : skill.name

    });

  }

  return uniqueSkills;
}


// --------------------------------------
// ANALYZE SKILLS
// --------------------------------------

function analyzeSkills(text) {

  const skills =
    extractSkills(text);

  const uniqueSkills =
    removeDuplicateSkills(skills);

  const categoryCount = {};


  uniqueSkills.forEach(
    (skill) => {

      if (
        !categoryCount[
          skill.category
        ]
      ) {

        categoryCount[
          skill.category
        ] = 0;

      }

      categoryCount[
        skill.category
      ]++;

    }
  );


  return {

    totalSkills:
      uniqueSkills.length,

    skills:
      uniqueSkills,

    categoryCount

  };

}


module.exports = {
  extractSkills,
  analyzeSkills
};