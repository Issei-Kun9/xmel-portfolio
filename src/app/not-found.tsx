import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Logo mark */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] mb-8">
          <svg
            viewBox="0 0 32 32"
            width="40"
            height="40"
            fill="none"
          >
            <path
              d="M8 8L16 16L8 24"
              stroke="var(--accent)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24 8L16 16L24 24"
              stroke="var(--accent)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="font-display text-6xl font-bold text-[var(--text-primary)] mb-4">
          404
        </h1>

        <p className="font-mono text-sm text-[var(--text-secondary)] mb-2">
          This page doesn&apos;t exist.
        </p>
        <p className="font-mono text-xs text-[var(--text-tertiary)] mb-10">
          Maybe it was moved, or the URL has a typo.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg-primary)] font-mono text-sm font-medium rounded hover:shadow-[0_0_30px_rgba(193,255,114,0.2)] transition-shadow duration-300"
          >
            <span>←</span>
            Back to home
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-strong)] text-[var(--text-secondary)] font-mono text-sm rounded hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200"
          >
            Read the blog
          </Link>
        </div>
      </div>
    </main>
  );
}
