import { useState } from 'react';
import { ChevronDown, Database, ExternalLink } from 'lucide-react';

const SOURCES = [
  { name: 'NASA NeoWs Feed', url: 'https://api.nasa.gov/neo/rest/v1/feed' },
  { name: 'NASA DONKI', url: 'https://api.nasa.gov/DONKI/docs' },
  { name: 'NASA Open APIs', url: 'https://api.nasa.gov/' },
];

interface CompactDataSourcesProps {
  dateRange?: { startDate: string; endDate: string };
}

export function CompactDataSources({ dateRange }: CompactDataSourcesProps) {
  const [open, setOpen] = useState(false);

  return (
    <section id="about" className="compact-sources" aria-labelledby="sources-heading">
      <button
        type="button"
        className="compact-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <Database size={14} aria-hidden="true" />
        NASA Data Sources
        <ChevronDown size={14} className={`toggle-chevron ${open ? 'open' : ''}`} aria-hidden="true" />
      </button>

      {open && (
        <div className="compact-sources-body arcade-panel">
          {dateRange && (
            <p className="compact-sources-window">
              Asteroid window: {dateRange.startDate} → {dateRange.endDate}
            </p>
          )}
          <ul className="compact-sources-list">
            {SOURCES.map((s) => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.name} <ExternalLink size={11} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <p className="compact-sources-note">
            NASA public/open data — not an official NASA product.
          </p>
        </div>
      )}
    </section>
  );
}
