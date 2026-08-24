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
  relativeRedirectTarget,
  sanitizeReturnTo,
} from "@/lib/osm/oauth";

export async function GET(request: NextRequest) {
  let appOrigin: string;
  try {
    appOrigin = getOsmConfig().appOrigin;
  } catch (error) {
    console.error(error);
    const response = new NextResponse(null, { status: 307 });
    response.headers.set(
      "Location",
      relativeRedirectTarget("/", "not_configured"),
    );
    return response;
  }

  if (
    request.nextUrl.searchParams.get("osm_src") !== "canonical" &&
    request.nextUrl.origin !== new URL(appOrigin).origin
  ) {
    const url = new URL(request.nextUrl.pathname, appOrigin);
    for (const [key, value] of request.nextUrl.searchParams.entries()) {
      url.searchParams.set(key, value);
    }
    url.searchParams.set("osm_src", "canonical");
    return NextResponse.redirect(url);
  }

  const returnTo =
    sanitizeReturnTo(request.nextUrl.searchParams.get("returnTo")) || "/";

  const state = createState();
  const { verifier, challenge } = createPkcePair();

  const response = NextResponse.redirect(
    buildAuthorizeUrl({
      redirectUri: getCallbackUrl(),
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
