import { Platforms } from "./objects";

require('dotenv').config({ path: '/.env' });

interface bearerToken {
  platform: string;
  tokenURL: string;
  clientId: string | undefined;
  clientSecret: string | undefined;
  token: string;
  expiry: number;
  refreshing: Promise<void> | null;
};
const bearerTokens: Array<bearerToken> = [
  {
    platform: Platforms.spotify,
    tokenURL: "https://accounts.spotify.com/api/token",
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    token: '',
    expiry: 0,
    refreshing: null,
  },
]

const TOKEN_MARGIN_MS = 30_000;

function getBearer(platform: string): bearerToken {
  try {
    const b = bearerTokens.find((t) => t.platform === platform);
    if (!b) throw new Error('Could not find platform');
    return b;
  } catch (err) {
    throw err;
  }
}

export async function getToken(platform: string): Promise<string | boolean> {
  const b = getBearer(platform);
  const now = Date.now();
  if (b.token && b.expiry - TOKEN_MARGIN_MS > now) return b.token;

  if (!b.refreshing) {
    b.refreshing = refreshToken(platform).finally(() => { b.refreshing = null; });
  }

  await b.refreshing;
  if (process.env.LOG_API_REQUESTS === '1') {
    console.log(b.token);
  }

  return b.token;
}

export function setToken(platform: string, token: string, expiresInMillis: number): void {
  const b = getBearer(platform);
  b.token = token;
  b.expiry = Date.now() + expiresInMillis;
}

export function clearToken(platform: string): void {
  const b = getBearer(platform);
  b.token = '';
  b.expiry = 0;
}

async function refreshToken(platform: string): Promise<void> {
  const b = getBearer(platform);
  try {
    const reqBody = {
      client_id: b.clientId,
      client_secret: b.clientSecret,
      grant_type: 'client_credentials'
    }
    const res = await fetch(b.tokenURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: Object.entries(reqBody).map(([key, val]) => `${key}=${val}`).join('&'),
    });

    if (!res.ok) throw new Error('Token refresh failed: ' + res.status);
    const json = await res.json();
    setToken(platform, json.access_token, json.expires_in);
  } catch (err) {
    clearToken(platform);
    throw err;
  }
}
