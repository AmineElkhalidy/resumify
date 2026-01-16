import { usePuterStore } from "~/libs/puter";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export const meta = () => [
  { title: "Resumify | Sign In" },
  { name: "description", content: "Sign in to analyze your resumes with AI" },
];

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1] || "/";
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated, next]);

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden !pt-0">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-white to-rose-100" />
      
      {/* Floating orbs */}
      <div className="floating-orb w-96 h-96 bg-indigo-400 -top-20 -left-20 animate-pulse-slow" />
      <div className="floating-orb w-80 h-80 bg-rose-400 -bottom-20 -right-20 animate-pulse-slow" style={{ animationDelay: '1s' }} />
      <div className="floating-orb w-64 h-64 bg-violet-400 top-1/3 right-1/4 animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 w-full max-w-lg mx-4">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gradient mb-2">RESUMIFY</h1>
          <p className="text-slate-500 text-lg">AI-Powered Resume Analyzer</p>
        </div>

        {/* Card */}
        <div className="gradient-border animate-fade-in stagger-2">
          <div className="glass-card rounded-[14px] p-8 md:p-12">
            <div className="flex flex-col items-center gap-6 text-center">
              {/* Welcome icon */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Welcome Back</h2>
                <p className="text-slate-500 text-lg">Sign in to continue your career journey</p>
              </div>

              {/* Features list */}
              <div className="flex flex-col gap-3 text-left w-full py-4 border-y border-slate-100">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Instant AI-powered resume analysis</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>ATS compatibility scoring</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Personalized improvement tips</span>
                </div>
              </div>

              {/* Auth button */}
              <div className="w-full pt-2">
                {isLoading ? (
                  <button className="auth-button w-full flex items-center justify-center gap-3" disabled>
                    <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Signing you in...</span>
                  </button>
                ) : (
                  <>
                    {auth.isAuthenticated ? (
                      <button className="auth-button w-full" onClick={auth.signOut}>
                        Sign Out
                      </button>
                    ) : (
                      <button className="auth-button w-full" onClick={auth.signIn}>
                        Sign In with Puter
                      </button>
                    )}
                  </>
                )}
              </div>

              <p className="text-sm text-slate-400 mt-2">
                Powered by{" "}
                <a 
                  href="https://puter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-500 hover:text-indigo-600 transition-colors"
                >
                  Puter.js
                </a>
                {" "}• Secure & Private
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Auth;
