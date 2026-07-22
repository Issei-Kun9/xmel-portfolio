"use client";

import dynamic from "next/dynamic";

const Nav = dynamic(() => import("@/components/sections/nav"));
const Hero = dynamic(() => import("@/components/sections/hero"));
const Stats = dynamic(() => import("@/components/sections/stats"));
const Problem = dynamic(() => import("@/components/sections/problem"));
const System = dynamic(() => import("@/components/sections/system"));
const Projects = dynamic(() => import("@/components/sections/projects"));
const Testimonials = dynamic(() => import("@/components/sections/testimonials"));
const ResultsBanner = dynamic(() => import("@/components/sections/results-banner"));
const TrustBadges = dynamic(() => import("@/components/sections/trust-badges"));
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
        <Stats />
        <Problem />
        <System />
        <Projects />
        <Testimonials />
        <ResultsBanner />
        <TrustBadges />
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
