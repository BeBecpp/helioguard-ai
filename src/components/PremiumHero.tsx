import { SpaceOrbitScene } from './SpaceOrbitScene';

interface PremiumHeroProps {
  onLaunch: () => void;
}

const MISSION_TAGS = [
  { label: 'NASA Public Data', color: 'cyan' },
  { label: 'Student Space Lab', color: 'purple' },
  { label: 'Math Risk Engine', color: 'green' },
  { label: 'AI Briefing', color: 'orange' },
  { label: 'Educational Only', color: 'yellow' },
] as const;

export function PremiumHero({ onLaunch }: PremiumHeroProps) {
  const scrollToResearch = () => {
    document.getElementById('learn')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="premium-hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <h1 id="hero-title" className="hero-title">
          HelioGuard AI
        </h1>
        <p className="hero-subtitle">Space Risk Intelligence for Student Explorers</p>
        <p className="hero-description">
          NASA public data, transformed into student-friendly risk scores, mission briefings,
          and interactive space learning.
        </p>

        <div className="hero-cta-row">
          <button type="button" className="btn-primary btn-glow" onClick={onLaunch}>
            Launch Mission
          </button>
          <button type="button" className="btn-secondary" onClick={scrollToResearch}>
            View Research
          </button>
        </div>

        <div className="hero-tags">
          {MISSION_TAGS.map((tag) => (
            <span key={tag.label} className={`hero-tag hero-tag-${tag.color}`}>
              {tag.label}
            </span>
          ))}
        </div>
      </div>

      <div className="hero-scene-wrap">
        <span className="hero-scene-label">LIVE ORBIT VIEW</span>
        <SpaceOrbitScene />
      </div>
    </section>
  );
}
