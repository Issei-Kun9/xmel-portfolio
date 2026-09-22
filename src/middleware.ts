import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  MARKET_COOKIE,
  MARKET_COOKIE_MAX_AGE,
  MARKET_PATH,
  isMarket,
  marketFromCountry,
  type Market,
} from "@/lib/market";

const APEX = "xmelautomations.xyz";

/**
 * Offer subdomains, each served from a route of this same app.
 * Add a row here and the rewrite, the canonical redirect and the security
 * headers all follow — there is nothing else to wire up.
 */
const OFFER_HOSTS: Record<string, string> = {
  sites: "/sites", // ₹2,500 single-page build
  pro: "/pro", // ₹4,000 multi-page build
};

/** Search-engine and link-preview crawlers: never geo-redirected. */
const BOT_UA =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|whatsapp|linkedinbot|twitterbot|embedly|google-inspectiontool|lighthouse/i;

function withSecurityHeaders(response: NextResponse) {
  response.headers.set("X-Frame-Options", "DENY");
  return response;
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;
  const subdomain = host.split(".")[0];
  const route = OFFER_HOSTS[subdomain];

  // On an offer subdomain: serve that offer's route from the site root.
  if (route) {
    if (!pathname.startsWith(route) && !pathname.startsWith("/api")) {
      const url = request.nextUrl.clone();
      url.pathname = pathname === "/" ? route : `${route}${pathname}`;
      return withSecurityHeaders(NextResponse.rewrite(url));
    }
    return withSecurityHeaders(NextResponse.next());
  }

  // Homepage. Each market has its own indexable URL — "/" (US, x-default)
  // and "/in" (India) — linked by hreflang. Both are prerendered at /m/us and
  // /m/in. A visitor who belongs on the India page (by ?market=, cookie or
  // country) is sent there with a temporary redirect; crawlers never are, so
  // "/" always shows search engines the same page.
  if (pathname === "/" || pathname === MARKET_PATH.in) {
    const fromQuery = request.nextUrl.searchParams.get("market");
    const fromCookie = request.cookies.get(MARKET_COOKIE)?.value;

    let market: Market;
    if (pathname === MARKET_PATH.in) {
      market = "in"; // an explicit URL always wins
    } else if (isMarket(fromQuery)) {
      market = fromQuery;
    } else if (isMarket(fromCookie)) {
      market = fromCookie;
    } else if (BOT_UA.test(request.headers.get("user-agent") ?? "")) {
      market = "us";
    } else {
      market = marketFromCountry(request.headers.get("x-vercel-ip-country"));
    }

    const url = request.nextUrl.clone();
    url.searchParams.delete("market");

    let response: NextResponse;
    if (pathname === "/" && market === "in") {
      url.pathname = MARKET_PATH.in;
      response = NextResponse.redirect(url, 302);
    } else {
      url.pathname = `/m/${market}`;
      response = NextResponse.rewrite(url);
    }

    if (isMarket(fromQuery) && fromQuery !== fromCookie) {
      response.cookies.set(MARKET_COOKIE, fromQuery, {
        path: "/",
        maxAge: MARKET_COOKIE_MAX_AGE,
        sameSite: "lax",
      });
    }
    return withSecurityHeaders(response);
  }

  // The prerendered paths are an implementation detail: point to the public URL.
  if (pathname === "/m" || pathname.startsWith("/m/")) {
    const url = request.nextUrl.clone();
    const requested = pathname.split("/")[2];
    url.pathname = isMarket(requested) ? MARKET_PATH[requested] : "/";
    return withSecurityHeaders(NextResponse.redirect(url, 308));
  }

  // On the apex: send the bare offer paths to their subdomain, so each offer
  // has exactly one canonical URL. Localhost is left alone for development.
  if (host.endsWith(APEX)) {
    for (const [sub, offerRoute] of Object.entries(OFFER_HOSTS)) {
      if (pathname === offerRoute) {
        return withSecurityHeaders(
          NextResponse.redirect(`https://${sub}.${APEX}`, 308)
        );
      }
    }
  }

  return withSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|woff2?)$).*)",
  ],
};
