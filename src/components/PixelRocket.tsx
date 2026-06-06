interface PixelRocketProps {
  className?: string;
}

/** CSS/SVG pixel-style rocket with float + flame animations. */
export function PixelRocket({ className = '' }: PixelRocketProps) {
  return (
    <div className={`pixel-rocket ${className}`} aria-hidden="true">
      <svg viewBox="0 0 32 48" className="pixel-rocket-svg" shapeRendering="crispEdges">
        {/* Nose */}
        <rect x="14" y="2" width="4" height="2" fill="#e5e7eb" />
        <rect x="12" y="4" width="8" height="2" fill="#f8fafc" />
        {/* Body */}
        <rect x="10" y="6" width="12" height="14" fill="#38bdf8" />
        <rect x="12" y="8" width="8" height="4" fill="#7dd3fc" />
        <rect x="14" y="14" width="4" height="4" fill="#0ea5e9" />
        {/* Window */}
        <rect x="13" y="10" width="6" height="4" fill="#1e293b" />
        <rect x="14" y="11" width="4" height="2" fill="#38bdf8" opacity="0.6" />
        {/* Fins */}
        <rect x="6" y="18" width="4" height="6" fill="#7c3aed" />
        <rect x="22" y="18" width="4" height="6" fill="#7c3aed" />
        <rect x="4" y="22" width="4" height="4" fill="#6d28d9" />
        <rect x="24" y="22" width="4" height="4" fill="#6d28d9" />
        {/* Base */}
        <rect x="10" y="20" width="12" height="4" fill="#2563eb" />
        {/* Flame layers */}
        <g className="rocket-flame">
          <rect x="12" y="24" width="8" height="4" fill="#facc15" />
          <rect x="13" y="28" width="6" height="4" fill="#fb923c" />
          <rect x="14" y="32" width="4" height="4" fill="#fb7185" />
          <rect x="15" y="36" width="2" height="4" fill="#f97316" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}
