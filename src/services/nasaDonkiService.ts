import type { SpaceWeatherEvent } from '../types/nasa';
import { calculateEventSeverity } from '../utils/spaceWeatherRisk';
import { getNasaApiKey, nasaFetchJson, nasaThrottleGap } from './nasaFetch';

const DONKI_BASE = 'https://api.nasa.gov/DONKI';

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function getDonkiRange(): { startDate: string; endDate: string } {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 7);
  return { startDate: formatDate(start), endDate: formatDate(end) };
}

interface DonkiNotification {
  messageBody?: string;
  messageType?: string;
  messageURL?: string;
  messageID?: string;
}

interface DonkiCme {
  activityID?: string;
  startTime?: string;
  note?: string;
  sourceLocation?: string;
  link?: string;
}

interface DonkiFlare {
  flrID?: string;
  beginTime?: string;
  classType?: string;
  sourceLocation?: string;
  link?: string;
  note?: string;
}

async function fetchDonki<T>(path: string): Promise<T[]> {
  const apiKey = getNasaApiKey();
  const { startDate, endDate } = getDonkiRange();
  const url = `${DONKI_BASE}${path}?startDate=${startDate}&endDate=${endDate}&api_key=${apiKey}`;
  const cacheKey = `donki_${path}_${startDate}_${endDate}`;

  try {
    return await nasaFetchJson<T[]>(url, cacheKey);
  } catch {
    return [];
  }
}

function mapNotifications(items: DonkiNotification[]): SpaceWeatherEvent[] {
  return items.slice(0, 5).map((item, i) => {
    const event: SpaceWeatherEvent = {
      id: item.messageID ?? `notif-${i}`,
      type: 'OTHER',
      title: item.messageType ?? 'Space Weather Notification',
      startTime: new Date().toISOString(),
      description: item.messageBody ?? 'NASA DONKI notification',
      severityScore: 0,
      source: 'DONKI',
    };
    event.severityScore = calculateEventSeverity(event);
    return event;
  });
}

function mapCme(items: DonkiCme[]): SpaceWeatherEvent[] {
  return items.slice(0, 5).map((item, i) => {
    const event: SpaceWeatherEvent = {
      id: item.activityID ?? `cme-${i}`,
      type: 'CME',
      title: `Coronal Mass Ejection${item.sourceLocation ? ` — ${item.sourceLocation}` : ''}`,
      startTime: item.startTime ?? new Date().toISOString(),
      description: item.note ?? 'Coronal mass ejection detected by NASA DONKI.',
      severityScore: 0,
      source: 'DONKI',
    };
    event.severityScore = calculateEventSeverity(event);
    return event;
  });
}

function mapFlares(items: DonkiFlare[]): SpaceWeatherEvent[] {
  return items.slice(0, 5).map((item, i) => {
    const event: SpaceWeatherEvent = {
      id: item.flrID ?? `flr-${i}`,
      type: 'FLR',
      title: `Solar Flare${item.classType ? ` — Class ${item.classType}` : ''}`,
      startTime: item.beginTime ?? new Date().toISOString(),
      description: item.note ?? `Solar flare detected${item.sourceLocation ? ` at ${item.sourceLocation}` : ''}.`,
      severityScore: 0,
      source: 'DONKI',
    };
    event.severityScore = calculateEventSeverity(event);
    return event;
  });
}

/** Sequential DONKI calls to avoid bursting DEMO_KEY rate limits. */
export async function fetchSpaceWeatherEvents(): Promise<{
  events: SpaceWeatherEvent[];
  unavailable: boolean;
  error?: string;
}> {
  try {
    const notifications = await fetchDonki<DonkiNotification>('/notifications');
    await nasaThrottleGap();

    const cmes = await fetchDonki<DonkiCme>('/CME');
    await nasaThrottleGap();

    const flares = await fetchDonki<DonkiFlare>('/FLR');

    const events: SpaceWeatherEvent[] = [
      ...mapNotifications(notifications),
      ...mapCme(cmes),
      ...mapFlares(flares),
    ];

    events.sort(
      (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
    );

    return { events: events.slice(0, 8), unavailable: false };
  } catch (err) {
    return {
      events: [],
      unavailable: true,
      error: err instanceof Error ? err.message : 'Unknown DONKI error',
    };
  }
}

export { getDonkiRange };
