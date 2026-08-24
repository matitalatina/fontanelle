import { NextRequest, NextResponse } from "next/server";
import {
  OSM_RETURN_TO_COOKIE,
  OSM_STATE_COOKIE,
  OSM_VERIFIER_COOKIE,
  buildAuthorizeUrl,
  createPkcePair,
  createState,
  getCallbackUrl,
  getOsmConfig,
  oauthTempCookieOptions,
  sanitizeReturnTo,
} from "@/lib/osm/oauth";

function canonicalRedirectOrNull(request: NextRequest): NextResponse | null {
  const appOrigin = process.env.APP_ORIGIN?.replace(/\/+$/, "");
  if (
    !appOrigin ||
    request.nextUrl.searchParams.get("osm_src") === "canonical"
  ) {
    return null;
  }
  try {
    if (new URL(appOrigin).origin === request.nextUrl.origin) {
      return null;
    }
  } catch {
    return null;
  }
  const url = new URL(request.nextUrl.pathname, appOrigin);
  for (const [key, value] of request.nextUrl.searchParams.entries()) {
    url.searchParams.set(key, value);
  }
  url.searchParams.set("osm_src", "canonical");
  return NextResponse.redirect(url);
}

export async function GET(request: NextRequest) {
  const canonicalRedirect = canonicalRedirectOrNull(request);
  if (canonicalRedirect) {
    return canonicalRedirect;
  }

  const returnTo =
    sanitizeReturnTo(request.nextUrl.searchParams.get("returnTo")) || "/";

  const redirectBack = (error: string | null) => {
    const url = new URL(returnTo, request.nextUrl.origin);
    if (error) {
      url.searchParams.set("osm_auth_error", error);
    }
    return NextResponse.redirect(url);
  };

  try {
    getOsmConfig();
  } catch (error) {
    console.error(error);
    return redirectBack("not_configured");
  }

  const state = createState();
  const { verifier, challenge } = createPkcePair();

  const response = NextResponse.redirect(
    buildAuthorizeUrl({
      redirectUri: getCallbackUrl(request.nextUrl.origin),
      state,
      codeChallenge: challenge,
    }),
  );

  const options = oauthTempCookieOptions();
  response.cookies.set(OSM_STATE_COOKIE, state, options);
  response.cookies.set(OSM_VERIFIER_COOKIE, verifier, options);
  response.cookies.set(OSM_RETURN_TO_COOKIE, returnTo, options);

  return response;
}
