import { PixelFrame } from './PixelFrame';
import { FormulaToggle } from './FormulaToggle';
import type { HelioGuardIndexResult, RiskLevel } from '../types/nasa';

interface MissionRiskConsoleProps {
  data: HelioGuardIndexResult;
  loading?: boolean;
  variant?: 'preview' | 'full';
  showFormula?: boolean;
  studentMode?: boolean;
}

const LEVEL_COLORS: Record<RiskLevel, string> = {
  LOW: 'level-low',
  MODERATE: 'level-moderate',
  ELEVATED: 'level-elevated',
  HIGH: 'level-high',
};

function ProgressBar({ value, variant }: { value: number; variant: 'asteroid' | 'weather' }) {
  return (
    <div
      className={`progress-bar progress-bar-${variant}`}
      role="meter"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="progress-bar-fill" style={{ width: `${value}%` }} />
    </div>
  );
}

export function MissionRiskConsole({
  data,
  loading,
  variant = 'preview',
  showFormula = false,
  studentMode = true,
}: MissionRiskConsoleProps) {
  if (loading) {
    return (
      <PixelFrame accent="cyan" className="glass-panel mission-risk-console loading-card">
        <div className="loading-shimmer" />
        <p className="loading-text">Running risk engine…</p>
      </PixelFrame>
    );
  }

  const levelClass = LEVEL_COLORS[data.level];

  return (
    <section className="mission-risk-console-section" aria-labelledby="risk-console-heading">
      <PixelFrame accent="cyan" className={`glass-panel mission-risk-console ${levelClass}`}>
        <div className="hud-panel-header">
          <span className="hud-panel-icon" aria-hidden="true">
            ★
          </span>
          <h2 id="risk-console-heading" className="hud-panel-title">
            Mission Risk Console
          </h2>
          <span className={`hud-level-badge ${levelClass}`}>{data.level}</span>
        </div>

        <div className="hud-index-row">
          <div className={`hud-index-block ${levelClass}`}>
            <span className="hud-label">HelioGuard Index</span>
            <div className="hud-score-display">
              <span className="hud-big-score">{data.score}</span>
              <span className="hud-score-max">/100</span>
            </div>
          </div>

          <div className="hud-breakdown">
            <span className="hud-label">Risk Breakdown</span>
            <div className="hud-bar-row">
              <div className="hud-bar-head">
                <span>Asteroid Risk</span>
                <span>{data.asteroidRiskScore}/100</span>
              </div>
              <ProgressBar value={data.asteroidRiskScore} variant="asteroid" />
            </div>
            <div className="hud-bar-row">
              <div className="hud-bar-head">
                <span>Space Weather Risk</span>
                <span>{data.spaceWeatherRiskScore}/100</span>
              </div>
              <ProgressBar value={data.spaceWeatherRiskScore} variant="weather" />
            </div>
          </div>
        </div>

        {variant === 'full' && data.explanation && (
          <p className="hud-explanation">{data.explanation}</p>
        )}

        {showFormula && <FormulaToggle studentMode={studentMode} />}

        {variant === 'preview' && (
          <p className="hud-footer-tagline">Stay curious. Stay prepared.</p>
        )}
      </PixelFrame>
    </section>
  );
}

/** @deprecated Use MissionRiskConsole */
export { MissionRiskConsole as RiskIndexCard };
