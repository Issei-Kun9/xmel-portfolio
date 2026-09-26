import { ArrowRight } from "lucide-react";
import Lottie from "@/components/motion/lottie";

export default function RoiBand() {
  return (
    <section className="py-4">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <a
          href="/tools/roi-calculator"
          className="spotlight lift group relative overflow-hidden flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl bg-[var(--text-primary)] px-6 sm:px-8 py-6 text-white"
        >
          <span className="w-16 h-16 rounded-2xl bg-[rgba(255,255,255,0.92)] flex items-center justify-center shrink-0">
            <Lottie name="money" className="w-14 h-14" />
          </span>
          <span className="flex-1">
            <span className="block text-[18px] font-semibold">How much are slow replies costing you?</span>
            <span className="block text-[15px] text-[rgba(255,255,255,0.7)]">
              Enter your monthly leads and average deal value — get an estimate in 10 seconds.
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[var(--accent-bright)]">
            Try the ROI calculator
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </span>
        </a>
      </div>
    </section>
  );
}
