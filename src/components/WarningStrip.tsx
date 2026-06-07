export function WarningStrip() {
  return (
    <footer className="warning-strip" role="contentinfo">
      <div className="warning-strip-inner">
        <span className="warning-strip-icon" aria-hidden="true">
          !
        </span>
        <p className="warning-strip-text">
          Educational dashboard only — not an official emergency alert system.
        </p>
      </div>
    </footer>
  );
}
