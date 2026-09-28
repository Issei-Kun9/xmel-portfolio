import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import CalculatorClient from "./calculator-client";
import { CtaBand, PageHero } from "@/components/kit/kit";

export const metadata: Metadata = pageMetadata({
  path: "/tools/roi-calculator",
  title: "Lead Response ROI Calculator (USD & INR) | XMEL Automations",
  description:
    "Free calculator: see how much revenue slow lead response costs you each month, in dollars or rupees. For real estate agents and home-service businesses.",
});

export default function RoiCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Lead Response ROI Calculator",
    description:
      "Calculate how much commission you're losing to slow lead response times. Free ROI calculator for real estate agents and home services contractors.",
    url: "https://xmelautomations.xyz/tools/roi-calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Yashwardhan Chauhan",
      url: "https://www.linkedin.com/in/yashwardhan-chauhan-075684414/",
    },
    publisher: {
      "@type": "Organization",
      name: "XMEL Automations",
      url: "https://xmelautomations.xyz",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[var(--bg-primary)]">
        <PageHero
          crumbs={[{ name: "Tools" }, { name: "ROI Calculator" }]}
          eyebrow="Free tool"
          title="Lead Response ROI Calculator."
          italic="What slow replies cost."
          lede={
            <>
              Firms that contact a new lead within an hour are nearly 7× as likely to qualify it as those that wait longer
              (Harvard Business Review). Drag the sliders to see what faster replies could be worth to you, in dollars or rupees.
            </>
          }
          proof={["Takes 30 seconds", "USD or INR", "No sign-up to see your number"]}
        />
        <section className="paper py-14 sm:py-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <CalculatorClient />
          </div>
        </section>
        <CtaBand
          title="Want that money"
          italic="back?"
          body="An AI lead responder replies to every new lead within a minute, day and night, and books the appointment. See how it would work for you."
          secondary={{ label: "See AI for real estate", href: "/ai-automation-real-estate" }}
          note={
            <>
              Trades business?{" "}
              <a href="/ai-automation-home-services" className="font-semibold text-[var(--gold)] underline underline-offset-4">
                See AI for home services
              </a>
            </>
          }
        />
      </main>
    </>
  );
}
