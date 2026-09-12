import InternshipMatching from "./components/InternshipMatching";
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import ResumeAnalyzer from "./components/ResumeAnalyzer";
import SkillPassport from "./components/SkillPassport";
import ChooseDomain from "./components/ChooseDomain";
import SkillGapAnalysis from "./components/SkillGapAnalysis";

import "./index.css";

function Home() {
  return (
    <div className="page">

      <nav className="navbar">
        <div className="logo">SkillBridge AI</div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>

      <section className="hero">

        <div className="hero-content">

          <p className="tagline">
            AI-POWERED ACADEMIA–INDUSTRY COLLABORATION
          </p>

          <h1>
            Turn Your <span>Skills</span> Into Opportunities
          </h1>

          <p className="hero-description">
            SkillBridge AI connects students, institutions and industry
            through evidence-based skill mapping, personalized learning
            pathways and intelligent internship matching.
          </p>

          <div className="hero-buttons">

            <Link
              to="/login"
              className="primary-button"
            >
              Get Started
            </Link>

            <a
              href="#features"
              className="secondary-button"
            >
              Explore Platform
            </a>

          </div>

        </div>

      </section>


      <section
        className="features-section"
        id="features"
      >

        <div className="section-heading">

          <p className="small-title">
            OUR PLATFORM
          </p>

          <h2>
            One Platform. Complete Skill Journey.
          </h2>

          <p>
            From understanding your skills to finding the right opportunity.
          </p>

        </div>


        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon">
              📄
            </div>

            <h3>
              Resume Analyzer
            </h3>

            <p>
              Analyze resume structure, important sections,
              readability and missing information before extracting skills.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🧠
            </div>

            <h3>
              Skill Intelligence
            </h3>

            <p>
              Convert projects, courses, certifications and assessments
              into an evidence-based Skill Passport.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🎯
            </div>

            <h3>
              Smart Matching
            </h3>

            <p>
              Find internships and placements based on skills,
              eligibility, career goals and opportunity requirements.
            </p>

          </div>

        </div>

      </section>


      <section className="journey-section">

        <p className="small-title">
          HOW IT WORKS
        </p>

        <h2>
          Skill → Gap → Learn → Match → Experience → Feedback
        </h2>

        <p className="journey-description">
          SkillBridge AI creates a continuous feedback loop between students,
          academia and industry.
        </p>

      </section>


      <footer className="footer">

        <p>
          SkillBridge AI • Smart India Hackathon 2026
        </p>

      </footer>

    </div>
  );
}


function Login() {

  return (

    <div className="auth-page">

      <div className="auth-card">

        <div className="logo auth-logo">
          SkillBridge AI
        </div>

        <h1>
          Welcome Back
        </h1>

        <p className="auth-subtitle">
          Login to continue to your SkillBridge dashboard.
        </p>


        <label>
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
        />


        <label>
          Password
        </label>

        <input
          type="password"
          placeholder="Enter your password"
        />


        <label>
          Select Role
        </label>

        <select defaultValue="student">

          <option value="student">
            Student
          </option>

          <option value="institution">
            Institution
          </option>

          <option value="industry">
            Industry
          </option>

        </select>


        <Link
          to="/student"
          className="login-button"
        >
          Login
        </Link>


        <Link
          to="/"
          className="back-link"
        >
          ← Back to Home
        </Link>

      </div>

    </div>

  );
}


