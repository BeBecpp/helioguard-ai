import { useState } from 'react';
import { Calculator } from 'lucide-react';

interface FormulaToggleProps {
  studentMode?: boolean;
}

export function FormulaToggle({ studentMode }: FormulaToggleProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="formula-toggle">
      <button
        type="button"
        className="formula-toggle-btn"
        onClick={() => setShow((v) => !v)}
        aria-expanded={show}
      >
        <Calculator size={14} />
        {show ? 'Hide formula' : 'How is this calculated?'}
      </button>
      {show && (
        <div className="formula-snippet">
          {studentMode ? (
            <>
              <p>
                <strong>HelioGuard Index</strong> = 45% asteroid score + 55% space weather score
              </p>
              <p className="formula-detail">
                Asteroid score uses size, speed, how close the flyby is, and whether NASA marks it
                potentially hazardous.
              </p>
              <code className="formula-block">
                {`AsteroidRisk = 100 × clamp(\n  0.30 × Size +\n  0.20 × Speed +\n  0.35 × Closeness +\n  0.15 × HazardFlag,\n  0, 1\n)`}
              </code>
              <code className="formula-block">
                HelioGuardIndex = 0.45 × AsteroidRisk + 0.55 × SpaceWeatherRisk
              </code>
            </>
          ) : (
            <>
              <code className="formula-block">
                {`AsteroidRisk = 100 × clamp(\n  0.30 × S_diameter +\n  0.20 × S_velocity +\n  0.35 × S_distance +\n  0.15 × H,\n  0, 1\n)`}
              </code>
              <code className="formula-block">
                HelioGuardIndex = 0.45 × AsteroidRisk + 0.55 × SpaceWeatherRisk
              </code>
            </>
          )}
        </div>
      )}
    </div>
  );
}
