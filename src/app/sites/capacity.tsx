/**
 * Batch capacity bar.
 *
 * ── EDIT THESE TWO NUMBERS ────────────────────────────────────────────────
 * BATCH_SIZE      how many builds this introductory batch runs to
 * BUILDS_RESERVED how many are actually reserved right now
 *
 * Update BUILDS_RESERVED each time someone pays the ₹500. That is the whole
 * maintenance job — the bar, the count and the "places left" line all read
 * from it. Keep it honest: a real number you can point at is what makes the
 * pressure survive someone asking you about it.
 */
const BATCH_SIZE = 10;
const BUILDS_RESERVED = 3;

const PLACES_LEFT = Math.max(BATCH_SIZE - BUILDS_RESERVED, 0);
const PERCENT_FILLED = Math.round((BUILDS_RESERVED / BATCH_SIZE) * 100);

export default function CapacityBar({
  regularPrice,
}: {
  regularPrice: string;
}) {
  return (
    <div className="p-5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-secondary)]">
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-tertiary)]">
          Introductory batch
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--accent)] font-semibold">
          {PLACES_LEFT} of {BATCH_SIZE} left
        </span>
      </div>

      {/* Segmented track — each block is one build, so the count is literal. */}
      <div
        className="flex gap-1 mb-3"
        role="img"
        aria-label={`${BUILDS_RESERVED} of ${BATCH_SIZE} builds in this batch reserved`}
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
        When all {BATCH_SIZE} are taken this build goes back to {regularPrice}.
        Builds start in the order they&apos;re reserved.
      </p>

      {PERCENT_FILLED >= 70 && (
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--accent)] font-semibold mt-3">
          Filling up — {PLACES_LEFT} place{PLACES_LEFT === 1 ? "" : "s"}{" "}
          remaining
        </p>
      )}
    </div>
  );
}
