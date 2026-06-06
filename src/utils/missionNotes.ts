import type { RiskLevel } from '../types/nasa';

const ASTEROID_NOTES: Record<RiskLevel, string> = {
  LOW: 'Safe flyby for educational monitoring.',
  MODERATE: 'Worth watching because of size, speed, or NASA hazard flag.',
  ELEVATED: 'Higher attention object in today\'s dataset.',
  HIGH: 'Strong attention signal. Check official sources.',
};

export function getAsteroidMissionNote(level: RiskLevel): string {
  return ASTEROID_NOTES[level];
}

export function getCrewTakeaway(
  level: RiskLevel,
  asteroidScore: number,
  weatherScore: number,
  studentMode: boolean,
): string {
  if (studentMode) {
    switch (level) {
      case 'HIGH':
        return 'Today\'s data shows the strongest signals in this window. Explore the object reports, then verify with NASA and NOAA for real-world alerts.';
      case 'ELEVATED':
        return 'Some objects or space weather signals deserve extra attention. Use this lab to learn why — not to panic.';
      case 'MODERATE':
        return 'Conditions are normal for learning mode. Compare asteroid size, speed, and miss distance on each object report.';
      default:
        return 'Mission systems look calm. Great day to explore how NASA tracks near-Earth objects safely.';
    }
  }

  if (level === 'HIGH' || level === 'ELEVATED') {
    return `Composite index reflects elevated signals (asteroid ${asteroidScore}/100, space weather ${weatherScore}/100). Review object reports and cross-check official NASA/NOAA sources.`;
  }
  if (level === 'MODERATE') {
    return `Mixed signals in today's window. Asteroid layer at ${asteroidScore}/100, space weather at ${weatherScore}/100 — suitable for guided study.`;
  }
  return `Low composite activity today. Asteroid ${asteroidScore}/100, space weather ${weatherScore}/100. Ideal for exploring how the risk engine works.`;
}
