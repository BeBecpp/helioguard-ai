interface FloatingNavProps {
  onLaunch: () => void;
  onHome?: () => void;
  activeView?: 'home' | 'dashboard';
}

const NAV_ITEMS = [
  { id: 'mission', label: 'Mission' },
  { id: 'asteroids', label: 'Asteroids' },
  { id: 'weather', label: 'Weather' },
  { id: 'briefing', label: 'Briefing' },
  { id: 'learn', label: 'Learn' },
] as const;

export function FloatingNav({ onLaunch, onHome, activeView = 'home' }: FloatingNavProps) {
  const handleNavClick = (id: string) => {
    if (activeView === 'home') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      onLaunch();
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className="floating-nav-wrap">
      <nav className="floating-nav glass-panel" aria-label="Main navigation">
        <button type="button" className="nav-logo" onClick={onHome ?? onLaunch}>
          <span className="nav-logo-icon" aria-hidden="true">
            🚀
          </span>
          <span className="nav-logo-text">HelioGuard AI</span>
        </button>

        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button type="button" className="nav-link" onClick={() => handleNavClick(item.id)}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <button type="button" className="nav-cta btn-glow" onClick={onLaunch}>
          Launch App 🚀
        </button>
      </nav>
    </header>
  );
}
