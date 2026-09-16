import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
