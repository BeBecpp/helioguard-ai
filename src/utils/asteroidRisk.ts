import type { AsteroidRiskResult, NearEarthObject, RiskLevel } from '../types/nasa';
import { clamp, inverseNormalizeRange, normalizeRange } from './normalize';

export function getRiskLevel(score: number): RiskLevel {
  if (score >= 75) return 'HIGH';
  if (score >= 50) return 'ELEVATED';
  if (score >= 25) return 'MODERATE';
  return 'LOW';
}

export function calculateAsteroidRisk(neo: NearEarthObject): number {
  const approach = neo.close_approach_data[0];
  if (!approach) return 0;

  const diameterMeters =
    (neo.estimated_diameter.meters.estimated_diameter_min +
      neo.estimated_diameter.meters.estimated_diameter_max) /
    2;

  const velocityKmS = parseFloat(approach.relative_velocity.kilometers_per_second);
  const missDistanceLunar = parseFloat(approach.miss_distance.lunar);
  const hazardousFlag = neo.is_potentially_hazardous_asteroid ? 1 : 0;

  const sDiameter = normalizeRange(diameterMeters, 0, 1000);
  const sVelocity = normalizeRange(velocityKmS, 0, 40);
  const sDistance = inverseNormalizeRange(missDistanceLunar, 0, 20);
  const h = hazardousFlag;

  const raw = 0.3 * sDiameter + 0.2 * sVelocity + 0.35 * sDistance + 0.15 * h;
  return Math.round(100 * clamp(raw, 0, 1));
}

export function buildAsteroidRiskResult(neo: NearEarthObject): AsteroidRiskResult {
  const approach = neo.close_approach_data[0];
  const score = calculateAsteroidRisk(neo);

  const diameterMeters =
    (neo.estimated_diameter.meters.estimated_diameter_min +
      neo.estimated_diameter.meters.estimated_diameter_max) /
    2;

  return {
    neoId: neo.id,
    name: neo.name.replace(/[()]/g, '').trim(),
    score,
    level: getRiskLevel(score),
    closeApproachDate: approach?.close_approach_date ?? 'Unknown',
    diameterMeters: Math.round(diameterMeters),
    velocityKmS: parseFloat(approach?.relative_velocity.kilometers_per_second ?? '0'),
    missDistanceLunar: parseFloat(approach?.miss_distance.lunar ?? '0'),
    missDistanceKm: parseFloat(approach?.miss_distance.kilometers ?? '0'),
    isPotentiallyHazardous: neo.is_potentially_hazardous_asteroid,
    neo,
  };
}

export function aggregateAsteroidRisk(results: AsteroidRiskResult[]): number {
  if (results.length === 0) return 0;
  const sorted = [...results].sort((a, b) => b.score - a.score);
  const topThree = sorted.slice(0, 3);
  const avg = topThree.reduce((sum, r) => sum + r.score, 0) / topThree.length;
  return Math.round(avg);
}
