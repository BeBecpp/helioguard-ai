interface PixelAsteroidProps {
  className?: string;
  size?: number;
}

/** Tiny pixel asteroid sprite for asteroid cards. */
export function PixelAsteroid({ className = '', size = 24 }: PixelAsteroidProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      className={`pixel-asteroid-icon ${className}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect x="4" y="2" width="4" height="2" fill="#94a3b8" />
      <rect x="2" y="4" width="10" height="2" fill="#64748b" />
      <rect x="1" y="6" width="12" height="4" fill="#78716c" />
      <rect x="2" y="10" width="8" height="2" fill="#57534e" />
      <rect x="4" y="12" width="4" height="2" fill="#44403c" />
      <rect x="5" y="6" width="2" height="2" fill="#a8a29e" />
      <rect x="8" y="8" width="2" height="2" fill="#d6d3d1" />
    </svg>
  );
}
