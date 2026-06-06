interface PixelSatelliteProps {
  className?: string;
  size?: number;
  pulsing?: boolean;
}

export function PixelSatellite({ className = '', size = 32, pulsing = true }: PixelSatelliteProps) {
  return (
    <div className={`pixel-satellite-wrap ${pulsing ? 'satellite-pulse' : ''} ${className}`}>
      <svg
        viewBox="0 0 20 16"
        width={size}
        height={size * 0.8}
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <rect x="8" y="6" width="4" height="4" fill="#94a3b8" />
        <rect x="2" y="7" width="6" height="2" fill="#38bdf8" />
        <rect x="12" y="7" width="6" height="2" fill="#38bdf8" />
        <rect x="0" y="6" width="2" height="4" fill="#7dd3fc" />
        <rect x="18" y="6" width="2" height="4" fill="#7dd3fc" />
        <rect x="9" y="4" width="2" height="2" fill="#facc15" />
      </svg>
      <span className="satellite-signal" aria-hidden="true" />
    </div>
  );
}
