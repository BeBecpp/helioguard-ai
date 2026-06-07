function PixelStudent() {
  return (
    <svg
      viewBox="0 0 32 40"
      width="56"
      height="70"
      className="pixel-student"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect x="12" y="2" width="8" height="4" fill="#ffd84d" />
      <rect x="10" y="6" width="12" height="8" fill="#fde68a" />
      <rect x="12" y="8" width="3" height="2" fill="#040816" />
      <rect x="17" y="8" width="3" height="2" fill="#040816" />
      <rect x="14" y="11" width="4" height="1" fill="#ff9b3d" />
      <rect x="8" y="14" width="16" height="10" fill="#54a8ff" />
      <rect x="10" y="16" width="4" height="2" fill="#29d3ff" />
      <rect x="6" y="16" width="4" height="8" fill="#54a8ff" />
      <rect x="22" y="16" width="4" height="8" fill="#54a8ff" />
      <rect x="10" y="24" width="6" height="8" fill="#1e3a8a" />
      <rect x="16" y="24" width="6" height="8" fill="#1e3a8a" />
      <rect x="8" y="32" width="6" height="4" fill="#64748b" />
      <rect x="18" y="32" width="6" height="4" fill="#64748b" />
      <rect x="20" y="18" width="8" height="10" fill="#a855f7" />
      <rect x="22" y="20" width="4" height="2" fill="#c084fc" />
    </svg>
  );
}

interface StudentMissionCardProps {
  onLaunch?: () => void;
}

export function StudentMissionCard({ onLaunch }: StudentMissionCardProps) {
  return (
    <aside className="student-mission-card glass-panel card-hover">
      <div className="student-mission-header">YOUR MISSION</div>
      <PixelStudent />
      <p className="student-mission-text">
        Explore. Question.
        <br />
        Calculate. Protect.
        <br />
        <span className="student-mission-highlight">The universe is your classroom.</span>
      </p>
      <button type="button" className="btn-primary btn-glow" onClick={onLaunch}>
        Start Exploring →
      </button>
    </aside>
  );
}
