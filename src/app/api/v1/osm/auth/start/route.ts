import { NextRequest, NextResponse } from "next/server";
import {
  buildAuthorizeUrl,
  createPkcePair,
  createState,
  getCallbackUrl,
  getOsmConfig,
  sanitizeReturnTo,
  storePendingAuth,
} from "@/lib/osm/oauth";

export async function GET(request: NextRequest) {
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

  storePendingAuth(state, verifier, returnTo);

  return NextResponse.redirect(
    buildAuthorizeUrl({
      redirectUri: getCallbackUrl(request.nextUrl.origin),
      state,
      codeChallenge: challenge,
    }),
  );
}
