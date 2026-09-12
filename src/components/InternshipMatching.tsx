import { useMemo } from "react";

interface Skill {
  name: string;
  category: string;
  confidence: number;
  evidence: string;
}

interface InternshipMatchingProps {
  skills: Skill[];
  domain: string;
}

interface InternshipSkill {
  name: string;
  weight: number;
}

interface Internship {
  title: string;
  company: string;
  domain: string;
  skills: InternshipSkill[];
  description: string;
  location: string;
  type: string;
}

interface MatchResult {
  matched: InternshipSkill[];
  missing: InternshipSkill[];
  score: number;
  evidenceScore: number;
}

function InternshipMatching({
  skills,
  domain,
}: InternshipMatchingProps) {

  // =====================================================
  // INTERNSHIP DATABASE
  // =====================================================

  const internships: Internship[] = [

    {
      title: "Data Science Intern",
      company: "DataNova Technologies",
      domain: "Data Science",

      skills: [
        { name: "Python", weight: 20 },
        { name: "Pandas", weight: 15 },
        { name: "SQL", weight: 15 },
        { name: "Machine Learning", weight: 25 },
        { name: "Statistics", weight: 15 },
        { name: "NumPy", weight: 10 },
      ],

      description:
        "Work with real-world datasets, build analytical models and generate data-driven insights.",

      location: "Bangalore",
      type: "Internship",
    },


    {
      title: "AI / ML Intern",
      company: "InnovateAI Labs",
      domain:
        "Artificial Intelligence & Machine Learning",

      skills: [
        { name: "Python", weight: 15 },
        { name: "Machine Learning", weight: 25 },
        { name: "Deep Learning", weight: 20 },
        { name: "NLP", weight: 15 },
        { name: "SQL", weight: 10 },
        { name: "Git", weight: 15 },
      ],

      description:
        "Assist in developing machine learning and artificial intelligence solutions.",

      location: "Hyderabad",
      type: "Internship",
    },


    {
      title: "Full Stack Development Intern",
      company: "TechStack Solutions",
      domain: "Web Development",

      skills: [
        { name: "HTML", weight: 10 },
        { name: "CSS", weight: 10 },
        { name: "JavaScript", weight: 25 },
        { name: "React", weight: 25 },
        { name: "Node.js", weight: 30 },
      ],

      description:
        "Build modern web applications using frontend and backend technologies.",

      location: "Pune",
      type: "Internship",
    },


    {
      title: "Cloud Engineering Intern",
      company: "CloudSphere",
      domain: "Cloud Computing",

      skills: [
        { name: "AWS", weight: 30 },
        { name: "Linux", weight: 15 },
        { name: "Docker", weight: 20 },
        { name: "Git", weight: 15 },
        { name: "Kubernetes", weight: 20 },
      ],

      description:
        "Learn cloud infrastructure, deployment and DevOps practices.",

      location: "Bangalore",
      type: "Internship",
    },


    {
      title: "Cybersecurity Intern",
      company: "SecureNet",
      domain: "Cybersecurity",

      skills: [
        { name: "Linux", weight: 20 },
        { name: "Networking", weight: 25 },
        { name: "Python", weight: 15 },
        { name: "Cybersecurity", weight: 25 },
        { name: "Git", weight: 15 },
      ],

      description:
        "Assist with security monitoring, vulnerability analysis and cyber defense.",

      location: "Chennai",
      type: "Internship",
    },

  ];


  // =====================================================
  // NORMALIZE SKILLS
  // =====================================================

  const normalizeSkill = (
    skill: string
  ): string => {

    const value =
      skill.toLowerCase().trim();

    const aliases: Record<string, string> = {

      "react.js": "react",
      "reactjs": "react",

      "nodejs": "node.js",
      "node.js": "node.js",

      "express.js": "express",
      "expressjs": "express",

      "scikit learn": "scikit-learn",
      "sklearn": "scikit-learn",

      "machine learning":
        "machine learning",

      "ml":
        "machine learning",

      "deep learning":
        "deep learning",

      "natural language processing":
        "nlp",

      "generative ai":
        "generative ai",

      "genai":
        "generative ai",

      "large language model":
        "llm",

      "large language models":
        "llm",

    };

    return aliases[value] || value;
  };


  // =====================================================
  // STUDENT SKILL MAP
  // =====================================================

  const studentSkillMap =
    useMemo(() => {

      const map =
        new Map<string, Skill>();

      skills.forEach((skill) => {

        map.set(
          normalizeSkill(skill.name),
          skill
        );

      });

      return map;

    }, [skills]);


  // =====================================================
  // EVIDENCE SCORE
  // =====================================================

  const calculateEvidenceScore = (
    skill: Skill
  ): number => {

    let evidenceMultiplier = 0.6;

    const evidence =
      skill.evidence.toLowerCase();


    // Resume evidence
    if (
      evidence.includes("resume") ||
      evidence.includes("detected")
    ) {
      evidenceMultiplier = 0.75;
    }


    // Project evidence
    if (
      evidence.includes("project")
    ) {
      evidenceMultiplier = 0.9;
    }


    // Certification evidence
    if (
      evidence.includes("certification")
    ) {
      evidenceMultiplier = 0.95;
    }


    // Assessment / verified evidence
    if (
      evidence.includes("assessment") ||
      evidence.includes("verified")
    ) {
      evidenceMultiplier = 1;
    }


    return Math.min(
      skill.confidence * evidenceMultiplier,
      1
    );

  };


  // =====================================================
  // WEIGHTED MATCH CALCULATION
  // =====================================================

  const calculateMatch = (
    internshipSkills: InternshipSkill[]
  ): MatchResult => {

    let totalScore = 0;

    let evidenceScoreTotal = 0;

    const matched: InternshipSkill[] = [];

    const missing: InternshipSkill[] = [];


    internshipSkills.forEach(
      (requiredSkill) => {

        const normalized =
          normalizeSkill(
            requiredSkill.name
          );


        const studentSkill =
          studentSkillMap.get(
            normalized
          );


        if (studentSkill) {

          const evidenceScore =
            calculateEvidenceScore(
              studentSkill
            );


          /*
           * Weighted contribution:
           *
           * Required skill weight
           * × evidence strength
           */

          const contribution =
            requiredSkill.weight *
            evidenceScore;


          totalScore +=
            contribution;


          evidenceScoreTotal +=
            evidenceScore;


          matched.push(
            requiredSkill
          );

        } else {

          missing.push(
            requiredSkill
          );

        }

      }
    );


    return {

      matched,

      missing,

      score: Math.round(
        totalScore
      ),

      evidenceScore:
        internshipSkills.length > 0
          ? Math.round(
              (evidenceScoreTotal /
                internshipSkills.length) *
                100
            )
          : 0,

    };

  };


  // =====================================================
  // MATCH INTERNSHIPS
  // =====================================================

  const matchingInternships =
    internships

      .filter(
        (internship) =>
          !domain ||
          internship.domain === domain
      )

      .map((internship) => {

        const match =
          calculateMatch(
            internship.skills
          );

        return {
          ...internship,
          ...match,
        };

      })

      .sort(
        (a, b) =>
          b.score - a.score
      );


  // =====================================================
  // UI
  // =====================================================

  return (

    <section
      className="internship-section"
      id="internship-matching"
    >

      {/* HEADER */}

      <div className="section-heading">

        <p className="small-title">
          OPPORTUNITY MATCHING
        </p>

        <h2>
          Smart Internship Matching
        </h2>

        <p>
          Opportunities are ranked using
          skill importance, proficiency and
          evidence from your Skill Passport.
        </p>

      </div>


      {/* SUMMARY */}

      <div className="matching-summary">

        <div>

          <strong>
            Selected Domain
          </strong>

          <span>
            {domain || "Not selected"}
          </span>

        </div>


        <div>

          <strong>
            Verified Skills
          </strong>

          <span>
            {skills.length} detected
          </span>

        </div>


        <div>

          <strong>
            Opportunities
          </strong>

          <span>
            {matchingInternships.length}
          </span>

        </div>

      </div>


      {/* INTERNSHIPS */}

      <div className="internship-list">

        {matchingInternships.length === 0 ? (

          <div className="no-internships">

            <h3>
              No matching internships found
            </h3>

            <p>
              Choose a career domain to discover
              relevant opportunities.
            </p>

          </div>

        ) : (

          matchingInternships.map(
            (internship, index) => (

              <div
                className="internship-card"
                key={index}
              >

                {/* HEADER */}

                <div className="internship-header">

                  <div>

                    <h3>
                      {internship.title}
                    </h3>

                    <p className="company-name">
                      {internship.company}
                    </p>

                  </div>


                  <div className="match-score">

                    <span>
                      {internship.score}%
                    </span>

                    <small>
                      Match
                    </small>

                  </div>

                </div>


                {/* DESCRIPTION */}

                <p className="internship-description">
                  {internship.description}
                </p>


                {/* META */}

                <div className="internship-meta">

                  <span>
                    📍 {internship.location}
                  </span>

                  <span>
                    💼 {internship.type}
                  </span>

                </div>


                {/* SKILLS */}

                <div className="skill-comparison">


                  {/* REQUIRED */}

                  <div>

                    <h4>
                      Required Skills
                    </h4>

                    <div className="skill-tags">

                      {internship.skills.map(
                        (skill) => {

                          const isMatched =
                            internship.matched.some(
                              (matchedSkill) =>
                                normalizeSkill(
                                  matchedSkill.name
                                ) ===
                                normalizeSkill(
                                  skill.name
                                )
                            );


                          return (

                            <span
                              key={skill.name}
                              className={
                                isMatched
                                  ? "skill-tag matched"
                                  : "skill-tag missing"
                              }
                            >

                              {isMatched
                                ? "✓ "
                                : "○ "}

                              {skill.name}

                            </span>

                          );

                        }
                      )}

                    </div>

                  </div>


                  {/* EXPLANATION */}

                  <div className="match-explanation">

                    <h4>
                      Why this matches you
                    </h4>


                    <p>

                      You match{" "}

                      <strong>
                        {internship.matched.length}
                      </strong>{" "}

                      of{" "}

                      <strong>
                        {internship.skills.length}
                      </strong>{" "}

                      required skills.

                    </p>


                    <p>

                      Evidence strength:{" "}

                      <strong>
                        {internship.evidenceScore}%
                      </strong>

                    </p>


                    {internship.missing.length >
                      0 && (

                      <p>

                        Skills to improve:{" "}

                        <strong>

                          {internship.missing
                            .map(
                              (skill) =>
                                skill.name
                            )
                            .join(", ")}

                        </strong>

                      </p>

                    )}

                  </div>

                </div>


                {/* APPLY */}

                <button
                  className="apply-button"
                  onClick={() => {

                    alert(
                      `Opening ${internship.title} opportunity at ${internship.company}`
                    );

                  }}
                >

                  View Opportunity →

                </button>

              </div>

            )
          )

        )}

      </div>

    </section>

  );

}

export default InternshipMatching;