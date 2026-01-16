import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/libs/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

export const meta = () => [
  { title: "Resumify | Resume Review" },
  { name: "description", content: "Detailed AI-powered overview of your resume" },
];

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [resumeData, setResumeData] = useState<{ companyName?: string; jobTitle?: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate(`/auth?next=/resume/${id}`);
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);

      if (!resume) return;

      const data = JSON.parse(resume);
      setResumeData({ companyName: data.companyName, jobTitle: data.jobTitle });

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
    };
    loadResume();
  }, [id]);

  return (
    <main className="!pt-0 min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-rose-50/20">
      {/* Header */}
      <nav className="resume-nav">
        <Link to="/" className="back-button">
          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-slate-700 font-medium">Back to Home</span>
        </Link>
        
        {resumeData && (
          <div className="hidden md:flex items-center gap-2">
            {resumeData.companyName && (
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
                {resumeData.companyName}
              </span>
            )}
            {resumeData.jobTitle && (
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
                {resumeData.jobTitle}
              </span>
            )}
          </div>
        )}
      </nav>

      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        {/* Resume Preview Panel */}
        <section className="feedback-section bg-gradient-to-br from-slate-100 to-indigo-100/50 lg:h-screen lg:sticky lg:top-0 items-center justify-center">
          {imageUrl && resumeUrl ? (
            <div className="animate-fade-in w-full max-w-md mx-auto">
              <div className="gradient-border shadow-2xl">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="relative overflow-hidden rounded-[12px]">
                    <img
                      src={imageUrl}
                      className="w-full h-auto object-contain bg-white group-hover:scale-[1.02] transition-transform duration-500"
                      alt="Resume preview"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <span className="text-white font-semibold flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Full PDF
                      </span>
                    </div>
                  </div>
                </a>
              </div>
              
              {/* Download button */}
              <a
                href={resumeUrl}
                download
                className="mt-4 w-full secondary-button flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Resume
              </a>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8">
              <div className="w-64 h-80 bg-white rounded-2xl animate-shimmer" />
              <p className="mt-4 text-slate-500">Loading preview...</p>
            </div>
          )}
        </section>

        {/* Feedback Panel */}
        <section className="feedback-section lg:min-h-screen">
          {/* Title */}
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Resume Review</h2>
              <p className="text-slate-500">AI-powered analysis and recommendations</p>
            </div>
          </div>

          {feedback ? (
            <div className="flex flex-col gap-8 animate-fade-in">
              <Summary feedback={feedback} />
              <ATS
                score={feedback.ATS.score || 0}
                suggestions={feedback.ATS.tips || []}
              />
              <Details feedback={feedback} />
              
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100">
                <Link to="/upload" className="primary-button flex-1 text-center">
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Analyze Another Resume
                  </span>
                </Link>
                <Link to="/" className="secondary-button flex-1 text-center">
                  View All Resumes
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <img src="/images/resume-scan-2.gif" className="w-48 mb-4" alt="Loading" />
              <p className="text-lg text-slate-500 animate-pulse">Loading your analysis...</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Resume;
