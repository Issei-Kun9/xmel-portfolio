/**
 * Monthly capacity for online-store builds.
 *
 * ── EDIT THESE TWO NUMBERS ────────────────────────────────────────────────
 * BATCH_SIZE      how many store builds run in a month before the queue is
 *                 full
 * BUILDS_RESERVED how many are actually reserved right now
 *
 * Update BUILDS_RESERVED each time someone pays the ₹2,000. Keep it honest: a
 * real number is what makes the pressure survive a customer asking about it.
 * Shown on sites.xmelautomations.xyz (the ₹15,000 India store offer).
 */
export const BATCH_SIZE = 20;
export const BUILDS_RESERVED = 3;

export const PLACES_LEFT = Math.max(BATCH_SIZE - BUILDS_RESERVED, 0);
const PERCENT_FILLED = Math.round((BUILDS_RESERVED / BATCH_SIZE) * 100);

export default function CapacityBar() {
  return (
    <div className="p-5 rounded-xl border border-[var(--accent-line)] bg-[var(--bg-secondary)]">
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-tertiary)]">
          <span className="relative flex w-1.5 h-1.5" aria-hidden="true">
            <span className="absolute inline-flex w-full h-full rounded-full bg-[var(--accent)] status-pulse" />
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          </span>
          Store builds this month
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--accent)] font-semibold">
          {PLACES_LEFT} of {BATCH_SIZE} left
        </span>
      </div>

      {/* Segmented track — one block per build, so the count is literal. */}
      <div
        className="flex gap-1 mb-3"
        role="img"
        aria-label={`${BUILDS_RESERVED} of ${BATCH_SIZE} store builds reserved this month`}
      >
        {Array.from({ length: BATCH_SIZE }, (_, i) => (
          <span
            key={i}
            className={`h-2.5 flex-1 rounded-sm ${
              i < BUILDS_RESERVED
                ? "bg-[var(--accent)]"
                : "bg-[var(--bg-tertiary)] border border-[var(--border-subtle)]"
            }`}
          />
        ))}
      </div>

      <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
        {BUILDS_RESERVED > 0 ? (
          <>
            <strong className="text-[var(--text-primary)] font-semibold">
              {BUILDS_RESERVED} reserved
            </strong>{" "}
            so far.{" "}
          </>
        ) : null}
        A store is a lot more than a website — products, payments, shipping —
        so only {BATCH_SIZE}{" "}are built in a month. Builds start in the order
        they&apos;re reserved.
      </p>

      {PERCENT_FILLED >= 50 && (
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--accent)] font-semibold mt-3">
          Filling up — {PLACES_LEFT} place{PLACES_LEFT === 1 ? "" : "s"}{" "}
          remaining
        </p>
      )}
    </div>
  );
}
