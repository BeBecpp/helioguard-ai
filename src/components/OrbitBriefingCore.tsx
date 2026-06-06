import { PixelFrame } from './PixelFrame';
import { EducationalNote } from './EducationalNote';
import { getCrewTakeaway } from '../utils/missionNotes';
import type { HelioGuardIndexResult, RiskLevel } from '../types/nasa';

interface OrbitBriefingCoreProps {
  briefing: string;
  loading?: boolean;
  dateRange?: { startDate: string; endDate: string };
  indexData?: HelioGuardIndexResult | null;
  studentMode?: boolean;
}

function OrbitFace() {
  return (
    <svg viewBox="0 0 24 24" width="32" height="32" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="4" y="4" width="16" height="14" fill="#1e293b" stroke="#8b5cf6" strokeWidth="1" />
      <rect x="6" y="8" width="4" height="4" fill="#38bdf8" />
      <rect x="14" y="8" width="4" height="4" fill="#38bdf8" />
      <rect x="8" y="14" width="8" height="2" fill="#34d399" />
      <rect x="10" y="2" width="4" height="2" fill="#facc15" />
    </svg>
  );
}

export function OrbitBriefingCore({
  briefing,
  loading,
  dateRange,
  indexData,
  studentMode,
}: OrbitBriefingCoreProps) {
  if (loading) {
    return (
      <PixelFrame accent="purple" className="glass-card orbit-briefing loading-card">
        <div className="loading-shimmer" />
        <p className="loading-text">ORBIT-01 initializing…</p>
      </PixelFrame>
    );
  }

  const paragraphs = briefing.split('\n\n').filter(Boolean);
  const missionBody = paragraphs.slice(1, -1);
  const disclaimerPara = paragraphs[paragraphs.length - 1] ?? '';

  const level: RiskLevel = indexData?.level ?? 'LOW';
  const crewTakeaway = getCrewTakeaway(
    level,
    indexData?.asteroidRiskScore ?? 0,
    indexData?.spaceWeatherRiskScore ?? 0,
    studentMode ?? false,
  );

  const windowLabel = dateRange
    ? `${dateRange.startDate} → ${dateRange.endDate}`
    : 'Today + 7 days';

  return (
    <section className="orbit-briefing-section" aria-labelledby="orbit-briefing-heading">
      <div className="section-intro section-intro-left">
        <span className="section-kicker">Crew Briefing</span>
        <h2 id="orbit-briefing-heading">ORBIT-01 Briefing Core</h2>
        <p className="section-lead">
          Your space science assistant summarizing live NASA data in plain English.
        </p>
      </div>

      <PixelFrame accent="purple" className="glass-card orbit-briefing card-fade-in">
        <div className="orbit-core-header">
          <OrbitFace />
          <div className="orbit-core-id">
            <span className="orbit-core-name">ORBIT-01 BRIEFING CORE</span>
            <span className="orbit-core-status">
              <span className="status-dot status-dot-live" />
              Online
            </span>
          </div>
          <span className="orbit-core-time">Data window: {windowLabel}</span>
        </div>

        <div className="orbit-terminal">
          <p className="briefing-title-line">Mission Briefing:</p>
          <div className="briefing-text">
            {missionBody.map((para, i) => (
              <p key={i}>
                <span className="terminal-prompt">&gt; </span>
                {para}
              </p>
            ))}
            <span className="terminal-cursor" aria-hidden="true" />
          </div>
        </div>

        <div className="crew-takeaway">
          <h3>Crew Takeaway</h3>
          <p>{crewTakeaway}</p>
        </div>

        <div className="official-reminder">
          <h3>Official Source Reminder</h3>
          <p>{disclaimerPara}</p>
        </div>

        <EducationalNote
          title="Student Explanation"
          studentMode={studentMode}
          simpleText="ORBIT-01 reads NASA numbers and writes a short report for you. It is a learning tool — always check NASA and NOAA for real alerts."
        >
          This briefing uses a rule-based engine (no paid AI API). It summarizes the HelioGuard
          Index, top asteroid, and space weather status from live feeds.
        </EducationalNote>
      </PixelFrame>
    </section>
  );
}
