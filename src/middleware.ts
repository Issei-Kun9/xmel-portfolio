import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SITES_HOST = "sites.xmelautomations.xyz";

function withSecurityHeaders(response: NextResponse) {
  response.headers.set("X-Frame-Options", "DENY");
  return response;
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  // sites.xmelautomations.xyz is served from the /sites route of this app.
  if (host.startsWith("sites.")) {
    if (!pathname.startsWith("/sites") && !pathname.startsWith("/api")) {
      const url = request.nextUrl.clone();
      url.pathname = pathname === "/" ? "/sites" : `/sites${pathname}`;
      return withSecurityHeaders(NextResponse.rewrite(url));
    }
  } else if (pathname === "/sites" && host.endsWith("xmelautomations.xyz")) {
    // One canonical URL for the offer — never the apex path.
    return withSecurityHeaders(
      NextResponse.redirect(`https://${SITES_HOST}`, 308)
    );
  }

  return withSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|woff2?)$).*)",
  ],
};
