import { useEffect, useRef, useState } from "react";

const ScoreGauge = ({ score = 75 }: { score: number }) => {
  const [pathLength, setPathLength] = useState(0);
  const [animatedScore, setAnimatedScore] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  const percentage = score / 100;

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  // Animate the score number
  useEffect(() => {
    const duration = 1500;
    const start = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setAnimatedScore(Math.round(easeOutQuart * score));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [score]);

  const getScoreColor = (score: number) => {
    if (score >= 70) return { start: "#10b981", end: "#059669" }; // Emerald
    if (score >= 50) return { start: "#f59e0b", end: "#d97706" }; // Amber
    return { start: "#ef4444", end: "#dc2626" }; // Rose
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return "Excellent";
    if (score >= 50) return "Good";
    return "Needs Work";
  };

  const colors = getScoreColor(score);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-44 h-24">
        <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient
              id="gaugeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={colors.start} />
              <stop offset="100%" stopColor={colors.end} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background arc */}
          <path
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Foreground arc */}
          <path
            ref={pathRef}
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength * (1 - percentage)}
            filter="url(#glow)"
            style={{
              transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </svg>

        {/* Score display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
          <div className="text-3xl font-bold text-slate-800">
            {animatedScore}
            <span className="text-lg text-slate-400">/100</span>
          </div>
          <div className={`text-sm font-semibold ${
            score >= 70 ? "text-emerald-600" : score >= 50 ? "text-amber-600" : "text-rose-600"
          }`}>
            {getScoreLabel(score)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreGauge;
