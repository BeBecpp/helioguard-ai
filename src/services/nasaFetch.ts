const CACHE_PREFIX = 'helioguard_nasa_';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes — reduces repeat hits on refresh

export function getNasaApiKey(): string {
  const key = import.meta.env.VITE_NASA_API_KEY?.trim();
  return key && key.length > 0 ? key : 'DEMO_KEY';
}

export function isDemoNasaKey(): boolean {
  return getNasaApiKey() === 'DEMO_KEY';
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface CacheEntry<T> {
  at: number;
  data: T;
}

function readCache<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry<T>;
    if (Date.now() - entry.at > CACHE_TTL_MS) {
      sessionStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: T): void {
  try {
    const entry: CacheEntry<T> = { at: Date.now(), data };
    sessionStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
  } catch {
    // sessionStorage full or disabled — ignore
  }
}

export function formatNasaError(status: number): string {
  if (status === 429) {
    return isDemoNasaKey()
      ? 'NASA rate limit (429): DEMO_KEY is shared by many users. Add your own free key at api.nasa.gov — set VITE_NASA_API_KEY in GitHub Secrets or local .env, then redeploy. Wait 1–2 minutes and retry.'
      : 'NASA rate limit (429): too many requests. Wait 1–2 minutes and tap Retry.';
  }
  return `NASA API failed (${status})`;
}

/** Fetch NASA JSON with session cache, retry on 429, and polite delays for DEMO_KEY. */
export async function nasaFetchJson<T>(url: string, cacheKey: string): Promise<T> {
  const cached = readCache<T>(cacheKey);
  if (cached) return cached;

  const maxAttempts = isDemoNasaKey() ? 3 : 2;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    if (attempt > 0) {
      await sleep(isDemoNasaKey() ? 2500 * attempt : 1200 * attempt);
    }

    const response = await fetch(url);

    if (response.status === 429) {
      lastError = new Error(formatNasaError(429));
      continue;
    }

    if (!response.ok) {
      throw new Error(formatNasaError(response.status));
    }

    const data = (await response.json()) as T;
    writeCache(cacheKey, data);
    return data;
  }

  throw lastError ?? new Error(formatNasaError(429));
}

/** Space requests apart — DEMO_KEY allows ~30 req/hour shared globally. */
export async function nasaThrottleGap(): Promise<void> {
  await sleep(isDemoNasaKey() ? 900 : 300);
}
