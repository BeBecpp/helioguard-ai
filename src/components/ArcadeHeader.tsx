import { useState } from 'react';

const NAV_TABS = [
  { id: 'mission-control', label: 'Mission Control', href: '#mission-control' },
  { id: 'asteroid-watch', label: 'Asteroid Watch', href: '#asteroid-watch' },
  { id: 'space-weather', label: 'Space Weather', href: '#space-weather' },
  { id: 'learn', label: 'Learn', href: '#learn' },
  { id: 'about', label: 'About', href: '#about' },
] as const;

function PixelLogo() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="7" y="0" width="2" height="2" fill="#ffd84d" />
      <rect x="6" y="2" width="4" height="2" fill="#e8f1ff" />
      <rect x="5" y="4" width="6" height="4" fill="#54a8ff" />
      <rect x="6" y="6" width="4" height="2" fill="#29d3ff" />
      <rect x="4" y="8" width="2" height="3" fill="#a855f7" />
      <rect x="10" y="8" width="2" height="3" fill="#a855f7" />
      <rect x="6" y="8" width="4" height="2" fill="#ff9b3d" />
      <rect x="7" y="10" width="2" height="3" fill="#ff9b3d" />
      <rect x="6" y="13" width="4" height="1" fill="#ffd84d" />
    </svg>
  );
}

interface ArcadeHeaderProps {
  studentMode?: boolean;
  onToggleStudentMode?: () => void;
}

export function ArcadeHeader({ studentMode, onToggleStudentMode }: ArcadeHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="arcade-header">
      <div className="arcade-header-inner">
        <a href="#mission-control" className="arcade-header-brand">
          <span className="arcade-header-logo">
            <PixelLogo />
          </span>
          <span className="arcade-header-title">HelioGuard AI</span>
        </a>

        <button
          type="button"
          className="arcade-header-menu-btn"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? 'X' : '≡'}
        </button>

        <nav className={`arcade-header-tabs ${open ? 'open' : ''}`} aria-label="Game menu">
          {NAV_TABS.map((tab) => (
            <a
              key={tab.id}
              href={tab.href}
              className={`arcade-tab ${tab.id === 'mission-control' ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {tab.label}
            </a>
          ))}

          {onToggleStudentMode && (
            <button
              type="button"
              className={`arcade-tab arcade-tab-student ${studentMode ? 'active' : ''}`}
              onClick={onToggleStudentMode}
              aria-pressed={studentMode}
            >
              Student {studentMode ? 'ON' : 'OFF'}
            </button>
          )}

          <a href="#mission-control" className="arcade-launch-btn" onClick={() => setOpen(false)}>
            <PixelLogo />
            Launch App
          </a>
        </nav>
      </div>
    </header>
  );
}
