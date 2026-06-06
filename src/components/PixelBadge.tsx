import type { ReactNode } from 'react';

interface PixelBadgeProps {
  children: ReactNode;
  variant?: 'default' | 'mission' | 'accent';
}

export function PixelBadge({ children, variant = 'default' }: PixelBadgeProps) {
  return <span className={`pixel-badge pixel-badge-${variant}`}>{children}</span>;
}
