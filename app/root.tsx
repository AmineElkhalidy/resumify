import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { usePuterStore } from "~/libs/puter";
import { useEffect } from "react";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
  },
  { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
];

export const meta: Route.MetaFunction = () => [
  { title: "Resumify - AI-Powered Resume Analyzer" },
  {
    name: "description",
    content:
      "Get instant AI-powered feedback on your resume. Improve your ATS score, enhance content, and land your dream job with Resumify.",
  },
  { name: "keywords", content: "resume, ATS, AI, career, job, analyzer, feedback, score" },
  { property: "og:title", content: "Resumify - AI-Powered Resume Analyzer" },
  {
    property: "og:description",
    content:
      "Upload your resume and get instant AI feedback. Improve your chances of landing your dream job.",
  },
  { property: "og:type", content: "website" },
  { property: "og:image", content: "/screenshot/home.png" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Resumify - AI Resume Analyzer" },
  {
    name: "twitter:description",
    content: "Get AI-powered resume feedback instantly",
  },
  { name: "theme-color", content: "#6366f1" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { init } = usePuterStore();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="antialiased">
        <script src="https://js.puter.com/v2/"></script>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50 to-rose-50">
      <div className="text-center p-12 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 max-w-md mx-4">
        <div className="text-8xl font-black text-gradient mb-4">{message}</div>
        <p className="text-xl text-slate-600 mb-6">{details}</p>
        {stack && (
          <pre className="text-left w-full p-4 overflow-x-auto bg-slate-100 rounded-xl text-sm">
            <code className="text-slate-700">{stack}</code>
          </pre>
        )}
        <a
          href="/"
          className="inline-block mt-6 px-8 py-3 primary-gradient text-white rounded-full font-semibold hover:scale-105 transition-transform"
        >
          Go Home
        </a>
      </div>
    </main>
  );
}
