import { useState } from 'react';
import { GraduationCap, Menu, Rocket, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Mission Control', href: '#mission-control' },
  { label: 'Asteroid Watch', href: '#asteroid-watch' },
  { label: 'Space Weather', href: '#space-weather' },
  { label: 'Learn', href: '#learn' },
  { label: 'About', href: '#about' },
];

interface ArcadeNavProps {
  studentMode?: boolean;
  onToggleStudentMode?: () => void;
}

export function ArcadeNav({ studentMode, onToggleStudentMode }: ArcadeNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="arcade-nav">
      <div className="arcade-nav-inner">
        <a href="#mission-control" className="arcade-nav-brand">
          <span className="arcade-nav-logo" aria-hidden="true">
            <Rocket size={16} />
          </span>
          <span className="arcade-nav-title">HelioGuard AI</span>
        </a>

        <button
          type="button"
          className="arcade-nav-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav className={`arcade-nav-links ${open ? 'open' : ''}`} aria-label="Main">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="arcade-nav-link"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}

          {onToggleStudentMode && (
            <button
              type="button"
              className={`arcade-nav-student ${studentMode ? 'active' : ''}`}
              onClick={onToggleStudentMode}
              aria-pressed={studentMode}
            >
              <GraduationCap size={14} />
              Student {studentMode ? 'ON' : 'OFF'}
            </button>
          )}

          <a
            href="#mission-control"
            className="arcade-nav-launch"
            onClick={() => setOpen(false)}
          >
            <Rocket size={14} />
            Launch App
          </a>
        </nav>
      </div>
    </header>
  );
}
