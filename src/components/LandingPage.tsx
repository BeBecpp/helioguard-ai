import { FloatingNav } from './FloatingNav';
import { PremiumHero } from './PremiumHero';
import { MissionPreviewCard } from './MissionPreviewCard';
import { OrbitBriefingCard } from './OrbitBriefingCard';
import { AsteroidPreviewCards } from './AsteroidPreviewCards';
import { DisclaimerFooter } from './DisclaimerFooter';
import type { AsteroidRiskResult, HelioGuardIndexResult } from '../types/nasa';

const EMPTY_INDEX: HelioGuardIndexResult = {
  score: 0,
  level: 'LOW',
  asteroidRiskScore: 0,
  spaceWeatherRiskScore: 0,
  explanation: '',
};

interface LandingPageProps {
  onLaunch: () => void;
  asteroids: AsteroidRiskResult[];
  indexData: HelioGuardIndexResult | null;
  briefing: string;
  isLoading: boolean;
  studentMode: boolean;
  error: string | null;
  onRetry: () => void;
}

export function LandingPage({
  onLaunch,
  asteroids,
  indexData,
  briefing,
  isLoading,
  studentMode,
  error,
  onRetry,
}: LandingPageProps) {
  return (
    <div className="landing-page">
      <FloatingNav
        onLaunch={onLaunch}
        onHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        activeView="home"
      />

      <main className="landing-main">
        <PremiumHero onLaunch={onLaunch} />

        {isLoading && (
          <p className="status-line" role="status">
            Receiving NASA data signals…
          </p>
        )}

        {error && (
          <div className="state-box state-error">
            <strong>NASA API failed</strong>
            <p>{error}</p>
            <button type="button" className="btn-secondary" onClick={onRetry}>
              Retry ↻
            </button>
          </div>
        )}

        <div id="mission" className="preview-row">
          <MissionPreviewCard
            data={indexData ?? EMPTY_INDEX}
            loading={isLoading && !indexData}
            variant="preview"
          />
          <div id="briefing">
            <OrbitBriefingCard
              briefing={briefing}
              loading={isLoading && !briefing}
              studentMode={studentMode}
            />
          </div>
        </div>

        <AsteroidPreviewCards
          asteroids={asteroids}
          loading={isLoading && asteroids.length === 0}
          onViewDetails={onLaunch}
          onLaunch={onLaunch}
        />
      </main>

      <DisclaimerFooter />
    </div>
  );
}
