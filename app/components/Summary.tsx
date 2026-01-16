import ScoreGauge from "./ScoreGauge";

const ScoreBadge = ({ score }: { score: number }) => {
  const badgeColor =
    score > 69
      ? "bg-emerald-100 text-emerald-700"
      : score > 49
      ? "bg-amber-100 text-amber-700"
      : "bg-rose-100 text-rose-700";
  const badgeText =
    score > 69 ? "Excellent" : score > 49 ? "Good" : "Needs Work";

  return (
    <div className={`score-badge ${badgeColor}`}>
      <span className="text-xs font-semibold">{badgeText}</span>
    </div>
  );
};

const Category = ({ title, score, icon }: { title: string; score: number; icon: React.ReactNode }) => {
  const textColor =
    score > 69
      ? "text-emerald-600"
      : score > 49
      ? "text-amber-600"
      : "text-rose-600";

  const bgColor =
    score > 69
      ? "bg-emerald-50 border-emerald-100"
      : score > 49
      ? "bg-amber-50 border-amber-100"
      : "bg-rose-50 border-rose-100";

  return (
    <div className={`flex items-center justify-between p-4 rounded-xl border ${bgColor} transition-all hover:shadow-sm`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="font-semibold text-slate-700">{title}</p>
          <ScoreBadge score={score} />
        </div>
      </div>
      <p className="text-2xl font-bold">
        <span className={textColor}>{score}</span>
        <span className="text-slate-300 text-lg">/100</span>
      </p>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
      {/* Header with main score */}
      <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-indigo-50/30">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <ScoreGauge score={feedback.overallScore} />
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-bold text-slate-800 mb-1">Your Resume Score</h3>
            <p className="text-slate-500">
              Based on ATS compatibility, content quality, structure, and more.
            </p>
          </div>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="p-6 md:p-8 space-y-4">
        <Category 
          title="Tone & Style" 
          score={feedback.toneAndStyle.score}
          icon={
            <svg className="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          }
        />
        <Category 
          title="Content Quality" 
          score={feedback.content.score}
          icon={
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
        <Category 
          title="Structure" 
          score={feedback.structure.score}
          icon={
            <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          }
        />
        <Category 
          title="Skills Match" 
          score={feedback.skills.score}
          icon={
            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          }
        />
      </div>
    </div>
  );
};

export default Summary;
