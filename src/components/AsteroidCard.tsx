import { useState } from 'react';
import { AlertOctagon, ExternalLink, HelpCircle } from 'lucide-react';
import { PixelFrame } from './PixelFrame';
import { PixelAsteroid } from './PixelAsteroid';
import { getAsteroidMissionNote } from '../utils/missionNotes';
import type { AsteroidRiskResult, RiskLevel } from '../types/nasa';
import { formatMissDistance } from '../utils/spaceWeatherRisk';

interface AsteroidCardProps {
  asteroid: AsteroidRiskResult;
  studentMode?: boolean;
}

const LEVEL_COLORS: Record<RiskLevel, string> = {
  LOW: 'level-low',
  MODERATE: 'level-moderate',
  ELEVATED: 'level-elevated',
  HIGH: 'level-high',
};

function MiniTip({ label, text }: { label: string; text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="mini-tip">
      <button
        type="button"
        className="mini-tip-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Explain ${label}`}
      >
        <HelpCircle size={12} />
      </button>
      {open && <span className="mini-tip-pop">{text}</span>}
    </span>
  );
}

export function AsteroidCard({ asteroid, studentMode }: AsteroidCardProps) {
  const levelClass = LEVEL_COLORS[asteroid.level];
  const missionNote = getAsteroidMissionNote(asteroid.level);

  return (
    <PixelFrame
      accent="purple"
      className={`glass-card object-report ${levelClass} card-fade-in`}
    >
      <div className="object-report-stamp">Object Report</div>

      <div className="asteroid-card-header">
        <div className="asteroid-name-row">
          <PixelAsteroid size={32} />
          <div>
            <h3>{asteroid.name}</h3>
            <span className="object-id">NEO · Data Signal</span>
          </div>
        </div>
        <span className={`risk-pill risk-pill-glow ${levelClass}`}>{asteroid.level}</span>
      </div>

      <p className="mission-note">
        <span className="mission-note-label">Mission note:</span> {missionNote}
      </p>

      <div className="asteroid-score-row">
        <span className="data-label">Risk Engine Score</span>
        <span className={`asteroid-score score-glow-text ${levelClass}`}>
          {asteroid.score}/100
        </span>
      </div>

      <dl className="asteroid-stats object-stats">
        <div className="stat-row">
          <dt>Close Approach</dt>
          <dd>{asteroid.closeApproachDate}</dd>
        </div>
        <div className="stat-row">
          <dt>Est. Diameter</dt>
          <dd>{asteroid.diameterMeters.toLocaleString()} m</dd>
        </div>
        <div className="stat-row">
          <dt>Relative Velocity</dt>
          <dd>{asteroid.velocityKmS.toFixed(2)} km/s</dd>
        </div>
        <div className="stat-row">
          <dt>
            Miss Distance
            <MiniTip
              label="miss distance"
              text={
                studentMode
                  ? 'How far the asteroid passes from Earth. Larger = safer flyby.'
                  : 'Miss distance in lunar distances (LD) and km. Closer flybys score higher in our educational model.'
              }
            />
          </dt>
          <dd>
            {formatMissDistance(asteroid.missDistanceLunar, asteroid.missDistanceKm)}
          </dd>
        </div>
        <div className="stat-row">
          <dt>
            Potentially Hazardous
            <MiniTip
              label="potentially hazardous"
              text={
                studentMode
                  ? 'NASA label for larger asteroids that can come close to Earth — not a collision warning.'
                  : 'NASA PHA flag: orbital class for monitoring, not a prediction of impact.'
              }
            />
          </dt>
          <dd className={asteroid.isPotentiallyHazardous ? 'hazard-yes' : 'hazard-no'}>
            {asteroid.isPotentiallyHazardous ? (
              <>
                <AlertOctagon size={14} /> Yes
              </>
            ) : (
              'No'
            )}
          </dd>
        </div>
      </dl>

      <a
        href={asteroid.neo.nasa_jpl_url}
        target="_blank"
        rel="noopener noreferrer"
        className="neo-link"
      >
        NASA JPL Details <ExternalLink size={14} />
      </a>
    </PixelFrame>
  );
}
