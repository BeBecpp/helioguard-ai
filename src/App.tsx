import { useCallback, useEffect, useState } from 'react';
import { AlertCircle, GraduationCap, RefreshCw } from 'lucide-react';
import { Hero } from './components/Hero';
import { PixelStarfield } from './components/PixelStarfield';
import { MissionPath } from './components/MissionPath';
import { MissionRiskConsole } from './components/MissionRiskConsole';
import { AsteroidCard } from './components/AsteroidCard';
import { SpaceWeatherTimeline } from './components/SpaceWeatherTimeline';
import { OrbitBriefingCore } from './components/OrbitBriefingCore';
import { DataSourcePanel } from './components/DataSourcePanel';
import { EducationalNote } from './components/EducationalNote';
import { fetchAsteroidRiskData } from './services/nasaNeoService';
import { fetchSpaceWeatherEvents } from './services/nasaDonkiService';
import { calculateHelioGuardIndex, generateMissionBriefing } from './utils/briefingEngine';
import { getRiskLevel } from './utils/asteroidRisk';
import {
  calculateSpaceWeatherRisk,
  getFallbackSpaceWeatherRisk,
} from './utils/spaceWeatherRisk';
import type {
  AsteroidRiskResult,
  HelioGuardIndexResult,
  SpaceWeatherEvent,
} from './types/nasa';

type LoadPhase = 'idle' | 'fetching' | 'calculating' | 'briefing' | 'ready' | 'error';

