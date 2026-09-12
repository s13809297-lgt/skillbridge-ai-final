import { useState } from "react";

interface ChooseDomainProps {
  onDomainSelect: (domain: string) => void;
}

function ChooseDomain({ onDomainSelect }: ChooseDomainProps) {
  const [selectedDomain, setSelectedDomain] = useState("");

  const domains = [
    {
      name: "Artificial Intelligence & Machine Learning",
      icon: "🤖",
      description: "AI, ML, Deep Learning, NLP and Generative AI",
    },
    {
      name: "Data Science",
      icon: "📊",
      description: "Statistics, Data Analysis, Python and Machine Learning",
    },
    {
      name: "Web Development",
      icon: "🌐",
      description: "Frontend, Backend, Full Stack and Modern Web Apps",
    },
    {
      name: "Cybersecurity",
      icon: "🔐",
      description: "Network Security, Ethical Hacking and Cyber Defense",
    },
    {
      name: "Cloud Computing",
      icon: "☁️",
      description: "AWS, Azure, Cloud Infrastructure and DevOps",
    },
    {
      name: "Software Development",
      icon: "💻",
      description: "Programming, DSA, Software Engineering and Applications",
    },
  ];

  const handleContinue = () => {
    if (!selectedDomain) return;

    onDomainSelect(selectedDomain);

    document.getElementById("skill-gap-analysis")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="domain-section" id="choose-domain">
      <div className="section-heading">
        <p className="small-title">CAREER DIRECTION</p>

        <h2>Choose Your Domain</h2>

        <p>
          Select the domain you want to build your career in.
          SkillBridge AI will use your choice to identify skill gaps,
          recommend learning paths and match suitable opportunities.
        </p>
      </div>

      <div className="domain-grid">
        {domains.map((domain) => (
          <div
            key={domain.name}
            className={`domain-card ${
              selectedDomain === domain.name ? "selected" : ""
            }`}
            onClick={() => setSelectedDomain(domain.name)}
          >
            <div className="domain-icon">{domain.icon}</div>

            <h3>{domain.name}</h3>

            <p>{domain.description}</p>

            <div className="domain-radio">
              {selectedDomain === domain.name ? "✓ Selected" : "Select"}
            </div>
          </div>
        ))}
      </div>

      <button
        className="domain-continue-button"
        onClick={handleContinue}
        disabled={!selectedDomain}
      >
        Continue to Skill Gap Analysis →
      </button>
    </section>
  );
}

export default ChooseDomain;