import { createHash, randomBytes } from "node:crypto";

const DEFAULT_SERVER_URL = "https://www.openstreetmap.org";

export const OSM_SERVER_URL = (
  process.env.OSM_SERVER_URL || DEFAULT_SERVER_URL
).replace(/\/+$/, "");

export const OSM_TOKEN_COOKIE = "osm_access_token";
export const OSM_STATE_COOKIE = "osm_oauth_state";
export const OSM_VERIFIER_COOKIE = "osm_oauth_verifier";
export const OSM_RETURN_TO_COOKIE = "osm_return_to";

const OSM_SCOPES = ["write_api", "read_prefs"];
const TEMP_COOKIE_MAX_AGE = 600;

export interface OsmConfig {
  clientId: string;
  clientSecret: string;
  appOrigin: string;
}

export function getOsmConfig(): OsmConfig {
  const clientId = process.env.OSM_CLIENT_ID;
  const clientSecret = process.env.OSM_CLIENT_SECRET;
  const appOrigin = process.env.APP_ORIGIN?.replace(/\/+$/, "");
  if (!clientId || !clientSecret || !appOrigin) {
    throw new Error(
      "OSM OAuth is not configured: set OSM_CLIENT_ID, OSM_CLIENT_SECRET and APP_ORIGIN",
    );
  }
  return { clientId, clientSecret, appOrigin };
}

export function getCallbackUrl(): string {
  return `${getAppOrigin()}/api/v1/osm/auth/callback`;
}

export function sanitizeReturnTo(returnTo: string | null): string | null {
  if (!returnTo || !returnTo.startsWith("/")) {
    return null;
  }
  if (returnTo.startsWith("//") || returnTo.includes("\\")) {
    return null;
  }
  return returnTo;
}

export function createPkcePair(): { verifier: string; challenge: string } {
  const verifier = randomBytes(32).toString("base64url");
  const challenge = createHash("sha256").update(verifier).digest("base64url");
  return { verifier, challenge };
}

export function createState(): string {
  return randomBytes(16).toString("hex");
}

interface CookieBase {
  httpOnly: true;
  sameSite: "lax";
  secure: true;
}

function cookieBase(): CookieBase {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
  };
}

export function tokenCookieOptions() {
  return { ...cookieBase(), path: "/" };
}

export function oauthTempCookieOptions() {
  return {
    ...cookieBase(),
    maxAge: TEMP_COOKIE_MAX_AGE,
    path: "/api/v1/osm/auth",
  };
}

export function getAppOrigin(): string {
  const appOrigin = process.env.APP_ORIGIN?.replace(/\/+$/, "");
  if (!appOrigin) {
    throw new Error("APP_ORIGIN is not set");
  }
  return appOrigin;
}

export function relativeRedirectTarget(
  returnTo: string,
  error: string | null,
): string {
  const url = new URL(returnTo, "http://internal");
  if (error) {
    url.searchParams.set("osm_auth_error", error);
  }
  return `${url.pathname}${url.search}`;
}

export function buildAuthorizeUrl(params: {
  redirectUri: string;
  state: string;
  codeChallenge: string;
}): string {
  const url = new URL("/oauth2/authorize", OSM_SERVER_URL);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", getOsmConfig().clientId);
  url.searchParams.set("redirect_uri", params.redirectUri);
  url.searchParams.set("scope", OSM_SCOPES.join(" "));
  url.searchParams.set("state", params.state);
  url.searchParams.set("code_challenge", params.codeChallenge);
  url.searchParams.set("code_challenge_method", "S256");
  return url.toString();
}

export async function exchangeCodeForToken(params: {
  code: string;
  redirectUri: string;
  codeVerifier: string;
}): Promise<string> {
  const response = await fetch(`${OSM_SERVER_URL}/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: params.code,
      redirect_uri: params.redirectUri,
      client_id: getOsmConfig().clientId,
      client_secret: getOsmConfig().clientSecret,
      code_verifier: params.codeVerifier,
    }),
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(
      `OSM token exchange failed with status ${response.status}: ${detail}`,
    );
  }
  const data = await response.json();
  const accessToken = data?.access_token;
  if (typeof accessToken !== "string" || accessToken.length === 0) {
    throw new Error("OSM token endpoint did not return an access token");
  }
  return accessToken;
}

export interface OsmUser {
  id: number;
  displayName: string;
}

export async function fetchOsmUser(accessToken: string): Promise<OsmUser> {
  const response = await fetch(`${OSM_SERVER_URL}/api/0.6/user/details.json`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    throw new Error(`OSM user details failed with status ${response.status}`);
  }
  const data = await response.json();
  const user = data?.user;
  if (!user || typeof user.display_name !== "string") {
    throw new Error("Unexpected OSM user details payload");
  }
  return { id: Number(user.id), displayName: user.display_name };
}