function App() {
  const [phase, setPhase] = useState<LoadPhase>('idle');
  const [error, setError] = useState<string | null>(null);
  const [asteroids, setAsteroids] = useState<AsteroidRiskResult[]>([]);
  const [indexData, setIndexData] = useState<HelioGuardIndexResult | null>(null);
  const [briefing, setBriefing] = useState('');
  const [spaceEvents, setSpaceEvents] = useState<SpaceWeatherEvent[]>([]);
  const [donkiUnavailable, setDonkiUnavailable] = useState(false);
  const [donkiError, setDonkiError] = useState<string | undefined>();
  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>();
  const [studentMode, setStudentMode] = useState(true);

  const loadData = useCallback(async () => {
    setPhase('fetching');
    setError(null);

    try {
      // NeoWs first (critical); DONKI after — avoids 4 parallel hits on DEMO_KEY
      const asteroidResult = await fetchAsteroidRiskData(10);
      const weatherResult = await fetchSpaceWeatherEvents();

      setPhase('calculating');

      setAsteroids(asteroidResult.results);
      setDateRange(asteroidResult.dateRange);
      setSpaceEvents(weatherResult.events);
      setDonkiUnavailable(weatherResult.unavailable);
      setDonkiError(weatherResult.error);

      const spaceWeatherScore = weatherResult.unavailable
        ? getFallbackSpaceWeatherRisk()
        : calculateSpaceWeatherRisk(weatherResult.events);

      const { score, explanation } = calculateHelioGuardIndex(
        asteroidResult.aggregateScore,
        spaceWeatherScore,
      );

      const index: HelioGuardIndexResult = {
        score,
        level: getRiskLevel(score),
        asteroidRiskScore: asteroidResult.aggregateScore,
        spaceWeatherRiskScore: spaceWeatherScore,
        explanation,
      };
      setIndexData(index);

      setPhase('briefing');

      const briefingText = generateMissionBriefing({
        helioGuardIndex: score,
        helioGuardLevel: index.level,
        asteroidRiskScore: asteroidResult.aggregateScore,
        spaceWeatherRiskScore: spaceWeatherScore,
        topAsteroid: asteroidResult.results[0] ?? null,
        spaceWeatherEvents: weatherResult.events,
        spaceWeatherUnavailable: weatherResult.unavailable,
      });
      setBriefing(briefingText);

      setPhase('ready');
    } catch (err) {
      setPhase('error');
      setError(err instanceof Error ? err.message : 'Failed to load NASA data');
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const isLoading = phase !== 'ready' && phase !== 'error';

  return (
    <div className="app">
      <PixelStarfield />

      <Hero indexPreview={indexData} indexLoading={isLoading && !indexData} />

      <div className="mission-toolbar">
        <button
          type="button"
          className={`student-mode-toggle ${studentMode ? 'active' : ''}`}
          onClick={() => setStudentMode((v) => !v)}
          aria-pressed={studentMode}
        >
          <GraduationCap size={16} />
          Student mode {studentMode ? 'ON' : 'OFF'}
        </button>
        {isLoading && <span className="toolbar-status">Receiving NASA data signals…</span>}
      </div>

      <main className="dashboard mission-lab">
        {phase === 'error' && (
          <div className="state-box state-error global-error">
            <AlertCircle size={20} />
            <div>
              <strong>NASA API failed</strong>
              <p>{error}</p>
              <button type="button" className="retry-btn" onClick={loadData}>
                <RefreshCw size={16} /> Retry mission link
              </button>
            </div>
          </div>
        )}

        <MissionPath />

        <MissionRiskConsole
          data={
            indexData ?? {
              score: 0,
              level: 'LOW',
              asteroidRiskScore: 0,
              spaceWeatherRiskScore: 0,
              explanation: '',
            }
          }
          loading={isLoading && !indexData}
          studentMode={studentMode}
        />

        <OrbitBriefingCore
          briefing={briefing}
          loading={isLoading && !briefing}
          dateRange={dateRange}
          indexData={indexData}
          studentMode={studentMode}
        />

        <section className="asteroid-section card-fade-in" aria-labelledby="object-reports-heading">
          <div className="section-intro section-intro-left">
            <span className="section-kicker">Asteroid Watch</span>
            <h2 id="object-reports-heading">Object Reports</h2>
            <p className="section-lead">
              Near-Earth objects ranked by the educational risk engine — highest attention first.
            </p>
          </div>

          <EducationalNote
            title="What does this mean?"
            defaultOpen={studentMode}
            studentMode={studentMode}
            simpleText="A close approach does NOT mean an asteroid will hit Earth. HelioGuard compares size, speed, distance, and NASA's hazardous flag to create an attention score for learning."
          >
            A close approach does not mean an asteroid will hit Earth. HelioGuard compares size,
            speed, distance, and NASA&apos;s potentially hazardous flag to create an educational
            attention score.
          </EducationalNote>

          {isLoading && asteroids.length === 0 && (
            <div className="glass-card loading-card asteroid-loading">
              <div className="loading-shimmer" />
              <p className="loading-text">Loading object reports…</p>
            </div>
          )}

          {!isLoading && asteroids.length === 0 && phase === 'ready' && (
            <div className="state-box state-empty">
              <p>No asteroid data available for the selected date range.</p>
            </div>
          )}

          {asteroids.length > 0 && (
            <div className="asteroid-grid">
              {asteroids.map((a) => (
                <AsteroidCard key={a.neoId} asteroid={a} studentMode={studentMode} />
              ))}
            </div>
          )}

          {asteroids.length > 0 && asteroids.every((a) => a.level === 'LOW') && (
            <div className="state-box state-empty inline-empty">
              <p>All tracked objects show LOW attention in this window — calm skies for learning.</p>
            </div>
          )}
        </section>

        <SpaceWeatherTimeline
          events={spaceEvents}
          loading={isLoading && spaceEvents.length === 0 && !donkiUnavailable}
          unavailable={donkiUnavailable}
          error={donkiError}
          studentMode={studentMode}
        />

        <DataSourcePanel dateRange={dateRange} />
      </main>

      <footer className="app-footer">
        <p className="footer-disclaimer">
          HelioGuard AI · Student Space Lab · NASA public/open data · Not an official NASA or NOAA
          product · Educational use only
        </p>
      </footer>
    </div>
  );
}

export default App;
