import LazyVideo from "./lazy-video";

export default function VideoDemo() {
  return (
    <section id="demo" className="scroll-mt-20 py-16 sm:py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[14px] font-semibold text-[var(--accent)]">See the difference</p>
          <h2 className="mt-2 font-display text-[clamp(28px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)]">
            Same lead, 2:14 AM. One business replies instantly.
          </h2>
          <p className="mt-3 text-[16px] text-[var(--text-secondary)]">
            A 10-second look at a slow reply next to an instant AI reply.
          </p>
        </div>

        <div className="mt-10 rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-primary)] shadow-[var(--shadow-card)] max-w-4xl mx-auto">
          <LazyVideo
            src="/media/xmel-demo.mp4"
            poster="/media/xmel-demo-poster.jpg"
            width={640}
            height={360}
            label="Two phones receive the same lead at 2:14 AM; one gets an instant AI reply."
          />
        </div>
      </div>
    </section>
  );
}
