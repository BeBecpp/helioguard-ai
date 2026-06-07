import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { PixelAsteroid } from './PixelAsteroid';
import { getAsteroidMissionNote } from '../utils/missionNotes';
import { formatMissDistance } from '../utils/spaceWeatherRisk';
import type { AsteroidRiskResult, RiskLevel } from '../types/nasa';

const LEVEL_COLORS: Record<RiskLevel, string> = {
  LOW: 'level-low',
  MODERATE: 'level-moderate',
  ELEVATED: 'level-elevated',
  HIGH: 'level-high',
};

interface AsteroidExplorerProps {
  asteroids: AsteroidRiskResult[];
  loading?: boolean;
}

const DEFAULT_VISIBLE = 6;

export function AsteroidExplorer({ asteroids, loading }: AsteroidExplorerProps) {
  const [expanded, setExpanded] = useState(false);

  if (loading && asteroids.length === 0) {
    return (
      <section id="asteroids" className="asteroid-explorer-section">
        <h2 className="section-title">Asteroid Explorer</h2>
        <div className="glass-panel loading-card">
          <div className="loading-shimmer" />
          <p className="loading-text">Loading NEO data…</p>
        </div>
      </section>
    );
  }

  if (asteroids.length === 0) {
    return (
      <section id="asteroids" className="asteroid-explorer-section">
        <h2 className="section-title">Asteroid Explorer</h2>
        <p className="state-box state-empty">No asteroid data available.</p>
      </section>
    );
  }

  const visible = expanded ? asteroids : asteroids.slice(0, DEFAULT_VISIBLE);

  return (
    <section id="asteroids" className="asteroid-explorer-section" aria-labelledby="explorer-heading">
      <div className="section-header-row">
        <h2 id="explorer-heading" className="section-title">
          Asteroid Explorer
        </h2>
        <span className="section-meta">{asteroids.length} objects ranked by risk</span>
      </div>

      <div className="explorer-grid">
        {visible.map((asteroid) => {
          const levelClass = LEVEL_COLORS[asteroid.level];
          return (
            <article
              key={asteroid.neoId}
              className={`explorer-card glass-panel card-hover ${levelClass}`}
            >
              <div className="explorer-card-top">
                <PixelAsteroid size={24} />
                <div>
                  <h3 className="explorer-card-name">{asteroid.name}</h3>
                  {asteroid.isPotentiallyHazardous && (
                    <span className="hazard-badge">Potentially Hazardous</span>
                  )}
                </div>
                <span className={`risk-badge ${levelClass}`}>{asteroid.level}</span>
              </div>

              <dl className="explorer-stats">
                <div>
                  <dt>Close Approach</dt>
                  <dd>{asteroid.closeApproachDate}</dd>
                </div>
                <div>
                  <dt>Est. Diameter</dt>
                  <dd>{asteroid.diameterMeters.toLocaleString()} m</dd>
                </div>
                <div>
                  <dt>Velocity</dt>
                  <dd>{asteroid.velocityKmS.toFixed(2)} km/s</dd>
                </div>
                <div>
                  <dt>Miss Distance</dt>
                  <dd>
                    {formatMissDistance(asteroid.missDistanceLunar, asteroid.missDistanceKm)}
                  </dd>
                </div>
              </dl>

              <div className="explorer-card-footer">
                <div className="explorer-score">
                  <span className="explorer-score-label">Risk Score</span>
                  <span className={`explorer-score-value ${levelClass}`}>
                    {asteroid.score} / 100
                  </span>
                </div>
                <p className="explorer-note">{getAsteroidMissionNote(asteroid.level)}</p>
                <a
                  href={asteroid.neo.nasa_jpl_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="explorer-nasa-link"
                >
                  NASA/JPL Details <ExternalLink size={12} aria-hidden="true" />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {asteroids.length > DEFAULT_VISIBLE && (
        <button
          type="button"
          className="btn-secondary show-more-btn"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? 'Show Less' : `Show More (${asteroids.length - DEFAULT_VISIBLE} more)`}
        </button>
      )}
    </section>
  );
}
