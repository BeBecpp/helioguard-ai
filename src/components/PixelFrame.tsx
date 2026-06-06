import type { ReactNode } from 'react';

interface PixelFrameProps {
  children: ReactNode;
  className?: string;
  accent?: 'purple' | 'cyan' | 'yellow' | 'neutral';
}

/** Glass panel with subtle 8-bit corner frame effect. */
export function PixelFrame({ children, className = '', accent = 'neutral' }: PixelFrameProps) {
  return (
    <div className={`pixel-frame pixel-frame-${accent} ${className}`}>
      <span className="pixel-corner pixel-corner-tl" aria-hidden="true" />
      <span className="pixel-corner pixel-corner-tr" aria-hidden="true" />
      <span className="pixel-corner pixel-corner-bl" aria-hidden="true" />
      <span className="pixel-corner pixel-corner-br" aria-hidden="true" />
      {children}
    </div>
  );
}
