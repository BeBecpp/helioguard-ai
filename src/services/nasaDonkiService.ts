import type { SpaceWeatherEvent } from '../types/nasa';
import { calculateEventSeverity } from '../utils/spaceWeatherRisk';

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
  const apiKey = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
  const { startDate, endDate } = getDonkiRange();
  const url = `${DONKI_BASE}${path}?startDate=${startDate}&endDate=${endDate}&api_key=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`DONKI ${path} failed (${response.status})`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
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

export async function fetchSpaceWeatherEvents(): Promise<{
  events: SpaceWeatherEvent[];
  unavailable: boolean;
  error?: string;
}> {
  try {
    const [notifications, cmes, flares] = await Promise.allSettled([
      fetchDonki<DonkiNotification>('/notifications'),
      fetchDonki<DonkiCme>('/CME'),
      fetchDonki<DonkiFlare>('/FLR'),
    ]);

    const events: SpaceWeatherEvent[] = [];

    if (notifications.status === 'fulfilled') {
      events.push(...mapNotifications(notifications.value));
    }
    if (cmes.status === 'fulfilled') {
      events.push(...mapCme(cmes.value));
    }
    if (flares.status === 'fulfilled') {
      events.push(...mapFlares(flares.value));
    }

    const allFailed =
      notifications.status === 'rejected' &&
      cmes.status === 'rejected' &&
      flares.status === 'rejected';

    if (allFailed) {
      return {
        events: [],
        unavailable: true,
        error: 'All DONKI endpoints unavailable',
      };
    }

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
