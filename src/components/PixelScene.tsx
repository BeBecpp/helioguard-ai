import { PixelEarth } from './PixelEarth';
import { PixelAsteroid } from './PixelAsteroid';
import { PixelSatellite } from './PixelSatellite';

const PIXEL_STARS = [
  { x: 12, y: 8, c: '#e8f1ff' },
  { x: 28, y: 18, c: '#29d3ff' },
  { x: 45, y: 6, c: '#e8f1ff' },
  { x: 62, y: 22, c: '#ffd84d' },
  { x: 78, y: 10, c: '#e8f1ff' },
  { x: 88, y: 28, c: '#94a3b8' },
  { x: 18, y: 35, c: '#e8f1ff' },
  { x: 72, y: 42, c: '#29d3ff' },
  { x: 92, y: 52, c: '#e8f1ff' },
  { x: 8, y: 55, c: '#a855f7' },
];

function PixelRocketSprite() {
  return (
    <div className="pixel-scene-rocket" aria-hidden="true">
      <svg viewBox="0 0 24 32" width="48" height="64" shapeRendering="crispEdges">
        <rect x="10" y="0" width="4" height="2" fill="#ff9b3d" />
        <rect x="8" y="2" width="8" height="2" fill="#e8f1ff" />
        <rect x="7" y="4" width="10" height="10" fill="#e8f1ff" />
        <rect x="9" y="6" width="6" height="3" fill="#54a8ff" />
        <rect x="10" y="9" width="4" height="3" fill="#1e293b" />
        <rect x="11" y="10" width="2" height="1" fill="#29d3ff" />
        <rect x="5" y="12" width="3" height="4" fill="#ff4444" />
        <rect x="16" y="12" width="3" height="4" fill="#ff4444" />
        <rect x="4" y="15" width="2" height="2" fill="#cc2222" />
        <rect x="18" y="15" width="2" height="2" fill="#cc2222" />
        <rect x="8" y="14" width="8" height="2" fill="#94a3b8" />
        <g className="rocket-flame">
          <rect x="9" y="16" width="6" height="3" fill="#ffd84d" />
          <rect x="10" y="19" width="4" height="3" fill="#ff9b3d" />
          <rect x="10" y="22" width="4" height="3" fill="#ff4444" />
          <rect x="11" y="25" width="2" height="4" fill="#29d3ff" />
        </g>
      </svg>
    </div>
  );
}

function DistantPlanet() {
  return (
    <svg viewBox="0 0 16 16" width="20" height="20" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="4" y="0" width="8" height="3" fill="#a855f7" />
      <rect x="2" y="3" width="12" height="6" fill="#7c3aed" />
      <rect x="3" y="9" width="10" height="4" fill="#6d28d9" />
      <rect x="5" y="13" width="6" height="2" fill="#5b21b6" />
      <rect x="6" y="5" width="3" height="2" fill="#c084fc" />
    </svg>
  );
}

/** 16-bit hero space scene — blocky sprites, orbit trails, pixel stars. */
export function PixelScene() {
  return (
    <div className="pixel-scene" aria-hidden="true">
      <div className="pixel-scene-stars">
        {PIXEL_STARS.map((star, i) => (
          <span
            key={i}
            className="pixel-scene-star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              backgroundColor: star.c,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      <svg className="pixel-scene-orbits" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid meet">
        <ellipse
          cx="200"
          cy="150"
          rx="155"
          ry="55"
          fill="none"
          stroke="#29d3ff"
          strokeWidth="2"
          strokeDasharray="6 8"
          opacity="0.35"
          className="pixel-orbit-path"
        />
        <ellipse
          cx="200"
          cy="150"
          rx="115"
          ry="38"
          fill="none"
          stroke="#a855f7"
          strokeWidth="1"
          strokeDasharray="4 10"
          opacity="0.25"
          className="pixel-orbit-path-inner"
        />
      </svg>

      <div className="pixel-scene-earth">
        <PixelEarth size={96} />
      </div>

      <div className="pixel-scene-rocket-wrap">
        <PixelRocketSprite />
      </div>

      <div className="pixel-scene-satellite">
        <PixelSatellite size={28} pulsing />
      </div>

      <div className="pixel-scene-asteroid pixel-scene-asteroid-a">
        <PixelAsteroid size={26} />
      </div>
      <div className="pixel-scene-asteroid pixel-scene-asteroid-b">
        <PixelAsteroid size={18} />
      </div>
      <div className="pixel-scene-asteroid pixel-scene-asteroid-c">
        <PixelAsteroid size={14} />
      </div>

      <div className="pixel-scene-planet">
        <DistantPlanet />
      </div>
    </div>
  );
}
