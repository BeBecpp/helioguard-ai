import { PixelFrame } from './PixelFrame';
import { getBriefingSummary } from '../utils/briefingSummary';
import type { HelioGuardIndexResult } from '../types/nasa';

interface OrbitBriefingCoreProps {
  briefing: string;
  loading?: boolean;
  indexData?: HelioGuardIndexResult | null;
  studentMode?: boolean;
  fullBriefing?: boolean;
}

function PixelBotFace() {
  return (
    <svg viewBox="0 0 28 28" width="40" height="40" shapeRendering="crispEdges" aria-hidden="true" className="orbit-bot-face">
      <rect x="2" y="4" width="24" height="18" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
      <rect x="6" y="9" width="5" height="5" fill="#34d399" />
      <rect x="17" y="9" width="5" height="5" fill="#34d399" />
      <rect x="10" y="17" width="8" height="2" fill="#38bdf8" />
      <rect x="12" y="1" width="4" height="3" fill="#facc15" />
      <rect x="11" y="2" width="2" height="1" fill="#fb923c" />
      <rect x="15" y="2" width="2" height="1" fill="#fb923c" />
    </svg>
  );
}

export function OrbitBriefingCore({
  briefing,
  loading,
  studentMode = true,
  fullBriefing = false,
}: OrbitBriefingCoreProps) {
  if (loading) {
    return (
      <PixelFrame accent="purple" className="glass-panel orbit-briefing-core loading-card">
        <div className="loading-shimmer" />
        <p className="loading-text">ORBIT-01 initializing…</p>
      </PixelFrame>
    );
  }

  const summary = fullBriefing ? briefing : getBriefingSummary(briefing, 3);

  return (
    <section className="orbit-briefing-section" aria-labelledby="orbit-briefing-heading">
      <PixelFrame accent="purple" className="glass-panel orbit-briefing-core">
        <div className="terminal-window-bar">
          <div className="terminal-window-controls" aria-hidden="true">
            <span className="win-btn win-btn-close" />
            <span className="win-btn win-btn-min" />
            <span className="win-btn win-btn-max" />
          </div>
          <h2 id="orbit-briefing-heading" className="terminal-window-title">
            ORBIT-01 Briefing Core
          </h2>
        </div>

        <div className="orbit-terminal-body">
          <aside className="orbit-terminal-sidebar">
            <PixelBotFace />
            <div className="orbit-online-indicator">
              <span className="online-pixel" />
              <span className="online-pixel" />
              <span className="online-pixel" />
              <span className="online-label">ONLINE</span>
            </div>
          </aside>

          <div className="orbit-terminal-main">
            <div className="orbit-status-lines">
              <p><span className="terminal-prompt">✓</span> System Online</p>
              <p><span className="terminal-prompt">✓</span> NASA Data Feed Active</p>
              <p><span className="terminal-prompt">✓</span> AI Analysis: Active</p>
              <p>
                <span className="terminal-prompt">✓</span> Student Mode:{' '}
                {studentMode ? 'Engaged' : 'Off'}
              </p>
            </div>

            <div className="orbit-mission-text">
              <p>
                {fullBriefing ? (
                  summary.split('\n\n').map((para, i) => (
                    <span key={i}>
                      {para}
                      {i < summary.split('\n\n').length - 1 && (
                        <>
                          <br />
                          <br />
                        </>
                      )}
                    </span>
                  ))
                ) : (
                  <>
                    {summary}
                    <span className="terminal-cursor" aria-hidden="true" />
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </PixelFrame>
    </section>
  );
}
