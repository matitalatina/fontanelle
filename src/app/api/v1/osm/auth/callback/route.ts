import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  OSM_RETURN_TO_COOKIE,
  OSM_STATE_COOKIE,
  OSM_TOKEN_COOKIE,
  OSM_VERIFIER_COOKIE,
  exchangeCodeForToken,
  getCallbackUrl,
  getRequestOrigin,
  oauthTempCookieOptions,
  relativeRedirectTarget,
  sanitizeReturnTo,
  tokenCookieOptions,
} from "@/lib/osm/oauth";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const returnTo =
    sanitizeReturnTo(cookieStore.get(OSM_RETURN_TO_COOKIE)?.value || null) ||
    "/";

  const redirectBack = (error: string | null) => {
    const response = new NextResponse(null, { status: 307 });
    response.headers.set("Location", relativeRedirectTarget(returnTo, error));
    clearTempCookies(response);
    return response;
  };

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const expectedState = cookieStore.get(OSM_STATE_COOKIE)?.value;
  const codeVerifier = cookieStore.get(OSM_VERIFIER_COOKIE)?.value;

  if (
    !code ||
    !state ||
    !expectedState ||
    state !== expectedState ||
    !codeVerifier
  ) {
    return redirectBack("invalid_state");
  }

  if (request.nextUrl.searchParams.get("error")) {
    return redirectBack("access_denied");
  }

  try {
    const accessToken = await exchangeCodeForToken({
      code,
      redirectUri: getCallbackUrl(
        getRequestOrigin(request.headers, request.nextUrl.origin),
      ),
      codeVerifier,
    });
    const response = redirectBack(null);
    response.cookies.set(OSM_TOKEN_COOKIE, accessToken, tokenCookieOptions());
    return response;
  } catch (error) {
    console.error("OSM token exchange failed:", error);
    return redirectBack("token_exchange");
  }
}

function clearTempCookies(response: NextResponse) {
  const options = oauthTempCookieOptions();
  response.cookies.set(OSM_STATE_COOKIE, "", { ...options, maxAge: 0 });
  response.cookies.set(OSM_VERIFIER_COOKIE, "", { ...options, maxAge: 0 });
  response.cookies.set(OSM_RETURN_TO_COOKIE, "", { ...options, maxAge: 0 });
}
