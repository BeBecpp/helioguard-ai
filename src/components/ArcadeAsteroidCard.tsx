import { ExternalLink } from 'lucide-react';
import { PixelAsteroid } from './PixelAsteroid';
import type { AsteroidRiskResult, RiskLevel } from '../types/nasa';
import { formatMissDistance } from '../utils/spaceWeatherRisk';

interface ArcadeAsteroidCardProps {
  asteroid: AsteroidRiskResult;
}

const LEVEL_COLORS: Record<RiskLevel, string> = {
  LOW: 'level-low',
  MODERATE: 'level-moderate',
  ELEVATED: 'level-elevated',
  HIGH: 'level-high',
};

export function ArcadeAsteroidCard({ asteroid }: ArcadeAsteroidCardProps) {
  const levelClass = LEVEL_COLORS[asteroid.level];

  return (
    <article className={`arcade-asteroid-card arcade-panel compact-card ${levelClass}`}>
      <div className="arcade-asteroid-header">
        <PixelAsteroid size={24} />
        <h3 className="arcade-asteroid-name">{asteroid.name}</h3>
        <span className={`arcade-risk-score ${levelClass}`}>{asteroid.score}/100</span>
      </div>

      <div className="arcade-asteroid-meta">
        <span className={`risk-pill risk-pill-glow ${levelClass}`}>{asteroid.level}</span>
      </div>

      <dl className="arcade-asteroid-stats compact-stats">
        <div className="arcade-stat">
          <dt>Approach</dt>
          <dd>{asteroid.closeApproachDate}</dd>
        </div>
        <div className="arcade-stat">
          <dt>Diameter</dt>
          <dd>{asteroid.diameterMeters.toLocaleString()} m</dd>
        </div>
        <div className="arcade-stat">
          <dt>Miss</dt>
          <dd>{formatMissDistance(asteroid.missDistanceLunar, asteroid.missDistanceKm)}</dd>
        </div>
      </dl>

      <a
        href={asteroid.neo.nasa_jpl_url}
        target="_blank"
        rel="noopener noreferrer"
        className="arcade-details-link"
      >
        NASA/JPL Details
        <ExternalLink size={11} aria-hidden="true" />
      </a>
    </article>
  );
}
