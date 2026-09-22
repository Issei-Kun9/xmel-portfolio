import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomePage from "@/components/home/home-page";
import { MARKETS, isMarket } from "@/lib/market";

/**
 * The homepage, prerendered once per market. Visitors reach it at "/" — the
 * middleware rewrites there based on cookie or country — so this path is
 * never shown and the canonical URL stays the apex.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return MARKETS.map((market) => ({ market }));
}

export const metadata: Metadata = {
  title: "AI Lead Response for Real Estate & Home Services | XMEL Automations",
  description:
    "AI that replies to every new lead in under 60 seconds, qualifies them and books the appointment — 24/7. For real estate and home-service businesses in the US and India.",
  alternates: { canonical: "https://xmelautomations.xyz" },
};

export default async function MarketHome({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market } = await params;
  if (!isMarket(market)) notFound();
  return <HomePage market={market} />;
}
