type Skill = {
  name: string;
  category: string;
  confidence: number;
  evidence: string;
};

type SkillPassportProps = {
  skills: Skill[];
};

function SkillPassport({
  skills,
}: SkillPassportProps) {
  const groupedSkills: {
    [key: string]: Skill[];
  } = {};

  skills.forEach((skill) => {
    if (!groupedSkills[skill.category]) {
      groupedSkills[skill.category] = [];
    }

    groupedSkills[skill.category].push(skill);
  });

  const formatCategory = (category: string) => {
    const names: {
      [key: string]: string;
    } = {
      programming: "Programming",
      webDevelopment: "Web Development",
      dataScience: "Data Science",
      artificialIntelligence: "AI & Machine Learning",
      databases: "Databases",
      tools: "Tools & Technologies",
      cloud: "Cloud",
    };

    return names[category] || category;
  };

  return (
    <div className="skill-passport">

      <div className="passport-header">

        <p className="small-title">
          SKILL INTELLIGENCE
        </p>

        <h2>
          Skill Passport
        </h2>

        <p>
          Your evidence-backed technical
          skill profile generated from
          your resume.
        </p>

      </div>

      <div className="passport-summary">

        <div className="summary-card">
          <strong>
            {skills.length}
          </strong>

          <span>
            Skills Detected
          </span>
        </div>

        <div className="summary-card">
          <strong>
            {Object.keys(groupedSkills).length}
          </strong>

          <span>
            Skill Categories
          </span>
        </div>

        <div className="summary-card">
          <strong>
            Resume
          </strong>

          <span>
            Primary Evidence
          </span>
        </div>

      </div>

      <div className="passport-skills">

        {Object.entries(groupedSkills).map(
          ([category, categorySkills]) => (

            <div
              className="passport-category"
              key={category}
            >

              <div className="category-header">

                <h3>
                  {formatCategory(category)}
                </h3>

                <span>
                  {categorySkills.length} skills
                </span>

              </div>

              <div className="passport-grid">

                {categorySkills.map(
                  (skill) => (

                    <div
                      className="passport-skill-card"
                      key={skill.name}
                    >

                      <div className="passport-skill-top">

                        <div>

                          <h4>
                            {skill.name}
                          </h4>

                          <p>
                            {formatCategory(
                              skill.category
                            )}
                          </p>

                        </div>

                        <strong>
                          {Math.round(
                            skill.confidence * 100
                          )}%
                        </strong>

                      </div>

                      <div className="confidence-bar">

                        <div
                          className="confidence-fill"
                          style={{
                            width: `${
                              skill.confidence * 100
                            }%`,
                          }}
                        />

                      </div>

                      <div className="passport-evidence">

                        <span>
                          ✓
                        </span>

                        <p>
                          {skill.evidence}
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default SkillPassport;