function StudentDashboard() {

  const [resumeAnalysis, setResumeAnalysis] =
    useState<any>(null);

  const [selectedDomain, setSelectedDomain] =
    useState<string>("");


  return (

    <div className="dashboard-page">

      <nav className="navbar">

        <div className="logo">
          SkillBridge AI
        </div>

        <Link
          to="/"
          className="logout-link"
        >
          Logout
        </Link>

      </nav>


      <main className="dashboard-container">


        {/* HEADER */}

        <div className="dashboard-header">

          <p className="small-title">
            STUDENT PORTAL
          </p>

          <h1>
            Student Dashboard
          </h1>

          <p>
            Build your skills, identify your gaps and
            discover the right opportunities.
          </p>

        </div>



        {/* DASHBOARD CARDS */}

        <div className="dashboard-grid">


          {/* RESUME */}

          <div className="dashboard-card">

            <div className="dashboard-icon">
              📄
            </div>

            <h3>
              Resume Analyzer
            </h3>

            <p>
              Upload your resume and check its structure,
              sections and missing information.
            </p>

            <button
              className="dashboard-button"
              onClick={() => {

                document
                  .getElementById("resume-analyzer")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });

              }}
            >
              Analyze Resume
            </button>

          </div>



          {/* SKILL PASSPORT */}

          <div className="dashboard-card">

            <div className="dashboard-icon">
              🧠
            </div>

            <h3>
              Skill Passport
            </h3>

            <p>
              View your extracted skills and evidence
              from your resume.
            </p>

            <button
              className="dashboard-button"
              onClick={() => {

                document
                  .getElementById("skill-passport")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });

              }}
              disabled={!resumeAnalysis?.skillAnalysis}
            >
              {resumeAnalysis?.skillAnalysis
                ? "View Skill Passport"
                : "Analyze Resume First"}
            </button>

          </div>



          {/* SKILL GAP */}

          <div className="dashboard-card">

            <div className="dashboard-icon">
              📊
            </div>

            <h3>
              Skill Gap Analysis
            </h3>

            <p>
              Compare your current skills with
              the requirements of your target career.
            </p>

            <button
              className="dashboard-button"
              onClick={() => {

                document
                  .getElementById("skill-gap-analysis")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });

              }}
              disabled={
                !resumeAnalysis?.skillAnalysis ||
                !selectedDomain
              }
            >
              {!resumeAnalysis?.skillAnalysis
                ? "Analyze Resume First"
                : !selectedDomain
                ? "Choose Domain First"
                : "Analyze Skill Gap"}
            </button>

          </div>



          {/* INTERNSHIP */}

          <div className="dashboard-card">

            <div className="dashboard-icon">
              💼
            </div>

            <h3>
              Smart Internship Matching
            </h3>

            <p>
              Discover opportunities that match
              your skills and career interests.
            </p>

            <button
              className="dashboard-button"
              onClick={() => {

                document
                  .getElementById("internship-matching")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });

              }}
            >
              Find Internships
            </button>

          </div>

        </div>



        {/* ================================================= */}
        {/* RESUME ANALYZER */}
        {/* ================================================= */}

        <div id="resume-analyzer">

          <ResumeAnalyzer
            onAnalysisComplete={(analysis) => {

              setResumeAnalysis(analysis);

            }}
          />

        </div>



        {/* ================================================= */}
        {/* CHOOSE DOMAIN */}
        {/* ================================================= */}

        <ChooseDomain
          onDomainSelect={(domain) => {

            setSelectedDomain(domain);

            console.log(
              "Selected domain:",
              domain
            );

          }}
        />



        {/* SELECTED DOMAIN DISPLAY */}

        {selectedDomain && (

          <div
            className="selected-domain"
            style={{
              marginTop: "20px",
              padding: "15px",
              borderRadius: "10px",
              background: "#f5f7fb",
              textAlign: "center",
            }}
          >

            <strong>
              Selected Career Domain:
            </strong>

            <span style={{ marginLeft: "8px" }}>
              {selectedDomain}
            </span>

          </div>

        )}



        {/* ================================================= */}
        {/* SKILL PASSPORT */}
        {/* ================================================= */}

        {resumeAnalysis?.skillAnalysis && (

          <div id="skill-passport">

            <SkillPassport
              skills={
                resumeAnalysis.skillAnalysis.skills
              }
            />

          </div>

        )}



        {/* ================================================= */}
        {/* SKILL GAP ANALYSIS */}
        {/* ================================================= */}

        {resumeAnalysis?.skillAnalysis &&
          selectedDomain && (

          <div id="skill-gap-analysis">

            <SkillGapAnalysis
              skills={
                resumeAnalysis.skillAnalysis.skills
              }
            />

          </div>

        )}



        {/* ================================================= */}
        {/* INTERNSHIP MATCHING PLACEHOLDER */}
        {/* ================================================= */}

        {resumeAnalysis?.skillAnalysis &&
  selectedDomain && (

    <InternshipMatching
      skills={
        resumeAnalysis.skillAnalysis.skills
      }
      domain={selectedDomain}
    />

)}



        {/* ================================================= */}
        {/* JOURNEY */}
        {/* ================================================= */}

        <div className="dashboard-journey">

          <h2>
            Your Skill Journey
          </h2>


          <div className="journey-steps">


            <div className="journey-step">

              <span>
                1
              </span>

              <p>
                Resume
              </p>

            </div>


            <div className="journey-arrow">
              →
            </div>


            <div className="journey-step">

              <span>
                2
              </span>

              <p>
                Domain
              </p>

            </div>


            <div className="journey-arrow">
              →
            </div>


            <div className="journey-step">

              <span>
                3
              </span>

              <p>
                Skills
              </p>

            </div>


            <div className="journey-arrow">
              →
            </div>


            <div className="journey-step">

              <span>
                4
              </span>

              <p>
                Skill Gap
              </p>

            </div>


            <div className="journey-arrow">
              →
            </div>


            <div className="journey-step">

              <span>
                5
              </span>

              <p>
                Learn
              </p>

            </div>


            <div className="journey-arrow">
              →
            </div>


            <div className="journey-step">

              <span>
                6
              </span>

              <p>
                Match
              </p>

            </div>

          </div>

        </div>


      </main>

    </div>

  );
}



function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/student"
          element={<StudentDashboard />}
        />

      </Routes>

    </BrowserRouter>

  );
}


export default App;