import { Activity, Moon, Sun } from 'lucide-react';
import { PixelFrame } from './PixelFrame';
import { FormulaToggle } from './FormulaToggle';
import { EducationalNote } from './EducationalNote';
import type { HelioGuardIndexResult, RiskLevel } from '../types/nasa';

interface MissionRiskConsoleProps {
  data: HelioGuardIndexResult;
  loading?: boolean;
  studentMode?: boolean;
}

const LEVEL_COLORS: Record<RiskLevel, string> = {
  LOW: 'level-low',
  MODERATE: 'level-moderate',
  ELEVATED: 'level-elevated',
  HIGH: 'level-high',
};

const TICKS = [0, 25, 50, 75, 100];

export function MissionRiskConsole({ data, loading, studentMode }: MissionRiskConsoleProps) {
  if (loading) {
    return (
      <PixelFrame accent="cyan" className="glass-card risk-console loading-card">
        <div className="loading-shimmer" />
        <p className="loading-text">Running risk engine…</p>
      </PixelFrame>
    );
  }

  const levelClass = LEVEL_COLORS[data.level];
  const summary = studentMode
    ? `Today's combined space risk score is ${data.score} out of 100 (${data.level}). Lower is calmer.`
    : data.explanation;

  return (
    <section className="mission-console-section" aria-labelledby="risk-console-heading">
      <div className="section-intro section-intro-left">
        <span className="section-kicker">Risk Engine</span>
        <h2 id="risk-console-heading">Mission Risk Console</h2>
        <p className="section-lead">
          Live instrument panel for the HelioGuard Index — your mission&apos;s main risk dial.
        </p>
      </div>

      <PixelFrame accent="cyan" className={`glass-card risk-console ${levelClass} console-glow`}>
        <div className="console-header">
          <span className="console-label">Mission Status</span>
          <span className={`risk-pill risk-pill-glow ${levelClass}`}>{data.level}</span>
        </div>

        <div className="console-main">
          <div className={`console-gauge ${levelClass}`}>
            <div className="gauge-ticks">
              {TICKS.map((t) => (
                <span key={t} className="gauge-tick" style={{ left: `${t}%` }}>
                  {t}
                </span>
              ))}
            </div>
            <div className="gauge-track">
              <div className="gauge-fill" style={{ width: `${data.score}%` }} />
              <div className="gauge-needle" style={{ left: `${data.score}%` }} />
            </div>
            <div className="gauge-readout">
              <span className="gauge-score">{data.score}</span>
              <span className="gauge-max">/100</span>
            </div>
            <p className="gauge-caption">HelioGuard Index</p>
          </div>

          <div className="console-channels">
            <div className="channel">
              <Moon size={16} />
              <div className="channel-head">
                <span className="data-label">Asteroid Risk</span>
                <span className="channel-value">{data.asteroidRiskScore}/100</span>
              </div>
              <div className="mini-bar mini-bar-pixel">
                <div
                  className="mini-bar-fill asteroid-fill"
                  style={{ width: `${data.asteroidRiskScore}%` }}
                />
              </div>
            </div>
            <div className="channel">
              <Sun size={16} />
              <div className="channel-head">
                <span className="data-label">Space Weather Risk</span>
                <span className="channel-value">{data.spaceWeatherRiskScore}/100</span>
              </div>
              <div className="mini-bar mini-bar-pixel">
                <div
                  className="mini-bar-fill weather-fill"
                  style={{ width: `${data.spaceWeatherRiskScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <p className="console-summary">
          <Activity size={14} />
          {summary}
        </p>

        <FormulaToggle studentMode={studentMode} />

        <EducationalNote
          title="What does this mean?"
          studentMode={studentMode}
          simpleText="The HelioGuard Index blends asteroid flyby data and space weather into one number so you can compare today's space environment at a glance. It teaches risk thinking — it does not predict impacts."
        >
          The index weights space weather slightly higher because solar storms can affect satellites
          and power grids even when asteroids pass safely. All scores are educational models built
          from NASA public data.
        </EducationalNote>
      </PixelFrame>
    </section>
  );
}

/** @deprecated Use MissionRiskConsole — kept for imports */
export { MissionRiskConsole as RiskIndexCard };
