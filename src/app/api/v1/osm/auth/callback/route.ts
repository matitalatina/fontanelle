import { NextRequest, NextResponse } from "next/server";
import {
  OSM_TOKEN_COOKIE,
  exchangeCodeForToken,
  getCallbackUrl,
  takePendingAuth,
  tokenCookieOptions,
} from "@/lib/osm/oauth";

export async function GET(request: NextRequest) {
  const redirectBack = (returnTo: string, error: string | null) => {
    const url = new URL(returnTo, request.nextUrl.origin);
    if (error) {
      url.searchParams.set("osm_auth_error", error);
    }
    return NextResponse.redirect(url);
  };

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const pending = takePendingAuth(state);

  if (!code || !pending) {
    return redirectBack("/", "invalid_state");
  }

  if (request.nextUrl.searchParams.get("error")) {
    return redirectBack(pending.returnTo, "access_denied");
  }

  try {
    const accessToken = await exchangeCodeForToken({
      code,
      redirectUri: getCallbackUrl(request.nextUrl.origin),
      codeVerifier: pending.codeVerifier,
    });
    const response = redirectBack(pending.returnTo, null);
    response.cookies.set(OSM_TOKEN_COOKIE, accessToken, tokenCookieOptions());
    return response;
  } catch (error) {
    console.error("OSM token exchange failed:", error);
    return redirectBack(pending.returnTo, "token_exchange");
  }
}
