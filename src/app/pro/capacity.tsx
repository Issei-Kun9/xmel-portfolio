/**
 * Batch capacity bar for the multi-page build.
 *
 * ── EDIT THESE TWO NUMBERS ────────────────────────────────────────────────
 * BATCH_SIZE      how many multi-page builds run in parallel before the queue
 *                 is full for the month
 * BUILDS_RESERVED how many are actually reserved right now
 *
 * Update BUILDS_RESERVED each time someone pays the ₹500. Keep it honest: a
 * real number is what makes the pressure survive a customer asking about it.
 * This count is separate from the ₹2,500 batch on sites.xmelautomations.xyz.
 */
const BATCH_SIZE = 6;
const BUILDS_RESERVED = 1;

const PLACES_LEFT = Math.max(BATCH_SIZE - BUILDS_RESERVED, 0);
const PERCENT_FILLED = Math.round((BUILDS_RESERVED / BATCH_SIZE) * 100);

export default function CapacityBar() {
  return (
    <div className="p-5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-secondary)]">
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-tertiary)]">
          Build queue this month
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--accent)] font-semibold">
          {PLACES_LEFT} of {BATCH_SIZE} left
        </span>
      </div>

      {/* Segmented track — one block per build, so the count is literal. */}
      <div
        className="flex gap-1 mb-3"
        role="img"
        aria-label={`${BUILDS_RESERVED} of ${BATCH_SIZE} build slots reserved this month`}
      >
        {Array.from({ length: BATCH_SIZE }, (_, i) => (
          <span
            key={i}
            className={`h-2.5 flex-1 rounded-sm ${
              i < BUILDS_RESERVED
                ? "bg-[var(--accent)]"
                : "bg-[var(--border-subtle)]"
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
        A multi-page build takes real time, so only {BATCH_SIZE} run in a month.
        Builds start in the order they&apos;re reserved.
      </p>

      {PERCENT_FILLED >= 60 && (
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--accent)] font-semibold mt-3">
          Filling up — {PLACES_LEFT} place{PLACES_LEFT === 1 ? "" : "s"}{" "}
          remaining
        </p>
      )}
    </div>
  );
}
