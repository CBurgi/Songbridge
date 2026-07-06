import { Platforms } from "./objects";
import { init, credentialsProvider } from "@tidal-music/auth"
import { LocalStorage } from 'node-localstorage';
globalThis.localStorage = new LocalStorage('./scratch');

require('dotenv').config({ path: '/.env' });

interface bearerToken {
  platform: string;
  tokenURL: string;
  clientId: string;
  clientSecret: string;
  token: string;
  expiry: number;
  refreshing: Promise<void> | null;
};
const bearerTokens: Array<bearerToken> = [
  {
    platform: Platforms.spotify,
    tokenURL: "https://accounts.spotify.com/api/token",
    clientId: process.env.SPOTIFY_CLIENT_ID ?? '',
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? '',
    token: '',
    expiry: 0,
    refreshing: null,
  },
  {
    platform: Platforms.tidal,
    tokenURL: "https://auth.tidal.com/v1/oauth2/token",
    clientId: process.env.TIDAL_CLIENT_ID ?? '',
    clientSecret: process.env.TIDAL_CLIENT_SECRET ?? '',
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
    let json = {
      access_token: '',
      expires_in: 0,
    }
    switch (platform) {
      case Platforms.spotify:
        const reqBody = {
          client_id: b.clientId,
          client_secret: b.clientSecret,
          grant_type: 'client_credentials'
        }
        const res_spotify = await fetch(b.tokenURL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: Object.entries(reqBody).map(([key, val]) => `${key}=${val}`).join('&'),
        });
        if (!res_spotify.ok) throw new Error(`${platform} token refresh failed: ` + res_spotify.status);
        json = await res_spotify.json();
        break;
      case Platforms.tidal:
        await init({
          clientId: b.clientId,
          clientSecret: b.clientSecret,
          credentialsStorageKey: 'clientCredentials'
        })
        const res_tidal = await credentialsProvider.getCredentials()
        console.log(res_tidal);
        
        break;

      default:
        throw new Error(`${platform} is not supported.`);
    }

    setToken(platform, json.access_token, json.expires_in);
  } catch (err) {
    clearToken(platform);
    throw err;
  }
}
