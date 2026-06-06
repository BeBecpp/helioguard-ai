const STEPS = [
  {
    num: 1,
    title: 'Scan NASA Data',
    desc: 'Pull asteroid and space weather data from NASA public APIs.',
  },
  {
    num: 2,
    title: 'Calculate Risk',
    desc: 'Convert size, speed, distance, and event signals into educational risk scores.',
  },
  {
    num: 3,
    title: 'Brief the Crew',
    desc: 'Generate a plain-English mission briefing for students.',
  },
  {
    num: 4,
    title: 'Explore Safely',
    desc: 'Learn what space events mean for Earth technology.',
  },
];

export function MissionPath() {
  return (
    <section className="mission-path-section" aria-labelledby="mission-path-heading">
      <div className="section-intro section-intro-left">
        <span className="section-kicker">How HelioGuard Works</span>
        <h2 id="mission-path-heading">Mission Path</h2>
        <p className="section-lead">
          Four steps from raw NASA telemetry to student-friendly space intelligence.
        </p>
      </div>

      <div className="mission-path-wrap">
        <div className="mission-path-track" aria-hidden="true">
          <div className="mission-path-line" />
          <div className="mission-path-rocket-pixel" />
        </div>
        <ol className="mission-path">
          {STEPS.map((step) => (
            <li key={step.num} className="mission-path-node">
              <span className="mission-node-num">{step.num}</span>
              <div className="mission-node-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
