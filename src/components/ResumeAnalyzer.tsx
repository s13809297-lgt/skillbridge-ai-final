import { useRef, useState } from "react";

type Skill = {
  name: string;
  category: string;
  confidence: number;
  evidence: string;
};

type ResumeAnalysis = {
  success: boolean;
  filename: string;
  status: string;

  sections: {
    education: boolean;
    skills: boolean;
    projects: boolean;
    experience: boolean;
    certifications: boolean;
  };

  issues: string[];
  textLength: number;
  message: string;

  skillAnalysis?: {
    totalSkills: number;
    skills: Skill[];

    categoryCount: {
      [key: string]: number;
    };
  };
};

type ResumeAnalyzerProps = {
  onAnalysisComplete: (
    analysis: ResumeAnalysis
  ) => void;
};

function ResumeAnalyzer({
  onAnalysisComplete,
}: ResumeAnalyzerProps) {

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [isAnalyzing, setIsAnalyzing] =
    useState(false);

  const [analysis, setAnalysis] =
    useState<ResumeAnalysis | null>(null);

  const [error, setError] =
    useState("");

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setAnalysis(null);

    if (file.type !== "application/pdf") {

      setSelectedFile(null);

      setError(
        "Please upload a PDF resume only."
      );

      return;
    }

    setSelectedFile(file);
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = async () => {

    if (!selectedFile) {

      setError(
        "Please choose a PDF resume first."
      );

      return;
    }

    setIsAnalyzing(true);
    setError("");
    setAnalysis(null);

    try {

      const formData =
        new FormData();

      formData.append(
        "resume",
        selectedFile
      );

      const response =
        await fetch(
          "http://localhost:5000/api/resume/analyze",
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.message ||
          "Resume analysis failed."
        );
      }

      setAnalysis(data);

      /*
       * Send the completed analysis
       * to StudentDashboard.
       */
      onAnalysisComplete(data);

    } catch (err) {

      console.error(
        "Resume analysis error:",
        err
      );

      setError(
        "Unable to connect to the Resume Analyzer. Make sure the backend is running on port 5000."
      );

    } finally {

      setIsAnalyzing(false);
    }
  };

  const renderSectionStatus = (
    label: string,
    value: boolean
  ) => {

    return (

      <div className="result-item">

        <span
          className={
            value
              ? "status-good"
              : "status-bad"
          }
        >
          {value ? "✓" : "✗"}
        </span>

        <div>

          <strong>
            {label}
          </strong>

          <p>
            {value
              ? "Section detected"
              : "Section not detected"}
          </p>

        </div>

      </div>
    );
  };

  const getStatusClass = () => {

    if (!analysis) {
      return "status-warning";
    }

    if (
      analysis.status === "Strong"
    ) {

      return "status-strong";
    }

    if (
      analysis.status === "Good"
    ) {

      return "status-good-label";
    }

    return "status-warning";
  };

  return (

    <div className="resume-analyzer">

      {/* Header */}

      <div className="resume-header">

        <p className="small-title">
          RESUME INTELLIGENCE
        </p>

        <h2>
          Resume Analyzer
        </h2>

        <p>
          Upload your resume to check
          its structure, important
          sections and missing
          information before skill
          extraction.
        </p>

      </div>


      {/* Upload Card */}

      <div className="resume-upload-card">

        <div className="upload-icon">
          📄
        </div>

        <h3>

          {selectedFile
            ? selectedFile.name
            : "Upload your resume"}

        </h3>

        <p>
          PDF files only
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          hidden
        />

        <button
          className="choose-file-button"
          onClick={handleChooseFile}
          type="button"
        >

          {selectedFile
            ? "Choose Another File"
            : "Choose Resume"}

        </button>

        {selectedFile && (

          <div className="selected-file">

            <strong>
              Selected:
            </strong>{" "}

            {selectedFile.name}

          </div>

        )}

      </div>


      {/* Error */}

      {error && (

        <div className="error-box">
          {error}
        </div>

      )}


      {/* Analyze Button */}

      <button
        className="analyze-resume-button"
        onClick={handleAnalyze}
        disabled={
          !selectedFile ||
          isAnalyzing
        }
        type="button"
      >

        {isAnalyzing
          ? "Analyzing Resume..."
          : "Analyze Resume"}

      </button>


      {/* Analysis Result */}

      {analysis && (

        <div className="analysis-result">

          {/* Result Header */}

          <div className="result-header">

            <div>

              <p className="small-title">
                ANALYSIS RESULT
              </p>

              <h3>
                Resume Readiness Check
              </h3>

            </div>

            <span
              className={`result-status ${getStatusClass()}`}
            >
              {analysis.status}
            </span>

          </div>


          {/* Resume Metadata */}

          <div className="resume-meta">

            <p>

              <strong>
                File:
              </strong>{" "}

              {analysis.filename}

            </p>

            <p>

              <strong>
                Extracted text:
              </strong>{" "}

              {analysis.textLength}
              {" "}
              characters

            </p>

          </div>


          {/* Sections */}

          <h4 className="result-section-title">
            Detected Sections
          </h4>

          <div className="result-grid">

            {renderSectionStatus(
              "Education",
              analysis.sections.education
            )}

            {renderSectionStatus(
              "Skills",
              analysis.sections.skills
            )}

            {renderSectionStatus(
              "Projects",
              analysis.sections.projects
            )}

            {renderSectionStatus(
              "Experience / Internship",
              analysis.sections.experience
            )}

            {renderSectionStatus(
              "Certifications",
              analysis.sections.certifications
            )}

          </div>


          {/* Message */}

          <p className="analysis-message">
            {analysis.message}
          </p>


        </div>

      )}

    </div>
  );
}

export default ResumeAnalyzer;