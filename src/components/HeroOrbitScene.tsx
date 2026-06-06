import { PixelRocket } from './PixelRocket';
import { PixelEarth } from './PixelEarth';
import { PixelSatellite } from './PixelSatellite';
import { PixelAsteroid } from './PixelAsteroid';
import type { HelioGuardIndexResult, RiskLevel } from '../types/nasa';

const LEVEL_CLASS: Record<RiskLevel, string> = {
  LOW: 'level-low',
  MODERATE: 'level-moderate',
  ELEVATED: 'level-elevated',
  HIGH: 'level-high',
};

interface HeroOrbitSceneProps {
  indexPreview?: HelioGuardIndexResult | null;
  indexLoading?: boolean;
}

export function HeroOrbitScene({ indexPreview, indexLoading }: HeroOrbitSceneProps) {
  const levelClass = indexPreview ? LEVEL_CLASS[indexPreview.level] : 'level-low';

  return (
    <div className="hero-orbit-scene" aria-hidden="false">
      <svg className="hero-orbit-ring" viewBox="0 0 280 280" fill="none">
        <ellipse
          cx="140"
          cy="140"
          rx="120"
          ry="50"
          stroke="rgba(56,189,248,0.25)"
          strokeWidth="1"
          strokeDasharray="6 8"
          className="hero-orbit-path"
        />
        <circle cx="220" cy="100" r="4" fill="#fb7185" className="hero-asteroid-dot" />
      </svg>

      <div className="hero-scene-earth">
        <PixelEarth size={40} />
      </div>
      <div className="hero-scene-satellite">
        <PixelSatellite size={28} />
      </div>
      <div className="hero-scene-asteroid">
        <PixelAsteroid size={20} />
      </div>
      <div className="hero-scene-rocket">
        <PixelRocket />
      </div>

      <div className="hero-mission-status">
        <div className="status-panel-header">
          <span className="status-dot" />
          Mission Status
        </div>
        {indexLoading || !indexPreview ? (
          <p className="status-loading">Linking NASA feeds…</p>
        ) : (
          <>
            <div className={`status-index ${levelClass}`}>
              <span className="status-index-value">{indexPreview.score}</span>
              <span className="status-index-label">HelioGuard Index</span>
            </div>
            <span className={`risk-pill risk-pill-glow ${levelClass}`}>
              {indexPreview.level}
            </span>
            <p className="status-sub">
              Asteroid {indexPreview.asteroidRiskScore} · Weather{' '}
              {indexPreview.spaceWeatherRiskScore}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
