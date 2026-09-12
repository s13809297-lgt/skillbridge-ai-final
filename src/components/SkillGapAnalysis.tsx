import { useState } from "react";

interface Skill {
  name: string;
  category: string;
  confidence: number;
  evidence: string;
}

interface SkillGapAnalysisProps {
  skills: Skill[];
}

interface Role {
  name: string;
  skills: string[];
}

interface RoadmapItem {
  title: string;
  level: string;
  topics: string[];
  project: string;
}


// =====================================================
// SKILL GAP ANALYSIS
// =====================================================

function SkillGapAnalysis({
  skills,
}: SkillGapAnalysisProps) {

  const [selectedRole, setSelectedRole] =
    useState("Data Scientist");

  const [showRoadmap, setShowRoadmap] =
    useState(false);


  // ===================================================
  // ROLE REQUIREMENTS
  // ===================================================

  const roles: Role[] = [

    {
      name: "Data Scientist",

      skills: [
        "Python",
        "SQL",
        "Pandas",
        "NumPy",
        "Statistics",
        "Probability",
        "Machine Learning",
        "Scikit-learn",
        "Matplotlib",
      ],
    },

    {
      name: "Data Analyst",

      skills: [
        "Python",
        "SQL",
        "Pandas",
        "NumPy",
        "Statistics",
        "Excel",
        "Power BI",
        "Data Analysis",
        "Matplotlib",
      ],
    },

    {
      name: "ML Engineer",

      skills: [
        "Python",
        "SQL",
        "Machine Learning",
        "Scikit-learn",
        "Deep Learning",
        "Docker",
        "Git",
        "Linux",
      ],
    },

    {
      name: "AI Engineer",

      skills: [
        "Python",
        "Machine Learning",
        "Deep Learning",
        "NLP",
        "Generative AI",
        "LLM",
        "LangChain",
        "Docker",
        "Git",
      ],
    },

    {
      name: "Python Developer",

      skills: [
        "Python",
        "SQL",
        "Git",
        "GitHub",
        "Docker",
        "Linux",
        "REST API",
        "FastAPI",
      ],
    },

  ];


  // ===================================================
  // NORMALIZE SKILLS
  // ===================================================

  const normalizeSkill = (
    skill: string
  ) => {

    const value =
      skill.toLowerCase().trim();

    const aliases: Record<string, string> = {

      "numpy":
        "numpy",

      "pandas":
        "pandas",

      "machine learning":
        "machine learning",

      "ml":
        "machine learning",

      "scikit learn":
        "scikit-learn",

      "scikit-learn":
        "scikit-learn",

      "sklearn":
        "scikit-learn",

      "matplotlib":
        "matplotlib",

      "data analysis":
        "data analysis",

      "statistics":
        "statistics",

      "probability":
        "probability",

      "power bi":
        "power bi",

      "excel":
        "excel",

      "generative ai":
        "generative ai",

      "genai":
        "generative ai",

      "large language models":
        "llm",

      "large language model":
        "llm",

      "llm":
        "llm",

      "github":
        "github",

      "git":
        "git",

      "docker":
        "docker",

      "linux":
        "linux",

      "deep learning":
        "deep learning",

      "nlp":
        "nlp",

      "natural language processing":
        "nlp",

      "python":
        "python",

      "sql":
        "sql",

    };

    return (
      aliases[value] || value
    );
  };


  // ===================================================
  // STUDENT SKILLS
  // ===================================================

  const studentSkills =
    skills.map((skill) =>
      normalizeSkill(skill.name)
    );


  // ===================================================
  // SELECTED ROLE
  // ===================================================

  const currentRole =
    roles.find(
      (role) =>
        role.name === selectedRole
    ) || roles[0];


  // ===================================================
  // MATCHED + MISSING SKILLS
  // ===================================================

  const matchedSkills =
    currentRole.skills.filter(
      (requiredSkill) =>
        studentSkills.includes(
          normalizeSkill(requiredSkill)
        )
    );


  const missingSkills =
    currentRole.skills.filter(
      (requiredSkill) =>
        !studentSkills.includes(
          normalizeSkill(requiredSkill)
        )
    );


  const matchPercentage =
    Math.round(
      (matchedSkills.length /
        currentRole.skills.length) *
        100
    );


  // ===================================================
  // PERSONALIZED ROADMAP
  // ===================================================

  const roadmap: RoadmapItem[] = [];


  if (
    missingSkills.some(
      (skill) =>
        normalizeSkill(skill) ===
        "statistics"
    )
  ) {

    roadmap.push({

      title: "Statistics",

      level:
        "Beginner → Intermediate",

      topics: [
        "Descriptive statistics",
        "Mean, median and standard deviation",
        "Correlation and covariance",
        "Probability distributions",
        "Hypothesis testing",
      ],

      project:
        "Analyze a real-world dataset and prepare a statistical report.",

    });

  }


  if (
    missingSkills.some(
      (skill) =>
        normalizeSkill(skill) ===
        "probability"
    )
  ) {

    roadmap.push({

      title: "Probability",

      level:
        "Beginner → Intermediate",

      topics: [
        "Basic probability",
        "Conditional probability",
        "Bayes theorem",
        "Random variables",
        "Probability distributions",
      ],

      project:
        "Build a probability-based prediction analysis using a real dataset.",

    });

  }


  if (
    missingSkills.some(
      (skill) =>
        normalizeSkill(skill) ===
        "numpy"
    )
  ) {

    roadmap.push({

      title: "NumPy",

      level:
        "Beginner → Intermediate",

      topics: [
        "NumPy arrays",
        "Array operations",
        "Indexing and slicing",
        "Broadcasting",
        "Mathematical operations",
      ],

      project:
        "Perform numerical analysis on a real-world dataset using NumPy.",

    });

  }


  if (
    missingSkills.some(
      (skill) =>
        normalizeSkill(skill) ===
        "pandas"
    )
  ) {

    roadmap.push({

      title: "Pandas",

      level:
        "Beginner → Intermediate",

      topics: [
        "Series and DataFrames",
        "Data cleaning",
        "Filtering and sorting",
        "Missing values",
        "GroupBy operations",
      ],

      project:
        "Clean and analyze a real-world dataset using Pandas.",

    });

  }


  if (
    missingSkills.some(
      (skill) =>
        normalizeSkill(skill) ===
        "machine learning"
    )
  ) {

    roadmap.push({

      title: "Machine Learning",

      level:
        "Beginner → Intermediate",

      topics: [
        "Supervised learning",
        "Unsupervised learning",
        "Regression",
        "Classification",
        "Model evaluation",
      ],

      project:
        "Build a machine learning model to solve a real-world prediction problem.",

    });

  }


  if (
    missingSkills.some(
      (skill) =>
        normalizeSkill(skill) ===
        "scikit-learn"
    )
  ) {

    roadmap.push({

      title: "Scikit-learn",

      level:
        "Beginner → Intermediate",

      topics: [
        "Data preprocessing",
        "Train/test split",
        "Regression",
        "Classification",
        "Model evaluation",
      ],

      project:
        "Build and evaluate a machine learning model using Scikit-learn.",

    });

  }


  if (
    missingSkills.some(
      (skill) =>
        normalizeSkill(skill) ===
        "matplotlib"
    )
  ) {

    roadmap.push({

      title: "Matplotlib",

      level:
        "Beginner → Intermediate",

      topics: [
        "Line charts",
        "Bar charts",
        "Scatter plots",
        "Histograms",
        "Data visualization",
      ],

      project:
        "Create a data visualization dashboard using a real dataset.",

    });

  }


  if (
    missingSkills.some(
      (skill) =>
        normalizeSkill(skill) ===
        "excel"
    )
  ) {

    roadmap.push({

      title: "Excel",

      level:
        "Beginner → Intermediate",

      topics: [
        "Excel formulas",
        "Data cleaning",
        "Pivot tables",
        "Charts",
        "Data analysis",
      ],

      project:
        "Create an Excel-based business data analysis report.",

    });

  }


  if (
    missingSkills.some(
      (skill) =>
        normalizeSkill(skill) ===
        "power bi"
    )
  ) {

    roadmap.push({

      title: "Power BI",

      level:
        "Beginner → Intermediate",

      topics: [
        "Power BI interface",
        "Data import",
        "Data transformation",
        "DAX basics",
        "Interactive dashboards",
      ],

      project:
        "Build an interactive business intelligence dashboard.",

    });

  }


  if (
    missingSkills.some(
      (skill) =>
        normalizeSkill(skill) ===
        "generative ai"
    )
  ) {

    roadmap.push({

      title: "Generative AI",

      level:
        "Beginner → Intermediate",

      topics: [
        "Generative AI fundamentals",
        "Large language models",
        "Prompt engineering",
        "AI applications",
        "Responsible AI",
      ],

      project:
        "Build a simple Generative AI application.",

    });

  }


  if (
    missingSkills.some(
      (skill) =>
        normalizeSkill(skill) ===
        "llm"
    )
  ) {

    roadmap.push({

      title: "Large Language Models",

      level:
        "Intermediate",

      topics: [
        "LLM fundamentals",
        "Tokens and embeddings",
        "Prompt engineering",
        "Model APIs",
        "LLM applications",
      ],

      project:
        "Build an LLM-powered question answering application.",

    });

  }


  // ===================================================
  // START LEARNING
  // ===================================================

  const startLearning = (
    item: RoadmapItem
  ) => {

    const searchQuery =
      encodeURIComponent(
        `${item.title} ${item.topics.join(
          " "
        )} course`
      );

    window.open(
      `https://www.google.com/search?q=${searchQuery}`,
      "_blank"
    );

  };


  // ===================================================
  // UI
  // ===================================================

  return (

    <section
      className="skill-gap-section"
      id="skill-gap-analysis"
    >


      {/* HEADER */}

      <div className="section-heading">

        <p className="small-title">
          SKILL INTELLIGENCE
        </p>

        <h2>
          Skill Gap Analysis
        </h2>

        <p>
          Compare your current skills with
          the requirements of your target career.
        </p>

      </div>



      {/* ROLE SELECTOR */}

      <div className="role-selector">

        <label>
          Select Your Target Career
        </label>

        <select
          value={selectedRole}
          onChange={(event) => {

            setSelectedRole(
              event.target.value
            );

            setShowRoadmap(false);

          }}
        >

          {roles.map((role) => (

            <option
              key={role.name}
              value={role.name}
            >
              {role.name}
            </option>

          ))}

        </select>

      </div>



      {/* MATCH SCORE */}

      <div className="match-card">

        <div>

          <p className="small-title">
            CAREER READINESS
          </p>

          <h3>
            {selectedRole}
          </h3>

          <p>
            Based on your current
            Skill Passport.
          </p>

        </div>


        <div className="match-percentage">

          <strong>
            {matchPercentage}%
          </strong>

          <span>
            Skill Match
          </span>

        </div>

      </div>



      {/* SKILL COMPARISON */}

      <div className="skill-gap-grid">


        {/* MATCHED */}

        <div className="skill-gap-card">

          <h3>
            ✅ Skills You Have
          </h3>

          <div className="skill-tags">

            {matchedSkills.length > 0 ? (

              matchedSkills.map(
                (skill) => (

                  <span
                    className="skill-tag matched"
                    key={skill}
                  >
                    ✓ {skill}
                  </span>

                )
              )

            ) : (

              <p>
                No matching skills detected yet.
              </p>

            )}

          </div>

        </div>



        {/* MISSING */}

        <div className="skill-gap-card">

          <h3>
            📚 Skills to Learn
          </h3>

          <div className="skill-tags">

            {missingSkills.length > 0 ? (

              missingSkills.map(
                (skill) => (

                  <span
                    className="skill-tag missing"
                    key={skill}
                  >
                    ○ {skill}
                  </span>

                )
              )

            ) : (

              <p>
                Excellent! No major skill gaps detected.
              </p>

            )}

          </div>

        </div>

      </div>



      {/* ROADMAP */}

      <div className="roadmap-preview">

        <p className="small-title">
          PERSONALIZED LEARNING
        </p>

        <h3>
          Your Recommended Learning Roadmap
        </h3>

        <p>
          Based on your missing skills,
          SkillBridge AI recommends the following
          learning path for{" "}
          <strong>
            {selectedRole}
          </strong>.
        </p>


        <button
          className={`roadmap-button ${
            showRoadmap
              ? "active"
              : ""
          }`}
          onClick={() =>
            setShowRoadmap(
              !showRoadmap
            )
          }
        >
          {showRoadmap
            ? "Hide Learning Roadmap ↑"
            : "Generate Learning Roadmap →"}
        </button>



        {/* ROADMAP LIST */}

        {showRoadmap && (

          <div className="roadmap-list">

            {roadmap.length > 0 ? (

              roadmap.map(
                (item, index) => (

                  <div
                    className="roadmap-card"
                    key={item.title}
                  >


                    {/* NUMBER */}

                    <div className="roadmap-number">

                      {index + 1}

                    </div>



                    {/* CONTENT */}

                    <div className="roadmap-content">

                      <div className="roadmap-title-row">

                        <div>

                          <h3>
                            {item.title}
                          </h3>

                          <p>
                            {item.level}
                          </p>

                        </div>


                        <span className="roadmap-status">
                          NOT STARTED
                        </span>

                      </div>



                      {/* TOPICS */}

                      <div className="roadmap-topics">

                        <h4>
                          Recommended Topics
                        </h4>

                        <ul>

                          {item.topics.map(
                            (topic) => (

                              <li
                                key={topic}
                              >
                                {topic}
                              </li>

                            )
                          )}

                        </ul>

                      </div>



                      {/* PROJECT */}

                      <div className="roadmap-project">

                        <h4>
                          Practice Project
                        </h4>

                        <p>
                          {item.project}
                        </p>

                      </div>



                      {/* START LEARNING */}

                      <button
                        className="roadmap-start-button"
                        onClick={() =>
                          startLearning(
                            item
                          )
                        }
                      >
                        Start Learning →
                      </button>

                    </div>

                  </div>

                )
              )

            ) : (

              <div className="no-roadmap">

                <h3>
                  🎉 You're Ready!
                </h3>

                <p>
                  You currently have the
                  required skills for this role.
                </p>

              </div>

            )}

          </div>

        )}

      </div>

    </section>

  );
}

export default SkillGapAnalysis;