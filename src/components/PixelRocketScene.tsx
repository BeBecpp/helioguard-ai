import { PixelRocket } from './PixelRocket';
import { PixelEarth } from './PixelEarth';
import { PixelSatellite } from './PixelSatellite';
import { PixelAsteroid } from './PixelAsteroid';

/** Large hero space illustration — Earth, rocket, orbit trail, asteroids, satellite. */
export function PixelRocketScene() {
  return (
    <div className="pixel-rocket-scene" aria-hidden="true">
      <svg className="scene-orbit-trail" viewBox="0 0 400 320" fill="none">
        <ellipse
          cx="200"
          cy="160"
          rx="150"
          ry="60"
          stroke="rgba(56,189,248,0.3)"
          strokeWidth="1"
          strokeDasharray="8 6"
          className="scene-orbit-path"
        />
        <ellipse
          cx="200"
          cy="160"
          rx="110"
          ry="42"
          stroke="rgba(139,92,246,0.2)"
          strokeWidth="1"
          strokeDasharray="4 8"
          className="scene-orbit-path-inner"
        />
      </svg>

      <div className="scene-earth-wrap">
        <PixelEarth size={120} />
        <div className="scene-earth-glow" />
      </div>

      <div className="scene-rocket-wrap">
        <PixelRocket />
      </div>

      <div className="scene-satellite-wrap">
        <PixelSatellite size={32} />
      </div>

      <div className="scene-asteroid scene-asteroid-a">
        <PixelAsteroid size={28} />
      </div>
      <div className="scene-asteroid scene-asteroid-b">
        <PixelAsteroid size={20} />
      </div>
      <div className="scene-asteroid scene-asteroid-c">
        <PixelAsteroid size={16} />
      </div>

      <div className="scene-distant-planet" aria-hidden="true" />
    </div>
  );
}
