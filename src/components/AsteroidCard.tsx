import { PixelAsteroid } from './PixelAsteroid';
import type { AsteroidRiskResult, RiskLevel } from '../types/nasa';
import { formatMissDistance } from '../utils/spaceWeatherRisk';

interface AsteroidCardProps {
  asteroid: AsteroidRiskResult;
  accent?: 'cyan' | 'purple' | 'orange';
  onViewDetails?: () => void;
}

const LEVEL_COLORS: Record<RiskLevel, string> = {
  LOW: 'level-low',
  MODERATE: 'level-moderate',
  ELEVATED: 'level-elevated',
  HIGH: 'level-high',
};

const ACCENT_CLASS = {
  cyan: 'asteroid-card-cyan',
  purple: 'asteroid-card-purple',
  orange: 'asteroid-card-orange',
} as const;

export function AsteroidCard({ asteroid, accent = 'cyan', onViewDetails }: AsteroidCardProps) {
  const levelClass = LEVEL_COLORS[asteroid.level];

  return (
    <article className={`asteroid-card glass-panel card-hover ${levelClass} ${ACCENT_CLASS[accent]}`}>
      <div className="asteroid-card-top">
        <PixelAsteroid size={22} />
        <h3 className="asteroid-card-name">{asteroid.name}</h3>
      </div>

      <dl className="asteroid-card-stats">
        <div className="asteroid-card-stat">
          <dt>Close Approach</dt>
          <dd>{asteroid.closeApproachDate}</dd>
        </div>
        <div className="asteroid-card-stat">
          <dt>Est. Diameter</dt>
          <dd>{asteroid.diameterMeters.toLocaleString()} m</dd>
        </div>
        <div className="asteroid-card-stat">
          <dt>Miss Distance</dt>
          <dd>{formatMissDistance(asteroid.missDistanceLunar, asteroid.missDistanceKm)}</dd>
        </div>
      </dl>

      <div className="asteroid-card-risk">
        <div>
          <span className="asteroid-card-risk-label">Risk Score</span>
          <span className={`asteroid-card-score ${levelClass}`}>{asteroid.score} / 100</span>
        </div>
        <span className={`risk-pill risk-pill-glow ${levelClass}`}>{asteroid.level}</span>
      </div>

      {onViewDetails ? (
        <button type="button" className="asteroid-card-link" onClick={onViewDetails}>
          View Details →
        </button>
      ) : (
        <a
          href={asteroid.neo.nasa_jpl_url}
          target="_blank"
          rel="noopener noreferrer"
          className="asteroid-card-link"
        >
          View Details →
        </a>
      )}
    </article>
  );
}
