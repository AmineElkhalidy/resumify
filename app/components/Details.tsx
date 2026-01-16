import { cn } from "~/libs/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
  return (
    <div
      className={cn(
        "flex flex-row gap-1.5 items-center px-3 py-1 rounded-full",
        score > 69
          ? "bg-emerald-100"
          : score > 39
          ? "bg-amber-100"
          : "bg-rose-100"
      )}
    >
      <img
        src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
        alt="score"
        className="size-3.5"
      />
      <p
        className={cn(
          "text-sm font-semibold",
          score > 69
            ? "text-emerald-700"
            : score > 39
            ? "text-amber-700"
            : "text-rose-700"
        )}
      >
        {score}/100
      </p>
    </div>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
  icon,
}: {
  title: string;
  categoryScore: number;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex flex-row gap-4 items-center py-2">
      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-lg font-semibold text-slate-800">{title}</p>
      </div>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  const goodTips = tips.filter((t) => t.type === "good");
  const improveTips = tips.filter((t) => t.type === "improve");

  return (
    <div className="flex flex-col gap-6 pt-2">
      {/* Quick overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 rounded-xl p-4">
        {tips.map((tip, index) => (
          <div className="flex items-center gap-2" key={index}>
            <img
              src={
                tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
              }
              alt={tip.type}
              className="size-4 flex-shrink-0"
            />
            <p className="text-sm text-slate-600">{tip.tip}</p>
          </div>
        ))}
      </div>

      {/* Detailed tips */}
      <div className="space-y-4">
        {/* Good points first */}
        {goodTips.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-emerald-700 uppercase tracking-wide flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              What's Working Well
            </h4>
            {goodTips.map((tip, index) => (
              <div
                key={`good-${index}`}
                className="bg-emerald-50 border border-emerald-200 rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <img src="/icons/check.svg" alt="good" className="size-3.5" />
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-800 mb-1">{tip.tip}</p>
                    <p className="text-emerald-700 text-sm">{tip.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Improvement points */}
        {improveTips.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-amber-700 uppercase tracking-wide flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Areas for Improvement
            </h4>
            {improveTips.map((tip, index) => (
              <div
                key={`improve-${index}`}
                className="bg-amber-50 border border-amber-200 rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <img src="/icons/warning.svg" alt="improve" className="size-3.5" />
                  </div>
                  <div>
                    <p className="font-semibold text-amber-800 mb-1">{tip.tip}</p>
                    <p className="text-amber-700 text-sm">{tip.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-xl font-bold text-slate-800">Detailed Analysis</h3>
        <p className="text-slate-500 text-sm mt-1">
          Click on each category to see specific recommendations.
        </p>
      </div>
      
      <div className="p-4 md:p-6">
        <Accordion allowMultiple>
          <AccordionItem id="tone-style">
            <AccordionHeader itemId="tone-style">
              <CategoryHeader
                title="Tone & Style"
                categoryScore={feedback.toneAndStyle.score}
                icon={
                  <svg className="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                }
              />
            </AccordionHeader>
            <AccordionContent itemId="tone-style">
              <CategoryContent tips={feedback.toneAndStyle.tips} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem id="content">
            <AccordionHeader itemId="content">
              <CategoryHeader
                title="Content Quality"
                categoryScore={feedback.content.score}
                icon={
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
              />
            </AccordionHeader>
            <AccordionContent itemId="content">
              <CategoryContent tips={feedback.content.tips} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem id="structure">
            <AccordionHeader itemId="structure">
              <CategoryHeader
                title="Structure & Layout"
                categoryScore={feedback.structure.score}
                icon={
                  <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                }
              />
            </AccordionHeader>
            <AccordionContent itemId="structure">
              <CategoryContent tips={feedback.structure.tips} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem id="skills">
            <AccordionHeader itemId="skills">
              <CategoryHeader
                title="Skills Match"
                categoryScore={feedback.skills.score}
                icon={
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                }
              />
            </AccordionHeader>
            <AccordionContent itemId="skills">
              <CategoryContent tips={feedback.skills.tips} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Details;
