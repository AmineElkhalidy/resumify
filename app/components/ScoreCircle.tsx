import { useEffect, useState } from "react";

const ScoreCircle = ({ score = 75 }: { score: number }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = score / 100;
  const strokeDashoffset = circumference * (1 - progress);

  // Animate the score number
  useEffect(() => {
    const duration = 1000;
    const start = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setAnimatedScore(Math.round(easeOutQuart * score));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [score]);

  const getScoreColors = (score: number) => {
    if (score >= 70) return { start: "#10b981", end: "#059669" }; // Emerald
    if (score >= 50) return { start: "#f59e0b", end: "#d97706" }; // Amber
    return { start: "#ef4444", end: "#dc2626" }; // Rose
  };

  const colors = getScoreColors(score);

  return (
    <div className="relative w-[90px] h-[90px]">
      <svg
        height="100%"
        width="100%"
        viewBox="0 0 100 100"
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="#e2e8f0"
          strokeWidth={stroke}
          fill="transparent"
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id={`circleGrad-${score}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={colors.start} />
            <stop offset="100%" stopColor={colors.end} />
          </linearGradient>
          <filter id="circleGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke={`url(#circleGrad-${score})`}
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          filter="url(#circleGlow)"
          style={{
            transition: "stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </svg>

      {/* Score display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold text-slate-800">{animatedScore}</span>
        <span className="text-xs text-slate-400 font-medium">/ 100</span>
      </div>
    </div>
  );
};

export default ScoreCircle;
