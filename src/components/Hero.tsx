import { AlertTriangle } from 'lucide-react';
import { PixelBadge } from './PixelBadge';
import { HeroOrbitScene } from './HeroOrbitScene';
import type { HelioGuardIndexResult } from '../types/nasa';

const MISSION_STICKERS = [
  'NASA Public Data',
  'Student Space Lab',
  'Math Risk Engine',
  'AI Briefing',
  'Educational Only',
];

interface HeroProps {
  indexPreview?: HelioGuardIndexResult | null;
  indexLoading?: boolean;
}

export function Hero({ indexPreview, indexLoading }: HeroProps) {
  return (
    <section className="hero hero-launch">
      <div className="hero-scanlines" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker">Student Space Lab · NASA Open Data · Educational AI</p>
          <h1 className="hero-title">HelioGuard AI</h1>
          <p className="hero-subtitle">Space Risk Intelligence for Student Explorers</p>
          <p className="hero-intro">
            Track near-Earth asteroids and space weather using NASA public data, then turn raw
            science into simple risk scores and mission briefings.
          </p>
          <p className="hero-cta">
            Your mission: explore real space data like a crew member — not an emergency operator.
          </p>

          <div className="mission-stickers">
            {MISSION_STICKERS.map((label) => (
              <PixelBadge key={label} variant={label === 'Educational Only' ? 'mission' : 'default'}>
                {label}
              </PixelBadge>
            ))}
          </div>

          <p className="disclaimer disclaimer-launch">
            <AlertTriangle size={14} />
            Educational dashboard only — not an official NASA or NOAA alert system.
          </p>
        </div>

        <HeroOrbitScene indexPreview={indexPreview} indexLoading={indexLoading} />
      </div>
      <div className="hero-horizon" aria-hidden="true" />
    </section>
  );
}
