import { AlertTriangle } from 'lucide-react';

export function DisclaimerFooter() {
  return (
    <footer className="app-footer disclaimer-footer">
      <p className="footer-disclaimer">
        <AlertTriangle size={14} aria-hidden="true" />
        Educational dashboard only — not an official NASA or NOAA emergency alert system.
      </p>
    </footer>
  );
}
