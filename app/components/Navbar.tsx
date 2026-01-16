import { Link } from "react-router";
import { usePuterStore } from "~/libs/puter";

const Navbar = () => {
  const { auth } = usePuterStore();

  return (
    <nav className="navbar animate-fade-in">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <span className="text-2xl font-extrabold text-gradient">RESUMIFY</span>
      </Link>
      
      <div className="flex items-center gap-3">
        {auth.isAuthenticated && auth.user && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-sm text-slate-600">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center text-white text-xs font-semibold">
              {auth.user.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <span className="font-medium">{auth.user.username}</span>
          </div>
        )}
        <Link to="/upload" className="primary-button text-sm md:text-base">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">New Analysis</span>
            <span className="sm:hidden">New</span>
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
