import { PixelRocket } from './PixelRocket';
import { PixelEarth } from './PixelEarth';
import { PixelSatellite } from './PixelSatellite';
import { PixelAsteroid } from './PixelAsteroid';

/** Cinematic hero space scene — large Earth, orbiting rocket, asteroids, satellite. */
export function SpaceOrbitScene() {
  return (
    <div className="space-orbit-scene" aria-hidden="true">
      <div className="scene-vignette" />

      <svg className="scene-orbit-trail scene-orbit-trail-outer" viewBox="0 0 480 400" fill="none">
        <ellipse
          cx="240"
          cy="200"
          rx="190"
          ry="75"
          stroke="rgba(56,189,248,0.35)"
          strokeWidth="1.5"
          strokeDasharray="10 8"
          className="scene-orbit-path"
        />
        <ellipse
          cx="240"
          cy="200"
          rx="140"
          ry="52"
          stroke="rgba(168,85,247,0.25)"
          strokeWidth="1"
          strokeDasharray="6 10"
          className="scene-orbit-path-inner"
        />
        <ellipse
          cx="240"
          cy="200"
          rx="90"
          ry="34"
          stroke="rgba(96,165,250,0.15)"
          strokeWidth="1"
          strokeDasharray="4 6"
          className="scene-orbit-path-inner"
        />
      </svg>

      <div className="scene-earth-wrap scene-earth-hero">
        <div className="scene-earth-glow scene-earth-glow-pulse" />
        <div className="scene-earth-glow scene-earth-glow-outer" />
        <PixelEarth size={160} />
      </div>

      <div className="scene-rocket-wrap scene-rocket-orbit">
        <div className="scene-rocket-trail" />
        <PixelRocket />
      </div>

      <div className="scene-satellite-wrap scene-satellite-hero">
        <PixelSatellite size={36} />
        <span className="satellite-signal" />
      </div>

      <div className="scene-asteroid scene-asteroid-a">
        <PixelAsteroid size={32} />
      </div>
      <div className="scene-asteroid scene-asteroid-b">
        <PixelAsteroid size={22} />
      </div>
      <div className="scene-asteroid scene-asteroid-c">
        <PixelAsteroid size={18} />
      </div>

      <div className="scene-distant-planet scene-distant-planet-lg" aria-hidden="true" />
    </div>
  );
}
