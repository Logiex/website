import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  ignoredRoutes: ["((?!^/polls/create).*)"],
});

import type { NextRequest } from "next/server";
import { NextResponse, userAgent } from "next/server";

export function middleware(req: NextRequest) {
  const { ua } = userAgent(req);
  if (req.nextUrl.pathname.startsWith("/download")) {
    if (/iP(hone|ad|od)/.test(ua)) {
      return NextResponse.redirect("https://google.com");
    } else if (/Android/.test(ua)) {
      return NextResponse.redirect("https://youtube.com");
    } else {
      return NextResponse.redirect("https://twitter.com");
    }
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)", "/download"],
};
