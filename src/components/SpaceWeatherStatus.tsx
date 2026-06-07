import { useState } from 'react';
import { ChevronDown, Sun, WifiOff } from 'lucide-react';
import type { SpaceWeatherEvent } from '../types/nasa';

interface SpaceWeatherStatusProps {
  events: SpaceWeatherEvent[];
  loading?: boolean;
  unavailable?: boolean;
  error?: string;
}

type WeatherStatus = 'calm' | 'active' | 'unavailable';

function getStatus(unavailable: boolean, count: number): WeatherStatus {
  if (unavailable) return 'unavailable';
  if (count === 0) return 'calm';
  return 'active';
}

function statusLabel(status: WeatherStatus): string {
  switch (status) {
    case 'active':
      return 'Active';
    case 'unavailable':
      return 'Unavailable';
    default:
      return 'Calm';
  }
}

function statusExplanation(status: WeatherStatus, count: number): string {
  switch (status) {
    case 'active':
      return `${count} space weather signal${count === 1 ? '' : 's'} in the NASA monitoring window. Technology impacts are summarized — check NOAA for official alerts.`;
    case 'unavailable':
      return 'Mission systems are calm. No major space weather events were detected in this data window, or the data source is temporarily unavailable.';
    default:
      return 'Mission systems are calm. No major space weather events were detected in this data window.';
  }
}

export function SpaceWeatherStatus({
  events,
  loading,
  unavailable = false,
  error,
}: SpaceWeatherStatusProps) {
  const [feedOpen, setFeedOpen] = useState(false);

  if (loading) {
    return (
      <section id="space-weather" className="weather-status loading-card arcade-panel compact-panel">
        <div className="loading-shimmer" />
        <p className="loading-text">Scanning space weather…</p>
      </section>
    );
  }

  const status = getStatus(unavailable, events.length);
  const topNames = events.slice(0, 2).map((e) => e.title);

  return (
    <section id="space-weather" className="weather-status" aria-labelledby="weather-heading">
      <h2 id="weather-heading" className="section-title">
        Space Weather Status
      </h2>

      <article className={`weather-status-card glass-panel status-${status}`}>
        <div className="weather-status-head">
          {unavailable ? <WifiOff size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
          <span className={`weather-status-badge status-${status}`}>{statusLabel(status)}</span>
          <span className="weather-event-count">{events.length} events</span>
        </div>

        <p className="weather-status-copy">{statusExplanation(status, events.length)}</p>

        {topNames.length > 0 && (
          <ul className="weather-top-events">
            {topNames.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        )}

        {unavailable && error && (
          <p className="weather-error-hint">Signal note: {error}</p>
        )}

        <button
          type="button"
          className="compact-toggle weather-feed-toggle"
          onClick={() => setFeedOpen((v) => !v)}
          aria-expanded={feedOpen}
        >
          View technical space weather feed
          <ChevronDown size={14} className={`toggle-chevron ${feedOpen ? 'open' : ''}`} aria-hidden="true" />
        </button>

        {feedOpen && events.length > 0 && (
          <ul className="weather-tech-feed">
            {events.slice(0, 5).map((event) => (
              <li key={event.id}>
                <span className="tech-event-type">{event.type}</span>
                <span className="tech-event-title">{event.title}</span>
                <time dateTime={event.startTime}>
                  {new Date(event.startTime).toLocaleDateString()}
                </time>
              </li>
            ))}
          </ul>
        )}

        {feedOpen && events.length === 0 && !unavailable && (
          <p className="weather-tech-empty">No events in the current window.</p>
        )}
      </article>
    </section>
  );
}
