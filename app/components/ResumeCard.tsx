import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/libs/puter";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResume = async () => {
      setIsLoading(true);
      const blob = await fs.read(imagePath);
      if (!blob) {
        setIsLoading(false);
        return;
      }
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
      setIsLoading(false);
    };

    loadResume();
  }, [imagePath]);

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-emerald-600";
    if (score >= 50) return "text-amber-600";
    return "text-rose-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 70) return "bg-emerald-50 border-emerald-200";
    if (score >= 50) return "bg-amber-50 border-amber-200";
    return "bg-rose-50 border-rose-200";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return "Strong Match";
    if (score >= 50) return "Good Start";
    return "Needs Work";
  };

  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card group card-glow"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          {companyName && (
            <h3 className="text-xl font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
              {companyName}
            </h3>
          )}
          {jobTitle && (
            <p className="text-base text-slate-500 truncate">{jobTitle}</p>
          )}
          {!companyName && !jobTitle && (
            <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
              Resume Analysis
            </h3>
          )}
          
          {/* Score badge */}
          <div className={`inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full border w-fit ${getScoreBg(feedback.overallScore)}`}>
            <span className={`text-sm font-semibold ${getScoreColor(feedback.overallScore)}`}>
              {getScoreLabel(feedback.overallScore)}
            </span>
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>

      {/* Preview Image */}
      <div className="gradient-border flex-1 overflow-hidden">
        <div className="w-full h-full bg-white rounded-[12px] overflow-hidden">
          {isLoading ? (
            <div className="w-full h-[280px] bg-slate-100 animate-pulse flex items-center justify-center">
              <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          ) : resumeUrl ? (
            <img
              src={resumeUrl}
              alt="Resume preview"
              className="w-full h-[280px] object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-[280px] bg-slate-50 flex items-center justify-center">
              <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* View button */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-1">
            <span className="font-medium">ATS:</span>
            <span className={getScoreColor(feedback.ATS.score)}>{feedback.ATS.score}%</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">Content:</span>
            <span className={getScoreColor(feedback.content.score)}>{feedback.content.score}%</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-indigo-600 font-medium group-hover:gap-3 transition-all">
          <span>View Details</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;
