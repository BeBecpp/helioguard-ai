interface PixelEarthProps {
  className?: string;
  size?: number;
}

export function PixelEarth({ className = '', size = 48 }: PixelEarthProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`pixel-earth ${className}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect x="8" y="2" width="8" height="2" fill="#38bdf8" />
      <rect x="4" y="4" width="16" height="4" fill="#0ea5e9" />
      <rect x="2" y="8" width="20" height="8" fill="#0284c7" />
      <rect x="4" y="10" width="6" height="4" fill="#34d399" />
      <rect x="14" y="12" width="4" height="2" fill="#34d399" />
      <rect x="4" y="16" width="16" height="4" fill="#0369a1" />
      <rect x="8" y="20" width="8" height="2" fill="#075985" />
    </svg>
  );
}
