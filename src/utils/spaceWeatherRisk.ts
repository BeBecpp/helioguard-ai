import type { SpaceWeatherEvent } from '../types/nasa';
import { clamp, normalizeRange } from './normalize';

const LUNAR_KM = 384400;

export function calculateEventSeverity(event: SpaceWeatherEvent): number {
  const baseByType: Record<SpaceWeatherEvent['type'], number> = {
    CME: 70,
    FLR: 55,
    GST: 45,
    RBE: 35,
    OTHER: 25,
  };

  const base = baseByType[event.type] ?? 25;
  const textBoost = /X-class|M5|strong|major|severe/i.test(event.description) ? 15 : 0;
  return clamp(base + textBoost, 0, 100);
}

export function calculateSpaceWeatherRisk(events: SpaceWeatherEvent[]): number {
  if (events.length === 0) return 8;

  const scores = events.map((e) => e.severityScore || calculateEventSeverity(e));
  const maxScore = Math.max(...scores);
  const avgTop = scores.sort((a, b) => b - a).slice(0, 3);
  const blended =
    avgTop.reduce((sum, s) => sum + s, 0) / avgTop.length * 0.4 + maxScore * 0.6;

  return Math.round(clamp(blended, 0, 100));
}

export function getFallbackSpaceWeatherRisk(): number {
  return 8;
}

export function formatMissDistance(lunar: number, km: number): string {
  if (lunar < 1) {
    return `${lunar.toFixed(3)} LD (${Math.round(km).toLocaleString()} km)`;
  }
  return `${lunar.toFixed(2)} LD (${Math.round(km).toLocaleString()} km)`;
}

export { LUNAR_KM, normalizeRange };
