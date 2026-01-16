import { cn } from "~/libs/utils";

const ATS = ({
  score,
  suggestions,
}: {
  score: number;
  suggestions: { type: "good" | "improve"; tip: string }[];
}) => {
  const getScoreConfig = (score: number) => {
    if (score > 69) {
      return {
        bg: "from-emerald-50 to-emerald-100/50",
        border: "border-emerald-200",
        icon: "/icons/ats-good.svg",
        iconBg: "bg-emerald-100",
        textColor: "text-emerald-700",
        label: "Excellent ATS Compatibility",
        message: "Your resume is well-optimized for Applicant Tracking Systems.",
      };
    }
    if (score > 49) {
      return {
        bg: "from-amber-50 to-amber-100/50",
        border: "border-amber-200",
        icon: "/icons/ats-warning.svg",
        iconBg: "bg-amber-100",
        textColor: "text-amber-700",
        label: "Good ATS Compatibility",
        message: "Your resume passes most ATS checks but could use some improvements.",
      };
    }
    return {
      bg: "from-rose-50 to-rose-100/50",
      border: "border-rose-200",
      icon: "/icons/ats-bad.svg",
      iconBg: "bg-rose-100",
      textColor: "text-rose-700",
      label: "Needs ATS Optimization",
      message: "Your resume may struggle to pass Applicant Tracking Systems.",
    };
  };

  const config = getScoreConfig(score);

  return (
    <div
      className={cn(
        "rounded-3xl shadow-lg border p-6 md:p-8 flex flex-col gap-6",
        `bg-gradient-to-br ${config.bg} ${config.border}`
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", config.iconBg)}>
          <img src={config.icon} alt="ATS" className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
            <h3 className="text-xl font-bold text-slate-800">ATS Score</h3>
            <div className={cn("text-3xl font-bold", config.textColor)}>
              {score}<span className="text-lg text-slate-400">/100</span>
            </div>
          </div>
          <p className={cn("font-semibold text-sm", config.textColor)}>{config.label}</p>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-3">
        <p className="text-slate-600">{config.message}</p>
        <p className="text-slate-500 text-sm">
          Your resume was scanned like an employer's ATS would. Here's what we found:
        </p>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-3 p-4 rounded-xl bg-white/70 backdrop-blur-sm border",
                suggestion.type === "good"
                  ? "border-emerald-200"
                  : "border-amber-200"
              )}
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                  suggestion.type === "good" ? "bg-emerald-100" : "bg-amber-100"
                )}
              >
                <img
                  src={
                    suggestion.type === "good"
                      ? "/icons/check.svg"
                      : "/icons/warning.svg"
                  }
                  alt={suggestion.type}
                  className="w-3.5 h-3.5"
                />
              </div>
              <p className="text-slate-700">{suggestion.tip}</p>
            </div>
          ))}
        </div>
      )}

      {/* Call to action */}
      <div className="pt-2 border-t border-slate-200/50">
        <p className="text-sm text-slate-500 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          See detailed recommendations below to improve your score.
        </p>
      </div>
    </div>
  );
};

export default ATS;
