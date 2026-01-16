import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/libs/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumify - AI Resume Analyzer" },
    { name: "description", content: "Smart AI-powered feedback for your dream job!" },
  ];
}

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
    <div className="relative mb-8">
      <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center">
        <svg className="w-16 h-16 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-xl bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center shadow-lg">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </div>
    </div>
    
    <h3 className="text-2xl font-bold text-slate-800 mb-2">No resumes yet</h3>
    <p className="text-slate-500 text-center max-w-md mb-8">
      Upload your first resume and get instant AI-powered feedback to land your dream job.
    </p>
    
    <Link
      to="/upload"
      className="primary-button text-lg px-8 py-4"
    >
      <span className="flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        Upload Your First Resume
      </span>
    </Link>
  </div>
);

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
    <div className="relative mb-6">
      <img src="/images/resume-scan-2.gif" className="w-48 rounded-2xl" alt="Loading" />
    </div>
    <p className="text-slate-500 text-lg animate-pulse">Loading your resumes...</p>
  </div>
);

const StatsBar = ({ count }: { count: number }) => (
  <div className="flex items-center gap-6 py-4 px-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-sm animate-fade-in">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-800">{count}</p>
        <p className="text-sm text-slate-500">Resume{count !== 1 ? 's' : ''} Analyzed</p>
      </div>
    </div>
  </div>
);

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(true);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list("resume:*", true)) as KVItem[];

      const parsedResumes = resumes?.map(
        (resume) => JSON.parse(resume.value) as Resume
      );

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    loadResumes();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-rose-50/30 -z-10" />
      
      {/* Decorative elements */}
      <div className="floating-orb w-[500px] h-[500px] bg-indigo-300 -top-64 -right-64 opacity-20" />
      <div className="floating-orb w-[400px] h-[400px] bg-rose-300 -bottom-32 -left-32 opacity-20" />
      
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            AI-Powered Resume Analysis
          </div>
          
          <h1 className="mb-4">
            Track Your Applications<br />
            <span className="text-slate-800">&amp; Resume Ratings</span>
          </h1>
          
          {!loadingResumes && resumes?.length === 0 ? (
            <p className="text-xl text-slate-500 max-w-2xl">
              Upload your resume and get instant AI feedback on ATS compatibility,
              content quality, and actionable improvements.
            </p>
          ) : (
            <p className="text-xl text-slate-500 max-w-2xl">
              Review your submissions and check AI-powered feedback to improve your chances.
            </p>
          )}
        </div>

        {loadingResumes && <LoadingState />}

        {!loadingResumes && resumes.length === 0 && <EmptyState />}

        {!loadingResumes && resumes.length > 0 && (
          <>
            <StatsBar count={resumes.length} />
            
            <div className="resumes-section">
              {resumes.map((resume, index) => (
                <div 
                  key={resume.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ResumeCard resume={resume} />
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 animate-fade-in">
              <Link
                to="/upload"
                className="primary-button text-lg"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Analyze Another Resume
                </span>
              </Link>
              
              <Link
                to="/wipe"
                className="secondary-button text-lg"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Manage Data
                </span>
              </Link>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
