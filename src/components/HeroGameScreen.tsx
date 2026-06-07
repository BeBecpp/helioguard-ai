import { PixelScene } from './PixelScene';

const MISSION_BADGES = [
  { label: 'NASA Public Data', color: 'cyan' as const },
  { label: 'Student Space Lab', color: 'purple' as const },
  { label: 'Math Risk Engine', color: 'green' as const },
  { label: 'AI Briefing', color: 'orange' as const },
  { label: 'Educational Only', color: 'yellow' as const },
];

export function HeroGameScreen() {
  return (
    <section id="mission-control" className="hero-game-screen">
      <div className="hero-game-scanlines" aria-hidden="true" />
      <div className="hero-game-frame">
        <div className="hero-game-inner">
          <div className="hero-game-copy">
            <h1 className="hero-game-title">
              <span className="hero-game-title-line">HelioGuard</span>
              <span className="hero-game-title-line hero-game-title-accent">AI</span>
            </h1>
            <p className="hero-game-subtitle">Space Risk Intelligence for Student Explorers</p>
            <p className="hero-game-desc">
              We turn NASA asteroid and space weather data into student-friendly risk scores,
              mission briefings, and hands-on learning adventures.
            </p>

            <div className="hero-game-badges">
              {MISSION_BADGES.map(({ label, color }) => (
                <span key={label} className={`hero-badge hero-badge-${color}`}>
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-game-viewport">
            <div className="hero-game-viewport-label">LIVE ORBIT VIEW</div>
            <PixelScene />
          </div>
        </div>
      </div>
    </section>
  );
}
