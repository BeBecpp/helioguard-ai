import { AsteroidCard } from './AsteroidCard';
import { StudentMissionCard } from './StudentMissionCard';
import type { AsteroidRiskResult } from '../types/nasa';

const ACCENTS: Array<'cyan' | 'purple' | 'orange'> = ['cyan', 'purple', 'orange'];

interface AsteroidPreviewCardsProps {
  asteroids: AsteroidRiskResult[];
  loading?: boolean;
  onViewDetails: () => void;
  onLaunch: () => void;
}

export function AsteroidPreviewCards({
  asteroids,
  loading,
  onViewDetails,
  onLaunch,
}: AsteroidPreviewCardsProps) {
  if (loading && asteroids.length === 0) {
    return (
      <section id="asteroids" className="asteroid-preview-section">
        <h2 className="section-title">Top Asteroid Reports</h2>
        <div className="asteroid-preview-row glass-panel loading-card">
          <div className="loading-shimmer" />
          <p className="loading-text">Scanning NEO feed…</p>
        </div>
      </section>
    );
  }

  if (asteroids.length === 0) {
    return (
      <section id="asteroids" className="asteroid-preview-section">
        <h2 className="section-title">Top Asteroid Reports</h2>
        <p className="state-box state-empty">No asteroid data for this window.</p>
      </section>
    );
  }

  const topThree = asteroids.slice(0, 3);

  return (
    <section id="asteroids" className="asteroid-preview-section" aria-labelledby="asteroid-heading">
      <h2 id="asteroid-heading" className="section-title">
        Top Asteroid Reports
      </h2>

      <div className="asteroid-preview-row">
        <div className="asteroid-cards-grid">
          {topThree.map((asteroid, i) => (
            <AsteroidCard
              key={asteroid.neoId}
              asteroid={asteroid}
              accent={ACCENTS[i % 3]}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
        <StudentMissionCard onLaunch={onLaunch} />
      </div>
    </section>
  );
}
