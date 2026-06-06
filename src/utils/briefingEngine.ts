import type { MissionBriefingInput, RiskLevel } from '../types/nasa';

function situationWord(level: RiskLevel): string {
  switch (level) {
    case 'HIGH':
      return 'elevated attention is warranted';
    case 'ELEVATED':
      return 'heightened monitoring is recommended';
    case 'MODERATE':
      return 'routine monitoring is sufficient';
    default:
      return 'conditions appear calm';
  }
}

function techImpact(level: RiskLevel, spaceWeatherScore: number): string {
  if (level === 'HIGH' || spaceWeatherScore >= 60) {
    return 'Satellite operators, aviation HF communications, and power-grid managers should review official NOAA Space Weather alerts.';
  }
  if (level === 'ELEVATED' || spaceWeatherScore >= 35) {
    return 'Minor impacts to satellite operations and high-frequency radio may be possible; consult official NOAA sources for details.';
  }
  return 'No significant impacts to Earth technology are indicated by this educational model at current levels.';
}

export function generateMissionBriefing(input: MissionBriefingInput): string {
  const {
    helioGuardIndex,
    helioGuardLevel,
    asteroidRiskScore,
    spaceWeatherRiskScore,
    topAsteroid,
    spaceWeatherEvents,
    spaceWeatherUnavailable,
  } = input;

  const topName = topAsteroid?.name ?? 'no dominant near-Earth object';
  const topScore = topAsteroid?.score ?? 0;
  const topDate = topAsteroid?.closeApproachDate ?? 'N/A';
  const hazardousNote = topAsteroid?.isPotentiallyHazardous
    ? ' NASA classifies this object as potentially hazardous.'
    : '';

  const weatherLine = spaceWeatherUnavailable
    ? 'Space weather data from NASA DONKI is temporarily unavailable; a conservative fallback score is applied.'
    : spaceWeatherEvents.length === 0
      ? 'Current space weather activity appears limited in the selected monitoring window.'
      : `${spaceWeatherEvents.length} space weather event(s) detected, including ${spaceWeatherEvents[0]?.title ?? 'recent activity'}.`;

  const paragraphs = [
    `Mission Briefing:`,
    `Today's HelioGuard Index is ${helioGuardLevel} (${helioGuardIndex}/100). Composite risk combines asteroid proximity data (${asteroidRiskScore}/100) and space weather indicators (${spaceWeatherRiskScore}/100).`,
    `NASA NeoWs data shows near-Earth objects transiting this week. The highest-attention object is ${topName} (risk score ${topScore}/100, closest approach ${topDate}).${hazardousNote} All listed objects pass at safe miss distances per NASA telemetry.`,
    weatherLine,
    `Overall assessment: ${situationWord(helioGuardLevel)}. ${techImpact(helioGuardLevel, spaceWeatherRiskScore)}`,
    `This dashboard is educational and uses NASA public/open data. It is not an official NASA product or emergency alert system. For operational decisions, refer to NASA, NOAA, and government sources.`,
  ];

  return paragraphs.join('\n\n');
}

export function calculateHelioGuardIndex(
  asteroidRisk: number,
  spaceWeatherRisk: number,
): { score: number; explanation: string } {
  const score = Math.round(0.45 * asteroidRisk + 0.55 * spaceWeatherRisk);
  const explanation =
    `HelioGuard Index = 0.45 × AsteroidRisk (${asteroidRisk}) + 0.55 × SpaceWeatherRisk (${spaceWeatherRisk}) = ${score}. ` +
    'Weighted toward space weather because solar events can affect global technology infrastructure.';
  return { score, explanation };
}
