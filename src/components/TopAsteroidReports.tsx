import { AsteroidCard } from './AsteroidCard';
import { StudentMissionCard } from './StudentMissionCard';
import type { AsteroidRiskResult } from '../types/nasa';

const ACCENTS: Array<'cyan' | 'purple' | 'orange'> = ['cyan', 'purple', 'orange'];

interface TopAsteroidReportsProps {
  asteroids: AsteroidRiskResult[];
  loading?: boolean;
}

export function TopAsteroidReports({ asteroids, loading }: TopAsteroidReportsProps) {
  if (loading && asteroids.length === 0) {
    return (
      <section id="asteroid-watch" className="asteroid-watch-section">
        <h2 className="section-pixel-title">Top Asteroid Reports</h2>
        <div className="asteroid-watch-row loading-card hud-panel">
          <div className="loading-shimmer" />
          <p className="loading-text">Scanning NEO feed…</p>
        </div>
      </section>
    );
  }

  if (asteroids.length === 0) {
    return (
      <section id="asteroid-watch" className="asteroid-watch-section">
        <h2 className="section-pixel-title">Top Asteroid Reports</h2>
        <p className="state-box state-empty">No asteroid data for this window.</p>
      </section>
    );
  }

  const topThree = asteroids.slice(0, 3);

  return (
    <section id="asteroid-watch" className="asteroid-watch-section" aria-labelledby="asteroid-heading">
      <h2 id="asteroid-heading" className="section-pixel-title">
        Top Asteroid Reports
      </h2>

      <div className="asteroid-watch-row">
        <div className="asteroid-cards-grid">
          {topThree.map((asteroid, i) => (
            <AsteroidCard key={asteroid.neoId} asteroid={asteroid} accent={ACCENTS[i % 3]} />
          ))}
        </div>
        <StudentMissionCard />
      </div>
    </section>
  );
}
