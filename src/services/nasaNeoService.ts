import type { AsteroidRiskResult, NeoFeedResponse, NearEarthObject } from '../types/nasa';
import { aggregateAsteroidRisk, buildAsteroidRiskResult } from '../utils/asteroidRisk';
import { getNasaApiKey, nasaFetchJson } from './nasaFetch';

const NEO_BASE = 'https://api.nasa.gov/neo/rest/v1/feed';

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function getDateRange(): { startDate: string; endDate: string } {
  const start = new Date();
  const end = new Date();
  end.setDate(end.getDate() + 7);
  return { startDate: formatDate(start), endDate: formatDate(end) };
}

function flattenNeoFeed(response: NeoFeedResponse): NearEarthObject[] {
  const all: NearEarthObject[] = [];
  for (const dateKey of Object.keys(response.near_earth_objects).sort()) {
    all.push(...response.near_earth_objects[dateKey]);
  }
  const seen = new Set<string>();
  return all.filter((neo) => {
    if (seen.has(neo.id)) return false;
    seen.add(neo.id);
    return true;
  });
}

export async function fetchNeoFeed(): Promise<NeoFeedResponse> {
  const apiKey = getNasaApiKey();
  const { startDate, endDate } = getDateRange();
  const url = `${NEO_BASE}?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
  const cacheKey = `neo_${startDate}_${endDate}`;

  return nasaFetchJson<NeoFeedResponse>(url, cacheKey);
}

export async function fetchAsteroidRiskData(limit = 10): Promise<{
  results: AsteroidRiskResult[];
  aggregateScore: number;
  dateRange: { startDate: string; endDate: string };
}> {
  const dateRange = getDateRange();
  const feed = await fetchNeoFeed();
  const neos = flattenNeoFeed(feed);

  const results = neos
    .map(buildAsteroidRiskResult)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return {
    results,
    aggregateScore: aggregateAsteroidRisk(neos.map(buildAsteroidRiskResult)),
    dateRange,
  };
}

export { getDateRange };
