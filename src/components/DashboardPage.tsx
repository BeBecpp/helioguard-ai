import { ArrowLeft } from 'lucide-react';
import { MissionRiskConsole } from './MissionRiskConsole';
import { OrbitBriefingCard } from './OrbitBriefingCard';
import { AsteroidExplorer } from './AsteroidExplorer';
import { SpaceWeatherStatus } from './SpaceWeatherStatus';
import { LearningCards } from './LearningCards';
import { DataSourcesPanel } from './DataSourcesPanel';
import { DisclaimerFooter } from './DisclaimerFooter';
import type {
  AsteroidRiskResult,
  HelioGuardIndexResult,
  SpaceWeatherEvent,
} from '../types/nasa';

const EMPTY_INDEX: HelioGuardIndexResult = {
  score: 0,
  level: 'LOW',
  asteroidRiskScore: 0,
  spaceWeatherRiskScore: 0,
  explanation: '',
};

interface DashboardPageProps {
  onBack: () => void;
  asteroids: AsteroidRiskResult[];
  indexData: HelioGuardIndexResult | null;
  briefing: string;
  spaceEvents: SpaceWeatherEvent[];
  donkiUnavailable: boolean;
  donkiError?: string;
  dateRange?: { startDate: string; endDate: string };
  isLoading: boolean;
  studentMode: boolean;
  error: string | null;
  onRetry: () => void;
}

export function DashboardPage({
  onBack,
  asteroids,
  indexData,
  briefing,
  spaceEvents,
  donkiUnavailable,
  donkiError,
  dateRange,
  isLoading,
  studentMode,
  error,
  onRetry,
}: DashboardPageProps) {
  return (
    <div className="dashboard-page">
      <header className="dashboard-header glass-panel">
        <button type="button" className="btn-back" onClick={onBack}>
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Home
        </button>
        <div className="dashboard-header-text">
          <h1 className="dashboard-title">HelioGuard AI Dashboard</h1>
          <p className="dashboard-subtitle">
            Explore the full NASA data view, risk model, and student explanations.
          </p>
        </div>
      </header>

      <main className="dashboard-main">
        {error && (
          <div className="state-box state-error">
            <strong>NASA API failed</strong>
            <p>{error}</p>
            <button type="button" className="btn-secondary" onClick={onRetry}>
              Retry ↻
            </button>
          </div>
        )}

        <section id="mission" className="dashboard-risk-section">
          <MissionRiskConsole
            data={indexData ?? EMPTY_INDEX}
            loading={isLoading && !indexData}
            variant="full"
            showFormula
            studentMode={studentMode}
          />
        </section>

        <div id="briefing" className="dashboard-briefing-row">
          <OrbitBriefingCard
            briefing={briefing}
            loading={isLoading && !briefing}
            indexData={indexData}
            studentMode={studentMode}
            fullBriefing
          />
        </div>

        <AsteroidExplorer asteroids={asteroids} loading={isLoading && asteroids.length === 0} />

        <div id="weather">
          <SpaceWeatherStatus
            events={spaceEvents}
            loading={isLoading && spaceEvents.length === 0}
            unavailable={donkiUnavailable}
            error={donkiError}
          />
        </div>

        <LearningCards />
        <DataSourcesPanel dateRange={dateRange} />
      </main>

      <DisclaimerFooter />
    </div>
  );
}
