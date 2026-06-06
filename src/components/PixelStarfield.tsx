/** Subtle animated pixel-space background — CSS + lightweight inline SVG. */
export function PixelStarfield() {
  return (
    <div className="pixel-starfield" aria-hidden="true">
      <div className="star-layer star-layer-sm" />
      <div className="star-layer star-layer-md" />
      <div className="star-layer star-layer-lg" />

      <svg className="orbit-decor orbit-decor-1" viewBox="0 0 200 200" fill="none">
        <ellipse cx="100" cy="100" rx="90" ry="40" stroke="rgba(56,189,248,0.12)" strokeWidth="1" strokeDasharray="4 6" />
      </svg>
      <svg className="orbit-decor orbit-decor-2" viewBox="0 0 160 160" fill="none">
        <ellipse cx="80" cy="80" rx="70" ry="28" stroke="rgba(139,92,246,0.1)" strokeWidth="1" strokeDasharray="3 5" />
      </svg>

      <div className="pixel-planet pixel-planet-a" />
      <div className="pixel-planet pixel-planet-b" />
      <div className="pixel-asteroid-sprite pixel-asteroid-1" />
      <div className="pixel-asteroid-sprite pixel-asteroid-2" />
      <div className="pixel-asteroid-sprite pixel-asteroid-3" />

      <div className="earth-horizon" />
    </div>
  );
}
