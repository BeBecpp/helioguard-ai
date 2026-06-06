import { useState } from 'react';
import { CloudLightning, Radio, Sun, WifiOff } from 'lucide-react';
import { PixelFrame } from './PixelFrame';
import { PixelBadge } from './PixelBadge';
import { EducationalNote } from './EducationalNote';
import type { SpaceWeatherEvent } from '../types/nasa';

interface SpaceWeatherTimelineProps {
  events: SpaceWeatherEvent[];
  loading?: boolean;
  unavailable?: boolean;
  error?: string;
  studentMode?: boolean;
}

const TYPE_ICONS: Record<SpaceWeatherEvent['type'], typeof Sun> = {
  CME: CloudLightning,
  FLR: Sun,
  GST: Radio,
  RBE: Radio,
  OTHER: Radio,
};

export function SpaceWeatherTimeline({
  events,
  loading,
  unavailable,
  error,
  studentMode,
}: SpaceWeatherTimelineProps) {
  const [whyOpen, setWhyOpen] = useState(false);

  if (loading) {
    return (
      <PixelFrame accent="cyan" className="glass-card space-weather-section loading-card">
        <div className="loading-shimmer" />
        <p className="loading-text">Scanning space weather signals…</p>
      </PixelFrame>
    );
  }

  return (
    <section className="space-log-section" aria-labelledby="space-log-heading">
      <div className="section-intro section-intro-left">
        <span className="section-kicker">Space Weather Log</span>
        <h2 id="space-log-heading">Mission Log</h2>
        <p className="section-lead">
          Coronal mass ejections, solar flares, and DONKI notifications from NASA.
        </p>
      </div>

      <PixelFrame accent="cyan" className="glass-card space-weather-section card-fade-in">
        <div className="card-header">
          <Sun size={20} className="pixel-icon-accent" />
          <h2 className="sr-only">Space Weather Mission Log</h2>
          <PixelBadge variant="accent">NASA DONKI</PixelBadge>
        </div>

        <EducationalNote
          title="Why it matters"
          expandable
          defaultOpen={studentMode}
          studentMode={studentMode}
          simpleText="The Sun can shoot energy and particles toward Earth. That may affect satellites, GPS, radio, and power grids. This log simplifies those signals for learning."
        >
          Strong solar activity can affect satellites, GPS, radio communication, and power systems.
          This dashboard simplifies space weather signals into a student-friendly summary.
        </EducationalNote>

        <button
          type="button"
          className="why-weather-btn"
          onClick={() => setWhyOpen((v) => !v)}
        >
          {whyOpen ? '− Hide' : '+'} Why space weather matters?
        </button>
        {whyOpen && (
          <p className="why-weather-note">
            Space weather is the weather of space — solar flares and coronal mass ejections can
            disturb Earth&apos;s magnetic field and technology we rely on daily.
          </p>
        )}

        {unavailable && (
          <div className="state-box state-warning mission-log-empty">
            <WifiOff size={18} />
            <div>
              <strong>Data signal interrupted</strong>
              <p>
                No major space weather events detected. Mission systems are calm.
                {error ? ` (${error})` : ''}
              </p>
            </div>
          </div>
        )}

        {!unavailable && events.length === 0 && (
          <div className="state-box state-empty mission-log-empty">
            <Sun size={18} />
            <p>No major space weather events detected. Mission systems are calm.</p>
          </div>
        )}

        {events.length > 0 && (
          <ol className="timeline mission-log">
            {events.map((event) => {
              const Icon = TYPE_ICONS[event.type];
              return (
                <li key={event.id} className="timeline-item">
                  <div className="timeline-marker pixel-timeline-dot">
                    <Icon size={14} />
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <span className="timeline-type pixel-event-badge">{event.type}</span>
                      <time dateTime={event.startTime}>
                        {new Date(event.startTime).toLocaleString()}
                      </time>
                    </div>
                    <h4>{event.title}</h4>
                    <p>{event.description}</p>
                    <span className="severity-tag">Severity: {event.severityScore}/100</span>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </PixelFrame>
    </section>
  );
}
