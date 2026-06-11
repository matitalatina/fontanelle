import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { detectLocaleFromHeader, isLocale, type Locale } from "@/i18n/locales";

function detectLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get("accept-language");
  return detectLocaleFromHeader(acceptLanguage);
}

function isPublicAsset(pathname: string): boolean {
  return (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico" ||
    pathname.includes(".")
  );
}

export function proxy(request: NextRequest) {
  debugger;
  console.log("Proxy middleware invoked for:", request.url);
  const { pathname } = request.nextUrl;

  if (isPublicAsset(pathname)) {
    return NextResponse.next();
  }

  const pathnameLocale = pathname.split("/")[1] ?? "";

  if (isLocale(pathnameLocale)) {
    return NextResponse.next();
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
