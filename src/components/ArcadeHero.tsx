import { Database, FlaskConical, GraduationCap, Sparkles, Sigma } from 'lucide-react';
import { PixelSpaceScene } from './PixelSpaceScene';

const MISSION_LABELS = [
  { label: 'NASA Public Data', icon: Database, color: 'cyan' as const },
  { label: 'Student Space Lab', icon: FlaskConical, color: 'purple' as const },
  { label: 'Math Risk Engine', icon: Sigma, color: 'yellow' as const },
  { label: 'AI Briefing', icon: Sparkles, color: 'green' as const },
  { label: 'Educational Only', icon: GraduationCap, color: 'orange' as const },
];

export function ArcadeHero() {
  return (
    <section id="mission-control" className="arcade-hero arcade-hero-frame">
      <div className="arcade-hero-scanlines" aria-hidden="true" />
      <div className="arcade-hero-inner">
        <div className="arcade-hero-copy">
          <h1 className="arcade-hero-title">HelioGuard AI</h1>
          <p className="arcade-hero-subtitle">Space Risk Intelligence for Student Explorers</p>
          <p className="arcade-hero-desc">
            We turn NASA asteroid and space weather data into student-friendly risk scores and
            mission briefings.
          </p>

          <div className="arcade-mission-labels">
            {MISSION_LABELS.map(({ label, icon: Icon, color }) => (
              <span key={label} className={`arcade-label arcade-label-${color}`}>
                <Icon size={12} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="arcade-hero-scene-wrap">
          <PixelSpaceScene />
        </div>
      </div>
    </section>
  );
}
