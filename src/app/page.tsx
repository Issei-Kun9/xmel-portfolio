"use client";

import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";

const Nav = dynamic(() => import("@/components/sections/nav"));
const Hero = dynamic(() => import("@/components/sections/hero"));
const Problem = dynamic(() => import("@/components/sections/problem"));
const System = dynamic(() => import("@/components/sections/system"));
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
