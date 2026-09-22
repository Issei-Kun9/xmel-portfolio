import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  MARKET_COOKIE,
  MARKET_COOKIE_MAX_AGE,
  isMarket,
  marketFromCountry,
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

  // Homepage: serve the US or India version from the same URL. Both are
  // prerendered at /m/us and /m/in; the visitor never sees those paths.
  if (pathname === "/") {
    const fromQuery = request.nextUrl.searchParams.get("market");
    const fromCookie = request.cookies.get(MARKET_COOKIE)?.value;
    const market = isMarket(fromQuery)
      ? fromQuery
      : isMarket(fromCookie)
        ? fromCookie
        : marketFromCountry(request.headers.get("x-vercel-ip-country"));

    const url = request.nextUrl.clone();
    url.pathname = `/m/${market}`;
    url.searchParams.delete("market");
    const response = NextResponse.rewrite(url);
    if (isMarket(fromQuery) && fromQuery !== fromCookie) {
      response.cookies.set(MARKET_COOKIE, fromQuery, {
        path: "/",
        maxAge: MARKET_COOKIE_MAX_AGE,
        sameSite: "lax",
      });
    }
    return withSecurityHeaders(response);
  }

  // The per-market paths are an implementation detail: keep one public URL.
  if (pathname === "/m" || pathname.startsWith("/m/")) {
    const url = request.nextUrl.clone();
    const requested = pathname.split("/")[2];
    url.pathname = "/";
    if (isMarket(requested)) url.searchParams.set("market", requested);
    return withSecurityHeaders(NextResponse.redirect(url, 307));
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
