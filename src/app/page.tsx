import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";

const Nav = dynamic(() => import("@/components/sections/nav"));
const Hero = dynamic(() => import("@/components/sections/hero"));
const Problem = dynamic(() => import("@/components/sections/problem"));
const Booking = dynamic(() => import("@/components/sections/booking"));
const System = dynamic(() => import("@/components/sections/system"));
const VideoDemo = dynamic(() => import("@/components/sections/video-demo"));
const ResultsBanner = dynamic(() => import("@/components/sections/results-banner"));
const Projects = dynamic(() => import("@/components/sections/projects"));
const Testimonials = dynamic(() => import("@/components/sections/testimonials"));
const Guarantee = dynamic(() => import("@/components/sections/guarantee"));
const Process = dynamic(() => import("@/components/sections/process"));
const TechStack = dynamic(() => import("@/components/sections/tech-stack"));
const About = dynamic(() => import("@/components/sections/about"));
const Faq = dynamic(() => import("@/components/sections/faq"));
const Contact = dynamic(() => import("@/components/sections/contact"));
const Footer = dynamic(() => import("@/components/sections/footer"));

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="/ai-automation-real-estate"
              className="group block p-6 lg:p-8 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent)] transition-colors duration-300"
            >
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--accent)] block mb-3">
                REAL ESTATE
              </span>
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-2">
                AI Automation for Real Estate Agents
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                An AI inside sales agent that qualifies portal leads in seconds,
                responds in under 50 seconds, and books appointments.
              </p>
              <span className="inline-flex items-center gap-2 font-mono text-[12px] text-[var(--accent)] mt-4">
                EXPLORE
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
            <a
              href="/ai-automation-home-services"
              className="group block p-6 lg:p-8 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent)] transition-colors duration-300"
            >
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--accent)] block mb-3">
                HOME SERVICES
              </span>
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-2">
                AI Automation for Home Services
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                An AI receptionist that answers every call, qualifies the job,
                and books the slot — no more missed calls.
              </p>
              <span className="inline-flex items-center gap-2 font-mono text-[12px] text-[var(--accent)] mt-4">
                EXPLORE
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
          </div>
        </div>
        <Booking />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-8">
          <a
            href="#isa-system"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-lg font-mono text-sm font-medium border border-[var(--border-subtle)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300"
          >
            See How It Works
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
        <System />
        <VideoDemo />
        <ResultsBanner />
        <Projects />
        <Testimonials />
        <Guarantee />
        <Process />
        <TechStack />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
