import { type FormEvent, useState, useEffect } from "react";
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/libs/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/libs/pdf2img";
import { generateUUID } from "~/libs/utils";
import { prepareInstructions } from "../../constants";

export const meta = () => [
  { title: "Resumify | Upload Resume" },
  { name: "description", content: "Upload your resume for AI-powered analysis" },
];

const ProgressStep = ({
  step,
  currentStep,
  label,
}: {
  step: number;
  currentStep: number;
  label: string;
}) => {
  const isActive = currentStep >= step;
  const isCurrent = currentStep === step;

  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
          isActive
            ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg"
            : "bg-slate-100 text-slate-400"
        } ${isCurrent ? "ring-4 ring-indigo-200 scale-110" : ""}`}
      >
        {isActive && currentStep > step ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          step
        )}
      </div>
      <span className={`text-sm font-medium ${isActive ? "text-slate-800" : "text-slate-400"}`}>
        {label}
      </span>
    </div>
  );
};

const Upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/upload");
    }
  }, [isLoading, auth.isAuthenticated]);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);

    setCurrentStep(1);
    setStatusText("Uploading your resume...");
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) {
      setStatusText("Error: Failed to upload file");
      return;
    }

    setCurrentStep(2);
    setStatusText("Converting to image...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file) {
      setStatusText("Error: Failed to convert PDF to image");
      return;
    }

    setCurrentStep(3);
    setStatusText("Uploading preview image...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) {
      setStatusText("Error: Failed to upload image");
      return;
    }

    setCurrentStep(4);
    setStatusText("Preparing your analysis...");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setCurrentStep(5);
    setStatusText("AI is analyzing your resume...");

    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription })
    );
    if (!feedback) {
      setStatusText("Error: Failed to analyze resume");
      return;
    }

    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setCurrentStep(6);
    setStatusText("Analysis complete! Redirecting...");
    
    setTimeout(() => {
      navigate(`/resume/${uuid}`);
    }, 500);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!file) return;

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-rose-50/30 -z-10" />
      <div className="floating-orb w-[500px] h-[500px] bg-indigo-300 -top-64 -right-64 opacity-20" />
      <div className="floating-orb w-[400px] h-[400px] bg-violet-300 -bottom-32 -left-32 opacity-20" />

      <Navbar />

      <section className="main-section">
        <div className="page-heading py-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Free AI Analysis
          </div>

          <h1 className="mb-4">
            Smart Feedback for<br />
            <span className="text-slate-800">Your Dream Job</span>
          </h1>

          {isProcessing ? (
            <div className="w-full max-w-xl mx-auto mt-8 animate-fade-in">
              <div className="glass-card rounded-3xl p-8">
                {/* Progress visualization */}
                <div className="flex justify-center mb-8">
                  <img
                    src="/images/resume-scan.gif"
                    className="w-64 rounded-2xl shadow-lg"
                    alt="Analyzing"
                  />
                </div>

                {/* Status text */}
                <div className="text-center mb-8">
                  <p className="text-xl font-semibold text-slate-800 mb-2">{statusText}</p>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                      style={{ width: `${(currentStep / 6) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-2 gap-4">
                  <ProgressStep step={1} currentStep={currentStep} label="Upload Resume" />
                  <ProgressStep step={2} currentStep={currentStep} label="Convert to Image" />
                  <ProgressStep step={3} currentStep={currentStep} label="Upload Preview" />
                  <ProgressStep step={4} currentStep={currentStep} label="Prepare Data" />
                  <ProgressStep step={5} currentStep={currentStep} label="AI Analysis" />
                  <ProgressStep step={6} currentStep={currentStep} label="Complete" />
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xl text-slate-500 max-w-2xl">
              Upload your resume and provide job details for personalized ATS scoring and improvement tips.
            </p>
          )}
        </div>

        {!isProcessing && (
          <div className="w-full max-w-2xl animate-fade-in">
            <div className="gradient-border">
              <div className="glass-card rounded-[14px] p-8">
                <form id="upload-form" onSubmit={handleSubmit} className="gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-div">
                      <label htmlFor="company-name">
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          Company Name
                        </span>
                      </label>
                      <input
                        type="text"
                        name="company-name"
                        placeholder="e.g., Google, Microsoft"
                        id="company-name"
                      />
                    </div>

                    <div className="form-div">
                      <label htmlFor="job-title">
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Job Title
                        </span>
                      </label>
                      <input
                        type="text"
                        name="job-title"
                        placeholder="e.g., Frontend Developer"
                        id="job-title"
                      />
                    </div>
                  </div>

                  <div className="form-div">
                    <label htmlFor="job-description">
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Job Description (Optional)
                      </span>
                    </label>
                    <textarea
                      rows={5}
                      name="job-description"
                      placeholder="Paste the job description here for more accurate analysis..."
                      id="job-description"
                    />
                    <p className="text-sm text-slate-400 mt-1">
                      Adding the job description helps us provide more tailored feedback.
                    </p>
                  </div>

                  <div className="form-div">
                    <label htmlFor="uploader">
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Upload Resume
                      </span>
                    </label>
                    <FileUploader onFileSelect={handleFileSelect} />
                  </div>

                  <button
                    className="primary-button w-full py-4 text-lg"
                    type="submit"
                    disabled={!file}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                      Analyze My Resume
                    </span>
                  </button>
                </form>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-8 mt-8 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Instant Results</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>AI-Powered</span>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Upload;
